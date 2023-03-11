from ..common.extensions import ma
from ..models.AuthorModel import AuthorModel

class AuthorSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = AuthorModel

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)