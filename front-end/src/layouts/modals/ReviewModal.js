import Modal from '../../components/Modal';
import '../../styles/layouts/ReviewModal.scss';
import StarRating from '../../components/StarRating';
import { addReview, editReview, deleteReview } from '../../api/review';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { reviewFormState } from '../../recoil/atoms/Review';
import { useEffect } from 'react';
import { reviewState } from '../../recoil/atoms/Book';

const ReviewModal = ({ bookId, onClose }) => {
   const [reviewForm, setReviewForm] = useRecoilState(reviewFormState);
   const [review, setReview] = useRecoilState(reviewState);
   const resetReview = useResetRecoilState(reviewState);

   useEffect(() => {
      if (review)
         setReviewForm({
            rating: review.rating,
            reviewText: review.review_text
         });
   }, [review, setReviewForm]);

   const onFormSubmit = (event) => {
      event.preventDefault();

      if (review) {
         editReview(bookId, reviewForm.rating, reviewForm.reviewText)
            .then((data) => {
               setReview(data.review);
               onClose();
            })
            .catch((error) => console.log(error));
      } else {
         addReview(
            bookId,
            reviewForm.rating,
            reviewForm.reviewText,
            new Date().toISOString()
         )
            .then((data) => {
               setReview(data.review);
               onClose();
            })
            .catch((error) => console.log(error));
      }
   };

   const onDeleteButtonClick = () => {
      deleteReview(bookId)
         .then((data) => {
            resetReview();
            onClose();
         })
         .catch((error) => console.log(error));
   };

   return (
      <Modal title="Értékelés" onClose={onClose}>
         <form onSubmit={onFormSubmit}>
            <div className="rating">
               <label>Hogy tetszett a könyv?</label>
               <StarRating
                  value={reviewForm.rating}
                  onChange={(value) => {
                     setReviewForm({ ...reviewForm, rating: value });
                  }}
               />
            </div>
            <textarea
               rows="8"
               placeholder="Ide írd az értékelésed szövegét!"
               value={reviewForm.reviewText}
               onChange={(event) =>
                  setReviewForm({
                     ...reviewForm,
                     reviewText: event.target.value
                  })
               }
            />
            <button className="button" type="submit">
               Értékelés mentése
            </button>
            {review && (
               <button
                  className="button delete-button"
                  type="button"
                  onClick={onDeleteButtonClick}
               >
                  Értékelés törlése
               </button>
            )}
         </form>
      </Modal>
   );
};

export default ReviewModal;
