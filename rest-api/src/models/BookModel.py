from ..common.extensions import db

class BookModel(db.Model):
   __tablename__ = "book_"
   book_id = db.Column('book_id_', db.Integer, primary_key=True)
   title = db.Column('title_', db.String(255))
   subtitle = db.Column('subtitle_', db.String(255))
   cover_img_path = db.Column('cover_img_path_', db.Text)
   description = db.Column('description_', db.Text)
   published = db.Column('published_', db.Date)
   approved = db.Column('approved_', db.Boolean)