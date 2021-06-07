import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";



const baseUrl = "https://api.github.com/";
const organisationId = "google";
const gitHubApiAuthToken = process.env.ACCESSS_TOKEN; // add your GitHub API OAuth key here to increase request limit

const MAX_PER_PAGE = 100; // max users per page is 100 ; default is 30
var page = 1; // start from first page
const allUsers =[]; // initialise the array to store all users in it

export const go = async () => {
  try {
    var users = await getUsersForOrganisation(
      baseUrl,
      gitHubApiAuthToken,
      organisationId,
      MAX_PER_PAGE,
      page
    );
    var length = MAX_PER_PAGE
    while(length === MAX_PER_PAGE){
      // go through all the pages MAX Users per page is 100
      // when length  < 100 we are in the last page hence exit the loop
       users = await getUsersForOrganisation(
        baseUrl,
        gitHubApiAuthToken,
        organisationId,
        MAX_PER_PAGE,
        page
      );
      length = users.length;
      for(var user of users){
        allUsers.push(user); // add  each user from the users list to allUsers array
      }
      page++;   // go to the next page
    }
   console.log('All Users: '+allUsers.length)
    const output = allUsers.reduce((result, user) => {
      return `${result}Username: ${user.login}\n`;
    }, "");

    log(output);
  } catch (error) {
    await log(error.message);
  }
};

go();