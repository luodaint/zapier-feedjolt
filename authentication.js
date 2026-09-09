'use strict';

const { feedjoltRequest, unwrapCollection } = require('./lib/http');

// GET /workspaces is available to every valid workspace API key.
const test = async (z) => {
  const response = await feedjoltRequest(z, { path: '/workspaces' });
  const workspaces = unwrapCollection(response.data, ['workspaces']);

  if (!workspaces.length) {
    throw new z.errors.Error(
      'This API key did not return any workspaces. Check Settings → API keys.',
      'AuthenticationError',
      response.status,
    );
  }

  const workspace = workspaces[0];
  return {
    id: workspace.id,
    name: workspace.name,
    slug: workspace.slug,
  };
};

// Never include the API key. Prefer workspace name + slug from the test call.
const connectionLabel = (z, bundle) => {
  const name = bundle.inputData.name;
  const slug = bundle.inputData.slug;
  if (name && slug) {
    return `${name} (${slug})`;
  }
  return name || slug || 'Feedjolt';
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText:
        'Create a workspace API key in Feedjolt **Settings → API keys**. Keys start with `fjk_`. See the [Feedjolt developer docs](https://www.feedjolt.com/en/docs/developers).',
    },
  ],
  test,
  connectionLabel,
};
