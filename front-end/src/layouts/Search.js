import '../styles/layouts/Search.scss';

const Search = () => {
   return (
      <div className="Search">
         <input type="text" placeholder="Keresés..." />
         <input type="text" placeholder="Dropdown" value="Legújabbak elől" />
      </div>
   );
};

export default Search;
