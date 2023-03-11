from flask_restful import Resource, reqparse

from ..common.extensions import db

from ..models.AuthorModel import AuthorModel
from ..schemas.AuthorSchema import author_schema, authors_schema

class Author(Resource):
   
   def get(self, author_id):
      author = AuthorModel.query.filter_by(author_id=author_id).first()
      result = author_schema.dump(author)
      return {'author': result}, 200

class AuthorList(Resource):

   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('name')
      self.reqparse.add_argument('description')
      self.reqparse.add_argument('birth_date')
      self.reqparse.add_argument('death_date')
      self.reqparse.add_argument('author_img_path')
      super(AuthorList, self).__init__()

   def get(self):
      authors = AuthorModel.query.all()
      results = authors_schema.dump(authors)
      return {'authors': results}, 200

   def post(self):
      args = self.reqparse.parse_args()
      new_author = AuthorModel(name=args['name'], description=args['description'], birth_date=args['birth_date'], death_date=args['death_date'], author_img_path=args['author_img_path'])
      db.session.add(new_author)
      db.session.commit()
      return {'message': 'Author successfully created'}, 201