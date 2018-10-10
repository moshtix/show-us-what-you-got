import { go, pages } from "./index";
import * as logger from "./helpers/logger";
import * as gitHubService from "./services/github";

test("go logged users from github service", async () => {
  const expectedOutput = `Username: a\nUsername: b\nUsername: c\n`;

  const users = [{ login: "a" }, { login: "b" }, { login: "c" }];

  logger.log = jest.fn();

  gitHubService.getUsersForOrganisation = jest.fn(() => users);

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput.repeat(pages));
});

test("go made the API call the correct number of times", async () => {
  gitHubService.getUsersForOrganisation = jest.fn();

  await go();

  expect(gitHubService.getUsersForOrganisation).toBeCalledTimes(22);
})

test("go logged error", async () => {
  logger.log = jest.fn();

  gitHubService.getUsersForOrganisation = jest.fn(() => {
    throw Error("error");
  });

  await go();

  expect(logger.log).toBeCalledWith("error");
});
