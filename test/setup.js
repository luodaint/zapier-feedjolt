'use strict';

const nock = require('nock');

nock.disableNetConnect();

afterEach(() => {
  if (!nock.isDone()) {
    const pending = nock.pendingMocks();
    nock.cleanAll();
    throw new Error(`Unused HTTP mocks: ${pending.join(', ')}`);
  }
  nock.cleanAll();
});
