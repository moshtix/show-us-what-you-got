import { go } from "./index.js";
import * as logger from "./helpers/logger";
import * as gitHubService from "./services/github";

const mockLogger = logger as typeof logger & { log: jest.Mock };
jest.mock("./helpers/logger", () => ({
  log: jest.fn(),
}));

const mockGhSrv = gitHubService as typeof gitHubService & {
  getUsersForOrganisation: jest.Mock
};

jest.mock("./services/github", () => ({
  getUsersForOrganisation: jest.fn(),
}));

beforeEach(() => {
  mockGhSrv.getUsersForOrganisation.mockReset();
  mockLogger.log.mockReset();
});

test("go logged users from github service", async () => {
  const expectedOutput = `Username: a\nUsername: b\nUsername: c\n`;

  const users = [{ login: "a" }, { login: "b" }, { login: "c" }];

  mockGhSrv.getUsersForOrganisation.mockImplementationOnce(() => Promise.resolve(users));

  await go();

  expect(mockLogger.log).toBeCalledWith(expectedOutput);
});

test("go logged error", async () => {
  mockGhSrv.getUsersForOrganisation.mockImplementationOnce(() => Promise.reject(Error("error")));

  await go();

  expect(mockLogger.log).toBeCalledWith("error");
});
