import axios from './axios';

export const addReading = async (bookId, start) => {
   const response = await axios
      .post('/add/reading', {
         book_id: bookId,
         start: start
      })
      .catch((error) => console.log(error));
   return response.data;
};
