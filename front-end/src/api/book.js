import axios from './axios';

export const getBook = async (bookId) => {
   const response = await axios.get('/get/book/' + bookId).catch((error) => {
      console.log(error);
   });
   return response.data;
};

export const getCoverImg = async (bookId) => {
   const response = await axios
      .get('/get/book/cover_img/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const like = async (bookId) => {
   const response = await axios
      .post('/like', {
         book_id: bookId
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const dislike = async (bookId) => {
   const response = await axios
      .delete('/dislike/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const getNumberOfLikes = async (bookId) => {
   const response = await axios
      .get('/get/likes/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const isLiked = async (bookId) => {
   const response = await axios
      .get('/isliked/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const isReading = async (bookId) => {
   const response = await axios
      .get('/isreading/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const getReview = async (bookId) => {
   const response = await axios
      .get('/get/review/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const addBook = async ({ authorId, title, subtitle, description }) => {
   const response = await axios
      .post('/add/book', {
         author_id: authorId,
         title: title,
         subtitle: subtitle,
         description: description
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const uploadCoverImage = async (formData) => {
   const response = await axios
      .post('/upload/book/cover_img', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
      .catch((error) => console.log(error));
   return response.data;
};

export const deleteBook = async (bookId) => {
   const response = await axios
      .delete('/delete/book/' + bookId)
      .catch((error) => console.log(error));
   return response.data;
};

export const approveBook = async (bookId) => {
   const response = await axios
      .put('/approve/book', {
         book_id: bookId
      })
      .catch((error) => console.log(error));
   return response.data;
};
