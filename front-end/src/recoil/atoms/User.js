import { atom } from 'recoil';

export const userState = atom({
   key: 'userState',
   default: null
});

export const readingListState = atom({
   key: 'readingListState',
   default: []
});

export const favoritesState = atom({
   key: 'favoritesState',
   default: []
});

export const profileFormState = atom({
   key: 'profileFormState',
   default: {
      full_name: '',
      location: '',
      studies: '',
      job: '',
      bio: '',
      gender: ''
   }
});
