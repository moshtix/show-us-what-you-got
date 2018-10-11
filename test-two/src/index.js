import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

const baseUrl = "https://api.github.com/";
const organisationId = "google";
const gitHubApiAuthToken = "cf33f5689e7e8399aadb5cbaae8ef51bc2be7c66"; // add your GitHub API OAuth key here to increase request limit

/*
  I was unable to get my program to work in the desired way but I managed a very
  low quality version.

  My initial plan was to iterate through the program, everytime the response headers
  had a link with 'rel=next' I would loop.
  Or I would take the page number from 'rel=last' and loop that many times.
  But I was unable to access the data in the header as I think it is a nested
  java object and it kept returning "undefined".

  So I manually found the last page which ended up being 72, so I just iterated
  that many times.

*/


export const go = async () => {
  var pagenum;
  for(pagenum=1; pagenum < 73; pagenum++){
  try {
    const users = await getUsersForOrganisation(
      baseUrl,
      gitHubApiAuthToken,
      organisationId,
      pagenum
    );


    const output = users.reduce((result, user) => {

      return `${result}Username: ${user.login}\n`;
    }, "");

    log(output);
    pagenum++;
  } catch (error) {
    await log(error.message);
  }
}

};


go();
