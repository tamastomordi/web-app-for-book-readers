import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import Welcome from '../layouts/Welcome';
import '../styles/pages/Dashboard.scss';
import Stats from '../layouts/Stats';
import NewNotificationList from '../layouts/NewNotificationList';
import { useNavigate } from 'react-router-dom';
import { readingListState } from '../recoil/atoms/User';
import { useEffect } from 'react';
import { getFriendsActiveReadings } from '../api/reading';
import ReadingList from '../layouts/ReadingList';

const Dashboard = () => {
   const auth = useRecoilValue(authState);
   const [friendsReadings, setFriendsReadings] =
      useRecoilState(readingListState);
   const navigate = useNavigate();

   useEffect(() => {
      getFriendsActiveReadings()
         .then((data) => setFriendsReadings(data.readings))
         .catch((error) => console.log(error));
   }, [setFriendsReadings]);

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
               <h2>Ezeket olvassák a barátaid</h2>
               <ReadingList readings={friendsReadings} showUser={true} />
               <NewNotificationList />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
