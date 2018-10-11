import { go } from "./index";
import * as logger from "./helpers/logger";

test("logged welcome message", async () => {
  const expectedOutput = "Result-Above"
  ;

  logger.log = jest.fn();

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});
