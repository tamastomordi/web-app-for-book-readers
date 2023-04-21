import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import Welcome from '../layouts/Welcome';
import '../styles/pages/Dashboard.scss';
import Stats from '../layouts/Stats';
import NewNotificationList from '../layouts/NewNotificationList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
   const auth = useRecoilValue(authState);
   const navigate = useNavigate();

   return (
      <div className="Dashboard">
         <div className="container">
            <div className="card -wide">
               {auth.user.role === '1' && (
                  <button
                     className="admin-button button"
                     onClick={() => navigate('/admin')}
                  >
                     Admin felület
                  </button>
               )}
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
