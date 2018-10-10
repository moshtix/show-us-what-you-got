import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

const baseUrl = "https://api.github.com/";
const organisationId = "google";
const gitHubApiAuthToken = ""; // add your GitHub API OAuth key here to increase request limit
var pageNumber;

export const go = async () => {

    for (pageNumber = 1; pageNumber <= 23; pageNumber++) {
        try {
            const users = await getUsersForOrganisation(
                baseUrl,
                gitHubApiAuthToken,
                organisationId,
                pageNumber
            );

            const output = users.reduce((result, user) => {
                return `${result}Username: ${user.login}\n`;
            }, "");

            log(output);
        } catch (error) {
            await log(error.message);
        }
    }

};

go();
