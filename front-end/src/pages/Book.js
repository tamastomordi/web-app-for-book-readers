import { useEffect } from 'react';
import {
   getBook,
   getCoverImg,
   isLiked,
   like,
   dislike,
   getNumberOfLikes
} from '../api/book';
import { useParams, Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useRecoilState } from 'recoil';
import {
   bookState,
   authorsState,
   coverImgState,
   likedState,
   numberOfLikesState
} from '../recoil/atoms/Book';
import IconButton from '../components/IconButton';
import '../styles/pages/Book.scss';
import { FaHeart } from 'react-icons/fa';
import { BsBookmarkPlusFill, BsStarFill } from 'react-icons/bs';
import Badge from '../components/Badge';

const Book = () => {
   const { bookId } = useParams();
   let [book, setBook] = useRecoilState(bookState);
   let [authors, setAuthors] = useRecoilState(authorsState);
   let [coverImg, setCoverImg] = useRecoilState(coverImgState);
   let [numberOfLikes, setNumberOfLikes] = useRecoilState(numberOfLikesState);
   let [liked, setLiked] = useRecoilState(likedState);

   useEffect(() => {
      getBook(bookId)
         .then((data) => {
            setBook(data.book);
            setAuthors(data.authors);
         })
         .catch((error) => {
            console.log(error);
         });
      getCoverImg(bookId)
         .then((data) => {
            let coverImg = Buffer.from(data, 'binary').toString('base64');
            setCoverImg(coverImg);
         })
         .catch((error) => {
            console.log(error);
         });
      isLiked(bookId)
         .then((data) => {
            setLiked(data.liked);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [bookId, setBook, setAuthors, setCoverImg, setLiked]);

   useEffect(() => {
      getNumberOfLikes(bookId)
         .then((data) => {
            setNumberOfLikes(data.numberOfLikes);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [bookId, setNumberOfLikes, liked]);

   const onClickLikeButton = () => {
      if (liked) {
         dislike(bookId)
            .then((data) => {
               setLiked(false);
            })
            .catch((error) => {
               console.log(error);
            });
      } else {
         like(bookId)
            .then((data) => {
               setLiked(true);
            })
            .catch((error) => {
               console.log(error);
            });
      }
   };

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
                        <Badge
                           className="rating-stamp"
                           icon={<BsStarFill />}
                           text="4.23"
                        />
                        <Badge
                           className="likes-stamp"
                           icon={<FaHeart />}
                           text={numberOfLikes}
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
                           text={liked ? 'Mégsem tetszik' : 'Kedvelés'}
                           icon={<FaHeart />}
                           onClick={onClickLikeButton}
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
                        <br />
                        Ez az egyik kedvenc könyvem.
                     </p>
                  </div>
                  <div className="rating">
                     <p>
                        <b>sad_snail</b> - 2023. január 15.
                        <br />
                        Ez az egyik kedvenc könyvem.
                     </p>
                  </div>
                  <div className="rating">
                     <p>
                        <b>sad_snail</b> - 2023. január 15.
                        <br />
                        Ez az egyik kedvenc könyvem.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Book;
