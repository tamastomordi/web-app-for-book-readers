import { atom } from 'recoil';

export const reviewFormState = atom({
   key: 'reviewFormState',
   default: {
      rating: 0,
      reviewText: ''
   }
});

export const reviewsState = atom({
   key: 'reviewsState',
   default: []
});
