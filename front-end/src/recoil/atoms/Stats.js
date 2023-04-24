import { atom } from 'recoil';

export const readingStatsState = atom({
   key: 'readingStatsState',
   default: {
      my: {
         week: 0,
         month: 0,
         year: 0
      },
      friends: {
         week: 0,
         month: 0,
         year: 0
      }
   }
});

export const myReadingsState = atom({
   key: 'myReadingsState',
   default: []
});

export const friendsReadingsState = atom({
   key: 'friendsReadingsState',
   default: []
});
