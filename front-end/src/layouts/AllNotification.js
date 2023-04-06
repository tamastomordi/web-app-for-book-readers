import { getAllNotifications } from '../api/notification';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { notificationsState } from '../recoil/atoms/Notification';
import { useEffect } from 'react';

const AllNotifications = () => {
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
         {notifications.map((notification) => {
            return <Notification notification={notification} />;
         })}
      </div>
   );
};

export default AllNotifications;
