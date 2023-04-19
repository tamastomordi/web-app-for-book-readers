from flask import request, current_app
from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from ..common.auth import token_required
from ..common.extensions import api, db
from ..models.UserModel import UserModel
from ..schemas.UserSchema import user_schema

class Signup(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('username')
      self.reqparse.add_argument('email')
      self.reqparse.add_argument('password')
      super(Signup, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      hashed_password = generate_password_hash(args['password'], method='sha256')
      new_user = UserModel(username=args['username'], email=args['email'], password_hash=hashed_password)
      db.session.add(new_user)
      db.session.commit()
      return {'message': 'User successfully created'}, 201

class Login(Resource):
   def post(self):
      auth = request.authorization
      if not auth or not auth.username or not auth.password:
         return 'Could not verify', 401
      user = UserModel.query.filter_by(username=auth.username).first()
      if not user:
         return 'Could not verify', 401
      if check_password_hash(user.password_hash, auth.password):
         date = datetime.datetime.utcnow() + datetime.timedelta(minutes=30);
         token = jwt.encode({'user_id': user.user_id, 'exp': date}, current_app.config['SECRET_KEY'])
         header = {'Set-Cookie': 'token='+token+'; HttpOnly; Expires='+str(date)+'; Path=/'}
         user = user_schema.dump(user)
         return {'user': user}, 200, header
      return 'Could not verify', 401

class Me(Resource):
   @token_required
   def get(current_user, self):
      result = user_schema.dump(current_user)
      return {'user': result}, 200

class Logout(Resource):
   @token_required
   def get(current_user, self):
      header = {'Set-Cookie': 'token=; HttpOnly; Expires=0; Path=/'}
      return {'message': "Successful signout"}, 200, header