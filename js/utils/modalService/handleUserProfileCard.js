import { createUserProfileModal } from '../../modalsUI/createMarkupUserProfile.js';

export function handleUserProfileCard(user) {
  const readerInfoBtn = document.querySelectorAll('.js-profile-btn');
  readerInfoBtn.forEach((btn) => btn.addEventListener('click', () => {
    createUserProfileModal(user);    
  }));
}