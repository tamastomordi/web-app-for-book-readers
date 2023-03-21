import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState } from '../recoil/atoms/Auth';
import { me } from '../api/auth';
import Welcome from '../layouts/Welcome';

const Dashboard = () => {
   const [auth, setAuth] = useRecoilState(authState);
   const navigate = useNavigate();

   if (!auth.user) return <div>Loading...</div>;

   return (
      <div className="Dashboard">
         <Welcome username={auth.user.username} />
      </div>
   );
};

export default Dashboard;
