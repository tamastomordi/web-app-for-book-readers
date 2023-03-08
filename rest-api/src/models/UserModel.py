from ..common.extensions import db

class UserModel(db.Model):
   __tablename__ = "user_"
   user_id = db.Column('user_id_', db.Integer, primary_key=True)
   username = db.Column('username_', db.String(50))
   email = db.Column('email_', db.String(255))
   password_hash = db.Column('password_hash_', db.Text)
   sign_up_date = db.Column('sign_up_date_', db.Date)
   birth_date = db.Column('birth_date_', db.Date)
   user_img_path = db.Column('user_img_path_', db.Text)
   location = db.Column('location_', db.String(255))
   gender = db.Column('gender_', db.String(1))
