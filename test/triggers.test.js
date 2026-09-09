'use strict';

const { App, appTester, authBundle, api } = require('./helpers');
const { SAMPLE_POST } = require('../lib/samples');

describe('triggers', () => {
  it('polls New Post newest-first and returns items with id', async () => {
    api()
      .get('/api/v1/workspaces/acme/posts')
      .query({ sort_by: 'newest', page_size: 20 })
      .reply(200, { posts: [SAMPLE_POST], total: 1, page: 1, page_size: 20 });

    const results = await appTester(
      App.triggers.new_post.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(SAMPLE_POST.id);
    expect(results[0].title).toBe(SAMPLE_POST.title);
  });

  it('filters New Post by board_id when provided', async () => {
    api()
      .get('/api/v1/workspaces/acme/posts')
      .query({
        sort_by: 'newest',
        page_size: 20,
        board_id: SAMPLE_POST.board_id,
      })
      .reply(200, { posts: [SAMPLE_POST], total: 1, page: 1, page_size: 20 });

    const results = await appTester(
      App.triggers.new_post.operation.perform,
      authBundle({
        workspace_slug: 'acme',
        board_id: SAMPLE_POST.board_id,
      }),
    );

    expect(results[0].board_id).toBe(SAMPLE_POST.board_id);
  });

  it('lists workspaces for the hidden dropdown', async () => {
    api()
      .get('/api/v1/workspaces')
      .reply(200, [{ id: 'w1', name: 'Acme', slug: 'acme' }]);

    const results = await appTester(
      App.triggers.workspace.operation.perform,
      authBundle(),
    );

    expect(results[0].slug).toBe('acme');
    expect(results[0].name).toBe('Acme');
  });

  it('lists boards for a workspace dropdown', async () => {
    api()
      .get('/api/v1/workspaces/acme/boards')
      .reply(200, [
        { id: 'b1', slug: 'feature-requests', title: 'Feature requests' },
      ]);

    const results = await appTester(
      App.triggers.board.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results[0].slug).toBe('feature-requests');
  });

  it('lists versions for changelog dropdowns', async () => {
    api()
      .get('/api/v1/workspaces/acme/versions')
      .reply(200, {
        versions: [{ id: 'v1', name: '1.4.0', status: 'PLANNED' }],
        total: 1,
      });

    const results = await appTester(
      App.triggers.version.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results[0].id).toBe('v1');
    expect(results[0].name).toBe('1.4.0');
  });
});
