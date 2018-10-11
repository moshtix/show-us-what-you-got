import { log } from "./helpers/logger";

export const checkDivisibility = num => {
  return (num % 15 === 0) ?
    "BossHog" : (num % 5 === 0) ?
      "Hog" : (num % 3 === 0) ?
        "Boss" : num;
}

export const go = async () => {
  let output = "";

  for (let i = 1; i <= 100; i++) {
    output += `${checkDivisibility(i)}\n`;
  }

  await log(output);
};

go();
