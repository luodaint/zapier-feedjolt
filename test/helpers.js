'use strict';

const nock = require('nock');
const zapier = require('zapier-platform-core');

const App = require('../index');
const { BASE_URL } = require('../lib/constants');

const appTester = zapier.createAppTester(App);

const AUTH_KEY = 'fjk_test_not_a_real_key';

const authBundle = (inputData = {}) => ({
  authData: { api_key: AUTH_KEY },
  inputData,
});

const api = () =>
  nock('https://api.feedjolt.com', {
    reqheaders: {
      authorization: `Bearer ${AUTH_KEY}`,
      accept: 'application/json',
    },
  });

module.exports = {
  App,
  appTester,
  AUTH_KEY,
  authBundle,
  api,
  BASE_URL,
};
