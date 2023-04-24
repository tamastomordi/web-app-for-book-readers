from ..common.extensions import db

class FriendshipModel(db.Model):
   __tablename__ = "friendship_"
   user_id_1 = db.Column('user_id_1_', db.Integer, db.ForeignKey('user_.user_id_'), primary_key=True)
   user_id_2 = db.Column('user_id_2_', db.Integer, db.ForeignKey('user_.user_id_'), primary_key=True)
   confirmed = db.Column('confirmed_', db.Boolean)
   user_1 = db.relationship('UserModel', foreign_keys=[user_id_1])
   user_2 = db.relationship('UserModel', foreign_keys=[user_id_2])