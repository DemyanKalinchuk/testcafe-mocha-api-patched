import { t } from 'testcafe';
import { UseApiTC } from '../../../src/api/useApi.tc.js';
import { UseApiSteps } from '../../../src/steps/useApiSteps.js';
import { apiLogger, makeLogger } from '../hooks.js';

fixture`Smoke | Auth`
  .page`about:blank`
  .requestHooks(apiLogger);

test('Login success', async t => {
  const logger = makeLogger(t, 'smoke', 'login_success');
  const api = new UseApiTC(t, logger);
  const steps = new UseApiSteps(api, logger);
  const token = await steps.login('eve.holt@reqres.in', 'cityslicka');
  await t.expect(!!token).ok('Token should be present');
});
