import { useRecoilState } from 'recoil';
import {
   signupFormInputsState,
   signupFormStepState
} from '../../recoil/atoms/SignupForm';

const Password = () => {
   const [form, setForm] = useRecoilState(signupFormInputsState);
   const [, setFormStep] = useRecoilState(signupFormStepState);

   const handleSubmit = (event) => {
      event.preventDefault();
      setFormStep('success');
   };

   return (
      <div className="Password">
         <form onSubmit={handleSubmit}>
            <input
               type="password"
               autoFocus
               placeholder="Adj meg egy jelszót!"
               onChange={(event) =>
                  setForm({
                     ...form,
                     password: event.target.value
                  })
               }
               value={form.password}
            />
            <button type="submit">Regisztráció</button>
            <button onClick={() => setFormStep('username')}>Vissza</button>
         </form>
      </div>
   );
};

export default Password;
