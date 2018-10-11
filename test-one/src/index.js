import { log } from "./helpers/logger";

export const go = async () => {
  // Your code should go here instead of the welcome message below. Create and modify additional files as necessary/appropriate.
  var message = "Result-Above";

  var test = "";

  var i;
  for(i = 1; i < 101; i++){

    if (i % 3 == 0 && i % 5 == 0){
      test += "BossHog" + "\n";
    }

    else if (i % 3 == 0) {
      test += "Boss" + "\n";
    }

    else if (i % 5 == 0) {
      test += "Hog" + "\n";
    }

    else{
    test += String(i) + "\n";
    }
  }

  console.log(test);


  await log(message);
};


go();
