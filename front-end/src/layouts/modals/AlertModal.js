import Modal from '../../components/Modal';
import '../../styles/layouts/ReviewModal.scss';
import { useEffect } from 'react';
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
         <div className="AlertModal">
            <p className="message">
               Már több mint 15 perce böngészel az oldalon!<br></br>Nem lenne
               ideje olvasni is? 👀
            </p>
            <p className="text">{quote.text}</p>
            <p className="by">- {quote.by}</p>
         </div>
      </Modal>
   );
};

export default AlertModal;
