import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

const baseUrl = "https://api.github.com/";
const organisationId = "google";
const gitHubApiAuthToken = "1f55a5198950f9517a7c35bc25ee124acde9831c";
export const pages = 22; // There are 2144 users so 22 pages are sufficient

export const go = async () => {
  let output = "";
  let parallellCalls = [];

  const getPageOfUsers = async pageNumber => {
    const users = await getUsersForOrganisation(
      baseUrl,
      gitHubApiAuthToken,
      organisationId,
      pageNumber
    );

    output += users.reduce((result, user) => {
      return `${result}Username: ${user.login}\n`;
    }, "");
  }

  // Create an array of API calls for each page of 100 results
  for (let i = 1; i <= pages; i++) {
    parallellCalls.push(getPageOfUsers(i));
  }

  try {
    // Perform the API calls simultaneously and log results when finished
    await Promise.all(parallellCalls).then(() => {
      log(output);
    });
  } catch (error) {
    await log(error.message);
  }
};

go();
