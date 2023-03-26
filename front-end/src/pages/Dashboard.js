import { useRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import Welcome from '../layouts/Welcome';
import '../styles/pages/Dashboard.scss';

const Dashboard = () => {
   const [auth, setAuth] = useRecoilState(authState);

   return (
      <div className="Dashboard">
         <div className="container">
            <div className="card -wide">
               <Welcome username={auth.user.username} />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
