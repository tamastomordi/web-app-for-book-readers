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

export const endReading = async (bookId, end) => {
   const response = await axios
      .put('/end/reading', {
         book_id: bookId,
         end: end
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const getReadings = async (userId) => {
   const response = await axios
      .get('/get/readings/user_id/' + userId)
      .catch((error) => console.log(error));
   return response.data;
};
