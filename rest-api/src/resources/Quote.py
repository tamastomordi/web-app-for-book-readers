from flask_restful import Resource, reqparse
from ..models.QuoteModel import QuoteModel
from ..schemas.QuoteSchema import quotes_schema
from ..common.extensions import db
from ..common.auth import token_required
import random

class GetRandomQuote(Resource):
   @token_required
   def get(current_user, self):
      quotes = QuoteModel.query.all()
      quotes = quotes_schema.dump(quotes)      
      result = random.choice(quotes)
      return {'quote': result}, 200