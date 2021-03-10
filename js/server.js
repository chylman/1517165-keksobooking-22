import { displayGetDataErrorMessage } from './popaps.js';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error();
}

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(displayGetDataErrorMessage);

}

const sendData = (onSuccess, onFail, body) => {

  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
}

export { getData, sendData }
