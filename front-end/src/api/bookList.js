import axios from './axios';

export const getBooks = async () => {
   const response = await axios.get('/get/books').catch((error) => {
      console.log(error);
   });
   return response.data;
};

export const getBooksByAuthor = async (authorId) => {
   const response = await axios
      .get('/get/books/author/' + authorId)
      .catch((error) => {
         console.log(error);
      });
   return response.data;
};
