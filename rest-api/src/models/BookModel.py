from ..common.extensions import db
from .AuthorModel import AuthorModel

class BookModel(db.Model):
   __tablename__ = "book_"

   book_id = db.Column('book_id_', db.Integer, primary_key=True)
   title = db.Column('title_', db.String(255), nullable=False)
   subtitle = db.Column('subtitle_', db.String(255))
   cover_img = db.Column('cover_img_', db.String(255))
   description = db.Column('description_', db.Text, nullable=False)
   approved = db.Column('approved_', db.Boolean, nullable=False)

   author_id = db.Column('author_id_', db.Integer, db.ForeignKey('author_.author_id_'), nullable=False)
   author = db.relationship('AuthorModel', backref='book')