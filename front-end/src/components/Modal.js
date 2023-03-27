import '../styles/components/Modal.scss';

const Modal = ({ title, onClose, children }) => {
   return (
      <div className="Modal">
         <div className="modal-card">
            <div className="modal-header">
               <h2>{title}</h2>
               <span className="close" onClick={onClose}>
                  &times;
               </span>
            </div>
            {children}
         </div>
      </div>
   );
};

export default Modal;
