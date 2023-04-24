import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Book from './pages/Book';
import { authState, loginTimeState } from './recoil/atoms/Auth';
import { me } from './api/auth';
import { useState } from 'react';
import './styles/_reset.scss';
import './styles/_global.scss';
import RedirectRoute from './layouts/RedirectRoute';
import Author from './pages/Author';
import User from './pages/User';
import Header from './layouts/Header';
import BookSearch from './pages/BookSearch';
import Readings from './pages/Readings';
import AddBook from './pages/AddBook';
import AddAuthor from './pages/AddAuthor';
import Admin from './pages/Admin';
import AlertModal from './layouts/modals/AlertModal';

const App = () => {
   const [auth, setAuth] = useRecoilState(authState);
   const [loginTime, setLoginTime] = useRecoilState(loginTimeState);
   const [modal, setModal] = useState(false);

   useEffect(() => {
      me()
         .then((user) => {
            setAuth({ user: user });
         })
         .catch((error) => {
            console.log(error);
         });
   }, [setAuth]);

   useEffect(() => {
      let interval = setInterval(() => {
         if (new Date() - loginTime >= 1000 * 60 * 15) {
            setModal(true);
            clearInterval(interval);
         }
      }, 5000);
      return () => clearInterval(interval);
   }, []);

   const closeModal = () => {
      setLoginTime(new Date());
      setModal(false);
   };

   return (
      <div className="App">
         <Header />
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
            <Route path="/user/:userId" element={<User />} />
            <Route path="/user/:userId/readings" element={<Readings />} />
            <Route path="/books" element={<BookSearch />} />
            <Route path="/book/add" element={<AddBook />} />
            <Route path="/author/add" element={<AddAuthor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NoPage />} />
         </Routes>
         {modal && <AlertModal onClose={closeModal} />}
      </div>
   );
};

export default App;
