from ..common.extensions import ma
from marshmallow import fields, pre_dump
from ..models.UserModel import UserModel
from ..common.get_image import get_image

class UserSchema(ma.SQLAlchemyAutoSchema):
   user_img = fields.String()

   @pre_dump
   def get_cover_img(self, data, **kwargs):
      if data.user_img_file:
         data.user_img = get_image('./src/img/user_images/'+data.user_img_file)
      return data
   
   class Meta:
      model = UserModel

user_schema = UserSchema()
users_schema = UserSchema(many=True)