from flask_restful import Resource, reqparse
from ..models.NotificationModel import NotificationModel
from ..schemas.NotificationSchema import notification_schema, notifications_schema
from ..common.extensions import db
from ..common.auth import token_required

class GetAllNotifications(Resource):
   @token_required
   def get(current_user, self):
      notifications = NotificationModel.query.filter_by(owner_id=current_user.user_id)
      results = notifications_schema.dump(notifications)
      return {'notifications': results}, 200

class GetActiveNotifications(Resource):
   @token_required
   def get(current_user, self):
      notifications = NotificationModel.query.filter_by(owner_id=current_user.user_id, active=True)
      results = notifications_schema.dump(notifications)
      return {'notifications': results}, 200

class AddNotification(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('title')
      self.reqparse.add_argument('text')
      self.reqparse.add_argument('datetime')
      self.reqparse.add_argument('owner_id')
      super(AddNotification, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      new_notification = NotificationModel(title=args['title'], text=args['text'], datetime=args['datetime'], owner_id=args['owner_id'])
      db.session.add(new_notification)
      db.session.commit()
      return {'message': 'Notification successfully added'}, 201

class DeactivateNotification(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('notification_id')
      super(DeactivateNotification, self).__init__()

   @token_required
   def put(current_user, self):
      args = self.reqparse.parse_args()
      notification = NotificationModel.query.filter_by(notification_id=args['notification_id'], owner_id=current_user.user_id, active=True).first()
      notification.active = False
      db.session.commit()
      return {'message': 'Notification successfully deactivated'}, 200

class DeleteNotification(Resource):
   @token_required
   def delete(current_user, self, notification_id):
      notification = NotificationModel.query.filter_by(notification_id=notification_id, owner_id=current_user.user_id).first()
      db.session.delete(notification)
      db.session.commit()
      return {'message': 'Notification successfully deactivated'}, 200
