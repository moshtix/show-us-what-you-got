import { get } from "../helpers/http";

const getAuthenticationQueryString = async apiAuthenticationToken =>
  `?access_token=${apiAuthenticationToken}`;

/*
  I updated the get call to also include the page number
*/

export const getUsersForOrganisation = async (
  baseUrl,
  apiAuthenticationToken,
  organisationId,
  pagenum
) => {
  return get(
    `${baseUrl}orgs/${organisationId}/members${await getAuthenticationQueryString(
      apiAuthenticationToken
    )}&page=${pagenum}`
  );
};
