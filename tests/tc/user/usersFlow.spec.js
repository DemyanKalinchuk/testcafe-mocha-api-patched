import { t } from 'testcafe';
import { UseApiTC } from '../../../src/api/useApi.tc.js';
import { UseApiSteps } from '../../../src/steps/useApiSteps.js';
import { makeLogger, apiLogger } from '../hooks.js';

fixture`User | Flow`
  .page`about:blank`
  .requestHooks(apiLogger);

test('List users and validate schema', async t => {
  const logger = makeLogger(t, 'user', 'users_list_page2');
  const api = new UseApiTC(t, logger);
  const steps = new UseApiSteps(api, logger);
  const body = await steps.listUsers(2);
  await t.expect(Array.isArray(body.data)).ok();
});
