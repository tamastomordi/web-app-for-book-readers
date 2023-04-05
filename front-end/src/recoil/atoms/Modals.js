import { atom } from 'recoil';

export const modalsState = atom({
   key: 'modalsState',
   default: {
      showReviewModal: false,
      showReadingModal: false,
      showProfileModal: false
   }
});
