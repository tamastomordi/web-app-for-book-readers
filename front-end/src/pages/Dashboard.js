import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import Welcome from '../layouts/Welcome';
import '../styles/pages/Dashboard.scss';
import BookList from '../layouts/BookList';
import { bookListState } from '../recoil/atoms/BookList';
import { useEffect } from 'react';
import { getBooks } from '../api/bookList';
import Stats from '../layouts/Stats';

const Dashboard = () => {
   const auth = useRecoilValue(authState);
   const [books, setBooks] = useRecoilState(bookListState);
   let resetBooks = useResetRecoilState(bookListState);

   useEffect(() => {
      getBooks()
         .then((data) => setBooks(data.books))
         .catch((error) => console.log(error));
      return () => resetBooks();
   }, [setBooks, resetBooks]);

   return (
      <div className="Dashboard">
         <div className="container">
            <div className="card -wide">
               <Welcome username={auth.user.username} />
               <Stats />
               <BookList books={books} />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
