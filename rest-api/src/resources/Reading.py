from flask_restful import Resource, reqparse
from ..models.ReadingModel import ReadingModel
from ..schemas.ReadingSchema import reading_schema, readings_schema
from ..common.extensions import db
from ..common.auth import token_required

class GetReadings(Resource):
   def get(self):
      readings = ReadingModel.query.all()
      results = readings_schema.dump(readings)
      return {'readings': results}, 200

class GetReading(Resource):
   def get(self, reading_id):
      reading = ReadingModel.query.filter_by(reading_id=reading_id).first()
      result = reading_schema.dump(reading)
      return {'reading': result}, 200

class GetReadingsByUserId(Resource):
   def get(self, user_id):
      readings = ReadingModel.query.filter_by(user_id=user_id)
      results = readings_schema.dump(readings)
      return {'readings': results}, 200

class GetReadingsByBookId(Resource):
   def get(self, book_id):
      readings = ReadingModel.query.filter_by(book_id=book_id)
      results = readings_schema.dump(readings)
      return {'readings': results}, 200

class AddReading(Resource):
   def __init__(self):
      self.reqparse = reqparse.RequestParser()
      self.reqparse.add_argument('book_id')
      self.reqparse.add_argument('start')
      super(AddReading, self).__init__()
   
   @token_required
   def post(current_user, self):
      args = self.reqparse.parse_args()
      reading = ReadingModel(book_id=args['book_id'], user_id=current_user.user_id, start=args['start'])
      db.session.add(reading)
      db.session.commit()
      return {'message': 'Reading successfully added'}, 201