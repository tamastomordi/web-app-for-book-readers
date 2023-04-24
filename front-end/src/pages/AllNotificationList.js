import { getAllNotifications } from '../api/notification';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { notificationsState } from '../recoil/atoms/Notification';
import { useEffect } from 'react';
import Notification from '../components/Notification';

const AllNotificationList = () => {
   const [notifications, setNotifications] = useRecoilState(notificationsState);
   const resetNotifications = useResetRecoilState(notificationsState);

   useEffect(() => {
      getAllNotifications()
         .then((data) => setNotifications(data.notifications))
         .catch((error) => console.log(error));
      return () => resetNotifications();
   }, [setNotifications, resetNotifications]);

   return (
      <div className="AllNotifications">
         <div className="container">
            <div className="card -wide">
               <h2>Összes korábbi értesítésed</h2>
               {notifications.map((notification) => {
                  return (
                     <Notification
                        notification={notification}
                        disabled={true}
                     />
                  );
               })}
               {notifications.length === 0 && (
                  <p>Nincs megjeleníthető értesítés</p>
               )}
            </div>
         </div>
      </div>
   );
};

export default AllNotificationList;
