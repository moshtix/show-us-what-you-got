import { BossHog } from "./index";
import * as logger from "./helpers/logger";

describe ("HogBoss Application", () => {

  test("should print BossHog as number is divisible by 3 and 5", async () => {
    let x = await BossHog(90);
    expect(x).toBe("BossHog");
  });
  test("should print Boss as number is divisible by 3", async () => {
    let x = await BossHog(9);
    expect(x).toBe("Boss");
  });
  test("should print Hog as number is divisible by 5 ", async () => {
    let x = await BossHog(20);
    expect(x).toBe("Hog");
  });
  test("should print the number if not divisible by 3 or 5", async () => {
    let x = await BossHog(2);
    expect(x).toBe(2);
  });
})
