from flask import Flask
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:ABC123@localhost/web_app_for_book_readers_db"

api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

class UserModel(db.Model):
   __tablename__ = "user_"
   id = db.Column('user_id_', db.Integer, primary_key=True)
   username = db.Column('username_', db.String(50))
   email = db.Column('email_', db.String(255))
   password = db.Column('password_', db.Text)

class UserSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = UserModel

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class User(Resource):
   def get(self):
      users = UserModel.query.all()
      result = users_schema.dump(users)
      return result, 200

api.add_resource(User, "/users")

if __name__ == "__main__":
   app.run(debug=True)