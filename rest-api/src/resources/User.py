from flask_restful import Resource, reqparse
from ..common.extensions import db
from ..models.UserModel import UserModel
from ..models.LikeModel import LikeModel
from ..models.ReadingModel import ReadingModel
from ..models.BookModel import BookModel
from ..schemas.UserSchema import user_schema, users_schema
from ..schemas.LikeSchema import likes_schema
from ..schemas.ReadingSchema import readings_schema
from ..common.auth import token_required

class GetUserById(Resource):
   def get(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      favorites = BookModel.query.join(LikeModel).filter_by(user_id=user_id)
      readings = ReadingModel.query.filter_by(user_id=user_id).all()
      favorites = likes_schema.dump(favorites)
      readings = readings_schema.dump(readings)
      return {'user': user, 'favorites': favorites, 'readings': readings}, 200

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