import calculateTime from '../utils/calculateTime';
import '../styles/components/Notification.scss';
import IconButton from './IconButton';
import { AiFillEye } from 'react-icons/ai';

const Notification = ({ notification }) => {
   const onNotificationClick = () => {};

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
