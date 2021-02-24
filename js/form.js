import { OFFER_TYPE } from './date.js';

const selectAdType = document.querySelector('#type');
const inputAdPrice = document.querySelector('#price');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

const { minPrice } = OFFER_TYPE;

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

