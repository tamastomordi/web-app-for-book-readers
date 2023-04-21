import { useRecoilState, useResetRecoilState } from 'recoil';
import { bookListState } from '../recoil/atoms/BookList';
import { useEffect } from 'react';
import ApproveBook from '../layouts/ApproveBook';
import { getUnapprovedBooks } from '../api/bookList';
import '../styles/pages/Admin.scss';

const Admin = () => {
   const [books, setBooks] = useRecoilState(bookListState);
   const resetBooks = useResetRecoilState(bookListState);

   useEffect(() => {
      getUnapprovedBooks()
         .then((data) => setBooks(data.books))
         .catch((error) => console.log(error));
      return () => resetBooks();
   }, [setBooks]);

   return (
      <div className="Admin">
         <div className="container">
            <div className="card -wide">
               <h2>Könyvek elfogadása</h2>
               <div className="unapproved-books">
                  {books.map((book) => {
                     return <ApproveBook book={book} />;
                  })}
               </div>
               {books.length === 0 && <p>Nincs elfogadásra váró könyv.</p>}
            </div>
         </div>
      </div>
   );
};

export default Admin;
