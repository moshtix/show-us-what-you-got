import { get, joinPaginatedRequests, post } from "../helpers/http";

const PAGE_SIZE = 100;

const getAuthHeader = (apiToken: string) => ({
  Authorization: `Bearer ${apiToken}`,
});

export const getUsersForOrganisation = async (
  baseUrl: string,
  apiToken: string,
  orgId: string
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
  apiToken: string,
  organisationId: string
) => {
  
    const response = await post<CountResponse>('https://api.github.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(apiToken),
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
    
    if(response?.data?.organization?.membersWithRole?.totalCount) {
      return response.data.organization.membersWithRole.totalCount;
    }

    throw new Error(`Could not find total of members in ${organisationId}`);
}

type CountResponse = {
  data: {
    organization: {
      membersWithRole: {        
        totalCount: number
      }
    }
  }
}