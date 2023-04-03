from flask_restful import Resource, reqparse
from ..models.ReviewModel import ReviewModel
from ..schemas.ReviewSchema import review_schema, reviews_schema
from ..common.extensions import db
from ..common.auth import token_required

class GetReviews(Resource):
   @token_required
   def get(current_user, self):
      reviews = ReviewModel.query.all()
      results = reviews_schema.dump(reviews)
      return {'reviews': results}, 200

class GetReviewsByBookId(Resource):
   @token_required
   def get(current_user, self, book_id):
      reviews = ReviewModel.query.filter_by(book_id=book_id)
      results = reviews_schema.dump(reviews)
      return {'reviews': results}, 200

class GetReviewsByUserId(Resource):
   @token_required
   def get(current_user, self, user_id):
      reviews = ReviewModel.query.filter_by(user_id=user_id)
      results = reviews_schema.dump(reviews)
      return {'reviews': results}, 200

class AddReview(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('rating')
      self.reqparse.add_argument('review_text')
      self.reqparse.add_argument('datetime')
      super(AddReview, self).__init__()

   @token_required
   def post(current_user, self):
      args = self.reqparse.parse_args()
      review = ReviewModel.query.filter_by(book_id=args['book_id'], user_id=current_user.user_id).first()
      if review:
         return {'error': 'Review already exists'}, 400
      review = ReviewModel(book_id=args['book_id'], user_id=current_user.user_id, rating=args['rating'], review_text=args['review_text'], datetime=args['datetime'])
      db.session.add(review)
      db.session.commit()
      review = review_schema.dump(review)
      return {'review': review}, 201

class EditReview(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('rating')
      self.reqparse.add_argument('review_text')
      super(EditReview, self).__init__()

   @token_required
   def put(current_user, self):
      args = self.reqparse.parse_args()
      review = ReviewModel.query.filter_by(book_id=args['book_id'], user_id=current_user.user_id).first()
      if review:
         review.rating = args['rating']
         review.review_text = args['review_text']
         db.session.commit()
         review = review_schema.dump(review)
         return {'review': review}, 200
      else:
         return {'error': "Review don't exists"}, 400


class GetReview(Resource):   
   @token_required
   def get(current_user, self, book_id):
      review = ReviewModel.query.filter_by(book_id=book_id, user_id=current_user.user_id).first()
      review = review_schema.dump(review)
      if review:
         return {'review': review}, 200
      else:
         return {'review': None}, 200

class DeleteReview(Resource):   
   @token_required
   def delete(current_user, self, book_id):
      review = ReviewModel.query.filter_by(book_id=book_id, user_id=current_user.user_id).first()
      if review:
         db.session.delete(review)
         db.session.commit()
         return {'message': 'Review successfully deleted'}, 200
      else:
         return {'error': "Review doesn't exist"}, 400

