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
import IconButton from '../components/IconButton';
import { AiFillEdit } from 'react-icons/ai';
import { RiMessage3Fill } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import EditProfileModal from '../layouts/modals/EditProfileModal';
import { modalsState } from '../recoil/atoms/Modals';

const User = () => {
   const { userId } = useParams();
   const [user, setUser] = useRecoilState(userState);
   const [readings, setReadings] = useRecoilState(readingListState);
   const [favorites, setFavorites] = useRecoilState(favoritesState);
   const [modals, setModals] = useRecoilState(modalsState);
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
   }, [userId, setUser, setFavorites, setReadings, resetUser, modals]);

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
               <div className="flex">
                  {user.user_img && (
                     <img
                        className="user-img"
                        alt="Profilkép"
                        src={`data:;base64,${user.user_img}`}
                     />
                  )}
                  <div className="details">
                     <h2 className="username">{user.username}</h2>
                     {user.full_name && (
                        <p>
                           <span className="label">Valódi név: </span>
                           {user.full_name}
                        </p>
                     )}
                     {user.location && (
                        <p>
                           <span className="label">Lakhely: </span>
                           {user.location}
                        </p>
                     )}
                     {user.studies && (
                        <p>
                           <span className="label">Iskolák: </span>
                           {user.studies}
                        </p>
                     )}
                     {user.job && (
                        <p>
                           <span className="label">Foglalkozás: </span>
                           {user.job}
                        </p>
                     )}
                     {user.bio && (
                        <p>
                           <span className="label">Bemutatkozás:</span>
                           <br />
                           {user.bio}
                        </p>
                     )}
                     <div className="panel">
                        <IconButton
                           className="read"
                           text={'Barátnak jelölés'}
                           icon={<IoMdAddCircle />}
                        ></IconButton>
                        <IconButton
                           className="read"
                           text={'Üzenet'}
                           icon={<RiMessage3Fill />}
                        ></IconButton>
                        <IconButton
                           className="read"
                           text={'Adatok szerkesztése'}
                           icon={<AiFillEdit />}
                           onClick={() =>
                              setModals({ ...modals, showProfileModal: true })
                           }
                        ></IconButton>
                     </div>
                  </div>
               </div>

               <h2 className="section-title">Aktuális olvasások</h2>
               <ReadingList readings={readings} />
               <Link
                  className="link"
                  to={'/user/' + user.user_id + '/readings'}
               >
                  Összes olvasás megtekintése
               </Link>
               <h2 className="section-title">Kedvenc könyvek</h2>
               <BookList books={favorites} />
               <h2 className="section-title">Értékelések</h2>
            </div>
         </div>
         {modals.showProfileModal && <EditProfileModal />}
      </div>
   );
};

export default User;
