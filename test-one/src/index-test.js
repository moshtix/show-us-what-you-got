import { go } from "./index";
import * as logger from "./helpers/logger";

test("logged welcome message", async () => {
  const expectedOutput =
    "1\n2\nBoss\n4\nHog\nBoss\n7\n8\nBoss\nHog\n11\nBoss\n13\n14\nBossHog\n16\n17\nBoss\n19\nHog\nBoss\n22\n23\nBoss\nHog\n26\nBoss\n28\n29\nBossHog\n31\n32\nBoss\n34\nHog\nBoss\n37\n38\nBoss\nHog\n41\nBoss\n43\n44\nBossHog\n46\n47\nBoss\n49\nHog\nBoss\n52\n53\nBoss\nHog\n56\nBoss\n58\n59\nBossHog\n61\n62\nBoss\n64\nHog\nBoss\n67\n68\nBoss\nHog\n71\nBoss\n73\n74\nBossHog\n76\n77\nBoss\n79\nHog\nBoss\n82\n83\nBoss\nHog\n86\nBoss\n88\n89\nBossHog\n91\n92\nBoss\n94\nHog\nBoss\n97\n98\nBoss\nHog\n";

  logger.log = jest.fn();

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});
