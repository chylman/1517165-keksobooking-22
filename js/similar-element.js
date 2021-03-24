const OFFER_TYPE = {
  ru: {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  },
  minPrice: {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0,
  },
}

const PhotoSize = {
  WIDTH: '45',
  HEIGHT: '40',
}

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();

const createSimilarAd = (ad) => {
  const similarAd = similarAdTemplate.cloneNode(true);
  const { title, adress, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
  const { avatar } = ad.author;

  if (title) {
    similarAd.querySelector('.popup__title').textContent = title;
  } else {
    similarAd.querySelector('.popup__title').classList.add('hidden');
  }

  if (adress) {
    similarAd.querySelector('.popup__text--address').textContent = adress.location;
  } else {
    similarAd.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (price){
    similarAd.querySelector('.popup__text--price').textContent = price + ' ₽/ночь';
  } else {
    similarAd.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (OFFER_TYPE.ru[type]) {
    similarAd.querySelector('.popup__type').textContent = OFFER_TYPE.ru[type];
  } else {
    similarAd.querySelector('.popup__type').classList.add('hidden');
  }

  if (rooms && guests) {
    similarAd.querySelector('.popup__text--capacity').textContent = rooms + ' комнаты для ' + guests + ' гостей ';
  } else {
    similarAd.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (checkin && checkout) {
    similarAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
  } else {
    similarAd.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (features) {
    const popupFeatures = similarAd.querySelector('.popup__features');
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    features.forEach(element => {
      const popupFeature = document.createElement('li');
      popupFeature.classList.add('popup__feature', 'popup__feature--' + element);
      popupFeatures.appendChild(popupFeature);
    });
  } else {
    similarAd.querySelector('.popup__features').classList.add('hidden');
  }

  if (description) {
    similarAd.querySelector('.popup__description').textContent = description;
  } else {
    similarAd.querySelector('.popup__description').classList.add('hidden');
  }

  similarAd.querySelector('.popup__photos').removeChild(similarAd.querySelector('.popup__photo'));

  if (photos) {
    photos.forEach(photo => {
      const popupPhoto = document.createElement('img');
      popupPhoto.classList.add('.popup__photo');
      popupPhoto.src = photo;
      popupPhoto.width = PhotoSize.WIDTH;
      popupPhoto.height = PhotoSize.HEIGHT;
      similarAd.querySelector('.popup__photos').append(popupPhoto);
    });} else {
    similarAd.querySelector('.popup__photos').classList.add('hidden');
  }

  if (avatar) {
    similarAd.querySelector('.popup__avatar.popup__avatar').src = avatar;
  } else {
    similarAd.querySelector('.popup__avatar.popup__avatar').classList.add('hidden');
  }

  return similarListFragment.appendChild(similarAd);
}

export { createSimilarAd, OFFER_TYPE }
