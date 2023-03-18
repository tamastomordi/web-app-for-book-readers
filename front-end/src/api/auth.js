import axios from './axios';

export const checkIfEmailExists = async (email) => {
   const response = await axios.get('/user/byemail/' + email).catch((error) => {
      console.log(error);
   });
   if (response.data.user.user_id) return true;
   return false;
};

export const checkIfUsernameExists = async (username) => {
   const response = await axios
      .get('/user/byusername/' + username)
      .catch((error) => {
         console.log(error);
      });
   if (response.data.user.user_id) return true;
   return false;
};

export const signup = async (email, username, password) => {
   const response = await axios
      .post('/auth/signup', {
         email: email,
         username: username,
         password: password
      })
      .catch((error) => {
         console.log(error);
      });
   return response.data.message;
};
