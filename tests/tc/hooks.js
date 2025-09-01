import { RequestLogger } from 'testcafe';
import { cfg } from '../../config/env.js';
import { Logger } from '../../src/utils/logger.js';

export const apiLogger = RequestLogger(
  { url: `${cfg.baseUrl}/*`, method: /GET|POST|PUT|PATCH|DELETE/i },
  { logRequestBody: true, logResponseBody: true, stringifyRequestBody: true }
);

export function makeLogger(t, suite, test) {
  const l = new Logger({ suite, test });
  t.ctx.logger = l;
  return l;
}
