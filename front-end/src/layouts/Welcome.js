import { Link } from 'react-router-dom';

const Welcome = ({ username }) => {
   return (
      <div className="Welcome">
         <h2>
            Üdvözöllek újra itt, <Link>{username}</Link>!
         </h2>
      </div>
   );
};

export default Welcome;
