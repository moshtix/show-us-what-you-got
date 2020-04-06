import { log } from "./helpers/logger";

export const go = async () => {
  let i;
  let output = "";

  for (i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      output = output + "BossHog";
    } else if (i % 5 === 0) {
      output = output + "Hog";
    } else if (i % 3 === 0) {
      output = output + "Boss";
    } else {
      output = output + i;
    }
  }

  await log(output);
};

go();
