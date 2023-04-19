import calculateTime from '../utils/calculateTime';
import '../styles/components/Notification.scss';
import IconButton from './IconButton';
import { AiFillEye } from 'react-icons/ai';
import { deactivateNotification } from '../api/notification';

const Notification = ({ notification }) => {
   const onNotificationClick = () => {
      deactivateNotification(notification.notification_id)
         .then((data) => console.log(data))
         .catch((error) => console.log(error));
   };

   return (
      <div className="Notification">
         <div className="details">
            <p className="title">{notification.title}</p>
            <p className="datetime">{calculateTime(notification.datetime)}</p>
            <p className="text">{notification.text}</p>
         </div>
         <IconButton icon={<AiFillEye />} onClick={onNotificationClick} />
      </div>
   );
};

export default Notification;
