import axios from './axios';

export const getBook = async (bookId) => {
   const response = await axios.get('/get/book/' + bookId).catch((error) => {
      console.log(error);
   });
   return response.data;
};

export const getCoverImg = async (bookId) => {
   const response = await axios
      .get('/get/book/cover_img/' + bookId, {
         responseType: 'arraybuffer'
      })
      .catch((error) => {
         console.log(error);
      });
   return response.data;
};

export const like = async (bookId) => {
   const response = await axios
      .post('/like', {
         book_id: bookId
      })
      .catch((error) => {
         console.log(error);
      });
   return response.data;
};

export const dislike = async (bookId) => {
   const response = await axios.delete('/dislike/' + bookId).catch((error) => {
      console.log(error);
   });
   return response.data;
};

export const getNumberOfLikes = async (bookId) => {
   const response = await axios.get('/get/likes/' + bookId).catch((error) => {
      console.log(error);
   });
   return response.data;
};

export const isLiked = async (bookId) => {
   const response = await axios.get('/isliked/' + bookId).catch((error) => {
      console.log(error);
   });
   return response.data;
};
