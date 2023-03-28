import { authorState, authorImgState } from '../recoil/atoms/Author';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { getAuthor, getAuthorImg } from '../api/author';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import '../styles/pages/Author.scss';

const Author = () => {
   const { authorId } = useParams();
   const [author, setAuthor] = useRecoilState(authorState);
   const [authorImg, setAuthorImg] = useRecoilState(authorImgState);

   useEffect(() => {
      getAuthor(authorId)
         .then((data) => setAuthor(data.author))
         .catch((error) => console.log(error));
   }, [authorId, setAuthor]);

   useEffect(() => {
      getAuthorImg(authorId)
         .then((data) => {
            let authorImg = Buffer.from(data, 'binary').toString('base64');
            setAuthorImg(authorImg);
         })
         .catch((error) => console.log(error));
   }, [authorId, setAuthorImg]);

   if (!author) return <p>Loading...</p>;

   return (
      <div className="Author">
         <div className="container">
            <div className="card -wide">
               <div className="flex">
                  <div className="details">
                     <h2>{author.name}</h2>
                     <p className="dates">
                        {new Date(author.birth_date).toLocaleDateString() +
                           ' – '}
                        {author.death_date &&
                           new Date(author.death_date).toLocaleDateString()}
                     </p>
                     <p>{author.description}</p>
                  </div>
                  {authorImg && (
                     <img
                        className="author-img"
                        alt="Kép a szerzőről"
                        src={`data:;base64,${authorImg}`}
                     />
                  )}
               </div>
               <h2>Könyvei</h2>
            </div>
         </div>
      </div>
   );
};

export default Author;
