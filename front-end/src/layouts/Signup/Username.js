import { useRecoilState } from 'recoil';
import {
   signupFormInputsState,
   signupFormStepState
} from '../../recoil/atoms/SignupForm';

const Username = () => {
   const [form, setForm] = useRecoilState(signupFormInputsState);
   const [, setFormStep] = useRecoilState(signupFormStepState);

   const handleSubmit = (event) => {
      event.preventDefault();
      setFormStep('password');
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
                     username: event.target.value
                  })
               }
               value={form.username}
            />
            <button type="submit">Tovább</button>
            <button onClick={() => setFormStep('email')}>Vissza</button>
         </form>
      </div>
   );
};

export default Username;
