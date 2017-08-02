import Logger from './helpers/logger';
import { BossHog } from './helpers/bosshog';

let logger = new Logger();

for (let i = 1; i <= 100; i++) {
  logger.log(BossHog(i));
}