//Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomIntInclusive = function (min, max) {
  if (min < max) {
    Math.ceil (min);
    Math.floor (max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    alert('Некорректный диапазон')
  }
}

getRandomIntInclusive();

//Функция, возвращающая случайное число c плавающей точкой из переданного диапазона включительно

const getRandomFloatInclusive = function (min, max, numberDigits) {
  if (min < max) {
    Math.ceil (min);
    Math.floor (max);
    return +((Math.random() * (max - min + 1) + min).toFixed(numberDigits));
  } else {
    alert('Некорректный диапазон')
  }
}

getRandomFloatInclusive();
