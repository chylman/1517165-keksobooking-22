/* global L:readonly */
/* global _:readonly */

import { createSimilarAd } from './similar-element.js';
import { getData } from './server.js';
import { filterData } from './filter.js';

const Main = {
  LAT: 35.64495,
  LNG: 139.78371,
};

const SCALE = 10;
const ICON_SIZE = [52, 52];
const ICON_ANCHOR =  [26, 52];
const MAIN_ICON_URL = './img/main-pin.svg';
const ICON_URL = './img/pin.svg';
const FIXED_NUMBER = 5;
const FILTER_DELAY = 500;

const adsForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');
const inputAddress = document.querySelector('#address');

const switchingDisabledForm = (form) => {
  const disabledClass = form.classList[0] + '--disabled';
  form.classList.toggle(disabledClass);

  const elementsForDisabled = Array.from(document.querySelector('.' + form.classList[0].toString()).childNodes);

  elementsForDisabled.forEach(element => {
    element.disabled = !element.disabled;
  });
}

switchingDisabledForm(adsForm);
switchingDisabledForm(mapFilterForm);

const map = L.map(mapCanvas).on('load', () => {switchingDisabledForm(adsForm)})
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

const resetMainMarker = () => {
  mainMarker.setLatLng([Main.LAT, Main.LNG]);
  inputAddress.value = Main.LAT + ', ' + Main.LNG;
}

mainMarker.addTo(map);
resetMainMarker();

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  inputAddress.value = coordinates.lat.toFixed(FIXED_NUMBER) + ', ' + coordinates.lng.toFixed(FIXED_NUMBER);
})

const pinIcon = L.icon ({
  iconUrl : ICON_URL,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
})

const layersMarkersDataAds = L.layerGroup([]);

const createIconAdMap = (ads) => {

  ads.forEach(element => {
    const marker = L.marker ({
      lat : element.location.lat,
      lng : element.location.lng,
    },
    {
      icon: pinIcon,
    },
    )

    layersMarkersDataAds.addLayer(marker.bindPopup(createSimilarAd(element)));
    addLayersAds(layersMarkersDataAds);
  });

  return layersMarkersDataAds;
}

const addLayersAds = (layers) => {
  layers.addTo(map);
}

const removeIconAdMap = () => {
  layersMarkersDataAds.remove();
  layersMarkersDataAds.clearLayers();
}

let copyData = [];

const onMapFiltredChange = () => {
  removeIconAdMap();
  createIconAdMap(filterData(copyData.slice()));

}

const onSuccessGet = (data) => {
  copyData = data.slice();

  createIconAdMap(copyData.slice());
  switchingDisabledForm(mapFilterForm);

  mapFilterForm.addEventListener('change', _.throttle(onMapFiltredChange, FILTER_DELAY))
}

getData(onSuccessGet);

export { resetMainMarker }
