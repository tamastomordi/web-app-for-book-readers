import { useEffect } from 'react';
import { getBook, getCoverImg } from '../api/book';
import { useParams, Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useRecoilState } from 'recoil';
import { bookState, authorsState, coverImgState } from '../recoil/atoms/Book';
import IconButton from '../components/IconButton';
import '../styles/pages/Book.scss';
import { FaHeart } from 'react-icons/fa';
import { BsBookmarkPlusFill, BsStarFill } from 'react-icons/bs';
import Stamp from '../components/Stamp';

const Book = () => {
   const { bookId } = useParams();
   let [book, setBook] = useRecoilState(bookState);
   let [authors, setAuthors] = useRecoilState(authorsState);
   let [coverImg, setCoverImg] = useRecoilState(coverImgState);

   useEffect(() => {
      getBook(bookId)
         .then((data) => {
            setBook(data.book);
            setAuthors(data.authors);
         })
         .catch((error) => {
            console.log(error);
         });
      getCoverImg(bookId).then((data) => {
         let coverImg = Buffer.from(data, 'binary').toString('base64');
         setCoverImg(coverImg);
      });
   }, []);

   if (!book) return <p>Loading...</p>;

   return (
      <div className="Book">
         <div className="container">
            <div className="card -wide">
               <div className="flex">
                  {coverImg ? (
                     <img
                        className="cover-img"
                        alt="Borítókép"
                        src={`data:;base64,${coverImg}`}
                     />
                  ) : (
                     ''
                  )}
                  <div className="details">
                     <h2>
                        <Link to="/author" className="author">
                           {authors[0].name}:
                        </Link>
                        <span className="title"> {book.title}</span>
                        <Stamp
                           className="rating-stamp"
                           icon={<BsStarFill />}
                           text="4.23"
                        />
                        <Stamp
                           className="likes-stamp"
                           icon={<FaHeart />}
                           text="15"
                        />
                     </h2>
                     <p>{book.subtitle}</p>
                     <p>{book.description}</p>
                     <div className="panel">
                        <IconButton
                           className="read"
                           text="Új olvasás"
                           icon={<BsBookmarkPlusFill />}
                        ></IconButton>
                        <IconButton
                           className="like"
                           text="Kedvelés"
                           icon={<FaHeart />}
                        ></IconButton>
                        <IconButton
                           className="rate"
                           text="Értékelés"
                           icon={<BsStarFill />}
                        ></IconButton>
                     </div>
                  </div>
               </div>
               <div className="ratings">
                  <h2>Értékelések</h2>
                  <div className="rating">
                     <p>
                        <b>sad_snail</b> - 2023. január 15.
                        <p>Ez az egyik kedvenc könyvem.</p>
                     </p>
                  </div>
                  <div className="rating">
                     <p>
                        <b>sad_snail</b> - 2023. január 15.
                        <p>Ez az egyik kedvenc könyvem.</p>
                     </p>
                  </div>
                  <div className="rating">
                     <p>
                        <b>sad_snail</b> - 2023. január 15.
                        <p>Ez az egyik kedvenc könyvem.</p>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Book;
