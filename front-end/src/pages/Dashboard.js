import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import Welcome from '../layouts/Welcome';
import '../styles/pages/Dashboard.scss';
import Stats from '../layouts/Stats';
import NewNotificationList from '../layouts/NewNotificationList';

const Dashboard = () => {
   const auth = useRecoilValue(authState);

   return (
      <div className="Dashboard">
         <div className="container">
            <div className="card -wide">
               <Welcome
                  userId={auth.user.user_id}
                  username={auth.user.username}
               />
               <Stats />
               <NewNotificationList />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
