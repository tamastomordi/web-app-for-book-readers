import { useState } from 'react';
import { useEffect } from 'react';
import { getCoverImg } from '../api/book';
import '../styles/layouts/Reading.scss';
import { Link } from 'react-router-dom';
import user_img from '../assets/user_img.svg';
import { getUserImg } from '../api/user';

const Reading = ({ reading, showUser }) => {
   const [image, setImage] = useState(null);
   const [userImage, setUserImage] = useState(null);

   useEffect(() => {
      getCoverImg(reading.book.book_id)
         .then((data) => setImage(data))
         .catch((error) => console.log(error));
      getUserImg(reading.user.user_id)
         .then((data) => setUserImage(data))
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
            {showUser && (
               <div className="user">
                  {userImage ? (
                     <img src={`data:;base64,${userImage}`} />
                  ) : (
                     <img src={user_img} alt="" />
                  )}
                  <Link to={'/user/' + reading.user.user_id}>
                     {reading.user.username}
                  </Link>
               </div>
            )}
            <Link className="title" to={'/book/' + reading.book.book_id}>
               {reading.book.author.name}: {reading.book.title}
            </Link>
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
