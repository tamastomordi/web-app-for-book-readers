from ..common.extensions import ma
from ..models.ReadingModel import ReadingModel
from ..schemas.BookSchema import BookSchema

class ReadingSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = ReadingModel

reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)