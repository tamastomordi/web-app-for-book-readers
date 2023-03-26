from ..common.extensions import db
from .BookModel import BookModel
from .UserModel import UserModel

class ReviewModel(db.Model):
   __tablename__ = "review_"

   review_id = db.Column('review_id_', db.Integer, primary_key=True)

   book_id = db.Column('book_id_', db.Integer, db.ForeignKey('book_.book_id_'))
   user_id = db.Column('user_id_', db.Integer, db.ForeignKey('user_.user_id_'))

   book = db.relationship('BookModel', backref='review')
   user = db.relationship('UserModel', backref='review')

   rating = db.Column('rating_', db.Integer)
   review_text = db.Column('review_text_', db.Text)
   datetime = db.Column('datetime_', db.DateTime)