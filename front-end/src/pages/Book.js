import { useEffect } from 'react';
import {
   getBook,
   isLiked,
   like,
   dislike,
   getNumberOfLikes,
   isReading,
   getReview
} from '../api/book';
import { useParams, Link } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
   bookState,
   likedState,
   readingState,
   reviewState,
   numberOfLikesState
} from '../recoil/atoms/Book';
import { modalsState } from '../recoil/atoms/Modals';
import IconButton from '../components/IconButton';
import '../styles/pages/Book.scss';
import { FaHeart } from 'react-icons/fa';
import { BsBookmarkPlusFill, BsStarFill } from 'react-icons/bs';
import Badge from '../components/Badge';
import ReviewModal from '../layouts/modals/ReviewModal';
import ReviewList from '../layouts/ReviewList';
import { PulseLoader } from 'react-spinners';
import { addReading, endReading } from '../api/reading';
import { reviewsState } from '../recoil/atoms/Review';
import { getReviews } from '../api/review';

const Book = () => {
   const { bookId } = useParams();
   let [book, setBook] = useRecoilState(bookState);
   let [numberOfLikes, setNumberOfLikes] = useRecoilState(numberOfLikesState);
   let [liked, setLiked] = useRecoilState(likedState);
   let [reading, setReading] = useRecoilState(readingState);
   let [review, setReview] = useRecoilState(reviewState);
   let [reviews, setReviews] = useRecoilState(reviewsState);
   let [modals, setModals] = useRecoilState(modalsState);
   let resetBook = useResetRecoilState(bookState);

   useEffect(() => {
      getBook(bookId)
         .then((data) => setBook(data.book))
         .catch((error) => console.log(error));
      isLiked(bookId)
         .then((data) => setLiked(data.liked))
         .catch((error) => console.log(error));
      isReading(bookId)
         .then((data) => setReading(data.reading))
         .catch((error) => console.log(error));
      getReview(bookId)
         .then((data) => {
            if (data.review) setReview(data.review);
         })
         .catch((error) => console.log(error));
      getReviews(bookId)
         .then((data) => setReviews(data.reviews))
         .catch((error) => console.log(error));
      return () => resetBook();
   }, [
      bookId,
      setBook,
      setLiked,
      resetBook,
      setReading,
      setReview,
      setReviews
   ]);

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

   const onClickReadingButton = () => {
      if (reading) {
         endReading(bookId, new Date().toISOString())
            .then((data) => setReading(false))
            .catch((error) => console.log(error));
      } else {
         addReading(bookId, new Date().toISOString())
            .then((data) => setReading(true))
            .catch((error) => console.log(error));
      }
   };

   if (!book)
      return (
         <div className="loader">
            <PulseLoader color="rgb(20, 20, 20)" />
         </div>
      );

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
                           text={
                              reading ? 'Olvasás befejezése' : 'Most olvasom'
                           }
                           icon={<BsBookmarkPlusFill />}
                           onClick={onClickReadingButton}
                        ></IconButton>
                        <IconButton
                           className="like"
                           text={liked ? 'Mégsem tetszik' : 'Kedvelés'}
                           icon={<FaHeart />}
                           onClick={onClickLikeButton}
                        ></IconButton>
                        <IconButton
                           className="rate"
                           text={review ? 'Módosítás' : 'Értékelés'}
                           icon={<BsStarFill />}
                           onClick={onClickReviewButton}
                        ></IconButton>
                     </div>
                  </div>
               </div>
               <h2>Értékelések</h2>
               <ReviewList reviews={reviews} />
            </div>
         </div>
         {modals.showReviewModal && (
            <ReviewModal
               bookId={bookId}
               review={review}
               onClose={() => {
                  setModals({ ...modals, showReviewModal: false });
               }}
            />
         )}
      </div>
   );
};

export default Book;
