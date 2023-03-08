from ..common.extensions import ma
from ..models.UserModel import UserModel

class UserSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = UserModel

user_schema = UserSchema()
users_schema = UserSchema(many=True)