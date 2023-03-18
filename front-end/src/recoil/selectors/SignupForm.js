import { selector } from 'recoil';
import { signupFormInputsState } from '../atoms/SignupForm';

export const validateEmail = selector({
   key: 'validateEmail',
   get: ({ get }) => {
      const form = get(signupFormInputsState);
      const regex =
         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(form.email);
   }
});
