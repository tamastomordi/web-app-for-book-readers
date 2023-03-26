from flask_restful import Resource, reqparse
from ..models.ReviewModel import ReviewModel
from ..schemas.ReviewSchema import review_schema, reviews_schema
from ..common.extensions import db

class GetReviews(Resource):
   def get(self):
      reviews = ReviewModel.query.all()
      results = reviews_schema.dump(reviews)
      return {'reviews': results}, 200

class GetReview(Resource):
   def get(self, review_id):
      review = ReviewModel.query.filter_by(review_id=review_id).first()
      result = review_schema.dump(review)
      return {'review': result}, 200

class GetReviewsByBookId(Resource):
   def get(self, book_id):
      reviews = ReviewModel.query.filter_by(book_id=book_id)
      results = reviews_schema.dump(reviews)
      return {'reviews': results}, 200

class GetReviewsByUserId(Resource):
   def get(self, user_id):
      reviews = ReviewModel.query.filter_by(user_id=user_id)
      results = reviews_schema.dump(reviews)
      return {'reviews': results}, 200

class AddReview(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('user_id')
      self.reqparse.add_argument('rating')
      self.reqparse.add_argument('review_text')
      self.reqparse.add_argument('datetime')
      super(AddReview, self).__init__()

   def post(self):
      args = self.reqparse.parse_args()
      review = ReviewModel.query.filter_by(book_id=args['book_id'], user_id=args['user_id']).first()
      if review:
         return {'error': 'Review already exists'}, 400
      review = ReadingModel(book_id=args['book_id'], user_id=args['user_id'], rating=args['rating'], review_text=args['review_text'], datetime=args['datetime'])
      db.session.add(review)
      db.session.commit()
      return {'message': 'Review successfully added'}, 201

