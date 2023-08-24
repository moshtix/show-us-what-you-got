import { getUsersForOrganisation } from "./github";
import * as http from "../helpers/http";
import { joinPaginatedRequests } from "../helpers/http";

jest.mock("../helpers/http", () => ({
  get: jest.fn(),
  post: jest.fn(),
  joinPaginatedRequests: jest.fn(),
}));

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
  http.get.mockReset();
  http.post.mockReset();
  http.joinPaginatedRequests.mockReset();
});

test("the http get is called correctly", async () => {
  http.post.mockImplementationOnce(getRandomTotalOfUsersResponse);
  http.get.mockImplementationOnce(() => Promise.resolve(userData));

  await getUsersForOrganisation(
    baseGitHubUrl,
    "",
    organisationId
  );

  
  // 1 - get the first time is called
  const [firstCall] =
    http.joinPaginatedRequests.mock.calls;

  // 2 - the second param is a call to to the http.get function
  const httpGetfn = firstCall[2];
  
  // 3 - this will invoke the function.
  const response = await httpGetfn.apply();

  // 4 - get from the mock invokation, the headers
  const [_, { headers }] = http.get.mock.calls[0];

  expect(response).toEqual(userData);
});

test("appended authentication token to URL", async () => {
  const authToken = "secret";
  http.post.mockImplementationOnce(getRandomTotalOfUsersResponse);

  await getUsersForOrganisation(
    baseGitHubUrl,
    authToken,
    organisationId
  );

  // 1 - get the first time is called
  const [firstCall] =
    http.joinPaginatedRequests.mock.calls;

  // 2 - the second param is a call to to the http.get function
  const httpGetfn = firstCall[2];
  
  // 3 - this will invoke the function.
  // 3.1 - this fn has a reference to the authToken 
  await httpGetfn.apply();

  // 4 - get from the mock invokation, the headers
  const [_, { headers }] = http.get.mock.calls[0]

  expect(headers['Authorization']).toEqual(expect.stringContaining(authToken));
});

test("prepended base URL to URL", async () => {
  http.post.mockImplementationOnce(getRandomTotalOfUsersResponse);

  await getUsersForOrganisation(
    baseGitHubUrl,
    "",
    organisationId
  );

  // 1 - get the first time is called
  const [firstCall] =
    http.joinPaginatedRequests.mock.calls;

  // 2 - the second param is a call to to the http.get function
  const httpGetfn = firstCall[2];
  
  // 3 - this will invoke the function.
  // 3.1 - this fn has a reference to the url
  await httpGetfn.apply();

  // 4 - get from the mock invokation, the headers
  const [url] = http.get.mock.calls[0]

  expect(url).toEqual(
    expect.stringContaining(baseGitHubUrl)
  );
});


const getRandomTotalOfUsersResponse = async () => Promise.resolve({
  data: {
    organization: {
      membersWithRole: {
        // just so we can have a nice integer
        totalCount: Math.floor(Math.random() * 100)
      }
    }
  }
});