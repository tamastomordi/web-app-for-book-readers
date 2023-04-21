import { useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { getAuthors } from '../api/author';
import { addBook, deleteBook, uploadCoverImage } from '../api/book';
import { authorsState, addBookFormState } from '../recoil/atoms/AddBookForm';
import '../styles/pages/AddBook.scss';

const AddBook = () => {
   let [authors, setAuthors] = useRecoilState(authorsState);
   let [form, setForm] = useRecoilState(addBookFormState);
   let resetForm = useResetRecoilState(addBookFormState);

   useEffect(() => {
      getAuthors('')
         .then((data) => {
            setAuthors(
               data.authors.map((author) => {
                  author.id = author.author_id;
                  return author;
               })
            );
         })
         .catch((error) => console.log(error));
   }, [setAuthors]);

   const validate = () => {
      let valid = true;
      let errors = [];
      if (!form.authorId) {
         errors.push('Válassz szerzőt!');
         valid = false;
      }
      if (form.title === '') {
         errors.push('Cím megadása kötelező!');
         valid = false;
      }
      if (form.description === '') {
         errors.push('Leírás megadása kötelező!');
         valid = false;
      }
      const imagefile = document.querySelector('#file');
      if (!imagefile.files[0]) {
         errors.push('Borítókép feltöltése kötelező!');
         valid = false;
      } else if (
         imagefile.files[0].type !== 'image/jpeg' &&
         imagefile.files[0].type !== 'image/png'
      ) {
         errors.push('Csak png és jpg fájl tölthető fel!');
         valid = false;
      }
      setForm({ ...form, errors: errors });
      return valid;
   };

   const onFormSubmit = (event) => {
      event.preventDefault();
      if (validate()) {
         let formData = new FormData();
         const imagefile = document.querySelector('#file');
         formData.append('cover_img', imagefile.files[0]);
         addBook(form)
            .then((data) => {
               formData.append('book_id', data.book_id);
               uploadCoverImage(formData)
                  .then(() => {
                     resetForm();
                  })
                  .catch((error) => {
                     console.log(error);
                     deleteBook(data.book_id).catch((error) =>
                        console.log(error)
                     );
                  });
            })
            .catch((error) => console.log(error));
      }
   };

   const formatResult = (item) => {
      return (
         <>
            <span style={{ display: 'block', textAlign: 'left' }}>
               {item.name}
            </span>
         </>
      );
   };

   const handleOnSelect = (item) => {
      if (item.author_id) {
         setForm({ ...form, authorId: item.author_id });
      }
   };

   return (
      <div className="AddBook">
         <div className="container">
            <div className="card">
               <h2>Könyv feltöltése</h2>
               <form onSubmit={onFormSubmit}>
                  <ReactSearchAutocomplete
                     className="authorsSearch"
                     items={authors}
                     formatResult={formatResult}
                     onSelect={handleOnSelect}
                     fuseOptions={{ threshold: 0.2, minMatchCharLength: 3 }}
                     showIcon={false}
                     showClear={false}
                     placeholder="Válassz szerzőt..."
                     styling={{
                        borderRadius: '0.25rem',
                        boxShadow: 'none',
                        border: '1px solid var(--clr-neutral-600)'
                     }}
                     showNoResultsText="Nincs ilyen szerző"
                  />
                  <input
                     type="text"
                     placeholder="Cím"
                     value={form.title}
                     onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                     }
                  />
                  <input
                     type="text"
                     placeholder="Alcím"
                     value={form.subtitle}
                     onChange={(e) =>
                        setForm({ ...form, subtitle: e.target.value })
                     }
                  />
                  <label>Borító feltöltése:</label>
                  <input id="file" type="file" />
                  <textarea
                     placeholder="Leírás"
                     rows={10}
                     value={form.description}
                     onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                     }
                  />
                  <button className="button" type="submit">
                     Könyv hozzáadása
                  </button>
                  {form.errors.map((error, index) => {
                     return (
                        <p key={index} className="error">
                           {error}
                        </p>
                     );
                  })}
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddBook;
