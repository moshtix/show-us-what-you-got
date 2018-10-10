import { get } from "../helpers/http";

const getAuthenticationQueryString = async apiAuthenticationToken =>
  `access_token=${apiAuthenticationToken}`;

export const getUsersForOrganisation = async (
  baseUrl,
  apiAuthenticationToken,
  organisationId,
  pageNumber
) => {
  return get(
    `${baseUrl}orgs/${organisationId}/members?page=${pageNumber}&per_page=100&${await getAuthenticationQueryString(
      apiAuthenticationToken
    )}`
  );
};
