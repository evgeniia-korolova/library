import { unsubscribe } from './unsubscribe.js';

export function addUnsubscribeHandler(user) {
  const unsubscribeBtn = document.querySelector('.unsubscribeBtn');
  console.log('unsubscribeBtn', unsubscribeBtn);
   // Убедись, что кнопка имеет id "unsubscribeBtn"
  
  unsubscribeBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to unsubscribe?')) {
      unsubscribe(user);

    }
  });
}