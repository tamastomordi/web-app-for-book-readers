from ..common.extensions import db

class QuoteModel(db.Model):
   __tablename__ = "quote_"

   quote_id = db.Column('quote_id_', db.Integer, primary_key=True)
   text = db.Column('text_', db.Text)
   by = db.Column('by_', db.String(255))