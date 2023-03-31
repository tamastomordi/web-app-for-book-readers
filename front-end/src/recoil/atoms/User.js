import { atom } from 'recoil';

export const userState = atom({
   key: 'userState',
   default: null
});

export const readingsState = atom({
   key: 'readingsState',
   default: []
});

export const favoritesState = atom({
   key: 'favoritesState',
   default: []
});
