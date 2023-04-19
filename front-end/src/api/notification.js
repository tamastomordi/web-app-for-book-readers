import axios from './axios';

export const getAllNotifications = async () => {
   const response = await axios
      .get('/get/notifications/all')
      .catch((error) => console.log(error));
   return response.data;
};

export const getNewNotifications = async () => {
   const response = await axios
      .get('/get/notifications/active')
      .catch((error) => console.log(error));
   return response.data;
};

export const deactivateNotification = async (notificationId) => {
   const response = await axios
      .put('/deactivate/notification', {
         notification_id: notificationId
      })
      .catch((error) => console.log(error));
   return response.data;
};
