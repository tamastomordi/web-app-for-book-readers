import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Stack } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Header from './layouts/Header';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { authState } from './recoil/atoms/Auth';
import { me } from './api/auth';
import './styles/_reset.scss';
import './styles/_global.scss';
import './styles/App.scss';
import ProtectedRoute from './layouts/ProtectedRoute';

const App = () => {
   const [auth, setAuth] = useRecoilState(authState);
   const navigate = useNavigate();

   useEffect(() => {
      me()
         .then((user) => {
            setAuth({ user: user });
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <div className="App">
         <Header />
         <Routes>
            <Route
               path="/"
               element={
                  auth.user ? (
                     <Navigate to="/dashboard" />
                  ) : (
                     <Navigate to="/home" />
                  )
               }
            />
            <Route
               path="/home"
               element={auth.user ? <Navigate to="/dashboard" /> : <Home />}
            />
            <Route
               path="/dashboard"
               element={
                  <ProtectedRoute loggedIn={auth.user}>
                     <Dashboard />
                  </ProtectedRoute>
               }
            />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
         </Routes>
      </div>
   );
};

export default App;
