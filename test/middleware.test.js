'use strict';

const { befores, afters } = require('../middleware');

const [includeBearerToken] = befores;
const [handleBadResponses] = afters;

describe('middleware', () => {
  it('sets Authorization Bearer and Accept from authData.api_key', () => {
    const request = includeBearerToken(
      { headers: {} },
      {},
      { authData: { api_key: 'fjk_example' } },
    );

    expect(request.headers.Authorization).toBe('Bearer fjk_example');
    expect(request.headers.Accept).toBe('application/json');
  });

  it('does not invent an Authorization header without a key', () => {
    const request = includeBearerToken({ headers: {} }, {}, { authData: {} });
    expect(request.headers.Authorization).toBeUndefined();
    expect(request.headers.Accept).toBe('application/json');
  });

  it('maps 401 to a user-facing authentication error', () => {
    const z = { errors: { Error } };
    expect(() => handleBadResponses({ status: 401 }, z)).toThrow(/incorrect/i);
  });
});
