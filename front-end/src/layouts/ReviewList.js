import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { reviewsState } from '../recoil/atoms/Review';
import { getReviews } from '../api/review';
import { Link } from 'react-router-dom';
import '../styles/layouts/ReviewList.scss';
import user_img from '../assets/user_img.svg';
import { BsStarFill } from 'react-icons/bs';
import calculateTime from '../utils/calculateTime';
import { modalsState } from '../recoil/atoms/Modals';

const ReviewList = ({ bookId }) => {
   let [reviews, setReviews] = useRecoilState(reviewsState);
   let modals = useRecoilValue(modalsState);

   useEffect(() => {
      getReviews(bookId)
         .then((data) => setReviews(data.reviews))
         .catch((error) => console.log(error));
   }, [bookId, setReviews, modals]);

   return (
      <div className="ReviewList">
         <h2>Értékelések</h2>
         {reviews.map((review, index) => (
            <div key={index} className="review">
               <div className="header">
                  <img src={user_img} alt="" />
                  <Link
                     to={'/user/' + review.user.user_id}
                     className="username"
                  >
                     {review.user.username}
                  </Link>
                  <p className="datetime">{calculateTime(review.datetime)}</p>
                  <p className="rating">
                     <BsStarFill className={review.rating >= 1 && 'checked'} />
                     <BsStarFill className={review.rating >= 2 && 'checked'} />
                     <BsStarFill className={review.rating >= 3 && 'checked'} />
                     <BsStarFill className={review.rating >= 4 && 'checked'} />
                     <BsStarFill className={review.rating >= 5 && 'checked'} />
                  </p>
               </div>

               <p className="review-text">{review.review_text}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
