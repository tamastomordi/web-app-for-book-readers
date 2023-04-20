from ..common.extensions import ma
from marshmallow import fields, pre_dump
from ..models.AuthorModel import AuthorModel
from ..common.get_image import get_image

class AuthorSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = AuthorModel

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)