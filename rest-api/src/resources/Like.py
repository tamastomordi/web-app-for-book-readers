from flask_restful import Resource, reqparse
from ..models.LikeModel import LikeModel
from ..schemas.LikeSchema import like_schema, likes_schema
from ..common.extensions import db

class Like(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('user_id')
      super(Like, self).__init__()
   
   def post(self):
      args = self.reqparse.parse_args()
      like = LikeModel.query.filter_by(book_id=args['book_id'], user_id=args['user_id']).first()
      if like:
         return {'error': 'Review already exists'}, 400
      like = LikeModel(book_id=args['book_id'], user_id=args['user_id'])
      db.session.add(like)
      db.session.commit()
      return {'message': 'Book successfully liked'}, 201

class Dislike(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('user_id')
      super(Dislike, self).__init__()

   def delete(self):
      args = self.reqparse.parse_args()
      like = LikeModel.query.filter_by(user_id=args['user_id'], book_id=args['book_id']).first()
      if not like:
         return {'message': 'No like found'}, 400
      db.session.delete(like)
      db.session.commit()
      return {'message': 'Book successfully disliked'}, 200

class GetNumberOfLikes(Resource):
   def get(self, book_id):
      count = LikeModel.query.filter_by(book_id=book_id).count()
      return {'numberOfLikes': count}, 200