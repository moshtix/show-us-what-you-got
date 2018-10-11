import { get } from "./http";
import * as fetch from "node-fetch";

test("returned request without error", async () => {
  const message = { one: "one" };

  fetch.default = jest.fn(() => ({
    status: 200,
    json: () => message
  }));

  const response = await get("http://google.com", {
    headers: { sample: "two" }
  });

  expect(response).toEqual(message);
});

test("failed on error", async () => {
  const message = { Message: "error" };

  fetch.default = jest.fn(() => ({
    status: 500,
    json: () => message
  }));

  expect(
    get("http://google.com", {
      headers: { sample: "one" }
    })
  ).rejects.toEqual(new Error(message.Message));
});
