from ..common.extensions import ma
from marshmallow import fields, pre_dump
from ..models.AuthorModel import AuthorModel
from ..common.get_image import get_image

class AuthorSchema(ma.SQLAlchemyAutoSchema):
   author_img = fields.String()

   @pre_dump
   def get_author_img(self, data, **kwargs):
      if data.author_img_file:
         data.author_img = get_image('./src/img/author_images/'+data.author_img_file)
      return data
   
   class Meta:
      model = AuthorModel

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)