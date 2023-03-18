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

export const validateUsername = selector({
   key: 'validateUsername',
   get: ({ get }) => {
      return true;
   }
});

export const validatePassword = selector({
   key: 'validatePassword',
   get: ({ get }) => {
      return true;
   }
});
