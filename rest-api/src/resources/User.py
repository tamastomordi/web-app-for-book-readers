from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash

from ..common.extensions import api, db

from ..models.UserModel import UserModel
from ..schemas.UserSchema import user_schema, users_schema

class User(Resource):

   def get(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      result = user_schema.dump(user)
      return {'user': result}, 200

   def delete(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      if not user:
         return {'message': 'No user found'}
      db.session.delete(user)
      db.session.commit()
      return {'message': 'User successfully deleted'}, 200

class UserList(Resource):
   
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('username')
      self.reqparse.add_argument('email')
      self.reqparse.add_argument('password')
      super(UserList, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      hashed_password = generate_password_hash(args['password'], method='sha256')
      new_user = UserModel(username=args['username'], email=args['email'], password_hash=hashed_password)
      db.session.add(new_user)
      db.session.commit()
      return {'message': 'User successfully created'}, 201

   def get(self):
      users = UserModel.query.all()
      result = users_schema.dump(users)
      return {'users': result}, 200
