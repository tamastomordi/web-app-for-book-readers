from ..common.extensions import db

class NotificationModel(db.Model):
   __tablename__ = "notification_"

   notification_id = db.Column('notification_id_', db.Integer, primary_key=True)

   title = db.Column('title_', db.String(255))
   text = db.Column('text_', db.Text)
   datetime = db.Column('datetime_', db.DateTime)
   active = db.Column('active_', db.Boolean, default=True)

   owner_id = db.Column('owner_id_', db.Integer, db.ForeignKey('user_.user_id_'))
   user_id = db.Column('user_id_', db.Integer, db.ForeignKey('user_.user_id_'))
   book_id = db.Column('book_id_', db.Integer, db.ForeignKey('book_.book_id_'))