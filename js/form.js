import { OFFER_TYPE } from './date.js';
import { resetMainMarker } from './map.js';
import { sendData } from './server.js';
import { displaySuccessfulMessage, displayErrorMessage } from './popaps.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const ROOM_FOR_NOT_GUEST = 100;


const adForm = document.querySelector('.ad-form');
const selectAdType = adForm.querySelector('#type');
const inputAdPrice = adForm.querySelector('#price');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');
const inputAdTitle = adForm.querySelector('#title');
const selectRooms = adForm.querySelector('#room_number')
const optionRooms = selectRooms.querySelectorAll('option');
const selectCapacity = adForm.querySelector('#capacity');
const optionCapacity = selectCapacity.querySelectorAll('option');

const { minPrice } = OFFER_TYPE;

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

const setMinPrice = () =>  {
  const minPriceKeys = Object.keys(minPrice);
  minPriceKeys.forEach(element => {
    if (element === selectAdType.value) {
      inputAdPrice.placeholder = minPrice[element];
      inputAdPrice.min = minPrice[element];
    }
  });
};

const displayMinMaxSymbolCount = (element) => {
  if (element.validity.tooShort) {
    element.setCustomValidity('Минимальное количество символов ' + MIN_TITLE_LENGTH + '. Осталось ввести ' + (MIN_TITLE_LENGTH - element.textLength));
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Максимальное количество символов '+ MAX_TITLE_LENGTH  + '. Удалить лишние ' + (element.textLength - MAX_TITLE_LENGTH));
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Обязательное поле');
  } else element.setCustomValidity('');
}

const synchronizeRoomGuest = () => {
  optionRooms.forEach(room => {
    if (room.selected) {
      optionCapacity[optionCapacity.length - 1].disabled = true;
      optionCapacity.forEach(capacity => {
        if (Number(capacity.value) > Number(room.value)) {
          capacity.disabled = true;
        } else if (Number(capacity.value) > 0) {
          capacity.disabled = false;
        }

        if (Number(room.value) === ROOM_FOR_NOT_GUEST) {
          if (Number(capacity.value) > 0) {
            capacity.disabled = true;
          }
        }
      });
    }
  });
}

synchronizeRoomGuest();


selectRooms.addEventListener('change', () => {
  synchronizeRoomGuest();
});

setUserFormSubmit(displaySuccessfulMessage, displayErrorMessage);

adForm.addEventListener('reset', () => {
  resetMainMarker();
});

selectTimeIn.addEventListener('change', () => {
  selectTimeOut.value = selectTimeIn.value;
});

selectTimeOut.addEventListener('change', () => {
  selectTimeIn.value = selectTimeOut.value;
});

selectAdType.addEventListener('change', setMinPrice);

inputAdTitle.addEventListener('input', () => {
  displayMinMaxSymbolCount(inputAdTitle);
  inputAdTitle.reportValidity();
})
