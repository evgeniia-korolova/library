import { createUserProfileModal } from '../../modalsUI/createMarkupUserProfile.js';

export function handleUserProfileCard(user) {
  const readerInfoBtn = document.getElementById('readerInfoBtn');
  readerInfoBtn.addEventListener('click', () => {
        createUserProfileModal(user);
        console.log('createdProfileCard', user);
      });
}