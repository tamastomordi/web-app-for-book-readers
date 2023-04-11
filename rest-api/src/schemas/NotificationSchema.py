from ..common.extensions import ma
from ..models.NotificationModel import NotificationModel

class NotificationSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = NotificationModel

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)