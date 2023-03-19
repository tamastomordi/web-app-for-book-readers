import { useRecoilState } from 'recoil';
import { signup } from '../../api/auth';
import {
   signupFormInputsState,
   signupFormStepState
} from '../../recoil/atoms/SignupForm';

const Password = () => {
   const [form, setForm] = useRecoilState(signupFormInputsState);
   const [, setFormStep] = useRecoilState(signupFormStepState);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (form.password1 === form.password2) {
         signup(form.email, form.username, form.password1).then(() => {
            setFormStep('success');
         });
      }
   };

   const handleOnChangePassword1 = (event) => {
      if (event.target.value === form.password2) {
         setForm({
            ...form,
            password1: event.target.value,
            error: null
         });
      } else {
         setForm({
            ...form,
            password1: event.target.value,
            error: 'A két jelszó nem egyezik!'
         });
      }
   };

   const handleOnChangePassword2 = (event) => {
      if (form.password1 === event.target.value) {
         setForm({
            ...form,
            password2: event.target.value,
            error: null
         });
      } else {
         setForm({
            ...form,
            password2: event.target.value,
            error: 'A két jelszó nem egyezik!'
         });
      }
   };

   return (
      <div className="Password">
         <form onSubmit={handleSubmit}>
            <input
               type="password"
               autoFocus
               placeholder="Adj meg egy jelszót!"
               onChange={handleOnChangePassword1}
               value={form.password1}
            />
            <input
               type="password"
               placeholder="Jelszó megerősítése"
               onChange={handleOnChangePassword2}
               value={form.password2}
            />
            <p className="error">{form.error}</p>
            <button className="button" type="submit">
               Regisztráció
            </button>
            <button
               className="button -secondary"
               onClick={() => setFormStep('username')}
            >
               Vissza
            </button>
         </form>
      </div>
   );
};

export default Password;
