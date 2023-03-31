from flask_restful import Resource, reqparse
import werkzeug
from ..common.extensions import db
from ..models.UserModel import UserModel
from ..models.LikeModel import LikeModel
from ..models.ReadingModel import ReadingModel
from ..models.BookModel import BookModel
from ..schemas.UserSchema import user_schema, users_schema
from ..schemas.BookSchema import books_schema
from ..schemas.LikeSchema import likes_schema
from ..schemas.ReadingSchema import readings_schema
from ..common.auth import token_required
from ..common.allowed_file import allowed_file, get_extension
from ..common.get_image import get_image

class GetUserById(Resource):
   def get(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      favorites = BookModel.query.join(LikeModel).filter_by(user_id=user_id).all()
      readings = ReadingModel.query.filter_by(user_id=user_id).all()
      user = user_schema.dump(user)
      favorites = books_schema.dump(favorites)
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

class GetUserImg(Resource):
   def get(self, user_id):
      FOLDER = 'img/user_images/'
      user = UserModel.query.filter_by(user_id=user_id).first()
      if user and user.user_img:
         return send_file(user.user_img), 200
      return {'error': 'Unsuccessful img get'}, 400 

class UploadUserImg(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('user_img', type=werkzeug.datastructures.FileStorage, location='files')
      self.reqparse.add_argument('user_id', location='form')

   def post(self):
      FOLDER = './src/img/user_images'
      args = self.reqparse.parse_args()
      user_img = args['user_img']
      user = UserModel.query.filter_by(user_id=args['user_id']).first()
      if user and user_img and allowed_file(user_img.filename):
         path = FOLDER+'/'+args['user_id']+'.'+get_extension(user_img.filename)
         user_img.save(path)
         user.user_img_file = args['user_id']+'.'+get_extension(user_img.filename)
         db.session.add(user)
         db.session.commit()
         return {'message': 'User img successfully added'}, 201
      return {'error': 'Unsuccessful img upload'}, 400

class DeleteUser(Resource):
   def delete(self, user_id):
      user = UserModel.query.filter_by(user_id=user_id).first()
      if not user:
         return {'message': 'No user found'}
      db.session.delete(user)
      db.session.commit()
      return {'message': 'User successfully deleted'}, 200