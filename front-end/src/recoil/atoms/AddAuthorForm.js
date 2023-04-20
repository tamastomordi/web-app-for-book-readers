import { atom } from 'recoil';

export const addAuthorFormState = atom({
   key: 'addAuthorFormState',
   default: {
      name: '',
      birth_date: null,
      death_date: null,
      description: '',
      errors: []
   }
});
