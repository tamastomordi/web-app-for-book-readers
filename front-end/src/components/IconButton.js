import '../styles/components/IconButton.scss';

const IconButton = ({ icon, text, className, tooltip, children }) => {
   return (
      <button className={'IconButton ' + className}>
         <div className="content">
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
         </div>
      </button>
   );
};

export default IconButton;
