import os
from dotenv import load_dotenv
from flask import Flask
from .common.extensions import api, db, ma, cors

from .resources.Auth import Login, Signup, Me
from .resources.User import GetUsers, GetUserById, GetUserByUsername, GetUserByEmail, GetUserImg, UploadUserImg
from .resources.Book import GetBooks, GetBookById, GetCoverImg, UploadCoverImg, GetBooksLikedByUser, AddBook, GetBooksByAuthor
from .resources.Author import GetAuthors, GetAuthor, GetAuthorImg, AddAuthor, UploadAuthorImg
from .resources.Friendship import GetFriendship, RequestFriendship, ConfirmFriendship
from .resources.Review import GetReviews, GetReview, GetReviewsByBookId, GetReviewsByUserId, AddReview, IsReviewed
from .resources.Reading import GetReadings, GetReading, GetReadingsByUserId, GetReadingsByBookId, AddReading, IsReading, EndReading
from .resources.Like import Like, Dislike, GetNumberOfLikes, IsLiked

load_dotenv()

def create_app():
   app = Flask(__name__)
   app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
   app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')

   api.add_resource(Login, "/auth/login")
   api.add_resource(Signup, "/auth/signup")
   api.add_resource(Me, '/auth/me')

   api.add_resource(GetUsers, "/get/users")
   api.add_resource(GetUserById, "/get/user/<user_id>")
   api.add_resource(GetUserByUsername, "/get/user/username/<username>")
   api.add_resource(GetUserByEmail, "/get/user/email/<email>")
   api.add_resource(GetUserImg, "/get/user/user_img/<user_id>")
   api.add_resource(UploadUserImg, "/upload/user/user_img")

   api.add_resource(GetBooks, "/get/books")
   api.add_resource(GetBooksByAuthor, "/get/books/author/<author_id>")
   api.add_resource(GetBookById, "/get/book/<book_id>")
   api.add_resource(GetCoverImg, "/get/book/cover_img/<book_id>")
   api.add_resource(UploadCoverImg, "/upload/book/cover_img")
   api.add_resource(GetBooksLikedByUser, "/get/liked_books/<user_id>")
   api.add_resource(AddBook, "/add/book")

   api.add_resource(GetAuthors, "/get/authors")
   api.add_resource(GetAuthor, "/get/author/<author_id>")
   api.add_resource(GetAuthorImg, "/get/author/img/<author_id>")
   api.add_resource(AddAuthor, "/add/author")
   api.add_resource(UploadAuthorImg, "/upload/author/img")

   api.add_resource(GetReviews, "/get/reviews")
   api.add_resource(GetReview, "/get/review/<review_id>")
   api.add_resource(GetReviewsByBookId, "/get/reviews/book_id/<book_id>")
   api.add_resource(GetReviewsByUserId, "/get/reviews/user_id/<user_id>")
   api.add_resource(AddReview, "/add/review")
   api.add_resource(IsReviewed, "/isreviewed/<book_id>")

   api.add_resource(GetReadings, "/get/readings")
   api.add_resource(GetReading, "/get/reading/<reading_id>")
   api.add_resource(GetReadingsByUserId, "/get/readings/user_id/<user_id>")
   api.add_resource(GetReadingsByBookId, "/get/readings/book_id/<book_id>")
   api.add_resource(AddReading, "/add/reading")
   api.add_resource(EndReading, "/end/reading")
   api.add_resource(IsReading, "/isreading/<book_id>")


   api.add_resource(Like, "/like")
   api.add_resource(Dislike, "/dislike/<book_id>")
   api.add_resource(IsLiked, "/isliked/<book_id>")
   api.add_resource(GetNumberOfLikes, "/get/likes/<book_id>")

   api.add_resource(GetFriendship, "/get/friendship/<friendship_id>")
   api.add_resource(RequestFriendship, "/request/friendship")
   api.add_resource(ConfirmFriendship, "/confirm/friendship")

   api.init_app(app)
   db.init_app(app)
   ma.init_app(app)
   cors.init_app(app, supports_credentials=True)

   return app