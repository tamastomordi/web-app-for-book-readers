import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) => {
   console.log(loggedIn);

   if (!loggedIn) {
      return <Navigate to="/home" replace />;
   }

   return children;
};

export default ProtectedRoute;
