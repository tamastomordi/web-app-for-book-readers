from flask import request, current_app
from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

from ..common.extensions import api, db
from ..models.UserModel import UserModel

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
         return 'Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}

      user = UserModel.query.filter_by(username=auth.username).first()

      if not user:
         return 'Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}

      if check_password_hash(user.password_hash, auth.password):
         date = datetime.datetime.utcnow() + datetime.timedelta(minutes=30);
         token = jwt.encode({'user_id': user.user_id, 'exp': date}, current_app.config['SECRET_KEY'])
         header = {'Set-Cookie': 'token='+token+'; HttpOnly; Expires='+str(date)}
         return {'message': 'Login successful'}, 200, header

      return 'Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}