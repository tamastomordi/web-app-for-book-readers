from ..common.extensions import db
from .BookModel import BookModel
from .UserModel import UserModel

class ReadingModel(db.Model):
   __tablename__ = "reading_"

   review_id = db.Column('reading_id_', db.Integer, primary_key=True)

   book_id = db.Column('book_id_', db.Integer, db.ForeignKey('book_.book_id_'))
   user_id = db.Column('user_id_', db.Integer, db.ForeignKey('user_.user_id_'))

   book = db.relationship('BookModel', backref='reading')
   user = db.relationship('UserModel', backref='reading')

   start = db.Column('start_', db.DateTime)
   end = db.Column('end_', db.DateTime)