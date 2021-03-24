import { displayGetDataErrorMessage } from './popaps.js';
import { adForm, onSelectAdTypeChange, filterForm } from './form.js';
import { resetMainMarker, resetIconAdMap } from './map.js';
import { removePreviewImage } from './image-form.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error();
}

const getData = (onSuccess) => {
  fetch(GET_DATA_URL)
    .then(checkStatus)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(displayGetDataErrorMessage);

}

const sendData = (onSuccess, onFail, body) => {

  fetch(POST_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then(checkStatus)
    .then(() => {
      onSuccess();
      adForm.reset();
      filterForm.reset();
      resetMainMarker();
      resetIconAdMap();
      onSelectAdTypeChange();
      removePreviewImage();
    })
    .catch(() => {
      onFail();
    })
}

export { getData, sendData }
