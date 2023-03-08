from ..common.extensions import ma
from ..models.BookModel import BookModel

class BookSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = BookModel

book_schema = BookSchema()
books_schema = BookSchema(many=True)