import { go } from "./index";
import * as logger from "./helpers/logger";

test("number writer working", async () => {

  logger.log = jest.fn();

  await go();

  expect(logger.log).toHaveBeenCalledWith(1);
});

test("Boss writer working", async () => {

  const Boss = "Boss";

  logger.log = jest.fn();

  await go();

  expect(logger.log).toHaveBeenCalledWith(Boss);
});

test("Hog writer working", async () => {

  const Hog = "Hog"

  logger.log = jest.fn();

  await go();

  expect(logger.log).toHaveBeenCalledWith(Hog); 
});

test("BossHog writer working", async () => {

  const BossHog = "BossHog"

  logger.log = jest.fn();

  await go();

  expect(logger.log).toHaveBeenCalledWith(BossHog); 
});

//unsure if you want testing to be done however added as was part of the original script
//also unsure fully how to implement testing as this is the first time i have encountered it

//--------------------------------------------------------------------------------------//
//also attempted to use the nthCalled to test specific values however the call order was// 
//out of order and i was unsure what caused this.                                       //
//for instance the 2nd call to logger.log was done by 8, instead of 2.                  //
//this could be because of the testing done in logger-test but i am unsure as i dont    //
// understnad the systems used in that file                                             // 
//--------------------------------------------------------------------------------------//