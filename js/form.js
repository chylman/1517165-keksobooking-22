import { OFFER_TYPE } from './date.js';
import { resetMainMarker } from './map.js';
import { sendData } from './server.js';

const adForm = document.querySelector('.ad-form');
const selectAdType = document.querySelector('#type');
const inputAdPrice = document.querySelector('#price');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const successfulMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');

const { minPrice } = OFFER_TYPE;

const displaySuccessfulMessage = () => {
  const successfulMessage = successfulMessageTemplate.cloneNode(true);

  successfulMessage.addEventListener('click', () => {
    successfulMessage.remove();
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      successfulMessage.remove();
    }
  })

  resetMainMarker();

  return main.appendChild(successfulMessage);
}

const displayErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      errorMessage.remove();
    }
  })

  return main.appendChild(errorMessage);
}

const setUserFormSubmit = (onSuccess, onFail) => {

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );

  })
}

setUserFormSubmit(displaySuccessfulMessage, displayErrorMessage);

adForm.addEventListener('reset', () => {
  resetMainMarker();
});

const setMinPrice = () =>  {
  const minPriceKeys = Object.keys(minPrice);
  minPriceKeys.forEach(element => {
    if (element === selectAdType.value) {
      inputAdPrice.placeholder = minPrice[element];
      inputAdPrice.min = minPrice[element];
    }
  });
};

selectTimeIn.addEventListener('change', () => {
  selectTimeOut.value = selectTimeIn.value;
})

selectTimeOut.addEventListener('change', () => {
  selectTimeIn.value = selectTimeOut.value;
})

selectAdType.addEventListener('change', setMinPrice);

