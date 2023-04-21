import axios from './axios';

export const requestFriendship = async (user_id) => {
   const response = await axios
      .post('/request/friendship', { user_id: user_id })
      .catch((error) => console.log(error));
   return response.data;
};

export const confirmFriendship = async (user_id) => {
   const response = await axios
      .put('/confirm/friendship', { user_id: user_id })
      .catch((error) => console.log(error));
   return response.data;
};

export const deleteFriendship = async (user_id) => {
   const response = await axios
      .delete('/delete/friendship/' + user_id)
      .catch((error) => console.log(error));
   return response.data;
};
