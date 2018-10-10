import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

const baseUrl = "https://api.github.com/";
const organisationId = "google";
const gitHubApiAuthToken = "1f55a5198950f9517a7c35bc25ee124acde9831c";
const pages = 22;

export const go = async () => {
  let output = "";

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

  let parallellCalls = [];

  for (let i = 1; i <= pages; i++) {
    parallellCalls.push(getPageOfUsers(i));
  }

  try {
    await Promise.all(parallellCalls).then(() => {
      log(output);
    });
  } catch (error) {
    await log(error.message);
  }
};

go();
