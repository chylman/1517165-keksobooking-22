import { OFFER_TYPE } from './similar-element.js';
import { resetMainMarker, resetIconAdMap } from './map.js';
import { sendData } from './server.js';
import { displaySuccessfulMessage, displayErrorMessage } from './popaps.js';
import { removePreviewImage } from './image-form.js';

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
const buttonReset = adForm.querySelector('.ad-form__reset');
const filterForm = document.querySelector('.map__filters');


const { minPrice } = OFFER_TYPE;

const setUserFormSubmit = (onSuccess, onFail) => {

  const onAdFormSubmit = (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );

  }

  adForm.addEventListener('submit', onAdFormSubmit);
}

const onSelectAdTypeChange = () =>  {
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
  } else {
    element.setCustomValidity('')
  }
}

const synchronizeRoomGuest = () => {
  optionCapacity[optionCapacity.length - 1].disabled = true;
  optionRooms.forEach(room => {
    if (room.selected) {
      optionCapacity.forEach(capacity => {
        if (Number(room.value) === Number(capacity.value)) {
          capacity.selected = true
        }

        if (Number(capacity.value) > Number(room.value)) {
          capacity.disabled = true;
        } else if (Number(capacity.value) > 0) {
          capacity.disabled = false;
        }

        if (Number(room.value) === ROOM_FOR_NOT_GUEST) {
          if (Number(capacity.value) > 0) {
            capacity.disabled = true;
          } else {
            capacity.selected = true;
            capacity.disabled = false;
          }
        }
      });
    }
  });
}

synchronizeRoomGuest();

const onSelectTimeInChange = () => {
  selectTimeOut.value = selectTimeIn.value;
};

const onSelectTimeOutChange = () => {
  selectTimeIn.value = selectTimeOut.value;
};

const onInputAdTitleInput = () => {
  displayMinMaxSymbolCount(inputAdTitle);
  inputAdTitle.reportValidity();
}

const onButtonResetClick = (evt) => {
  evt.preventDefault();
  adForm.reset();
  filterForm.reset();
  resetMainMarker();
  resetIconAdMap();
  onSelectAdTypeChange();
  removePreviewImage();
}

const onSelectRoomsValueChange = () => {
  synchronizeRoomGuest();
}

selectRooms.addEventListener('change', onSelectRoomsValueChange);

setUserFormSubmit(displaySuccessfulMessage, displayErrorMessage);

buttonReset.addEventListener('click', onButtonResetClick);

selectTimeIn.addEventListener('change', onSelectTimeInChange);

selectTimeOut.addEventListener('change', onSelectTimeOutChange);

selectAdType.addEventListener('change', onSelectAdTypeChange);

inputAdTitle.addEventListener('input', onInputAdTitleInput);


export { adForm, onSelectAdTypeChange, filterForm };
