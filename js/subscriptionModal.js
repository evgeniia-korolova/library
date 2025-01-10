import {
	openModal,	closeAllModals
} from './helpers.js';
import { handleLogin } from './login.js';

export function openSubscriptionModal() {
	openModal(`
		<div class="subscription-form" id="subscription-form">				
      
      <div class="subscription-form__header">
        <span class="close subscription-form__close">
          <img src="./images/close_btn-white.svg" alt="close" />
        </span>
        <div class="subscription-form__title">Buy a library card</div>
      </div>

      <div class="subscription-form__content">				
        <form class="card-details" id="card-details">
          <!-- Поле для номера карты -->
          <div class="form__field">
            <label for="bank">Bank card number</label>
            <input
              required
              type="text"
              name="bank"
              maxlength="16"
              class="buy__input"
              id="bank"
            />
          </div>

          <!-- Поле для срока действия карты -->
          <div class="form__field">
            <label>Expiration code</label>
            <div class="double-input">
              <input
                required
                id="month"
                type="text"
                name="month"
                maxlength="2"
                class="buy__input buy__input_multiple"
                
              />
              <input
                required
                id="year"
                type="text"
                name="year"
                maxlength="2"
                class="buy__input buy__input_multiple"
                
              />
            </div>
          </div>

          <!-- Поле для CVC -->
          <div class="form__field">
            <label for="cvc">CVC</label>
            <input
              required
              type="text"
              name="cvc"
              maxlength="3"
              class="buy__input"
              id="cvc"
            />
          </div>

          <!-- Поле для имени держателя карты -->
          <div class="form__field">
            <label for="cardholder">Cardholder name</label>
            <input
              required
              type="text"
              name="cardholder"
              maxlength="50"
              class="buy__input"
              id="cardholder"
            />
          </div>

          <!-- Поле для почтового индекса -->
          <div class="form__field">
            <label for="postalCode">Postal code</label>
            <input
              required
              type="text"
              name="postal"
              maxlength="6"
              class="buy__input"
              id="postalCode"
            />
          </div>

          <!-- Поле для города -->
          <div class="form__field">
            <label for="place">City / Town</label>
            <input
              required
              type="text"
              name="place"
              maxlength="50"
              class="buy__input"
              id="place"
            />
          </div>

          <!-- Кнопка покупки и цена -->
          <div class="subscription-form__price-wrapper">
            <button class="btn-outlined btn-small" type="button" id="subscribe-btn">Buy</button>
            <p class="subscription-form__price">$ 25.00</p>
          </div>
        </form>

        <!-- Информационный блок справа -->
        <div class="subscription-form__info">          
          If you live, work, attend school, or pay property taxes in New York State, 
          you can get a $25 digital library card right now using this online form. 
          Visitors to New York State can also use this form to apply for a temporary card.
          
        </div>
      </div>
    </div>
`);

	document
      .querySelector('.close')
      .addEventListener('click', closeAllModals);
}


