from flask import send_file
from flask_restful import Resource, reqparse
import werkzeug
from ..common.extensions import db
from ..models.BookModel import BookModel, author_book
from ..models.AuthorModel import AuthorModel
from ..models.LikeModel import LikeModel
from ..schemas.AuthorSchema import authors_schema
from ..schemas.BookSchema import book_schema, books_schema
from ..common.auth import token_required
from ..common.allowed_file import allowed_file, get_extension
from ..common.get_image import get_image

class GetBooks(Resource):
   def get(self):
      books = BookModel.query.all()
      results = books_schema.dump(books)
      return {'books': results}, 200

class GetBooksByAuthor(Resource):
   def get(self, author_id):
      books = BookModel.query.join(author_book).join(AuthorModel).filter_by(author_id=author_id).all()
      results = books_schema.dump(books)
      return {'books': results}, 200

class GetBookById(Resource):
   @token_required
   def get(current_user, self, book_id):
      book = BookModel.query.filter_by(book_id=book_id).first()
      result = book_schema.dump(book)
      return {'book': result}, 200

class AddBook(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('title')
      self.reqparse.add_argument('subtitle')
      self.reqparse.add_argument('description')
      self.reqparse.add_argument('published')
      self.reqparse.add_argument('approved', type=bool)
      self.reqparse.add_argument('authors', action='append')
      super(AddBook, self).__init__()

   def post(self):
         args = self.reqparse.parse_args()
         new_book = BookModel(title=args['title'], subtitle=args['subtitle'], description=args['description'], published=args['published'], approved=args['approved'])
         for author_id in args['authors']:
            new_book.authors.append(AuthorModel.query.filter_by(author_id=author_id).first())
         db.session.add(new_book)
         db.session.commit()
         return {'message': 'Book successfully created'}, 201

class GetCoverImg(Resource):
   def get(self, book_id):
      book = BookModel.query.filter_by(book_id=book_id).first()
      if book and book.cover_img:
         return send_file(book.cover_img), 200
      return {'error': 'Unsuccessful img get'}, 400 

class UploadCoverImg(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('cover_img', type=werkzeug.datastructures.FileStorage, location='files')
      self.reqparse.add_argument('book_id', location='form')

   def post(self):
      FOLDER = './src/img/book_covers'
      args = self.reqparse.parse_args()
      cover_img = args['cover_img']
      book = BookModel.query.filter_by(book_id=args['book_id']).first()
      if book and cover_img and allowed_file(cover_img.filename):
         path = FOLDER+'/'+args['book_id']+'.'+get_extension(cover_img.filename)
         cover_img.save(path)
         book.cover_img_file = args['book_id']+'.'+get_extension(cover_img.filename)
         db.session.add(book)
         db.session.commit()
         return {'message': 'Cover img successfully added'}, 201
      return {'error': 'Unsuccessful img upload'}, 400

class GetBooksLikedByUser(Resource):
   def get(self, user_id):
      likes = LikeModel.query.filter_by(user_id=user_id)
      books = []
      for like in likes:
         book = BookModel.query.filter_by(book_id=like.book_id).first()
         books.append(book)
      results = books_schema.dump(books)
      return {'books': results}, 200