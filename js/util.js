const ADS_COUNT = 10;

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

const Price = {
  MIN: 100,
  MAX: 10000,
}

const Location = {
  MIN: 1,
  MAX: 1000,
}

const Rooms = {
  MIN: 1,
  MAX: 100,
}

const Guests = {
  MIN: 1,
  MAX: 100,
}

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

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getRandomElementArray = (arr) => {
  return arr[getRandomIntInclusive(0, arr.length - 1)]
}

const createNearbyAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomIntInclusive(1,8) + '.png',
    },

    offer: {
      title: 'Заголовок',
      adress: {
        location: getRandomIntInclusive(Location.MIN,Location.MAX) + ', ' + getRandomIntInclusive(Location.MIN,Location.MAX),
      },
      price: getRandomIntInclusive(Price.MIN, Price.MAX),
      type: getRandomElementArray(OFFER_TYPE),
      rooms: getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
      guests: getRandomIntInclusive(Guests.MIN, Guests.MAX),
      checkin: getRandomElementArray(OFFER_CHECKTIME),
      checkout: getRandomElementArray(OFFER_CHECKTIME),
      features: shuffleArray(OFFER_FEATURES).slice(0, getRandomIntInclusive(1, OFFER_FEATURES.length - 1)),
      description: 'О локации: ',
      photos: getRandomElementArray(OFFER_PHOTOS),
    },

    location: {
      x: getRandomFloatInclusive(35.65000, 35.70000, 5),
      y: getRandomFloatInclusive(139.70000, 139.80000, 5),
    },
  }
}

const nearbyAds = new Array(ADS_COUNT).fill(null).map(() => createNearbyAd());

export{ nearbyAds };
