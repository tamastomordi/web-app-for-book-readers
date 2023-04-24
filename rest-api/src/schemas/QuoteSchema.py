from ..common.extensions import ma
from ..models.QuoteModel import QuoteModel

class QuoteSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = QuoteModel

quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True)