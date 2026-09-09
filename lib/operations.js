'use strict';

const { feedjoltRequest, unwrapCollection, compactBody, workspacePath } = require('./http');

const listWorkspaces = async (z) => {
  const response = await feedjoltRequest(z, { path: '/workspaces' });
  return unwrapCollection(response.data, ['workspaces']);
};

const listBoards = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    path: workspacePath(bundle.inputData.workspace_slug, '/boards'),
  });
  return unwrapCollection(response.data, ['boards']);
};

const listStatuses = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    path: workspacePath(bundle.inputData.workspace_slug, '/statuses'),
  });
  return unwrapCollection(response.data, ['statuses']);
};

const listPosts = async (z, bundle) => {
  const params = {
    sort_by: bundle.inputData.sort_by || 'newest',
    page_size: bundle.inputData.page_size || 20,
  };

  if (bundle.inputData.board_id) {
    params.board_id = bundle.inputData.board_id;
  }
  if (bundle.inputData.status_id) {
    params.status_id = bundle.inputData.status_id;
  }
  if (bundle.inputData.q) {
    params.q = bundle.inputData.q;
  }

  const response = await feedjoltRequest(z, {
    path: workspacePath(bundle.inputData.workspace_slug, '/posts'),
    params,
  });

  return unwrapCollection(response.data, ['posts', 'items', 'results', 'data']);
};

const getPost = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    path: workspacePath(
      bundle.inputData.workspace_slug,
      `/posts/${encodeURIComponent(bundle.inputData.post_id)}`,
    ),
  });
  return response.data;
};

const searchPosts = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    path: workspacePath(bundle.inputData.workspace_slug, '/posts/search'),
    params: { q: bundle.inputData.q },
  });
  return unwrapCollection(response.data, ['posts', 'items', 'results', 'data']);
};

const findPost = async (z, bundle) => {
  if (bundle.inputData.post_id) {
    const post = await getPost(z, bundle);
    return post ? [post] : [];
  }
  if (bundle.inputData.q) {
    return searchPosts(z, bundle);
  }
  return listPosts(z, bundle);
};

const createPost = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    method: 'POST',
    path: workspacePath(
      bundle.inputData.workspace_slug,
      `/boards/${encodeURIComponent(bundle.inputData.board_slug)}/posts`,
    ),
    body: compactBody({
      title: bundle.inputData.title,
      body: bundle.inputData.body,
      status_id: bundle.inputData.status_id,
      is_draft: bundle.inputData.is_draft,
      is_internal: bundle.inputData.is_internal,
      eta: bundle.inputData.eta,
    }),
  });
  return response.data;
};

const updatePostStatus = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    method: 'PUT',
    path: workspacePath(
      bundle.inputData.workspace_slug,
      `/posts/${encodeURIComponent(bundle.inputData.post_id)}/status`,
    ),
    body: { status_id: bundle.inputData.status_id },
  });
  return response.data;
};

const getRoadmap = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    path: workspacePath(bundle.inputData.workspace_slug, '/roadmap'),
  });
  const data = response.data || {};
  return [
    {
      id: `roadmap:${bundle.inputData.workspace_slug}`,
      total_posts: data.total_posts,
      columns: data.columns,
      buckets: data.buckets,
      available_tags: data.available_tags,
    },
  ];
};

const listChangelog = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    path: workspacePath(bundle.inputData.workspace_slug, '/changelog'),
    params: {
      page_size: bundle.inputData.page_size || 20,
    },
  });
  return unwrapCollection(response.data, ['entries']);
};

const createChangelog = async (z, bundle) => {
  const response = await feedjoltRequest(z, {
    method: 'POST',
    path: workspacePath(bundle.inputData.workspace_slug, '/changelog'),
    body: compactBody({
      title: bundle.inputData.title,
      body: bundle.inputData.body,
      version_id: bundle.inputData.version_id,
    }),
  });
  return response.data;
};

module.exports = {
  listWorkspaces,
  listBoards,
  listStatuses,
  listPosts,
  getPost,
  searchPosts,
  findPost,
  createPost,
  updatePostStatus,
  getRoadmap,
  listChangelog,
  createChangelog,
};
