import Modal from '../../components/Modal';
import '../../styles/layouts/EditProfileModal.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { authState } from '../../recoil/atoms/Auth';
import { modalsState } from '../../recoil/atoms/Modals';
import { profileFormState } from '../../recoil/atoms/User';
import { editProfile } from '../../api/user';

const EditProfileModal = () => {
   const [auth, setAuth] = useRecoilState(authState);
   const [modals, setModals] = useRecoilState(modalsState);
   const [profileForm, setProfileForm] = useRecoilState(profileFormState);

   useEffect(() => {
      setProfileForm({
         full_name: auth.user.full_name,
         location: auth.user.location,
         studies: auth.user.studies,
         job: auth.user.job,
         bio: auth.user.bio,
         gender: auth.user.gender
      });
   }, [auth, setProfileForm]);

   const onFormSubmit = (event) => {
      event.preventDefault();
      editProfile(profileForm)
         .then((data) => {
            setAuth({ ...auth, user: data.user });
            setModals({ ...modals, showProfileModal: false });
         })
         .catch((error) => console.log(error));
   };

   return (
      <Modal
         className="EditProfileModal"
         title="Profil adatok"
         onClose={() => setModals({ ...modals, showProfileModal: false })}
      >
         <form onSubmit={onFormSubmit}>
            <input
               placeholder="Valódi név"
               type="text"
               value={profileForm.full_name}
               onChange={(e) =>
                  setProfileForm({ ...profileForm, full_name: e.target.value })
               }
            />
            <input
               placeholder="Lakhely"
               type="text"
               value={profileForm.location}
               onChange={(e) =>
                  setProfileForm({ ...profileForm, location: e.target.value })
               }
            />
            <input
               placeholder="Iskolák"
               type="text"
               value={profileForm.studies}
               onChange={(e) =>
                  setProfileForm({ ...profileForm, studies: e.target.value })
               }
            />
            <input
               placeholder="Foglalkozás"
               type="text"
               value={profileForm.job}
               onChange={(e) =>
                  setProfileForm({ ...profileForm, job: e.target.value })
               }
            />
            <textarea
               placeholder="Bemutatkozás"
               rows="8"
               value={profileForm.bio}
               onChange={(e) =>
                  setProfileForm({ ...profileForm, job: e.target.value })
               }
            />
            <button className="button" type="submit">
               Adatok mentése
            </button>
         </form>
      </Modal>
   );
};

export default EditProfileModal;
