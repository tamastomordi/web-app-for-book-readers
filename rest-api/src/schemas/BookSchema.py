from ..common.extensions import ma
from marshmallow import fields, pre_dump
from ..models.BookModel import BookModel
from ..schemas.AuthorSchema import AuthorSchema
from ..common.get_image import get_image

class BookSchema(ma.SQLAlchemyAutoSchema):
   author = ma.Nested(AuthorSchema)
   
   class Meta:
      model = BookModel

book_schema = BookSchema()
books_schema = BookSchema(many=True)