import { approveBook, deleteBook } from '../api/book';
import Book from './Book';

const ApproveBook = ({ book }) => {
   const handeOnApproveClick = () => {
      approveBook(book.book_id)
         .then((data) => console.log(data))
         .catch((error) => console.log(error));
   };

   const handeOnUnapproveClick = () => {
      deleteBook(book.book_id)
         .then((data) => console.log(data))
         .catch((error) => console.log(error));
   };

   return (
      <div className="ApproveBook">
         <Book book={book} />
         <button className="button" onClick={handeOnApproveClick}>
            Elfogadás
         </button>
         <button className="button" onClick={handeOnUnapproveClick}>
            Elutasítás
         </button>
      </div>
   );
};

export default ApproveBook;
