import Modal from '../../components/Modal';
import '../../styles/layouts/ReviewModal.scss';
import StarRating from '../../components/StarRating';
import { addReview, editReview, deleteReview } from '../../api/review';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { reviewFormState } from '../../recoil/atoms/Review';
import { useEffect } from 'react';
import { reviewState } from '../../recoil/atoms/Book';
import { useState } from 'react';
import { getRandomQuote } from '../../api/quote';
import '../../styles/layouts/AlertModal.scss';

const AlertModal = ({ onClose }) => {
   const [quote, setQuote] = useState('');

   useEffect(() => {
      getRandomQuote()
         .then((data) => setQuote(data.quote))
         .catch((error) => console.log(error));
   }, []);

   return (
      <Modal title="" onClose={onClose}>
         <p className="message">
            Már több mint 15 perce böngészel az oldalon!<br></br>Nem lenne ideje
            olvasni is? 👀
         </p>
         <p className="text">{quote.text}</p>
         <p className="by">- {quote.by}</p>
      </Modal>
   );
};

export default AlertModal;
