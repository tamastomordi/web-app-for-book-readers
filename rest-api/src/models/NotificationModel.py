from ..common.extensions import db
from ..models.UserModel import UserModel
from ..models.BookModel import BookModel

class NotificationModel(db.Model):
   __tablename__ = "notification_"

   notification_id = db.Column('notification_id_', db.Integer, primary_key=True)

   title = db.Column('title_', db.String(255))
   text = db.Column('text_', db.Text)
   datetime = db.Column('datetime_', db.DateTime)
   active = db.Column('active_', db.Boolean, default=True)
   notification_type = db.Column('type_', db.String(255))

   owner_id = db.Column('owner_id_', db.Integer, db.ForeignKey('user_.user_id_'))
   user_id = db.Column('user_id_', db.Integer, db.ForeignKey('user_.user_id_'))
   book_id = db.Column('book_id_', db.Integer, db.ForeignKey('book_.book_id_'))

   owner = db.relationship('UserModel', foreign_keys=[owner_id])
   user = db.relationship('UserModel', foreign_keys=[user_id])
   book = db.relationship('BookModel', foreign_keys=[book_id])