import { get, joinPaginatedRequests, post } from "../helpers/http";

const PAGE_SIZE = 100;

const getAuthHeader = apiToken => ({
  Authorization: `Bearer ${apiToken}`,
});

export const getUsersForOrganisation = async (
  baseUrl,
  apiToken,
  orgId
) => {
  const totalUsers =
    await getTotalUsers(apiToken, orgId);

  return await joinPaginatedRequests(
    totalUsers,
    PAGE_SIZE,
    (pageSize, current) => {
      return get(
      `${baseUrl}orgs/${orgId}/members?per_page=${pageSize}&page=${current}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(apiToken),
        },
      }
    )}
  )
};

const getTotalUsers = async (
  apiAuthenticationToken,
  organisationId
) => {
  
    const response = await post('https://api.github.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(apiAuthenticationToken),
      },
      body: JSON.stringify({
        query: `query {
          organization(login: "${organisationId}") {
            membersWithRole {
              totalCount
            }
          }
        }
      `})
    });  
    
    if(
      response
      && response.data
      && response.data.organization
      && response.data.organization.membersWithRole
      && response.data.organization.membersWithRole.totalCount
    ) {
      return response.data.organization.membersWithRole.totalCount;
    }

    throw new Error(`Could not find total of members in ${organisationId}`);
}