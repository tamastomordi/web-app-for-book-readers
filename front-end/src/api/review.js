import axios from './axios';

export const getReviews = async (bookId) => {
   const response = await axios
      .get('/get/reviews/book_id/' + bookId)
      .catch((error) => {
         console.log(error);
      });
   return response.data;
};

export const addReview = async (bookId, rating, reviewText, datetime) => {
   const response = await axios
      .post('/add/review', {
         book_id: bookId,
         rating,
         review_text: reviewText,
         datetime
      })
      .catch((error) => {
         console.log(error);
      });
   return response.data;
};
