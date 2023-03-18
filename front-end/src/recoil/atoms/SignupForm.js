import { atom } from 'recoil';

export const signupFormInputsState = atom({
   key: 'signupFormInputsState',
   default: {
      email: '',
      username: '',
      password: '',
      error: null
   }
});

export const signupFormStepState = atom({
   key: 'signupFormStepState',
   default: 'email'
});
