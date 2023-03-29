import { useEffect } from 'react';
import { getBook, isLiked, like, dislike, getNumberOfLikes } from '../api/book';
import { useParams, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
   bookState,
   likedState,
   numberOfLikesState,
   modalsState
} from '../recoil/atoms/Book';
import IconButton from '../components/IconButton';
import '../styles/pages/Book.scss';
import { FaHeart } from 'react-icons/fa';
import { BsBookmarkPlusFill, BsStarFill } from 'react-icons/bs';
import Badge from '../components/Badge';
import ReviewModal from '../layouts/ReviewModal';
import ReviewList from '../layouts/ReviewList';

const Book = () => {
   const { bookId } = useParams();
   let [book, setBook] = useRecoilState(bookState);
   let [numberOfLikes, setNumberOfLikes] = useRecoilState(numberOfLikesState);
   let [liked, setLiked] = useRecoilState(likedState);
   let [modals, setModals] = useRecoilState(modalsState);

   useEffect(() => {
      getBook(bookId)
         .then((data) => setBook(data.book))
         .catch((error) => console.log(error));
      isLiked(bookId)
         .then((data) => setLiked(data.liked))
         .catch((error) => console.log(error));
   }, [bookId, setBook, setLiked]);

   useEffect(() => {
      getNumberOfLikes(bookId)
         .then((data) => setNumberOfLikes(data.numberOfLikes))
         .catch((error) => console.log(error));
   }, [bookId, setNumberOfLikes, liked]);

   const onClickLikeButton = () => {
      if (liked) {
         dislike(bookId)
            .then((data) => setLiked(false))
            .catch((error) => console.log(error));
      } else {
         like(bookId)
            .then((data) => setLiked(true))
            .catch((error) => console.log(error));
      }
   };

   const onClickReviewButton = () =>
      setModals({ ...modals, showReviewModal: true });

   if (!book) return <p>Loading...</p>;

   return (
      <div className="Book">
         <div className="container">
            <div className="card -wide">
               <div className="flex">
                  {book.cover_img && (
                     <img
                        className="cover-img"
                        alt="Borítókép"
                        src={`data:;base64,${book.cover_img}`}
                     />
                  )}
                  <div className="details">
                     <h2>
                        <Link
                           to={'/author/' + book.authors[0].author_id}
                           className="author"
                        >
                           {book.authors[0].name}:
                        </Link>
                        <span className="title"> {book.title}</span>
                     </h2>
                     <div className="badge-container">
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
                     </div>
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
                           onClick={onClickReviewButton}
                        ></IconButton>
                     </div>
                  </div>
               </div>
               <ReviewList bookId={bookId} />
            </div>
         </div>
         {modals.showReviewModal && (
            <ReviewModal
               bookId={bookId}
               onClose={() => {
                  setModals({ ...modals, showReviewModal: false });
               }}
            />
         )}
      </div>
   );
};

export default Book;
