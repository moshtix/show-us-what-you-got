import { log } from "./helpers/logger";

const isMultiple = (val, by) => {
  return (val % by === 0)
}

export const BossHog = (val) => {
  switch (true) {
    case isMultiple(val, 15): 
    // 15 is the first disviable number of 3 and 5 
    // -> anything % 15 means it's / by 3 & 5
      return "BossHog";
    case isMultiple(val, 3):
      return "Boss";
    case isMultiple(val, 5):
      return "Hog";
    default:
      return val;
  }
}

export const go = async (val) => {

  let i;
  let result = ""
  for(i = 1; i <= 100; i++) {
    result += BossHog(i) + " ";
  }

  await log(result);
};

go();
