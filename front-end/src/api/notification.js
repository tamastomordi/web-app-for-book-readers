import axios from './axios';

export const getAllNotifications = async () => {
   const response = await axios
      .get('/get/all/notifications')
      .catch((error) => console.log(error));
   return response.data;
};

export const getNewNotifications = async () => {
   const response = await axios
      .get('/get/new/notifications')
      .catch((error) => console.log(error));
   return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
   const response = await axios
      .put('/mark/notification/' + notificationId)
      .catch((error) => console.log(error));
   return response.data;
};
