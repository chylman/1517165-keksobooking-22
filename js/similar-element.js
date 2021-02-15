import { nearbyAds } from './date.js';

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();

const createSimilarAd = (ad) => {
  const similarAd = similarAdTemplate.cloneNode(true);
  similarAd.querySelector('.popup__title').textContent = ad.offer.title;
  similarAd.querySelector('.popup__text--address').textContent = ad.offer.adress.location;
  similarAd.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';

  switch(ad.offer.type) {
    case 'flat':
      similarAd.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      similarAd.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      similarAd.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'palace':
      similarAd.querySelector('.popup__type').textContent = 'Дворец';
      break;
  }

  similarAd.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей ';
  similarAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  similarAd.querySelector('.popup__features').textContent = ad.offer.features.join(', ');
  similarAd.querySelector('.popup__description').textContent = ad.offer.description;

  similarAd.querySelector('.popup__photos').removeChild(similarAd.querySelector('.popup__photo'));
  ad.offer.photos.forEach(photo => {
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('.popup__photo');
    popupPhoto.src = photo;
    popupPhoto.width = 45;
    popupPhoto.height = 40;
    similarAd.querySelector('.popup__photos').append(popupPhoto);
  });

  similarAd.querySelector('.popup__avatar.popup__avatar').src = ad.author.avatar;

  return similarListFragment.appendChild(similarAd);
}

const similarListElement = document.querySelector('#map-canvas');

similarListElement.appendChild(createSimilarAd(nearbyAds[0]));

