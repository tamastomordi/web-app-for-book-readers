import Search from './Search';
import { Link } from 'react-router-dom';
import '../styles/layouts/BookList.scss';

const BookList = ({ bookList }) => {
   if (!bookList[0]) return <div>Loading...</div>;

   return (
      <div className="BookList">
         <div className="search">
            <Search />
         </div>
         <div className="book-list-container">
            {bookList.map((book, index) => {
               return (
                  <Link
                     className="book-item"
                     key={index}
                     to={'/book/' + book.book_id}
                  >
                     <img
                        className="cover-img"
                        alt="Borítókép"
                        src={`data:;base64,${book.cover_img}`}
                     />
                     <div className="top">
                        <p>{book.authors[0].name}: </p>
                        <p>{book.title}</p>
                     </div>
                  </Link>
               );
            })}
         </div>
      </div>
   );
};

export default BookList;
