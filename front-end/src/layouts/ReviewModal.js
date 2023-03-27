import Modal from '../components/Modal';
import '../styles/layouts/ReviewModal.scss';
import StarRating from '../components/StarRating';
import { addReview } from '../api/review';
import { useRecoilState } from 'recoil';
import { reviewFormState } from '../recoil/atoms/Review';

const ReviewModal = ({ bookId, onClose }) => {
   const [reviewForm, setReviewForm] = useRecoilState(reviewFormState);

   const onFormSubmit = (event) => {
      event.preventDefault();
      addReview(
         bookId,
         reviewForm.rating,
         reviewForm.reviewText,
         new Date().toISOString()
      )
         .then((data) => {
            console.log(data);
            onClose();
         })
         .catch((error) => {
            console.log(error);
         });
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
         </form>
      </Modal>
   );
};

export default ReviewModal;
