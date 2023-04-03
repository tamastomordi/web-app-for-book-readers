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

export const likedState = atom({
   key: 'likedState',
   default: false
});

export const readingState = atom({
   key: 'readingState',
   default: false
});

export const reviewState = atom({
   key: 'reviewState',
   default: null
});

export const numberOfLikesState = atom({
   key: 'numberOfLikesState',
   default: 0
});

export const modalsState = atom({
   key: 'modalsState',
   default: {
      showReviewModal: false,
      showReadingModal: false
   }
});
