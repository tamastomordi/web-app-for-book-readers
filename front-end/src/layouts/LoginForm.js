import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginFormInputsState } from '../recoil/atoms/LoginForm';
import { authState, loginTimeState } from '../recoil/atoms/Auth';
import { login } from '../api/auth';
import { useEffect } from 'react';

const LoginForm = () => {
   const [form, setForm] = useRecoilState(loginFormInputsState);
   const [auth, setAuth] = useRecoilState(authState);
   const resetForm = useResetRecoilState(loginFormInputsState);
   const navigate = useNavigate();
   const [loginTime, setLoginTime] = useRecoilState(loginTimeState);

   useEffect(() => {
      return resetForm;
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      login(form.username, form.password)
         .then((user) => {
            setAuth({ user: user });
            setLoginTime(new Date());
            navigate('/dashboard');
         })
         .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
               setForm({
                  ...form,
                  error: 'Hibás felhasználónév és/vagy jelszó!'
               });
            }
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
                  setForm({
                     ...form,
                     username: event.target.value,
                     error: null
                  })
               }
               value={form.username}
            />
            <input
               type="password"
               placeholder="Jelszó"
               onChange={(event) =>
                  setForm({
                     ...form,
                     password: event.target.value,
                     error: null
                  })
               }
               value={form.password}
            />
            <p className="error">{form.error}</p>
            <button className="button" type="submit">
               Bejelentkezés
            </button>
         </form>
      </div>
   );
};

export default LoginForm;
