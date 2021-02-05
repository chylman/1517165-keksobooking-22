//Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Функция, возвращающая случайное число c плавающей точкой из переданного диапазона включительно

const getRandomFloatInclusive = (min, max, numberDigits) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min) + min).toFixed(numberDigits);
}

// Генерация массива случайных объектов

const AD_COUNT = 10;

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const OFFER_CHECKTIME = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

//Получение массива случайной длины
const getRandomLenghtArr = (arr) => {
  let randomLenghtArr = arr;
  return randomLenghtArr.slice(0, getRandomIntInclusive(0, randomLenghtArr.length));
}

const createNearbyAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomIntInclusive(1,8) + '.png',
    },

    offer: {
      title: 'Заголовок',
      adress: {
        location: 'location.' + getRandomIntInclusive(1,1000) + ', location.' + getRandomIntInclusive(1,1000),
      },
      price: getRandomIntInclusive(1,100000),
      type: OFFER_TYPE[getRandomIntInclusive(0, OFFER_TYPE.length - 1)],
      rooms: getRandomIntInclusive(1,100),
      guests: getRandomIntInclusive(1,100),
      checkin: OFFER_CHECKTIME[getRandomIntInclusive(0, OFFER_CHECKTIME.length - 1)],
      checkout: OFFER_CHECKTIME[getRandomIntInclusive(0, OFFER_CHECKTIME.length - 1)],
      features: getRandomLenghtArr(OFFER_FEATURES),
      description: 'О локации: ',
      photos: OFFER_PHOTOS[getRandomIntInclusive(0, OFFER_PHOTOS.length - 1)],
    },

    location: {
      x: getRandomFloatInclusive(35.65000, 35.70000, 5),
      y: getRandomFloatInclusive(139.70000, 139.80000, 5),
    },
  }
}

const nearbyAds = new Array(AD_COUNT).fill(null).map(() => createNearbyAd());

nearbyAds;
