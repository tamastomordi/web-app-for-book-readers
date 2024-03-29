import { authorState } from '../recoil/atoms/Author';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { getAuthor, getAuthorImg } from '../api/author';
import { useParams } from 'react-router-dom';
import '../styles/pages/Author.scss';
import { bookListState } from '../recoil/atoms/BookList';
import { getBooksByAuthor } from '../api/bookList';
import BookList from '../layouts/BookList';

const Author = () => {
   const { authorId } = useParams();
   const [author, setAuthor] = useRecoilState(authorState);
   const [bookList, setBookList] = useRecoilState(bookListState);
   const [image, setImage] = useState(null);

   useEffect(() => {
      getBooksByAuthor(authorId)
         .then((data) => setBookList(data.books))
         .catch((error) => console.log(error));
   }, [authorId, setBookList]);

   useEffect(() => {
      getAuthor(authorId)
         .then((data) => setAuthor(data.author))
         .catch((error) => console.log(error));
      getAuthorImg(authorId)
         .then((data) => setImage(data))
         .catch((error) => console.log(error));
   }, [authorId, setAuthor]);

   if (!author) return <p>Loading...</p>;

   return (
      <div className="Author">
         <div className="container">
            <div className="card -wide">
               <div className="flex">
                  <div className="details">
                     <h2>{author.name}</h2>
                     <p className="dates">
                        {new Date(author.birth_date).toLocaleDateString() +
                           ' – '}
                        {author.death_date &&
                           new Date(author.death_date).toLocaleDateString()}
                     </p>
                     <p>{author.description}</p>
                  </div>
                  {author.author_img && (
                     <img
                        className="author-img"
                        alt="Kép a szerzőről"
                        src={`data:;base64,${image}`}
                     />
                  )}
               </div>
               <h2>A szerző könyvei</h2>
               <BookList books={bookList} />
            </div>
         </div>
      </div>
   );
};

export default Author;
