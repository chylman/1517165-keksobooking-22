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

getRandomIntInclusive();

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

getRandomFloatInclusive();
