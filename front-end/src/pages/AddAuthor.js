import { useRecoilState, useResetRecoilState } from 'recoil';
import { addAuthorFormState } from '../recoil/atoms/AddAuthorForm';
import '../styles/pages/AddAuthor.scss';
import { addAuthor, uploadAuthorImage, deleteAuthor } from '../api/author';

const AddAuthor = () => {
   let [form, setForm] = useRecoilState(addAuthorFormState);
   let resetForm = useResetRecoilState(addAuthorFormState);

   const validate = () => {
      let valid = true;
      let errors = [];
      if (form.name === '') {
         errors.push('Név megadása kötelező!');
         valid = false;
      }
      if (!form.birth_date) {
         errors.push('Születési dátum megadása kötelező!');
         valid = false;
      }
      if (form.description === '') {
         errors.push('Leírás megadása kötelező!');
         valid = false;
      }
      const imagefile = document.querySelector('#file');
      if (!imagefile.files[0]) {
         errors.push('Kép feltöltése a szerzőről kötelező!');
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
         formData.append('author_img', imagefile.files[0]);
         addAuthor(form)
            .then((data) => {
               formData.append('author_id', data.author_id);
               uploadAuthorImage(formData)
                  .then(() => {
                     resetForm();
                  })
                  .catch((error) => {
                     console.log(error);
                     deleteAuthor(data.author_id).catch((error) =>
                        console.log(error)
                     );
                  });
            })
            .catch((error) => console.log(error));
      }
   };

   return (
      <div className="AddAuthor">
         <div className="container">
            <div className="card">
               <h2>Szerző feltöltése</h2>
               <form onSubmit={onFormSubmit}>
                  <input
                     type="text"
                     placeholder="Szerző teljes neve"
                     value={form.name}
                     onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                     }
                  />
                  <label>Születés dátuma:</label>
                  <input
                     type="date"
                     value={form.birth_date}
                     onChange={(e) =>
                        setForm({ ...form, birth_date: e.target.value })
                     }
                  />
                  <label>Halálozás dátuma:</label>
                  <input
                     type="date"
                     value={form.death_date}
                     onChange={(e) =>
                        setForm({ ...form, death_date: e.target.value })
                     }
                  />
                  <label>Kép feltöltése:</label>
                  <input type="file" id="file" />
                  <textarea
                     placeholder="Leírás"
                     rows={10}
                     value={form.description}
                     onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                     }
                  />
                  <button className="button" type="submit">
                     Szerző hozzáadása
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

export default AddAuthor;
