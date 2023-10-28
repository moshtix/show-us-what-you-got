import { getUsersForOrganisation } from "./github";
import * as http from "../helpers/http";

jest.mock("../helpers/http", () => ({
  get: jest.fn(),
  post: jest.fn(),
  joinPaginatedRequests: jest.fn(),
}));

const mockHttp = {
  get: http.get as jest.Mock,
  post: http.post as jest.Mock,
  joinPaginatedRequests: http.joinPaginatedRequests as jest.Mock,
};

const baseGitHubUrl = "https://api.github.com/";

const organisationId = "facebook";

const userData = [
  {
    userId: "one"
  },
  {
    userId: "two"
  },
  {
    userId: "three"
  }
];

beforeEach(() => {  
  mockHttp.get.mockReset();
  mockHttp.post.mockReset();
  mockHttp.joinPaginatedRequests.mockReset();
});

test("the http get is called correctly", async () => {
  mockHttp.post.mockImplementationOnce(getRandomTotalOfUsersResponse);
  mockHttp.get.mockImplementationOnce(() => Promise.resolve(userData));

  await getUsersForOrganisation(
    baseGitHubUrl,
    "",
    organisationId
  );

  
  // 1 - get the first time is called
  const [firstCall] =
    mockHttp.joinPaginatedRequests.mock.calls;

  // 2 - the second param is a call to to the mockHttp.get function
  const httpGetfn = firstCall[2];
  
  // 3 - this will invoke the function.
  const response = await httpGetfn.apply();

  expect(response).toEqual(userData);
});

test("appended authentication token to URL", async () => {
  const authToken = "secret";
  mockHttp.post.mockImplementationOnce(getRandomTotalOfUsersResponse);

  await getUsersForOrganisation(
    baseGitHubUrl,
    authToken,
    organisationId
  );

  // 1 - get the first time is called
  const [firstCall] =
    mockHttp.joinPaginatedRequests.mock.calls;

  // 2 - the second param is a call to to the http.get function
  const httpGetfn = firstCall[2];
  
  // 3 - this will invoke the function.
  // 3.1 - this fn has a reference to the authToken 
  await httpGetfn.apply();

  // 4 - get from the mock invokation, the headers
  const [, { headers }] = mockHttp.get.mock.calls[0]

  expect(headers['Authorization']).toEqual(expect.stringContaining(authToken));
});

test("prepended base URL to URL", async () => {
  mockHttp.post.mockImplementationOnce(getRandomTotalOfUsersResponse);

  await getUsersForOrganisation(
    baseGitHubUrl,
    "",
    organisationId
  );

  // 1 - get the first time is called
  const [firstCall] =
    mockHttp.joinPaginatedRequests.mock.calls;

  // 2 - the second param is a call to to the http.get function
  const httpGetfn = firstCall[2];
  
  // 3 - this will invoke the function.
  // 3.1 - this fn has a reference to the url
  await httpGetfn.apply();

  // 4 - get from the mock invokation, the headers
  const [url] = mockHttp.get.mock.calls[0]

  expect(url).toEqual(
    expect.stringContaining(baseGitHubUrl)
  );
});


const getRandomTotalOfUsersResponse = async () => Promise.resolve({
  data: {
    organization: {
      membersWithRole: {
        // just so we can have a nice integer
        totalCount: Math.floor(Math.random() * 100 + 1)
      }
    }
  }
});