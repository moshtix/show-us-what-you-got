import { log } from "./logger";

test("logged message", async () => {
  const message = "My test message.";

  const consoleLogSpy = jest
    .spyOn(global.console, "log")
    .mockImplementation(() => {});

  log(message);

  expect(consoleLogSpy.mock.calls[0][0]).toEqual(message);

  consoleLogSpy.mockRestore();
});
