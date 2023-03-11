from flask_restful import Resource, reqparse

from ..common.extensions import db

from ..models.BookModel import BookModel
from ..models.AuthorModel import AuthorModel
from ..schemas.BookSchema import book_schema, books_schema

class Book(Resource):

   def get(self, book_id):
      book = BookModel.query.filter_by(book_id=book_id).first()
      result = book_schema.dump(book)
      return {'book': result}, 200

class BookList(Resource):

   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('title')
      self.reqparse.add_argument('subtitle')
      self.reqparse.add_argument('cover_img_path')
      self.reqparse.add_argument('description')
      self.reqparse.add_argument('published')
      self.reqparse.add_argument('approved', type=bool)
      self.reqparse.add_argument('authors', action='append')
      super(BookList, self).__init__()

   def get(self):
      books = BookModel.query.all()
      results = books_schema.dump(books)
      return {'books': results}, 200

   def post(self):
      args = self.reqparse.parse_args()
      new_book = BookModel(title=args['title'], subtitle=args['subtitle'], cover_img_path=args['cover_img_path'], description=args['description'], published=args['published'], approved=args['approved'])
      for author_id in args['authors']:
         new_book.authors.append(AuthorModel.query.filter_by(author_id=author_id).first())
      db.session.add(new_book)
      db.session.commit()
      return {'message': 'Book successfully created'}, 201
