/* global L:readonly */

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
const DEFAULT_AD_COUNT = 10;

const adsForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');
const inputAddress = adsForm.querySelector('#address');

const debounce = (func, timeout) => {
  return function (args) {
    let previousCall = args.lastCall;
    args.lastCall = Date.now();
    if (previousCall && ((args.lastCall - previousCall) <= timeout)) {
      clearTimeout(args.lastCallTimer);
    }
    args.lastCallTimer = setTimeout(() => func(args), timeout);
  }
}

const switchDisabledForm = (form) => {
  const disabledClass = form.classList[0] + '--disabled';
  form.classList.toggle(disabledClass);

  const elementsForDisabled = Array.from(document.querySelector('.' + form.classList[0].toString()).childNodes);

  elementsForDisabled.forEach(element => {
    element.disabled = !element.disabled;
  });
}

switchDisabledForm(adsForm);
switchDisabledForm(mapFilterForm);

const map = L.map(mapCanvas).on('load', () => {switchDisabledForm(adsForm)})
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

  createIconAdMap(copyData.slice(0, DEFAULT_AD_COUNT));
  switchDisabledForm(mapFilterForm);

  mapFilterForm.addEventListener('change', debounce(onMapFiltredChange, FILTER_DELAY))
}

const resetIconAdMap = () => {
  removeIconAdMap();
  createIconAdMap(copyData.slice(0, DEFAULT_AD_COUNT));
}

getData(onSuccessGet);

export { resetMainMarker, resetIconAdMap }
