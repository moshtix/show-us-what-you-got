import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

/**
 * This file was left as JS intentionally, to show the interoperability 
 * ts -js and vice-versa, which is a common scenario during a migration
 */

const baseUrl = "https://api.github.com/";
const organisationId = "google";
// I have a token, i can provide if you want
const gitHubApiAuthToken = "";

const writeUpUsers = (users) => {
  return users.reduce((result, user) => {
    return `${result}Username: ${user.login}\n`;
  }, "");
}

export const go =  async () => {
  const appName = `"${organisationId}" GitHub Organization members fetching system`;
  try {
    log(`Welcome to the ${appName}!`);

    const fetchingUsers = getUsersForOrganisation(
      baseUrl,
      gitHubApiAuthToken,
      organisationId
    );

    log(`Fetching all members from "${organisationId}"...`);
    
    const users = await fetchingUsers;

    log(`We found ${users.length} members under "${organisationId}"`);

    const output = writeUpUsers(users);
    
    log(output);

    log(`Thank you so much for using the ${appName}`);
  } catch (error) {
    log(error.message);
  }
};

go();
