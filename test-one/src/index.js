import Logger from './helpers/logger';

let logger = new Logger();

export function bossHog(num) {
  let result;
  if (num % 3 === 0 && num % 5 === 0) {
    result = "BossHog";
  } else if (num % 3 === 0) {
    result = "Boss";
  } else if (num % 5 === 0) {
    result = "Hog";
  } else {
    result = num;
  }
  return result;
}


for (var i = 0; i <= 100; i++) {
  logger.log(bossHog(i));
}
