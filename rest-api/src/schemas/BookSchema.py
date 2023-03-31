from ..common.extensions import ma
from marshmallow import fields, pre_dump
from ..models.BookModel import BookModel
from ..schemas.AuthorSchema import AuthorSchema
from ..common.get_image import get_image

class BookSchema(ma.SQLAlchemyAutoSchema):
   authors = ma.Nested(AuthorSchema, many=True)
   cover_img = fields.String()

   @pre_dump
   def get_cover_img(self, data, **kwargs):
      if data.cover_img_file:
         data.cover_img = get_image('./src/img/book_covers/'+data.cover_img_file)
      return data

   class Meta:
      model = BookModel

book_schema = BookSchema()
books_schema = BookSchema(many=True)