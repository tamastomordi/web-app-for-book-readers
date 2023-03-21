import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
   signupFormStepState,
   signupFormInputsState
} from '../../recoil/atoms/SignupForm';
import Email from './Email';
import Password from './Password';
import Success from './Success';
import Username from './Username';

const SignupForm = () => {
   const formStep = useRecoilValue(signupFormStepState);
   const resetForm = useResetRecoilState(signupFormInputsState);
   const resetStep = useResetRecoilState(signupFormStepState);

   useEffect(() => {
      return () => {
         resetForm();
         resetStep();
      };
   }, []);

   return (
      <div className="SignupForm card">
         <h2>Regisztráció</h2>
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
