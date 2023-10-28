import { get, post, joinPaginatedRequests } from "./http";
import * as fetch from 'node-fetch'

jest.mock('node-fetch', () => jest.fn())

const mockFetch = fetch as unknown as jest.Mock;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("get fn", () => {
  test("returned request without error", async () => {
    const message = { one: "one" };
  
    mockFetch.mockImplementationOnce(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(message)
    }));
  
    const response = await get("http://google.com", {
      headers: { sample: "one" }
    });
  
    expect(response).toEqual(message);
  });
  
  test("failed on error", async () => {
    const message = { Message: "error" };
  
    mockFetch.mockImplementationOnce(() => Promise.resolve({
      status: 500,
      json: () => message
    }));
  
    expect(
      get("http://google.com", {
        headers: { sample: "one" }
      })
    ).rejects.toEqual(new Error(message.Message));
  });
});

describe("post fn", () => {
  test("returned request without error", async () => {
    const message = { one: "one" };
  
    mockFetch.mockImplementationOnce(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(message)
    }));
  
    const response = await post("http://google.com", {
      headers: { sample: "one" }
    });
  
    expect(response).toEqual(message);
  });
  
  test("failed on error", async () => {
    const message = { Message: "error" };
  
    mockFetch.mockImplementationOnce(() => Promise.resolve({
      status: 500,
      json: () => message
    }));
  
    expect(
      post("http://google.com", {
        headers: { sample: "one" }
      })
    ).rejects.toEqual(new Error(message.Message));
  });
});

describe('joinPaginatedRequests', () => {
  it('joins paginated requests correctly', async () => {
    const mockFetch = jest.fn();
    mockFetch.mockResolvedValueOnce([1, 2, 3]); // Mock data for page 0
    mockFetch.mockResolvedValueOnce([4, 5, 6]); // Mock data for page 1

    const total = 6;
    const pageSize = 3;

    const result = await joinPaginatedRequests(total, pageSize, mockFetch);

    expect(mockFetch).toHaveBeenCalledTimes(2); // Two requests made
    expect(mockFetch).toHaveBeenCalledWith(pageSize, 0); // First request with page 0
    expect(mockFetch).toHaveBeenCalledWith(pageSize, 1); // Second request with page 1
    expect(result).toEqual([1, 2, 3, 4, 5, 6]); // Combined results
  });

  it('handles total being less than pageSize', async () => {
    const mockFetch = jest.fn();
    mockFetch.mockResolvedValueOnce([1, 2, 3]);

    const total = 2;
    const pageSize = 3;

    const result = await joinPaginatedRequests(total, pageSize, mockFetch);
    expect(mockFetch).toHaveBeenCalledTimes(1); // One request made
    expect(mockFetch).toHaveBeenCalledWith(pageSize, 0); // Request with page 0
    expect(result).toEqual([1, 2, 3]); // Combined results
  });
});
