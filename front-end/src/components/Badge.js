import '../styles/components/Badge.scss';

const Badge = ({ icon, text, className }) => {
   return (
      <div className={'Stamp ' + className}>
         <div className="content">
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
         </div>
      </div>
   );
};

export default Badge;