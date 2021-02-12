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

//Функция перемешивания массива

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Функция получения случайного элемента массива

const getRandomElementArray = (arr) => {
  return arr[getRandomIntInclusive(0, arr.length - 1)]
}

export {getRandomIntInclusive, getRandomFloatInclusive, shuffleArray, getRandomElementArray}
