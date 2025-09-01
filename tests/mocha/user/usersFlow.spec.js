import { expect } from 'chai';
import { UseApiNode } from '../../../src/api/useApi.node.js';
import { UseApiSteps } from '../../../src/steps/useApiSteps.js';
import { Logger } from '../../../src/utils/logger.js';

describe('User | Flow (Mocha)', function() {
  it('List users page 2', async function() {
    const logger = new Logger({ suite: 'user_mocha', test: 'users_list_page2' });
    const api = new UseApiNode(logger);
    const steps = new UseApiSteps(api, logger);
    const body = await steps.listUsers(2);
    expect(body).to.have.property('data').that.is.an('array');
  });
});
