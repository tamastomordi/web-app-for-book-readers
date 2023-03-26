from flask_restful import Resource, reqparse
from ..models.LikeModel import LikeModel
from ..schemas.LikeSchema import like_schema, likes_schema
from ..common.extensions import db
from ..common.auth import token_required

class Like(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      super(Like, self).__init__()
   
   @token_required
   def post(current_user, self):
      args = self.reqparse.parse_args()
      like = LikeModel.query.filter_by(book_id=args['book_id'], user_id=current_user.user_id).first()
      if like:
         return {'error': 'Review already exists'}, 400
      like = LikeModel(book_id=args['book_id'], user_id=current_user.user_id)
      db.session.add(like)
      db.session.commit()
      return {'message': 'Book successfully liked'}, 201

class Dislike(Resource):
   @token_required
   def delete(current_user, self, book_id):
      like = LikeModel.query.filter_by(user_id=current_user.user_id, book_id=book_id).first()
      if not like:
         return {'message': 'No like found'}, 400
      db.session.delete(like)
      db.session.commit()
      return {'message': 'Book successfully disliked'}, 200

class IsLiked(Resource):   
   @token_required
   def get(current_user, self, book_id):
      like = LikeModel.query.filter_by(user_id=current_user.user_id, book_id=book_id).first()
      if like:
         return {'liked': True}, 200
      else:
         return {'liked': False}, 200

class GetNumberOfLikes(Resource):
   def get(self, book_id):
      count = LikeModel.query.filter_by(book_id=book_id).count()
      return {'numberOfLikes': count}, 200