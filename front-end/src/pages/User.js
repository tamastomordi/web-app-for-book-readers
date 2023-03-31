import { useEffect } from 'react';
import { getUser } from '../api/user';
import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState, readingsState, favoritesState } from '../recoil/atoms/User';
import BookList from '../layouts/BookList';
import { PulseLoader } from 'react-spinners';
import '../styles/pages/User.scss';

const User = () => {
   const { userId } = useParams();
   const [user, setUser] = useRecoilState(userState);
   const [readings, setReadings] = useRecoilState(readingsState);
   const [favorites, setFavorites] = useRecoilState(favoritesState);
   const resetUser = useResetRecoilState(userState);

   useEffect(() => {
      getUser(userId)
         .then((data) => {
            console.log(data);
            setUser(data.user);
            setFavorites(data.favorites);
         })
         .catch((error) => console.log(error));
      return () => resetUser;
   }, [userId, setUser, setFavorites]);

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
               <h3>Kedvenc könyvek</h3>
               <BookList bookList={favorites} />
               <h3>Értékelések</h3>
            </div>
         </div>
      </div>
   );
};

export default User;
