import { atom } from 'recoil';

export const authState = atom({
   key: 'authState',
   default: {
      user: null
   }
});

export const loginTimeState = atom({
   key: 'loginTimeState',
   default: null
});
