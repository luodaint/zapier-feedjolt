'use strict';

const { App, appTester, authBundle, api } = require('./helpers');
const {
  SAMPLE_POST,
  SAMPLE_STATUS,
  SAMPLE_CHANGELOG,
  SAMPLE_ROADMAP,
} = require('../lib/samples');

describe('searches', () => {
  it('lists workspaces and filters by name', async () => {
    api()
      .get('/api/v1/workspaces')
      .reply(200, [
        { id: 'w1', name: 'Acme', slug: 'acme' },
        { id: 'w2', name: 'Other', slug: 'other' },
      ]);

    const results = await appTester(
      App.searches.list_workspaces.operation.perform,
      authBundle({ name: 'acme' }),
    );

    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('acme');
  });

  it('lists posts', async () => {
    api()
      .get('/api/v1/workspaces/acme/posts')
      .query({ sort_by: 'newest', page_size: 20 })
      .reply(200, { posts: [SAMPLE_POST], total: 1, page: 1, page_size: 20 });

    const results = await appTester(
      App.searches.list_posts.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results[0].id).toBe(SAMPLE_POST.id);
  });

  it('finds a post by id', async () => {
    api()
      .get(`/api/v1/workspaces/acme/posts/${SAMPLE_POST.id}`)
      .reply(200, SAMPLE_POST);

    const results = await appTester(
      App.searches.find_post.operation.perform,
      authBundle({ workspace_slug: 'acme', post_id: SAMPLE_POST.id }),
    );

    expect(results).toEqual([SAMPLE_POST]);
  });

  it('searches posts by query when id is empty', async () => {
    api()
      .get('/api/v1/workspaces/acme/posts/search')
      .query({ q: 'dark' })
      .reply(200, [SAMPLE_POST]);

    const results = await appTester(
      App.searches.find_post.operation.perform,
      authBundle({ workspace_slug: 'acme', q: 'dark' }),
    );

    expect(results[0].title).toMatch(/dark/i);
  });

  it('lists statuses', async () => {
    api()
      .get('/api/v1/workspaces/acme/statuses')
      .reply(200, [SAMPLE_STATUS]);

    const results = await appTester(
      App.searches.list_statuses.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results[0].id).toBe(SAMPLE_STATUS.id);
    expect(results[0].name).toBe('Open');
  });

  it('gets the roadmap as a single searchable record', async () => {
    api()
      .get('/api/v1/workspaces/acme/roadmap')
      .reply(200, { columns: SAMPLE_ROADMAP.columns, total_posts: 1 });

    const results = await appTester(
      App.searches.get_roadmap.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('roadmap:acme');
    expect(results[0].total_posts).toBe(1);
  });

  it('lists changelog entries', async () => {
    api()
      .get('/api/v1/workspaces/acme/changelog')
      .query({ page_size: 20 })
      .reply(200, {
        entries: [SAMPLE_CHANGELOG],
        total: 1,
        page: 1,
        page_size: 20,
      });

    const results = await appTester(
      App.searches.list_changelog.operation.perform,
      authBundle({ workspace_slug: 'acme' }),
    );

    expect(results[0].id).toBe(SAMPLE_CHANGELOG.id);
  });
});
