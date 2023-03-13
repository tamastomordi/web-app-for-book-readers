from flask_restful import Resource, reqparse

from ..common.extensions import db

from ..models.UserModel import UserModel
from ..schemas.UserSchema import user_schema, users_schema
from ..common.auth import token_required

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

   @token_required
   def get(current_user, self):
      users = UserModel.query.all()
      result = users_schema.dump(users)
      return {'users': result}, 200
