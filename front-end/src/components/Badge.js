import '../styles/components/Badge.scss';

const Badge = ({ icon, text, className }) => {
   return (
      <div className={'Stamp ' + className}>
         <div className="content">
            {icon && <span className="icon">{icon}</span>}
            {text && <span className="text">{text}</span>}
         </div>
      </div>
   );
};

export default Badge;
