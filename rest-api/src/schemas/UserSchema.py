from ..common.extensions import ma
from marshmallow import fields, pre_dump
from ..models.UserModel import UserModel
from ..common.get_image import get_image

class UserSchema(ma.SQLAlchemyAutoSchema):  
   class Meta:
      model = UserModel

user_schema = UserSchema()
users_schema = UserSchema(many=True)