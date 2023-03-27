import { BsStarFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import '../styles/components/StarRating.scss';

const StarRating = ({ value, onChange }) => {
   const [rating, setRating] = useState(0);
   const [hover, setHover] = useState(0);

   useEffect(() => {
      setRating(value);
   }, [value]);

   return (
      <div className="StarRating">
         {[...Array(5)].map((_, index) => {
            index++;
            return (
               <button type="button" key={index}>
                  <BsStarFill
                     className={
                        index <= (hover || rating) ? 'star light' : 'star dark'
                     }
                     onClick={() => {
                        setRating(index);
                        onChange(index);
                     }}
                     onMouseEnter={() => setHover(index)}
                     onMouseLeave={() => setHover(rating)}
                  />
               </button>
            );
         })}
      </div>
   );
};

export default StarRating;
