import calculateTime from '../utils/calculateTime';
import { markNotificationAsRead } from '../api/notification';

const Notification = ({ notification }) => {
   const onCloseClick = () => {
      markNotificationAsRead(notification.notification_id)
         .then((data) => console.log(data))
         .catch((error) => console.log(error));
   };

   return (
      <div className="Notification">
         <div className="header">
            <p className="title">{notification.title}</p>
            <p className="time">{calculateTime(notification.datetime)}</p>
            <span className="close" onClick={onCloseClick}>
               &times;
            </span>
         </div>
         <p className="text">{notification.text}</p>
      </div>
   );
};

export default Notification;
