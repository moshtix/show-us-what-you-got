import { go } from "./index";
import * as logger from "./helpers/logger";

// test("logged welcome message", async () => {
//   const expectedOutput =
//     "Congrats, you're up and running! Welcome to the first moshtix code challenge! Please replace this message with your solution and feel free to add or modify other files as necessary. Good luck : )";

//   logger.log = jest.fn();

//   await go();

//   expect(logger.log).toBeCalledWith(expectedOutput);
// });

// introduce new test here
test("Prints Hog, Boss and HogBoss", async () => {
  
  const result = " "
  logger.log = jest.fn();

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});
