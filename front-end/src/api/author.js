import axios from './axios';

export const getAuthor = async (authorId) => {
   const response = await axios
      .get('/get/author/' + authorId)
      .catch((error) => console.log(error));
   return response.data;
};

export const getAuthorImg = async (authorId) => {
   const response = await axios
      .get('/get/author/img/' + authorId, {
         responseType: 'arraybuffer'
      })
      .catch((error) => console.log(error));
   return response.data;
};
