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
import { Link } from 'react-router-dom';

const Notification = ({ notification, refresh, disabled }) => {
   const onNotificationClick = () => {
      deactivateNotification(notification.notification_id)
         .then((data) => refresh())
         .catch((error) => console.log(error));
   };

   const approveFship = () => {
      confirmFriendship(notification.user.user_id)
         .then((data) => {
            console.log(data);
            deactivateNotification(notification.notification_id)
               .then((data) => refresh())
               .catch((error) => console.log(error));
         })
         .catch((error) => console.log(error));
   };

   const deleteFship = () => {
      deleteFriendship(notification.user.user_id)
         .then((data) => {
            console.log(data);
            deleteNotification(notification.notification_id)
               .then((data) => refresh())
               .catch((error) => console.log(error));
         })
         .catch((error) => console.log(error));
   };

   const notificationTitle = () => {
      if (notification.notification_type === 'request') {
         return 'Jelölés';
      }
      if (notification.notification_type === 'approve') {
         return 'Jelölés';
      }
      if (
         notification.notification_type === 'start_reading' ||
         notification.notification_type === 'end_reading'
      ) {
         return 'Olvasás';
      }
   };

   const notificationText = () => {
      if (notification.notification_type === 'request') {
         return (
            <p className="text">
               <Link to={'/user/' + notification.user.user_id}>
                  {notification.user.username}
               </Link>{' '}
               barátnak jelölt. Elfogadod?
            </p>
         );
      }
      if (notification.notification_type === 'approve') {
         return (
            <p className="text">
               <Link to={'/user/' + notification.user.user_id}>
                  {notification.user.username}
               </Link>{' '}
               elfogadta a jelölésed. Mostantól barátok vagytok!
            </p>
         );
      }
      if (notification.notification_type === 'start_reading') {
         return (
            <p className="text">
               <Link to={'/user/' + notification.user.user_id}>
                  {notification.user.username}
               </Link>{' '}
               elkezdte olvasni a következő könyvet:{' '}
               <Link to={'/book/' + notification.book.book_id}>
                  {notification.book.title}
               </Link>
            </p>
         );
      }
      if (notification.notification_type === 'end_reading') {
         return (
            <p className="text">
               <Link to={'/user/' + notification.user.user_id}>
                  {notification.user.username}
               </Link>{' '}
               befejezte a következő könyvet:{' '}
               <Link to={'/book/' + notification.book.book_id}>
                  {notification.book.title}
               </Link>
            </p>
         );
      }
   };

   return (
      <div className="Notification">
         <div className="details">
            <p className="title">{notificationTitle()}</p>
            <p className="datetime">{calculateTime(notification.datetime)}</p>
            {notificationText()}
         </div>
         {notification.notification_type === 'request' && (
            <IconButton icon={<BiCheck />} onClick={approveFship} />
         )}
         {notification.notification_type === 'request' && (
            <IconButton icon={<IoClose />} onClick={deleteFship} />
         )}
         {notification.notification_type !== 'request' && (
            <IconButton
               icon={<AiFillEye />}
               disabled={disabled}
               onClick={onNotificationClick}
            />
         )}
      </div>
   );
};

export default Notification;
