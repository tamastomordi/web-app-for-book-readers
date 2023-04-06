import { getNewNotifications } from '../api/notification';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { notificationsState } from '../recoil/atoms/Notification';
import { useEffect } from 'react';

const NewNotifications = () => {
   const [notifications, setNotifications] = useRecoilState(notificationsState);
   const resetNotifications = useResetRecoilState(notificationsState);

   useEffect(() => {
      getNewNotifications()
         .then((data) => setNotifications(data.notifications))
         .catch((error) => console.log(error));
      return () => resetNotifications();
   }, [setNotifications, resetNotifications]);

   return (
      <div className="NewNotifications">
         {notifications.map((notification) => {
            return <Notification notification={notification} />;
         })}
      </div>
   );
};

export default NewNotifications;
