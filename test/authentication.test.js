'use strict';

const { App, appTester, authBundle, api } = require('./helpers');
const { SAMPLE_WORKSPACE } = require('../lib/samples');

describe('authentication', () => {
  it('uses custom auth with api_key, not Zapier built-in API Key type', () => {
    expect(App.authentication.type).toBe('custom');
    expect(App.authentication.fields[0].key).toBe('api_key');
  });

  it('tests GET /workspaces and returns workspace name/slug only', async () => {
    api().get('/api/v1/workspaces').reply(200, [SAMPLE_WORKSPACE]);

    const result = await appTester(App.authentication.test, authBundle());

    expect(result).toEqual({
      id: SAMPLE_WORKSPACE.id,
      name: SAMPLE_WORKSPACE.name,
      slug: SAMPLE_WORKSPACE.slug,
    });
    expect(JSON.stringify(result)).not.toMatch(/fjk_/);
  });

  it('unwraps {workspaces: [...]} list responses', async () => {
    api()
      .get('/api/v1/workspaces')
      .reply(200, { workspaces: [SAMPLE_WORKSPACE], total: 1 });

    const result = await appTester(App.authentication.test, authBundle());
    expect(result.slug).toBe('acme');
  });

  it('builds a connection label from name and slug, never the key', async () => {
    const label = await appTester(App.authentication.connectionLabel, {
      authData: { api_key: 'fjk_should_never_appear' },
      inputData: { name: 'Acme', slug: 'acme' },
    });

    expect(label).toBe('Acme (acme)');
    expect(label).not.toMatch(/fjk_/);
  });

  it('fails on bad auth', async () => {
    api().get('/api/v1/workspaces').reply(401, { detail: 'Unauthorized' });

    await expect(appTester(App.authentication.test, authBundle())).rejects.toThrow(
      /API key you supplied is incorrect/i,
    );
  });
});
