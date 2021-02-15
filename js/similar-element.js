import { nearbyAds, OFFER_TYPE_RU } from './date.js';

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();

const createSimilarAd = (ad) => {
  const similarAd = similarAdTemplate.cloneNode(true);
  const { title, adress, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
  const { avatar } = ad.author;

  similarAd.querySelector('.popup__title').textContent = title;
  similarAd.querySelector('.popup__text--address').textContent = adress.location;
  similarAd.querySelector('.popup__text--price').textContent = price + ' ₽/ночь';
  similarAd.querySelector('.popup__type').textContent = OFFER_TYPE_RU[type];
  similarAd.querySelector('.popup__text--capacity').textContent = rooms + ' комнаты для ' + guests + ' гостей ';
  similarAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
  similarAd.querySelector('.popup__features').textContent = features.join(', ');
  similarAd.querySelector('.popup__description').textContent = description;

  similarAd.querySelector('.popup__photos').removeChild(similarAd.querySelector('.popup__photo'));
  photos.forEach(photo => {
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('.popup__photo');
    popupPhoto.src = photo;
    popupPhoto.width = 45;
    popupPhoto.height = 40;
    similarAd.querySelector('.popup__photos').append(popupPhoto);
  });

  similarAd.querySelector('.popup__avatar.popup__avatar').src = avatar;

  return similarListFragment.appendChild(similarAd);
}

const similarListElement = document.querySelector('#map-canvas');

similarListElement.appendChild(createSimilarAd(nearbyAds[0]));

