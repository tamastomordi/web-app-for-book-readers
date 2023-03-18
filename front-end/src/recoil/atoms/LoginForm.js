import { atom } from 'recoil';

export const loginFormInputsState = atom({
   key: 'loginFormInputsState',
   default: {
      username: '',
      password: '',
      error: null
   }
});
