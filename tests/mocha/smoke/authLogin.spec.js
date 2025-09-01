import { expect } from 'chai';
import { UseApiNode } from '../../../src/api/useApi.node.js';
import { UseApiSteps } from '../../../src/steps/useApiSteps.js';
import { Logger } from '../../../src/utils/logger.js';

describe('Smoke | Auth (Mocha)', function() {
  it('Login success', async function() {
    const logger = new Logger({ suite: 'smoke_mocha', test: 'login_success' });
    const api = new UseApiNode(logger);
    const steps = new UseApiSteps(api, logger);
    const token = await steps.login('eve.holt@reqres.in', 'cityslicka');
    expect(token).to.be.a('string').and.not.empty;
  });
});
