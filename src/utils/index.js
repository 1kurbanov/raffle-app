// Получение случайного числа в интервале. Максимум не включается, минимум включается

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

// Проверка на возможность продолжения розыгрыша

export function isContinue(count, max, maxWinners) {
  for (let i = 1; i < maxWinners + 1; i++) {
    if (count + i <= max) return true;
  }
  return false;
}

// Получение максимально возможных элементов
export function getMaxElementsForContinue(count, max, maxWinners) {
  if (max - count > maxWinners) return maxWinners;
  return max - count;
}
