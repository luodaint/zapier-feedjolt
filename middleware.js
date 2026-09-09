'use strict';

const includeBearerToken = (request, z, bundle) => {
  request.headers = request.headers || {};
  request.headers.Accept = 'application/json';

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
