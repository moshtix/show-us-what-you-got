import fetch from "node-fetch";

export const request = async (url, requestInit = {}) => {
  const response = await fetch(url, {
    ...requestInit,
  });

  const json = await response.json();

  if (response.status === 200) {
    return json;
  } else {
    const error = json.message || json.Message || json;
    throw Error(error);
  }
}

export const get = async (url, requestInit = {}) => {
  return await request(url, {
    ...requestInit,
    method: "GET"
  });
};

export const post = async (url, requestInit = {}) => {
  return await request(url, {
    ...requestInit,
    method: "POST"
  });
}

export const joinPaginatedRequests = async (
  total,
  pageSize,
  getter,
) => {
  let i = 0;
  let maxPages = Math.ceil(total / pageSize);
  const requests = [];

  for (let index = 0; index < maxPages; index++) {
    requests.push(
      getter(pageSize, index)
    );
  }

  const results = await Promise.all(requests);

  return results
    .filter(result => result)
    .reduce((prev, curr) => [
      ...prev,
      ...curr
    ], []);
};