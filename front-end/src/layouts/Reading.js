import { useState } from 'react';
import { useEffect } from 'react';
import { getCoverImg } from '../api/book';
import '../styles/layouts/Reading.scss';

const Reading = ({ reading }) => {
   const [image, setImage] = useState(null);

   useEffect(() => {
      getCoverImg(reading.book.book_id)
         .then((data) => setImage(data))
         .catch((error) => console.log(error));
   }, []);

   return (
      <div className="Reading">
         <div className="book">
            <img
               className="cover-img"
               alt="Borítókép"
               src={`data:;base64,${image}`}
            />
         </div>
         <div className="details">
            <p className="title">
               {reading.book.author.name}: {reading.book.title}
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
