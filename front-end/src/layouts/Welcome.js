import { Link } from 'react-router-dom';

const Welcome = ({ username }) => {
   return (
      <div className="Welcome">
         <h1>
            Üdvözöllek újra itt, <Link to="/profile">{username}</Link>!
         </h1>
      </div>
   );
};

export default Welcome;
