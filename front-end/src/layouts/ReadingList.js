import Reading from './Reading';
import '../styles/layouts/ReadingList.scss';

const ReadingList = ({ readings, showUser }) => {
   if (readings.length === 0) return <div>Nincs olvasás.</div>;

   return (
      <div className="ReadingList">
         {readings.map((reading) => {
            return (
               <Reading
                  key={reading.reading_id}
                  reading={reading}
                  showUser={showUser}
               />
            );
         })}
      </div>
   );
};

export default ReadingList;
