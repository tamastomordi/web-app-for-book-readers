import axios from './axios';

export const getBooks = async (searchTerm) => {
   const response = await axios
      .get('/get/books', { params: { searchTerm: searchTerm } })
      .catch((error) => {
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

export const getUnapprovedBooks = async () => {
   const response = await axios.get('/get/books/unapproved').catch((error) => {
      console.log(error);
   });
   return response.data;
};
