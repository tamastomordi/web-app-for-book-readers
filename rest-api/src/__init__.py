import os
from dotenv import load_dotenv
from flask import Flask

from .common.extensions import api, db, ma
from .resources.User import User, UserList
from .resources.Login import Login

load_dotenv()

def create_app():
   app = Flask(__name__)
   app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
   app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')

   api.add_resource(UserList, "/users")
   api.add_resource(User, "/users/<user_id>")
   api.add_resource(Login, "/login")

   api.init_app(app)
   db.init_app(app)
   ma.init_app(app)

   return app