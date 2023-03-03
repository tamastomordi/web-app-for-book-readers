from flask import Flask
from .extensions import api, db, ma
from .resources.User import User, UserList

def create_app():
   app = Flask(__name__)
   app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:ABC123@localhost/web_app_for_book_readers"

   api.add_resource(UserList, "/users")
   api.add_resource(User, "/users/<user_id>")

   api.init_app(app)
   db.init_app(app)
   ma.init_app(app)

   return app