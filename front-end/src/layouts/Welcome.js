import { Link } from 'react-router-dom';

const Welcome = ({ userId, username }) => {
   return (
      <div className="Welcome">
         <h1>
            Üdvözlünk újra itt, <Link to={'/user/' + userId}>{username}</Link>!
         </h1>
      </div>
   );
};

export default Welcome;
