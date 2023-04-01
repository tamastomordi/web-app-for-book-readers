import Modal from '../components/Modal';
import '../styles/layouts/ReadingModal.scss';
import { addReading } from '../api/reading';
import { useRecoilState } from 'recoil';
import { readingFormState } from '../recoil/atoms/Reading';

const ReadingModal = ({ bookId, onClose }) => {
   const [readingForm, setReadingForm] = useRecoilState(readingFormState);

   const onFormSubmit = (event) => {
      event.preventDefault();
      addReading(bookId, new Date().toISOString())
         .then((data) => {
            console.log(data);
            onClose();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <Modal title="Új olvasás hozzáadása" onClose={onClose}>
         <form onSubmit={onFormSubmit}>
            <button className="button" type="submit">
               Most kezdem olvasni
            </button>
         </form>
      </Modal>
   );
};

export default ReadingModal;
