from ..common.extensions import ma
from ..models.FriendshipModel import FriendshipModel
from ..schemas.UserSchema import UserSchema

class FriendshipSchema(ma.SQLAlchemyAutoSchema):
   user_1 = ma.Nested(UserSchema)   
   user_2 = ma.Nested(UserSchema)   
   
   class Meta:
      model = FriendshipModel

friendship_schema = FriendshipSchema()
friendships_schema = FriendshipSchema(many=True)