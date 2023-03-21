import os
from dotenv import load_dotenv
from flask import Flask

from .common.extensions import api, db, ma, cors
from .resources.Auth import Login, Signup, Me
from .resources.User import UserById, UserList, UserByUsername, UserByEmail
from .resources.Book import Book, BookList
from .resources.Author import Author, AuthorList
from .resources.Friendship import Friendship, RequestFriendship, ConfirmFriendship

load_dotenv()

def create_app():
   app = Flask(__name__)
   app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
   app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')

   api.add_resource(Login, "/auth/login")
   api.add_resource(Signup, "/auth/signup")
   api.add_resource(Me, '/auth/me')

   api.add_resource(UserList, "/users")
   api.add_resource(UserById, "/users/<user_id>")
   api.add_resource(UserByUsername, "/user/byusername/<username>")
   api.add_resource(UserByEmail, "/user/byemail/<email>")

   api.add_resource(BookList, "/books")
   api.add_resource(Book, "/books/<book_id>")

   api.add_resource(AuthorList, "/authors")
   api.add_resource(Author, "/authors/<author_id>")
   
   api.add_resource(Friendship, "/friendships/<friendship_id>")
   api.add_resource(RequestFriendship, "/friendships/request")
   api.add_resource(ConfirmFriendship, "/friendships/confirm")

   api.init_app(app)
   db.init_app(app)
   ma.init_app(app)
   cors.init_app(app, supports_credentials=True)

   return app