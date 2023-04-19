import axios from './axios';

export const checkIfEmailExists = async (email) => {
   const response = await axios
      .get('/get/user/email/' + email)
      .catch((error) => console.log(error));
   if (response.data.user.user_id) return true;
   return false;
};

export const checkIfUsernameExists = async (username) => {
   const response = await axios
      .get('/get/user/username/' + username)
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
   return response.data.message;
};

export const login = async (username, password) => {
   const response = await axios.post(
      '/auth/login',
      {},
      {
         auth: { username: username, password: password }
      }
   );
   return response.data.user;
};

export const me = async () => {
   const response = await axios.get('/auth/me');
   return response.data.user;
};

export const logout = async () => {
   const response = await axios.get('/auth/logout');
   return response.data;
};
