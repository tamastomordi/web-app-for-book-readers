import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginFormInputsState } from '../recoil/atoms/LoginForm';
import { login } from '../api/auth';

const LoginForm = () => {
   const [form, setForm] = useRecoilState(loginFormInputsState);
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      login(form.username, form.password).then((token) => {
         localStorage.setItem('token', token);
         navigate('/home');
      });
   };

   return (
      <div className="LoginForm card">
         <h2>Bejelentkezés</h2>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               autoFocus
               placeholder="Felhasználónév"
               onChange={(event) =>
                  setForm({ ...form, username: event.target.value })
               }
               value={form.username}
            />
            <input
               type="password"
               placeholder="Jelszó"
               onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
               }
               value={form.password}
            />
            <p className="error">{form.error}</p>
            <button type="submit">Bejelentkezés</button>
         </form>
      </div>
   );
};

export default LoginForm;
