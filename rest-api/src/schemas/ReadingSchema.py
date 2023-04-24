from ..common.extensions import ma
from ..models.ReadingModel import ReadingModel
from ..schemas.BookSchema import BookSchema
from ..schemas.UserSchema import UserSchema

class ReadingSchema(ma.SQLAlchemyAutoSchema):
   book = ma.Nested(BookSchema)
   user = ma.Nested(UserSchema)

   class Meta:
      model = ReadingModel

reading_schema = ReadingSchema()
readings_schema = ReadingSchema(many=True)