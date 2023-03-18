import { Link } from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => {
   return (
      <div className="Header">
         <div className="container">
            <div className="flex">
               <Link className="logo" to="/home">
                  Könyvek.
               </Link>
               <nav>
                  <ul>
                     <li>
                        <Link to="/login">Bejelentkezés</Link>
                     </li>
                     <li>
                        <Link to="/signup">Regisztráció</Link>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </div>
   );
};

export default Header;
