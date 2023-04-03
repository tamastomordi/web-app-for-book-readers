import { useRecoilState } from 'recoil';
import { searchTermState } from '../recoil/atoms/BookList';
import '../styles/layouts/Search.scss';

const Search = () => {
   const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

   const handleOnChange = (event) => {
      setSearchTerm(event.target.value);
   };

   return (
      <div className="Search">
         <input
            type="text"
            placeholder="Könyvek keresése..."
            value={searchTerm}
            onChange={handleOnChange}
         />
      </div>
   );
};

export default Search;
