import { atom } from 'recoil';

export const bookListState = atom({
   key: 'bookListState',
   default: []
});

export const searchState = atom({
   key: 'searchState',
   default: {}
});
