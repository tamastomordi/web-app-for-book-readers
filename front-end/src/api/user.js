import axios from './axios';

export const getUser = async (userId) => {
   const response = await axios
      .get('/get/user/' + userId)
      .catch((error) => console.log(error));
   return response.data;
};
