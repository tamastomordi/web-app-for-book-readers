from ..common.extensions import ma
from ..models.BookModel import BookModel
from ..schemas.AuthorSchema import AuthorSchema

class BookSchema(ma.SQLAlchemyAutoSchema):
   authors = ma.Nested(AuthorSchema, many=True)
   class Meta:
      model = BookModel

book_schema = BookSchema()
books_schema = BookSchema(many=True)