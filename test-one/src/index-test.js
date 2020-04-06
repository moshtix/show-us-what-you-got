import { go } from "./index";
import * as logger from "./helpers/logger";

test(`It should return "BossHog" when the number is a multiple of three and five,
"Boss" when it's a multiple of 3 and "Hog" when it's a multiple of 5`, async () => {
  const expectedOutput =
    "1 2 Boss 4 Hog Boss 7 8 Boss Hog 11 Boss 13 14 BossHog 16 17 Boss 19 Hog Boss 22 23 Boss Hog " +  
    "26 Boss 28 29 BossHog 31 32 Boss 34 Hog Boss 37 38 Boss Hog 41 Boss 43 44 BossHog 46 47 Boss 49 Hog " + 
    "Boss 52 53 Boss Hog 56 Boss 58 59 BossHog 61 62 Boss 64 Hog Boss 67 68 Boss Hog 71 Boss 73 74 BossHog " + 
    "76 77 Boss 79 Hog Boss 82 83 Boss Hog 86 Boss 88 89 BossHog 91 92 Boss 94 Hog Boss 97 98 Boss Hog";

  logger.log = jest.fn();

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});
