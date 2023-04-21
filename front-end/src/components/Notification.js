import calculateTime from '../utils/calculateTime';
import '../styles/components/Notification.scss';
import IconButton from './IconButton';
import { AiFillEye } from 'react-icons/ai';
import { BiCheck } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import {
   deactivateNotification,
   deleteNotification
} from '../api/notification';
import { confirmFriendship, deleteFriendship } from '../api/friendship';

const Notification = ({ notification }) => {
   const onNotificationClick = () => {
      deactivateNotification(notification.notification_id)
         .then((data) => console.log(data))
         .catch((error) => console.log(error));
   };

   const approveFship = () => {
      confirmFriendship(notification.user.user_id)
         .then((data) => {
            console.log(data);
            deactivateNotification(notification.notification_id)
               .then((data) => console.log(data))
               .catch((error) => console.log(error));
         })
         .catch((error) => console.log(error));
   };

   const deleteFship = () => {
      deleteFriendship(notification.user.user_id)
         .then((data) => {
            console.log(data);
            deleteNotification(notification.notification_id)
               .then((data) => console.log(data))
               .catch((error) => console.log(error));
         })
         .catch((error) => console.log(error));
   };

   return (
      <div className="Notification">
         <div className="details">
            <p className="title">{notification.title}</p>
            <p className="datetime">{calculateTime(notification.datetime)}</p>
            <p className="text">{notification.text}</p>
         </div>
         {notification.notification_type === 'request' && (
            <IconButton icon={<BiCheck />} onClick={approveFship} />
         )}
         {notification.notification_type === 'request' && (
            <IconButton icon={<IoClose />} onClick={deleteFship} />
         )}
         {notification.notification_type !== 'request' && (
            <IconButton icon={<AiFillEye />} onClick={onNotificationClick} />
         )}
      </div>
   );
};

export default Notification;
