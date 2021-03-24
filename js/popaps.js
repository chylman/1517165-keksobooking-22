import { resetMainMarker } from './map.js';

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
}

const successfulMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const getDataErrorTemplate = document.querySelector('#error-get-data').content.querySelector('.error');
const main = document.querySelector('main');



const displaySuccessfulMessage = () => {
  const successfulMessage = successfulMessageTemplate.cloneNode(true);

  const onSuccessfulMessageCloseClick = () => {
    successfulMessage.remove();
  };

  const onDocumentSuccessfullCloseKeydown = (evt) => {
    if (evt.key === Keys.ESCAPE ||evt.key === Keys.ESC) {
      successfulMessage.remove();
    }
  };

  successfulMessage.addEventListener('click', onSuccessfulMessageCloseClick);

  document.addEventListener('keydown', onDocumentSuccessfullCloseKeydown, {once: true});

  resetMainMarker();

  return main.appendChild(successfulMessage);
}

const displayErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = errorMessage.querySelector('.error__button');

  const onErrorMessageButtonClick = () => {
    errorMessage.remove();
  };

  const onDocumentErrorCloseKeydown = (evt) => {
    if (evt.key === Keys.ESCAPE ||evt.key === Keys.ESC) {
      errorMessage.remove();
    }
  };

  errorMessageButton.addEventListener('click', onErrorMessageButtonClick, {once: true});

  document.addEventListener('keydown', onDocumentErrorCloseKeydown, {once: true});

  return main.appendChild(errorMessage);
}

const displayGetDataErrorMessage = () => {
  const getDataError = getDataErrorTemplate.cloneNode(true);

  const onGetDataErrorCloseClick = () => {
    getDataError.remove();
  }

  const onDocumentGetDataErrorCloseKeydown = (evt) => {
    if (evt.key === Keys.ESCAPE ||evt.key === Keys.ESC) {
      getDataError.remove();
    }
  }

  getDataError.addEventListener('click', onGetDataErrorCloseClick);

  document.addEventListener('keydown', onDocumentGetDataErrorCloseKeydown, {once: true});

  return main.appendChild(getDataError);
}

export { displayErrorMessage, displaySuccessfulMessage, displayGetDataErrorMessage };
