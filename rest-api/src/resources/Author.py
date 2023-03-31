import werkzeug
from flask import send_file
from flask_restful import Resource, reqparse
from ..common.extensions import db
from ..models.AuthorModel import AuthorModel
from ..schemas.AuthorSchema import author_schema, authors_schema

class GetAuthor(Resource):
   def get(self, author_id):
      author = AuthorModel.query.filter_by(author_id=author_id).first()
      result = author_schema.dump(author)
      return {'author': result}, 200

class GetAuthors(Resource):
   def get(self):
      authors = AuthorModel.query.all()
      results = authors_schema.dump(authors)
      return {'authors': results}, 200  

class GetAuthorImg(Resource):
   def get(self, author_id):
      author = AuthorModel.query.filter_by(author_id=author_id).first()
      author = author_schema.dump(author)
      if author and author['author_img']:
         return send_file(author['author_img'])
      return {'error': 'Unsuccessful img get'}, 400 

class UploadAuthorImg(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('author_img', type=werkzeug.datastructures.FileStorage, location='files')
      self.reqparse.add_argument('author_id', location='form')

   def post(self):
      FOLDER = './src/img/author_images'
      args = self.reqparse.parse_args()
      author_img = args['author_img']
      author = AuthorModel.query.filter_by(author_id=args['author_id']).first()
      if author and author_img and allowed_file(author_img.filename):
         path = FOLDER+'/'+args['author_id']+'.'+get_extension(author_img.filename)
         author_img.save(path)
         author.author_img = args['author_id']+'.'+get_extension(author_img.filename)
         db.session.add(author)
         db.session.commit()
         return {'message': 'Author img successfully added'}, 201
      return {'error': 'Unsuccessful img upload'}, 400

class AddAuthor(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('name')
      self.reqparse.add_argument('description')
      self.reqparse.add_argument('birth_date')
      self.reqparse.add_argument('death_date')
      super(AddAuthor, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      new_author = AuthorModel(name=args['name'], description=args['description'], birth_date=args['birth_date'], death_date=args['death_date'])
      db.session.add(new_author)
      db.session.commit()
      return {'message': 'Author successfully created'}, 201