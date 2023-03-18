import { useRecoilState } from 'recoil';
import {
   signupFormInputsState,
   signupFormStepState
} from '../../recoil/atoms/SignupForm';
import { checkIfUsernameExists } from '../../api/auth';

const Username = () => {
   const [form, setForm] = useRecoilState(signupFormInputsState);
   const [, setFormStep] = useRecoilState(signupFormStepState);

   const handleSubmit = (event) => {
      event.preventDefault();
      checkIfUsernameExists(form.username).then((exists) => {
         if (exists) {
            setForm({ ...form, error: 'Már létező felhasználónév!' });
         } else {
            setFormStep('password');
         }
      });
   };

   return (
      <div className="Username">
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               autoFocus
               placeholder="Adj meg egy felhasználónevet!"
               onChange={(event) =>
                  setForm({
                     ...form,
                     username: event.target.value,
                     error: null
                  })
               }
               value={form.username}
            />
            <p className="error">{form.error}</p>
            <button type="submit">Tovább</button>
            <button onClick={() => setFormStep('email')}>Vissza</button>
         </form>
      </div>
   );
};

export default Username;
