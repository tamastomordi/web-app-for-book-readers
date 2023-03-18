import { useRecoilState, useRecoilValue } from 'recoil';
import {
   signupFormInputsState,
   signupFormStepState
} from '../../recoil/atoms/SignupForm';
import { validateEmail } from '../../recoil/selectors/SignupForm';

const Email = () => {
   const [form, setForm] = useRecoilState(signupFormInputsState);
   const [, setFormStep] = useRecoilState(signupFormStepState);
   const emailIsValid = useRecoilValue(validateEmail);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (emailIsValid) {
         setFormStep('username');
      } else {
         setForm({ ...form, error: 'Érvénytelen e-mail cím' });
      }
   };

   const handleChange = (event) => {
      if (emailIsValid) {
         setForm({
            ...form,
            email: event.target.value
         });
      } else {
         setForm({
            ...form,
            email: event.target.value,
            error: 'Érvénytelen e-mail cím'
         });
      }
   };

   return (
      <div className="Email">
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               autoFocus
               placeholder="Add meg az e-mail címed!"
               onChange={handleChange}
               value={form.email}
            />
            {emailIsValid ? null : <p>{form.error}</p>}
            <button type="submit">Tovább</button>
         </form>
      </div>
   );
};

export default Email;
