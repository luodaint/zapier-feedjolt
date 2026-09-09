'use strict';

const { App, appTester, authBundle, api } = require('./helpers');
const { SAMPLE_POST, SAMPLE_CHANGELOG, SAMPLE_STATUS } = require('../lib/samples');

describe('creates', () => {
  it('creates a post on a board', async () => {
    api()
      .post('/api/v1/workspaces/acme/boards/feature-requests/posts', {
        title: 'Add dark mode',
        body: 'Please add a dark theme.',
        is_internal: false,
      })
      .reply(201, SAMPLE_POST);

    const result = await appTester(
      App.creates.create_post.operation.perform,
      authBundle({
        workspace_slug: 'acme',
        board_slug: 'feature-requests',
        title: 'Add dark mode',
        body: 'Please add a dark theme.',
        is_internal: false,
      }),
    );

    expect(result.id).toBe(SAMPLE_POST.id);
    expect(result.title).toBe(SAMPLE_POST.title);
  });

  it('updates a post status', async () => {
    const updated = { ...SAMPLE_POST, status_id: SAMPLE_STATUS.id };

    api()
      .put(`/api/v1/workspaces/acme/posts/${SAMPLE_POST.id}/status`, {
        status_id: SAMPLE_STATUS.id,
      })
      .reply(200, updated);

    const result = await appTester(
      App.creates.update_post_status.operation.perform,
      authBundle({
        workspace_slug: 'acme',
        post_id: SAMPLE_POST.id,
        status_id: SAMPLE_STATUS.id,
      }),
    );

    expect(result.status_id).toBe(SAMPLE_STATUS.id);
  });

  it('creates a changelog entry', async () => {
    api()
      .post('/api/v1/workspaces/acme/changelog', {
        title: 'September release',
        body: 'Dark mode is now available in settings.',
      })
      .reply(201, SAMPLE_CHANGELOG);

    const result = await appTester(
      App.creates.create_changelog.operation.perform,
      authBundle({
        workspace_slug: 'acme',
        title: 'September release',
        body: 'Dark mode is now available in settings.',
      }),
    );

    expect(result.id).toBe(SAMPLE_CHANGELOG.id);
  });
});
