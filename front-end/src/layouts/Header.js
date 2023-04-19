import { Link, useNavigate } from 'react-router-dom';
import { ImBooks } from 'react-icons/im';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import '../styles/layouts/Header.scss';
import { logout } from '../api/auth';

const Header = () => {
   const [auth, setAuth] = useRecoilState(authState);
   const navigate = useNavigate();

   const onLogoutClick = () => {
      logout()
         .then(() => {
            setAuth({ user: null });
            navigate('/home');
         })
         .catch((error) => console.log(error));
   };

   return (
      <div className="Header">
         <div className="container">
            <div className="flex">
               <Link className="logo" to={auth.user ? '/dashboard' : '/home'}>
                  <ImBooks className="icon" />
                  <p>Könyvek.</p>
               </Link>
               <nav>
                  {auth.user ? (
                     <ul>
                        <li>
                           <Link onClick={onLogoutClick}>Kijelentkezés</Link>
                        </li>
                     </ul>
                  ) : (
                     <ul>
                        <li>
                           <Link to="/auth/login">Bejelentkezés</Link>
                        </li>
                        <li>
                           <Link to="/auth/signup">Regisztráció</Link>
                        </li>
                     </ul>
                  )}
               </nav>
            </div>
         </div>
      </div>
   );
};

export default Header;
