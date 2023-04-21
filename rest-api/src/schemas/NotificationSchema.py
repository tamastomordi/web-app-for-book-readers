from ..common.extensions import ma
from ..models.NotificationModel import NotificationModel
from ..schemas.UserSchema import UserSchema
from ..schemas.BookSchema import BookSchema

class NotificationSchema(ma.SQLAlchemyAutoSchema):
   owner = ma.Nested(UserSchema)   
   user = ma.Nested(UserSchema)   
   book = ma.Nested(BookSchema)   

   class Meta:
      model = NotificationModel

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)