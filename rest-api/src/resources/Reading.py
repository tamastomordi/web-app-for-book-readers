from flask_restful import Resource, reqparse
from sqlalchemy.sql.expression import or_
from ..models.ReadingModel import ReadingModel
from ..models.UserModel import UserModel
from ..models.FriendshipModel import FriendshipModel
from ..models.NotificationModel import NotificationModel
from ..schemas.ReadingSchema import reading_schema, readings_schema
from ..schemas.UserSchema import user_schema, users_schema
from ..schemas.FriendshipSchema import friendship_schema, friendships_schema
from ..common.extensions import db
from ..common.auth import token_required
from datetime import datetime

class GetReadings(Resource):
   def get(self):
      readings = ReadingModel.query.all()
      results = readings_schema.dump(readings)
      return {'readings': results}, 200

class GetReading(Resource):
   def get(self, reading_id):
      reading = ReadingModel.query.filter_by(reading_id=reading_id).first()
      result = reading_schema.dump(reading)
      return {'reading': result}, 200

class GetReadingsByUserId(Resource):
   def get(self, user_id):
      readings = ReadingModel.query.filter_by(user_id=user_id).order_by(ReadingModel.end.desc(), ReadingModel.start.desc()).all()
      results = readings_schema.dump(readings)
      return {'readings': results}, 200

class GetFriendsReadings(Resource):
   @token_required
   def get(current_user, self):
      friendships = FriendshipModel.query.filter(or_(FriendshipModel.user_id_1 == current_user.user_id, FriendshipModel.user_id_2 == current_user.user_id), FriendshipModel.confirmed == True).all()
      results = []
      for friendship in friendships_schema.dump(friendships):
         if friendship['user_1']['user_id'] == current_user.user_id:
            user_id = friendship['user_2']['user_id']
         else:
            user_id = friendship['user_1']['user_id']
         readings = ReadingModel.query.filter_by(user_id=user_id).order_by(ReadingModel.start.desc())
         results.extend(readings_schema.dump(readings))      
      return {'readings': results}, 200

class GetFriendsActiveReadings(Resource):
   @token_required
   def get(current_user, self):
      friendships = FriendshipModel.query.filter(or_(FriendshipModel.user_id_1 == current_user.user_id, FriendshipModel.user_id_2 == current_user.user_id), FriendshipModel.confirmed == True).all()
      results = []
      for friendship in friendships_schema.dump(friendships):
         if friendship['user_1']['user_id'] == current_user.user_id:
            user_id = friendship['user_2']['user_id']
         else:
            user_id = friendship['user_1']['user_id']
         readings = ReadingModel.query.filter_by(user_id=user_id, end=None).order_by(ReadingModel.start.desc())
         results.extend(readings_schema.dump(readings))      
      return {'readings': results}, 200

class GetReadingsByBookId(Resource):
   def get(self, book_id):
      readings = ReadingModel.query.filter_by(book_id=book_id)
      results = readings_schema.dump(readings)
      return {'readings': results}, 200

class AddReading(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('start')
      super(AddReading, self).__init__()
   
   @token_required
   def post(current_user, self):
      args = self.reqparse.parse_args()
      reading = ReadingModel(book_id=args['book_id'], user_id=current_user.user_id, start=args['start'])
      db.session.add(reading)
      friendships = FriendshipModel.query.filter(or_(FriendshipModel.user_id_1 == current_user.user_id, FriendshipModel.user_id_2 == current_user.user_id), FriendshipModel.confirmed == True).all()
      for friendship in friendships_schema.dump(friendships):
         if friendship['user_1']['user_id'] == current_user.user_id:
            user_id = friendship['user_2']['user_id']
         else:
            user_id = friendship['user_1']['user_id']
         new_notification = NotificationModel(datetime=datetime.now(), owner_id=user_id, user_id=current_user.user_id, book_id=args['book_id'], notification_type="start_reading")
         db.session.add(new_notification)
      db.session.commit()
      return {'message': 'Reading successfully added'}, 201

class IsReading(Resource):   
   @token_required
   def get(current_user, self, book_id):
      reading = ReadingModel.query.filter_by(user_id=current_user.user_id, book_id=book_id, end=None).first()
      if reading:
         return {'reading': True}, 200
      else:
         return {'reading': False}, 200

class EndReading(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('end')
      super(EndReading, self).__init__()
   
   @token_required
   def put(current_user, self):
      args = self.reqparse.parse_args()
      reading = ReadingModel.query.filter_by(user_id=current_user.user_id, book_id=args['book_id'], end=None).first()
      if reading:
         reading.end = args['end']
         friendships = FriendshipModel.query.filter(or_(FriendshipModel.user_id_1 == current_user.user_id, FriendshipModel.user_id_2 == current_user.user_id), FriendshipModel.confirmed == True).all()
         for friendship in friendships_schema.dump(friendships):
            if friendship['user_1']['user_id'] == current_user.user_id:
               user_id = friendship['user_2']['user_id']
            else:
               user_id = friendship['user_1']['user_id']
            new_notification = NotificationModel(datetime=datetime.now(), owner_id=user_id, user_id=current_user.user_id, book_id=args['book_id'], notification_type="end_reading")
            db.session.add(new_notification)
      db.session.commit()
      return {'message': 'Reading successfully ended'}, 201