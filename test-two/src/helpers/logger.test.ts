import { log } from "./logger";

test("logged message", async () => {
  const message = "My test message.";

  const consoleLogSpy = jest
    .spyOn(global.console, "log")
    .mockImplementation(() => {});

  log(message);

  const [firstCall] = consoleLogSpy.mock.calls;

  if(!firstCall?.length) {
    fail("console.log was not called!");
  }

  expect(firstCall[0]).toEqual(message);

  consoleLogSpy.mockRestore();
});
