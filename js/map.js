/* global L:readonly */

import { nearbyAds } from './date.js';
import { createSimilarAd } from './similar-element.js';

const formAd = document.querySelector('.ad-form');
const formMapFilters = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');
const inputAddress = document.querySelector('#address');

const switchingDisabledForms = () => {
  formAd.classList.toggle('ad-form--disabled');
  formMapFilters.classList.toggle('map__filters--disabled');

  const formAdChilds = formAd.childNodes;

  for (let i = 0; i < formAd.childNodes.length; i++) {
    formAdChilds[i].disabled = !formAdChilds[i].disabled;
  }

  const formMapFiltersChilds = formMapFilters.childNodes;

  for (let i = 0; i < formMapFiltersChilds.length; i++) {
    formMapFilters[i].disabled = !formMapFilters[i].disabled;
  }
}

switchingDisabledForms();

const map = L.map(mapCanvas).on('load', switchingDisabledForms)
  .setView({
    lat: 35.68495,
    lng: 139.75371,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon ({
  iconUrl : './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const mainMarker = L.marker ({
  lat: 35.68495,
  lng: 139.75371,
},
{
  draggable : true,
  icon : mainPinIcon,
},
)

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  inputAddress.value = coordinates.lat.toFixed(5) + ', ' + coordinates.lng.toFixed(5);
})

nearbyAds.forEach(ad => {
  const pinIcon = L.icon ({
    iconUrl : './img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  })

  const marker = L.marker ({
    lat : ad.location.x,
    lng: ad.location.y,
  },
  {
    icon: pinIcon,
  },
  )

  marker.addTo(map).bindPopup(createSimilarAd(ad));
});


