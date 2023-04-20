from ..common.extensions import db

class AuthorModel(db.Model):
   __tablename__ = 'author_'
   author_id = db.Column('author_id_', db.Integer, primary_key=True)
   name = db.Column('name_', db.String(255))
   description = db.Column('description_', db.Text)
   birth_date = db.Column('birth_date_', db.Date)
   death_date = db.Column('death_date_', db.Date)
   author_img = db.Column('author_img_', db.Text)