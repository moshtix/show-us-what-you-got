import { go } from "./index";
import * as logger from "./helpers/logger";
import * as gitHubService from "./services/github";

jest.mock("./helpers/logger", () => ({
  log: jest.fn(),
}));

jest.mock("./services/github", () => ({
  getUsersForOrganisation: jest.fn(),
}));

beforeEach(() => {
  gitHubService.getUsersForOrganisation.mockReset();
  logger.log.mockReset();
});

test("go logged users from github service", async () => {
  const expectedOutput = `Username: a\nUsername: b\nUsername: c\n`;

  const users = [{ login: "a" }, { login: "b" }, { login: "c" }];

  gitHubService.getUsersForOrganisation.mockImplementationOnce(() => Promise.resolve(users));

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});

test("go logged error", async () => {
  gitHubService.getUsersForOrganisation.mockImplementationOnce(() => Promise.reject(Error("error")));

  await go();

  expect(logger.log).toBeCalledWith("error");
});
