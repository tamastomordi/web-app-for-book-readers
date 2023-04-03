import axios from './axios';

export const getReviews = async (bookId) => {
   const response = await axios
      .get('/get/reviews/book_id/' + bookId)
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
   return response.data;
};

export const editReview = async (bookId, rating, reviewText) => {
   const response = await axios
      .put('/edit/review', {
         book_id: bookId,
         rating,
         review_text: reviewText
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const deleteReview = async (bookId) => {
   const response = await axios
      .delete('/delete/review/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};
