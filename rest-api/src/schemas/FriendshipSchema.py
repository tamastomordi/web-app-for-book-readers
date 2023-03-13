from ..common.extensions import ma
from ..models.FriendshipModel import FriendshipModel

class FriendshipSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = FriendshipModel

friendship_schema = FriendshipSchema()
friendships_schema = FriendshipSchema(many=True)