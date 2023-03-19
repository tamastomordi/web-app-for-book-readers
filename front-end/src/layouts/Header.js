import { Link } from 'react-router-dom';
import { ImBooks } from 'react-icons/im';
import '../styles/layouts/Header.scss';

const Header = () => {
   return (
      <div className="Header">
         <div className="container">
            <div className="flex">
               <Link className="logo" to="/home">
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
