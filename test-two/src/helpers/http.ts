import fetch from "node-fetch";

type PossibleErrors = { Message: string };

export const request = async <T>(url: string, requestInit = {}) => {
  const response = await fetch(url, {
    ...requestInit,
  });

  const json = await response.json();

  if (response.status === 200) {
    return json as T;
  } else {
    const error = json as PossibleErrors;
    throw Error(error.Message ?? error);
  }
}

export const get = async <T>(url: string, requestInit = {}) => {
  return await request<T>(url, {
    ...requestInit,
    method: "GET"
  });
};

export const post = async <T>(url: string, requestInit = {}) => {
  return await request<T>(url, {
    ...requestInit,
    method: "POST"
  });
}

export type RequestFactoryFn<T> = (pageSize: number, current: number) => Promise<T>

export const joinPaginatedRequests = async <T>(
  total: number,
  pageSize: number,
  getter: RequestFactoryFn<T>,
): Promise<T[]> => {
  const maxPages = Math.ceil(total / pageSize);
  const requests = [];

  for (let index = 0; index < maxPages; index++) {
    requests.push(
      getter(pageSize, index)
    );
  }

  const results = await Promise.all(requests) as T[][];

  return results
    .filter(result => result)
    .reduce((prev, curr) => [
      ...prev,
      ...curr
    ], []);
};