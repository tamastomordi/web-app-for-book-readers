import '../styles/layouts/Reading.scss';

const Reading = ({ reading }) => {
   return (
      <div className="Reading">
         <div className="book">
            <img
               className="cover-img"
               alt="Borítókép"
               src={`data:;base64,${reading.book.cover_img}`}
            />
         </div>
         <div className="details">
            <p className="title">
               {reading.book.authors[0].name}: {reading.book.title}
            </p>
            <p>
               {new Date(reading.start).toLocaleString('hu-HU', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
               })}
               {' – '}
               {reading.end &&
                  new Date(reading.end).toLocaleString('hu-Hu', {
                     year: 'numeric',
                     month: 'short',
                     day: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit'
                  })}
            </p>
         </div>
      </div>
   );
};

export default Reading;
