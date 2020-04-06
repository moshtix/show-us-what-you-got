import { log } from "./helpers/logger";

export const go = async () => {
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("BossHog");
    } else if (i % 5 === 0) {
      console.log("Hog");
    } else if (i % 3 === 0) {
      console.log("Boss");
    } else {
      console.log(i);
    }
  }

  const welcomeMessage =
    "Congrats, you're up and running! Welcome to the first moshtix code challenge! " +
    "Please replace this message with your solution and feel free to add " +
    "or modify other files as necessary. Good luck : )";

  await log(welcomeMessage);
};

go();
