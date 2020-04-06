import { go, BossHog } from "./index";
import * as logger from "./helpers/logger";

test("Should print out complete BossHog output", async () => {
  const expectedOutput =
    "12Boss4HogBoss78BossHog11Boss1314BossHog1617Boss19HogBoss2223BossHog26Boss2829BossHog3132Boss34HogBoss3738BossHog41Boss4344BossHog4647Boss49HogBoss5253BossHog56Boss5859BossHog6162Boss64HogBoss6768BossHog71Boss7374BossHog7677Boss79HogBoss8283BossHog86Boss8889BossHog9192Boss94HogBoss9798BossHog";
  logger.log = jest.fn();
  await go();
  expect(logger.log).toBeCalledWith(expectedOutput);
});

test("Multiples of 3 should print Boss", async () => {
  const expectedOutput = "Boss";
  let result = BossHog(33);
  expect(result).toEqual(expectedOutput);
});

test("Multiples of 5 should print Hog", async () => {
  const expectedOutput = "Hog";
  let result = BossHog(10);
  expect(result).toEqual(expectedOutput);
});

test("Multiples of both 3 and 5 should print BossHog", async () => {
  const expectedOutput = "BossHog";
  let result = BossHog(45);
  expect(result).toEqual(expectedOutput);
});

test("Number is NOT multiples of either 3 or 5 should print the number itself", async () => {
  const expectedOutput = 1;
  let result = BossHog(1);
  expect(result).toEqual(expectedOutput);
});

test("Number is NOT multiples of either 3 or 5 should print the number itself", async () => {
  const expectedOutput = 22;
  let result = BossHog(22);
  expect(result).toEqual(expectedOutput);
});
