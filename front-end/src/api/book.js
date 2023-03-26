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
