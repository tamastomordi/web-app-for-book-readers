import { atom } from 'recoil';

export const bookState = atom({
   key: 'bookState',
   default: null
});

export const authorsState = atom({
   key: 'authorsState',
   default: null
});

export const coverImgState = atom({
   key: 'coverImgState',
   default: null
});
