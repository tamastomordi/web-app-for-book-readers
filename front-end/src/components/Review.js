import { useEffect } from 'react';
import { useState } from 'react';
import { getUserImg } from '../api/user';
import { Link } from 'react-router-dom';
import user_img from '../assets/user_img.svg';
import { BsStarFill } from 'react-icons/bs';
import calculateTime from '../utils/calculateTime';

const Review = ({ review }) => {
   let [image, setImage] = useState(null);

   useEffect(() => {
      getUserImg(review.user.user_id)
         .then((data) => setImage(data))
         .catch((error) => console.log(error));
   }, [setImage]);

   return (
      <div className="review">
         <div className="header">
            {review.user.user_img ? (
               <img src={`data:;base64,${image}`} alt="" />
            ) : (
               <img src={user_img} alt="" />
            )}
            <Link to={'/user/' + review.user.user_id} className="username">
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
   );
};

export default Review;
