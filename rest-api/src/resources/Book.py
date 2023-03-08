from flask_restful import Resource

from ..common.extensions import db

from ..models.BookModel import BookModel
from ..schemas.BookSchema import book_schema, books_schema

class Book(Resource):
   
   def get(self, book_id):
      book = BookModel.query.filter_by(book_id=book_id).first()
      result = book_schema.dump(book)
      return {'book': result}, 200

class BookList(Resource):

   def get(self):
      books = BookModel.query.all()
      results = books_schema.dump(books)
      return {'books': results}, 200
