import { go, checkDivisibility } from "./index";
import * as logger from "./helpers/logger";

test("logged the correct output", async () => {
  const expectedOutput =
`1\n2\nBoss\n4\nHog\nBoss\n7\n8\nBoss\nHog\n11\nBoss\n13\n14\nBossHog
16\n17\nBoss\n19\nHog\nBoss\n22\n23\nBoss\nHog\n26\nBoss\n28\n29\nBossHog
31\n32\nBoss\n34\nHog\nBoss\n37\n38\nBoss\nHog\n41\nBoss\n43\n44\nBossHog
46\n47\nBoss\n49\nHog\nBoss\n52\n53\nBoss\nHog\n56\nBoss\n58\n59\nBossHog
61\n62\nBoss\n64\nHog\nBoss\n67\n68\nBoss\nHog\n71\nBoss\n73\n74\nBossHog
76\n77\nBoss\n79\nHog\nBoss\n82\n83\nBoss\nHog\n86\nBoss\n88\n89\nBossHog
91\n92\nBoss\n94\nHog\nBoss\n97\n98\nBoss\nHog\n`;

  logger.log = jest.fn();

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});

test("returns the correct result for numbers divisible by 5 and 3", async () => {
  const expectedOutput = "BossHog";
  const testNumbers = [15, 30, 45, 60, 75, 90];

  testNumbers.forEach(number => {
    expect(checkDivisibility(number)).toBe(expectedOutput);
  })
});

test("returns the correct result for numbers divisible by 5", async () => {
  const expectedOutput = "Hog";
  const testNumbers = [5, 10, 20, 25, 35, 40];

  testNumbers.forEach(number => {
    expect(checkDivisibility(number)).toBe(expectedOutput);
  })
});

test("returns the correct result for numbers divisible by 3", async () => {
  const expectedOutput = "Boss";
  const testNumbers = [3, 6, 9, 12, 18, 21];

  testNumbers.forEach(number => {
    expect(checkDivisibility(number)).toBe(expectedOutput);
  })
});

test("returns the correct result for numbers not divisible by either", async () => {
  const testNumbers = [1, 2, 4, 7, 8, 11];

  testNumbers.forEach(number => {
    expect(checkDivisibility(number)).toBe(number);
  })
});
