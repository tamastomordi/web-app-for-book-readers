import { atom } from 'recoil';

export const bookListState = atom({
   key: 'bookListState',
   default: []
});

export const searchTermState = atom({
   key: 'searchTermState',
   default: ''
});
