import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

const baseUrl = "https://api.github.com/";
const organisationId = "google";
const gitHubApiAuthToken = "59d6a51636757100cae50bd5bc2739aabad30bcf";
export const pages = 23;

export const go = async () => {
  let output = "";
  let outputArray = [];
  let parallelCalls = [];

  const getPageOfUsers = async pageNumber => {
    try {
      const users = await getUsersForOrganisation(
        baseUrl,
        gitHubApiAuthToken,
        organisationId,
        pageNumber
      );

      outputArray.push(users.reduce((result, user) => {
        return `${result}Username: ${user.login}\n`;
      }, ""));
    } catch (error) {
      await log(error.message);
    }
  }

  // Create an array of API calls for each page of 100 results
  for (let i = 1; i <= pages; i++) {
    parallelCalls.push(getPageOfUsers(i));
  }
  
  Promise.all(parallelCalls).then(() => {
    outputArray.sort().forEach(entry => {
      output += entry;
    });
    log(output);
  });
};

go();
