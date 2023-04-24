import '../styles/layouts/ReviewList.scss';
import { PulseLoader } from 'react-spinners';
import Review from '../components/Review';

const ReviewList = ({ reviews }) => {
   if (!reviews)
      return (
         <div className="loader">
            <PulseLoader color="rgb(20, 20, 20)" />
         </div>
      );

   if (reviews.length === 0)
      return <p className="empty">Nincs megjeleníthető értékelés</p>;

   return (
      <div className="ReviewList">
         {reviews.map((review, index) => (
            <Review review={review} />
         ))}
      </div>
   );
};

export default ReviewList;
