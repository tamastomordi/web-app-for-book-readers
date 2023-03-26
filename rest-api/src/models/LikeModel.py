from ..common.extensions import db
from .BookModel import BookModel
from .UserModel import UserModel

class LikeModel(db.Model):
   __tablename__ = "like_"

   book_id = db.Column('book_id_', db.Integer, db.ForeignKey('book_.book_id_'), primary_key=True)
   user_id = db.Column('user_id_', db.Integer, db.ForeignKey('user_.user_id_'), primary_key=True)

   book = db.relationship('BookModel', backref='like')
   user = db.relationship('UserModel', backref='like')