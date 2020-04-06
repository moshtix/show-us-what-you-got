import { go } from "./index";
import * as logger from "./helpers/logger";

test("Print out correct output", async () => {
  const expectedOutput =
    "12Boss4HogBoss78BossHog11Boss1314BossHog1617Boss19HogBoss2223BossHog26Boss2829BossHog3132Boss34HogBoss3738BossHog41Boss4344BossHog4647Boss49HogBoss5253BossHog56Boss5859BossHog6162Boss64HogBoss6768BossHog71Boss7374BossHog7677Boss79HogBoss8283BossHog86Boss8889BossHog9192Boss94HogBoss9798BossHog";

  logger.log = jest.fn();

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});
