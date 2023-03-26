import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ condition, to, children }) => {
   if (!condition) {
      return <Navigate to={to} replace />;
   }

   return children;
};

export default RedirectRoute;
