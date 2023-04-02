import { useEffect } from 'react';
import { getUser } from '../api/user';
import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
   userState,
   favoritesState,
   readingListState
} from '../recoil/atoms/User';
import BookList from '../layouts/BookList';
import { PulseLoader } from 'react-spinners';
import '../styles/pages/User.scss';
import ReadingList from '../layouts/ReadingList';

const User = () => {
   const { userId } = useParams();
   const [user, setUser] = useRecoilState(userState);
   const [readings, setReadings] = useRecoilState(readingListState);
   const [favorites, setFavorites] = useRecoilState(favoritesState);
   const resetUser = useResetRecoilState(userState);

   useEffect(() => {
      getUser(userId)
         .then((data) => {
            setUser(data.user);
            setFavorites(data.favorites);
            setReadings(data.readings);
         })
         .catch((error) => console.log(error));
      return () => resetUser;
   }, [userId, setUser, setFavorites, setReadings, resetUser]);

   if (!user)
      return (
         <div className="loader">
            <PulseLoader color="rgb(20, 20, 20)" />
         </div>
      );

   return (
      <div className="User">
         <div className="container">
            <div className="card -wide">
               {user.user_img && (
                  <img
                     className="user-img"
                     alt="Profilkép"
                     src={`data:;base64,${user.user_img}`}
                  />
               )}
               <h2 className="username">{user.username}</h2>
               <h3>Aktuális olvasások</h3>
               <ReadingList readings={readings} />
               <h3>Kedvenc könyvek</h3>
               <BookList books={favorites} />
               <h3>Értékelések</h3>
            </div>
         </div>
      </div>
   );
};

export default User;
