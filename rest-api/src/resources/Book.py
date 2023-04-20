from flask import send_file
from flask_restful import Resource, reqparse
import werkzeug
from sqlalchemy import func
from ..common.extensions import db
from ..models.BookModel import BookModel
from ..models.AuthorModel import AuthorModel
from ..models.LikeModel import LikeModel
from ..schemas.AuthorSchema import authors_schema
from ..schemas.BookSchema import book_schema, books_schema
from ..common.auth import token_required
from ..common.allowed_file import allowed_file, get_extension
from ..common.get_image import get_image

class GetBooks(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('searchTerm', type=str, location="args")
      super(GetBooks, self).__init__()

   def get(self):
      args = self.reqparse.parse_args()
      books = BookModel.query.filter(func.lower(BookModel.title).contains(args['searchTerm']))
      results = books_schema.dump(books)
      print(results)
      return {'books': results}, 200

class GetBooksByAuthor(Resource):
   def get(self, author_id):
      books = BookModel.query.filter_by(author_id=author_id).all()
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
      self.reqparse.add_argument('author_id')
      super(AddBook, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      new_book = BookModel(title=args['title'], subtitle=args['subtitle'], description=args['description'], approved=False, author_id=args['author_id'])
      db.session.add(new_book)
      db.session.commit()
      return {'book_id': new_book.book_id}, 201

class GetCoverImg(Resource):
   def get(self, book_id):
      FOLDER = './src/img/book_covers/'
      book = BookModel.query.filter_by(book_id=book_id).first()
      if book and book.cover_img:
         return get_image(FOLDER + book.cover_img), 200
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
         book.cover_img = args['book_id']+'.'+get_extension(cover_img.filename)
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

class DeleteBook(Resource):
   def delete(self, book_id):
      book = BookModel.query.filter_by(book_id=book_id).first()
      if not book:
         return {'message': 'Book not found'}, 400
      db.session.delete(book)
      db.session.commit()
      return {'message': 'Book successfully deleted'}, 200