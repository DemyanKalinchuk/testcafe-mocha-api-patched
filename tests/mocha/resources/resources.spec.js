import { expect } from 'chai';
import { UseApiNode } from '../../../src/api/useApi.node.js';
import { Logger } from '../../../src/utils/logger.js';
import { paths } from '../../../src/paths/workPath.js';

describe('Resources (Mocha)', function() {
  it('GET /api/unknown', async function() {
    const logger = new Logger({ suite: 'resources_mocha', test: 'resources_list' });
    const api = new UseApiNode(logger);
    const res = await api.get(paths.resources);
    expect(res.status).to.equal(200);
    expect(res.data).to.have.property('data').that.is.an('array');
  });
});
