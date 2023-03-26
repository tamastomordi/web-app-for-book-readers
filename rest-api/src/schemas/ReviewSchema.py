from ..common.extensions import ma
from ..models.ReviewModel import ReviewModel

class ReviewSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = ReviewModel

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)