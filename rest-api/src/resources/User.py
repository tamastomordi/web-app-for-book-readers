from flask_restful import Resource, reqparse
from ..common.extensions import db
from ..models.UserModel import UserModel
from ..schemas.UserSchema import user_schema, users_schema
from ..common.auth import token_required

class GetUserById(Resource):
   def get(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      result = user_schema.dump(user)
      return {'user': result}, 200

class GetUserByEmail(Resource):
   def get(self, email):
      user = UserModel.query.filter_by(email=email).first()
      result = user_schema.dump(user)
      return {'user': result}, 200

class GetUserByUsername(Resource):
   def get(self, username):
      user = UserModel.query.filter_by(username=username).first()
      result = user_schema.dump(user)
      return {'user': result}, 200

class GetUsers(Resource):
   @token_required
   def get(current_user, self):
      users = UserModel.query.all()
      result = users_schema.dump(users)
      return {'users': result}, 200

class DeleteUser(Resource):
   def delete(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      if not user:
         return {'message': 'No user found'}
      db.session.delete(user)
      db.session.commit()
      return {'message': 'User successfully deleted'}, 200