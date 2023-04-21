from flask_restful import Resource, reqparse
from ..common.extensions import db
from ..models.FriendshipModel import FriendshipModel
from ..models.NotificationModel import NotificationModel
from ..schemas.FriendshipSchema import friendship_schema, friendships_schema
from ..common.auth import token_required
from datetime import datetime

class GetFriendship(Resource):
   @token_required
   def get(current_user, self, user_id):
      friendship = FriendshipModel.query.filter_by(user_id_1=current_user.user_id, user_id_2=args['user_id']).first()
      if friendship:
         result = friendship_schema.dump(friendship)
         return {'friendship': result}, 200
      friendship = FriendshipModel.query.filter_by(user_id_1=args['user_id'], user_id_2=current_user.user_id).first()
      if friendship: 
         result = friendship_schema.dump(friendship)
         return {'friendship': result}, 200
      return {'message': 'No friendship between the users.'}, 200

class RequestFriendship(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('user_id')
      super(RequestFriendship, self).__init__()

   @token_required
   def post(current_user, self):
      args = self.reqparse.parse_args()
      friendship = FriendshipModel.query.filter_by(user_id_1=current_user.user_id, user_id_2=args['user_id']).first()
      if friendship:
         return {'message': 'Friendship already exist'}, 400
      friendship = FriendshipModel.query.filter_by(user_id_1=args['user_id'], user_id_2=current_user.user_id).first()
      if friendship:
         return {'message': 'Friendship already exist'}, 400
      new_friendship = FriendshipModel(user_id_1=current_user.user_id, user_id_2=args['user_id'], confirmed=False)
      new_notification = NotificationModel(title='Jelölés', text=current_user.username+' barátnak jelölt.', notification_type='request', datetime=datetime.now(), owner_id=args['user_id'], user_id=current_user.user_id)
      db.session.add(new_friendship)
      db.session.add(new_notification)
      db.session.commit()
      return {'message': 'Friendship successfully created'}, 201

class DeleteFriendship(Resource):
   @token_required
   def delete(current_user, self, user_id):
      friendship = FriendshipModel.query.filter_by(user_id_1=current_user.user_id, user_id_2=user_id).first()
      if friendship:
         db.session.delete(friendship)
         db.session.commit()
         return {'message': 'Friendship successfully deleted'}, 200
      friendship = FriendshipModel.query.filter_by(user_id_1=user_id, user_id_2=current_user.user_id).first()
      if friendship:
         db.session.delete(friendship)
         db.session.commit()
         return {'message': 'Friendship successfully deleted'}, 200
      return {'message': 'No friendship found'}, 400

class ConfirmFriendship(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('user_id')
      super(ConfirmFriendship, self).__init__()

   @token_required
   def put(current_user, self):
      args = self.reqparse.parse_args()
      friendship = FriendshipModel.query.filter_by(user_id_1=args['user_id'], user_id_2=current_user.user_id).first()
      friendship.confirmed = True
      new_notification = NotificationModel(title='Elfogadva', text=current_user.username+' elfogadta a jelölésed.', datetime=datetime.now(), owner_id=args['user_id'], user_id=current_user.user_id)
      db.session.add(new_notification)
      db.session.commit()
      return {'message': 'Friendship successfully confirmed'}, 201
