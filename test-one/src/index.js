import { log } from "./helpers/logger";

export const BossHog = (num) => {
  if (num % 3 === 0 && num % 5 === 0) {
    return "BossHog";
  } else if (num % 5 === 0) {
    return "Hog";
  } else if (num % 3 === 0) {
    return "Boss";
  } else {
    return num;
  }
};

export const go = async () => {
  let output = "";
  for (let num = 1; num <= 100; num++) {
    output += BossHog(num);
  }
  await log(output);
};

go();
