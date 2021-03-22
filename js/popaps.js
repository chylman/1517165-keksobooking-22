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

  successfulMessage.addEventListener('click', () => {
    successfulMessage.remove();
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.key === Keys.ESCAPE ||evt.key === Keys.ESC) {
      successfulMessage.remove();
    }
  }, {once: true});

  resetMainMarker();

  return main.appendChild(successfulMessage);
}

const displayErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = errorMessage.querySelector('.error__button');

  errorMessageButton.addEventListener('click', () => {
    errorMessage.remove();
  }, {once: true});

  document.addEventListener('keydown', (evt) => {
    if (evt.key === Keys.ESCAPE ||evt.key === Keys.ESC) {
      errorMessage.remove();
    }
  }, {once: true});

  return main.appendChild(errorMessage);
}

const displayGetDataErrorMessage = () => {
  const getDataError = getDataErrorTemplate.cloneNode(true);

  getDataError.addEventListener('click', () => {
    getDataError.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === Keys.ESCAPE ||evt.key === Keys.ESC) {
      getDataError.remove();
    }
  }, {once: true});

  return main.appendChild(getDataError);
}

export { displayErrorMessage, displaySuccessfulMessage, displayGetDataErrorMessage };
