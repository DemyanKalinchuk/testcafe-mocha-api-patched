import { t } from 'testcafe';
import { UseApiTC } from '../../../src/api/useApi.tc.js';
import { makeLogger, apiLogger } from '../hooks.js';
import { paths } from '../../../src/paths/workPath.js';

fixture`Resources`
  .page`about:blank`
  .requestHooks(apiLogger);

test('GET /api/unknown — resources available', async t => {
  const logger = makeLogger(t, 'resources', 'resources_list');
  const api = new UseApiTC(t, logger);
  const res = await api.get(paths.resources);
  await t.expect(res.status).eql(200);
  await t.expect(Array.isArray(res.body.data)).ok();
});
