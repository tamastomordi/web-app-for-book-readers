import { Link } from 'react-router-dom';
import '../styles/layouts/ReviewList.scss';
import user_img from '../assets/user_img.svg';
import { BsStarFill } from 'react-icons/bs';
import calculateTime from '../utils/calculateTime';
import { PulseLoader } from 'react-spinners';

const ReviewList = ({ reviews }) => {
   if (!reviews)
      return (
         <div className="loader">
            <PulseLoader color="rgb(20, 20, 20)" />
         </div>
      );

   return (
      <div className="ReviewList">
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
