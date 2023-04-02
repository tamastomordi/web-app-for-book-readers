import { Link } from 'react-router-dom';

const Book = ({ book }) => {
   return (
      <Link className="book-item" to={'/book/' + book.book_id}>
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
};

export default Book;
