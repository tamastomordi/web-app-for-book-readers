from ..common.extensions import db

class UserModel(db.Model):
   __tablename__ = "user_"
   user_id = db.Column('user_id_', db.Integer, primary_key=True)
   username = db.Column('username_', db.String(50))
   email = db.Column('email_', db.String(255))
   password_hash = db.Column('password_hash_', db.Text)