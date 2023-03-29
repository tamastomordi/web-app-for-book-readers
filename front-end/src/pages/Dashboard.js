import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/Auth';
import Welcome from '../layouts/Welcome';
import '../styles/pages/Dashboard.scss';
import BookList from '../layouts/BookList';
import { bookListState } from '../recoil/atoms/BookList';
import { useEffect } from 'react';
import { getBooks } from '../api/bookList';
import { useRecoilState } from 'recoil';
import Stats from '../layouts/Stats';

const Dashboard = () => {
   const auth = useRecoilValue(authState);
   const [bookList, setBookList] = useRecoilState(bookListState);

   useEffect(() => {
      getBooks()
         .then((data) => setBookList(data.books))
         .catch((error) => console.log(error));
   }, [setBookList]);

   return (
      <div className="Dashboard">
         <div className="container">
            <div className="card -wide">
               <Welcome username={auth.user.username} />
               <Stats />
               <BookList bookList={bookList} />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
