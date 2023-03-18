import { useRecoilValue } from 'recoil';
import { signupFormStepState } from '../../recoil/atoms/SignupForm';
import Email from './Email';
import Password from './Password';
import Success from './Success';
import Username from './Username';

const SignupForm = () => {
   const formStep = useRecoilValue(signupFormStepState);

   return (
      <div className="SignupForm">
         {formStep === 'email' ? (
            <Email />
         ) : formStep === 'username' ? (
            <Username />
         ) : formStep === 'password' ? (
            <Password />
         ) : formStep === 'success' ? (
            <Success />
         ) : null}
      </div>
   );
};

export default SignupForm;
