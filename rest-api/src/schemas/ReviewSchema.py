from ..common.extensions import ma
from ..models.ReviewModel import ReviewModel
from .UserSchema import UserSchema

class ReviewSchema(ma.SQLAlchemyAutoSchema):
   user = ma.Nested(UserSchema)   
   class Meta:
      model = ReviewModel

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)