import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { bookListState, searchTermState } from '../recoil/atoms/BookList';
import { useEffect } from 'react';
import BookList from '../layouts/BookList';
import { getBooks } from '../api/bookList';
import Search from '../layouts/Search';

const BookSearch = () => {
   const [books, setBooks] = useRecoilState(bookListState);
   const searchTerm = useRecoilValue(searchTermState);
   const resetBooks = useResetRecoilState(bookListState);

   useEffect(() => {
      let getData = setTimeout(() => {
         getBooks(searchTerm.toLowerCase())
            .then((data) => setBooks(data.books))
            .catch((error) => console.log(error));
      }, 1000);
      return () => clearTimeout(getData);
   }, [searchTerm, setBooks]);

   return (
      <div className="BookSearch">
         <div className="container">
            <div className="card -wide">
               <Search />
               <BookList books={books} />
            </div>
         </div>
      </div>
   );
};

export default BookSearch;
