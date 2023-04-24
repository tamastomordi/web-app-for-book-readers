import '../styles/layouts/BookList.scss';
import { PulseLoader } from 'react-spinners';
import Book from './Book';

const BookList = ({ books }) => {
   if (books.length === 0) return <p>Nincs megjeleníthető könyv</p>;

   return (
      <div className="BookList">
         {books.map((book) => {
            return <Book book={book} key={book.book_id} />;
         })}
      </div>
   );
};

export default BookList;
