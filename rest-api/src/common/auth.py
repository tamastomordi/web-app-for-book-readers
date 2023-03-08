from flask import request, current_app
from functools import wraps
import jwt

from ..models.UserModel import UserModel

def token_required(f):
   @wraps(f)
   def decorated(*args, **kwargs):
      token = None
      if 'x-access-token' in request.headers:
         token = request.headers['x-access-token']
      if not token:
         return {'message': 'Token is missing!'}, 401
      try:
         data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
         current_user = UserModel.query.filter_by(user_id=data['user_id']).first()
      except:
         return {'message': 'Token is invalid!'}, 401
      return f(current_user, *args, **kwargs)
   return decorated