from ..common.extensions import db
from .AuthorModel import AuthorModel

author_book = db.Table('author_book_', db.Model.metadata,
   db.Column('author_id_', db.Integer, db.ForeignKey('author_.author_id_')),
   db.Column('book_id_', db.Integer, db.ForeignKey('book_.book_id_'))
)

class BookModel(db.Model):
   __tablename__ = "book_"

   book_id = db.Column('book_id_', db.Integer, primary_key=True)
   title = db.Column('title_', db.String(255))
   subtitle = db.Column('subtitle_', db.String(255))
   cover_img_file = db.Column('cover_img_file_', db.Text)
   description = db.Column('description_', db.Text)
   approved = db.Column('approved_', db.Boolean)

   authors = db.relationship("AuthorModel", secondary=author_book)