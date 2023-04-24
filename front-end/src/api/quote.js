import axios from './axios';

export const getRandomQuote = async () => {
   const response = await axios
      .get('/get/quote')
      .catch((error) => console.log(error));
   return response.data;
};
