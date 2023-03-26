from flask_restful import Resource, reqparse
from ..common.extensions import db
from ..models.FriendshipModel import FriendshipModel
from ..schemas.FriendshipSchema import friendship_schema, friendships_schema

class GetFriendship(Resource):
   def get(self, friendship_id):
      friendship = FriendshipModel.query.filter_by(friendship_id=friendship_id).first()
      result = friendship_schema.dump(friendship)
      return {'friendship': result}, 200

class RequestFriendship(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('user_id_1')
      self.reqparse.add_argument('user_id_2')
      super(RequestFriendship, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      new_friendship = FriendshipModel(user_id_1=args['user_id_1'], user_id_2=args['user_id_2'], confirmed=False)
      db.session.add(new_friendship)
      db.session.commit()
      return {'message': 'Friendship successfully created'}, 201

class ConfirmFriendship(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('user_id_1')
      self.reqparse.add_argument('user_id_2')
      super(ConfirmFriendship, self).__init__()

   def put(self):
      args = self.reqparse.parse_args()
      friendship = FriendshipModel.query.filter_by(user_id_1=args['user_id_1'], user_id_2=args['user_id_2']).first()
      friendship.confirmed = True
      db.session.commit()
      return {'message': 'Friendship successfully confirmed'}, 201
