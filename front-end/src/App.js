import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Book from './pages/Book';
import { authState } from './recoil/atoms/Auth';
import { me } from './api/auth';
import './styles/_reset.scss';
import './styles/_global.scss';
import RedirectRoute from './layouts/RedirectRoute';
import Author from './pages/Author';

const App = () => {
   const [auth, setAuth] = useRecoilState(authState);

   useEffect(() => {
      me()
         .then((user) => {
            setAuth({ user: user });
         })
         .catch((error) => {
            console.log(error);
         });
   }, [setAuth]);

   return (
      <div className="App">
         <Routes>
            <Route
               path="/"
               element={
                  <RedirectRoute condition={auth.user} to="/home">
                     <Navigate to="/dashboard" />
                  </RedirectRoute>
               }
            />
            <Route
               path="/home"
               element={
                  <RedirectRoute condition={!auth.user} to="/dashboard">
                     <Home />
                  </RedirectRoute>
               }
            />
            <Route
               path="/dashboard"
               element={
                  <RedirectRoute condition={auth.user} to="/home">
                     <Dashboard />
                  </RedirectRoute>
               }
            />
            <Route
               path="/auth/signup"
               element={
                  <RedirectRoute condition={!auth.user} to="/dashboard">
                     <Signup />
                  </RedirectRoute>
               }
            />
            <Route
               path="/auth/login"
               element={
                  <RedirectRoute condition={!auth.user} to="/dashboard">
                     <Login />
                  </RedirectRoute>
               }
            />
            <Route path="/book/:bookId" element={<Book />} />
            <Route path="/author/:authorId" element={<Author />} />
            <Route path="*" element={<NoPage />} />
         </Routes>
      </div>
   );
};

export default App;
