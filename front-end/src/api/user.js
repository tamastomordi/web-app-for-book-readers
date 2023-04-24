import axios from './axios';

export const getUser = async (userId) => {
   const response = await axios
      .get('/get/user/' + userId)
      .catch((error) => console.log(error));
   return response.data;
};

export const editProfile = async (profileData) => {
   const response = await axios
      .put('/edit/user', {
         full_name: profileData.full_name,
         location: profileData.location,
         studies: profileData.studies,
         job: profileData.job,
         bio: profileData.bio
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const getUserImg = async (userId) => {
   const response = await axios
      .get('/get/user/img/' + userId)
      .catch((error) => console.log(error));
   return response.data;
};

export const uploadUserImage = async (formData) => {
   const response = await axios
      .post('/upload/user/user_img', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
      .catch((error) => console.log(error));
   return response.data;
};
