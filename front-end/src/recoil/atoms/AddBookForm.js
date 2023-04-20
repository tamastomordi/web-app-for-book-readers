import { atom } from 'recoil';

export const authorsState = atom({
   key: 'addBookAuthorsState',
   default: []
});

export const addBookFormState = atom({
   key: 'addBookFormState',
   default: {
      authorId: null,
      title: '',
      subtitle: '',
      description: '',
      errors: []
   }
});
