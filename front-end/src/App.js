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
import User from './pages/User';
import Header from './layouts/Header';
import BookSearch from './pages/BookSearch';
import Readings from './pages/Readings';
import AddBook from './pages/AddBook';
import AddAuthor from './pages/AddAuthor';
import Admin from './pages/Admin';

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
      </div>
   );
};

export default App;
