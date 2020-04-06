import { log } from "./helpers/logger";

export const go = async () => {
  // Your code should go here instead of the welcome message below. Create and modify additional files as necessary/appropriate.
  const array = Array.from({length: 100}, (v, i) => i+1);
  
  let result = ''

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 3 === 0 && array[i] % 5 === 0) {
      result += 'BossHog ';
    } else if (array[i] % 3 === 0) {
      result += 'Boss ';
    } else if (array[i] % 5 === 0) {
      result += 'Hog ';
    } else {
      result += `${array[i]} `;
    }
  };

  log(result);
  
  const welcomeMessage =
    "Congrats, you're up and running! Welcome to the first moshtix code challenge! " +
    "Please replace this message with your solution and feel free to add " +
    "or modify other files as necessary. Good luck : )";

  await log(welcomeMessage);
};

go();
