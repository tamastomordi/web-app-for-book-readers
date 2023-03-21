import { Link } from 'react-router-dom';
import { ImBooks } from 'react-icons/im';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import '../styles/layouts/Header.scss';

const Header = () => {
   const auth = useRecoilValue(authState);

   return (
      <div className="Header">
         <div className="container">
            <div className="flex">
               <Link className="logo" to={auth.user ? '/dashboard' : '/home'}>
                  <ImBooks className="icon" />
                  <p>Könyvek.</p>
               </Link>
               <nav>
                  <ul>
                     <li>
                        <Link to="/auth/login">Bejelentkezés</Link>
                     </li>
                     <li>
                        <Link to="/auth/signup">Regisztráció</Link>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </div>
   );
};

export default Header;
