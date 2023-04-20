import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoverImg } from '../api/book';

const Book = ({ book }) => {
   let [image, setImage] = useState(null);

   useEffect(() => {
      getCoverImg(book.book_id)
         .then((data) => {
            setImage(data);
         })
         .catch((error) => console.log(error));
   }, [book.book_id]);

   return (
      <Link className="book-item" to={'/book/' + book.book_id}>
         <img
            className="cover-img"
            alt="Borítókép"
            src={`data:image/*;base64,${image}`}
         />
         <div className="top">
            <p>{book.author.name}: </p>
            <p>{book.title}</p>
         </div>
      </Link>
   );
};

export default Book;
