import { get } from "../helpers/http";

const getAuthenticationQueryString = async apiAuthenticationToken =>
  `?access_token=${apiAuthenticationToken}`;

export const getUsersForOrganisation = async (
  baseUrl,
  apiAuthenticationToken,
  organisationId,
  max_per_page,
  page
) => {
  return get(
    `${baseUrl}orgs/${organisationId}/members?&${await getAuthenticationQueryString(
      apiAuthenticationToken
    )}&page=${page}&per_page=${max_per_page}`
  );
};
