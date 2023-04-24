import { getNewNotifications } from '../api/notification';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { notificationsState } from '../recoil/atoms/Notification';
import { useEffect, useState } from 'react';
import Notification from '../components/Notification';
import { Link } from 'react-router-dom';

const NewNotificationList = () => {
   const [notifications, setNotifications] = useRecoilState(notificationsState);
   let resetNotifications = useResetRecoilState(notificationsState);
   const [value, setValue] = useState(0);

   const useForceUpdate = () => {
      setValue(value + 1);
   };

   useEffect(() => {
      getNewNotifications()
         .then((data) => setNotifications(data.notifications))
         .catch((error) => console.log(error));
   }, [setNotifications, resetNotifications, value]);

   return (
      <div className="NewNotificationList">
         <h2>Új értesítéseid</h2>
         <div className="grid">
            {notifications.map((notification) => {
               return (
                  <Notification
                     key={notification.notification_id}
                     notification={notification}
                     refresh={useForceUpdate}
                  />
               );
            })}
         </div>
         {notifications.length === 0 && (
            <p className="empty">Nincs új értesítésed</p>
         )}
         <Link to="/notifications">
            Összes korábbi értesítés megtekintése...
         </Link>
      </div>
   );
};

export default NewNotificationList;
