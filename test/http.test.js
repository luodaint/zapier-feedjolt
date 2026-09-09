'use strict';

const { unwrapCollection, compactBody, workspacePath } = require('../lib/http');

describe('http helpers', () => {
  it('unwraps arrays, named keys, and first nested collection', () => {
    expect(unwrapCollection([{ id: 1 }], ['posts'])).toEqual([{ id: 1 }]);
    expect(unwrapCollection({ posts: [{ id: 2 }] }, ['posts'])).toEqual([
      { id: 2 },
    ]);
    expect(unwrapCollection({ entries: [{ id: 3 }] }, ['entries'])).toEqual([
      { id: 3 },
    ]);
    expect(unwrapCollection({ total: 0, items: [{ id: 4 }] }, ['posts'])).toEqual([
      { id: 4 },
    ]);
    expect(unwrapCollection(null, ['posts'])).toEqual([]);
  });

  it('omits empty create fields', () => {
    expect(compactBody({ title: 'Hi', body: '', eta: null })).toEqual({
      title: 'Hi',
    });
  });

  it('encodes slugs in paths', () => {
    expect(workspacePath('acme org', '/posts')).toBe(
      '/workspaces/acme%20org/posts',
    );
  });
});
