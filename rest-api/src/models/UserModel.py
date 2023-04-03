from ..common.extensions import db

class UserModel(db.Model):
   __tablename__ = "user_"
   user_id = db.Column('user_id_', db.Integer, primary_key=True)
   username = db.Column('username_', db.String(50))
   email = db.Column('email_', db.String(255))
   password_hash = db.Column('password_hash_', db.Text)
   sign_up_date = db.Column('sign_up_date_', db.Date)
   full_name = db.Column('full_name_', db.String(255))
   birth_date = db.Column('birth_date_', db.Date)
   user_img_file = db.Column('user_img_file_', db.String(255))
   location = db.Column('location_', db.String(255))
   studies = db.Column('studies_', db.String(255))
   job = db.Column('job_', db.String(255))
   bio = db.Column('bio_', db.Text)
   gender = db.Column('gender_', db.String(1))
