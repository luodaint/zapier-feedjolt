'use strict';

const includeBearerToken = (request, z, bundle) => {
  request.headers = request.headers || {};
  request.headers.Accept = 'application/json';
  // Stable UA — api.feedjolt.com sits behind Cloudflare; bare/missing UA can 403 intermittently
  request.headers['User-Agent'] = 'Feedjolt-Zapier/1.0 (+https://www.feedjolt.com)';

  if (bundle.authData && bundle.authData.api_key) {
    request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
  }

  return request;
};

const handleBadResponses = (response, z) => {
  if (response.status === 401) {
    throw new z.errors.Error(
      'The Feedjolt API key you supplied is incorrect.',
      'AuthenticationError',
      response.status,
    );
  }

  return response;
};

module.exports = {
  befores: [includeBearerToken],
  afters: [handleBadResponses],
};
