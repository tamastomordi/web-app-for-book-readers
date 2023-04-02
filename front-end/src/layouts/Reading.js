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
            <p className="authors">{reading.book.authors[0].name}:</p>
            <p className="title">{reading.book.title}</p>
            <p>Olvasás kezdete: {new Date(reading.start).toLocaleString()}</p>
         </div>
      </div>
   );
};

export default Reading;
