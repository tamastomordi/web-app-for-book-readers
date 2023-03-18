import { useRecoilValue } from 'recoil';
import { signupFormInputsState } from '../../recoil/atoms/SignupForm';

const Success = () => {
   const form = useRecoilValue(signupFormInputsState);

   return (
      <div className="Success">
         <h3>Sikeres regisztráció!</h3>
         <p>Most már bejelentkezhetsz...</p>
         <p>felhasználóneved: {form.username}</p>
         <p>e-mail címed: {form.email}</p>
      </div>
   );
};

export default Success;
