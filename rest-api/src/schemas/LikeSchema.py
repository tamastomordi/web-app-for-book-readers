from ..common.extensions import ma
from ..models.LikeModel import LikeModel
from ..schemas.BookSchema import BookSchema

class LikeSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = LikeModel

like_schema = LikeSchema()
likes_schema = LikeSchema(many=True)