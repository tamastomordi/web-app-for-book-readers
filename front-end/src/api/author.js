import axios from './axios';

export const getAuthor = async (authorId) => {
   const response = await axios
      .get('/get/author/' + authorId)
      .catch((error) => console.log(error));
   return response.data;
};

export const getAuthorImg = async (authorId) => {
   const response = await axios
      .get('/get/author/img/' + authorId)
      .catch((error) => console.log(error));
   return response.data;
};

export const getAuthors = async (searchTerm) => {
   const response = await axios
      .get('/get/authors', { params: { searchTerm: searchTerm } })
      .catch((error) => console.log(error));
   return response.data;
};

export const addAuthor = async ({
   name,
   birth_date,
   death_date,
   description
}) => {
   const response = await axios
      .post('/add/author', {
         name: name,
         birth_date: birth_date,
         death_date: death_date,
         description: description
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const uploadAuthorImage = async (formData) => {
   const response = await axios
      .post('/upload/author/img', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const deleteAuthor = async (authorId) => {
   const response = await axios
      .delete('/delete/author/' + authorId)
      .catch((error) => console.log(error));
   return response.data;
};
