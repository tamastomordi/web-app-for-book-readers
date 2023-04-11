import '../styles/components/IconButton.scss';

const IconButton = ({ icon, text, className, onClick }) => {
   return (
      <button className={'IconButton ' + className} onClick={onClick}>
         <div className="content">
            {icon && <span className="icon">{icon}</span>}
            {text && <span className="text">{text}</span>}
         </div>
      </button>
   );
};

export default IconButton;
