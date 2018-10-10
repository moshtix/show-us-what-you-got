import { log } from "./helpers/logger";

export const go = async () => {
  const bossHog = num => {
    let output = "";

    for (let i = 1; i <= num; i++) {
      if (i % 5 === 0 && i % 3 === 0) {
        output += "BossHog\n";
      } else if (i % 5 === 0) {
        output += "Hog\n";
      } else if (i % 3 === 0) {
        output += "Boss\n"
      } else {
        output += `${i}\n`;
      }
    }

    return output;
  }

  await log(bossHog(100));
};

go();
