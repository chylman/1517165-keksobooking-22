/* global L:readonly */

import { createSimilarAd } from './similar-element.js';
import { getData } from './server.js';

const SCALE = 10;

const Main = {
  LAT: 35.64495,
  LNG: 139.78371,
};

const ICON_SIZE = [52, 52];
const ICON_ANCHOR =  [26, 52];
const MAIN_ICON_URL = './img/main-pin.svg';
const ICON_URL = './img/pin.svg';
const FIXED_NUMBER = 5;

const formElementsForDisabled = Array.from(document.querySelector('.ad-form').childNodes).concat(Array.from(document.querySelector('.map__filters').childNodes));

const mapCanvas = document.querySelector('#map-canvas');
const inputAddress = document.querySelector('#address');

const switchingDisabledForms = () => {
  document.querySelector('.ad-form').classList.toggle('ad-form--disabled');
  document.querySelector('.map__filters').classList.toggle('map__filters--disabled');

  formElementsForDisabled.forEach(element => {
    element.disabled = !element.disabled;
  });
}

switchingDisabledForms();

const map = L.map(mapCanvas).on('load', switchingDisabledForms)
  .setView({
    lat: Main.LAT,
    lng: Main.LNG,
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon ({
  iconUrl : MAIN_ICON_URL,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
})

const mainMarker = L.marker ({
  lat: Main.LAT,
  lng: Main.LNG,
},
{
  draggable : true,
  icon : mainPinIcon,
},
)

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  inputAddress.value = coordinates.lat.toFixed(FIXED_NUMBER) + ', ' + coordinates.lng.toFixed(FIXED_NUMBER);
})

const resetMainMarker = () => {
  mainMarker.setLatLng([Main.LAT, Main.LNG]);
  inputAddress.value = Main.LAT + ', ' + Main.LNG;
}

resetMainMarker();

const pinIcon = L.icon ({
  iconUrl : ICON_URL,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
})

getData((ads) => {
  addIconAdMap(ads);
})

const addIconAdMap = (ads) => {
  ads.forEach(element => {
    const marker = L.marker ({
      lat : element.location.lat,
      lng: element.location.lng,
    },
    {
      icon: pinIcon,
    },
    )

    marker.addTo(map).bindPopup(createSimilarAd(element));
  });
}

export { addIconAdMap, resetMainMarker, inputAddress, Main }
