from flask import request, current_app
from flask_restful import Resource
from werkzeug.security import check_password_hash
import jwt
import datetime

from ..extensions import api, db
from ..models.UserModel import UserModel

class Login(Resource):
   def get(self):
      auth = request.authorization
   
      if not auth or not auth.username or not auth.password:
         return 'Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}

      user = UserModel.query.filter_by(username=auth.username).first()

      if not user:
         return 'Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}

      if check_password_hash(user.password_hash, auth.password):
         token = jwt.encode({'user_id': user.user_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])
         return {'token': token}
      
      return 'Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}