import { log } from "./helpers/logger";

const isDivisibleBy = (num, mod) => {
  return num % mod === 0;
}

export const main = (num) => {
  switch(true) {
    case isDivisibleBy(num, 15): return "BossHog";
    case isDivisibleBy(num,  3): return "Boss";
    case isDivisibleBy(num,  5): return "Hog";
    default:                
      return num;
  }
}

export const go = async (num) => {
  const array = Array.from({length: 100}, (v, i) => main(i+1));
  const result = array.join().replace(/,/g, " ");
  await log(result);
};

go();
