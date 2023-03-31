import { Link } from 'react-router-dom';
import '../styles/layouts/BookList.scss';
import { PulseLoader } from 'react-spinners';

const BookList = ({ bookList }) => {
   if (!bookList[0])
      return (
         <div className="loader">
            <PulseLoader color="rgb(20, 20, 20)" />
         </div>
      );

   return (
      <div className="BookList">
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
