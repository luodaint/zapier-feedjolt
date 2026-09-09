'use strict';

const workspaceSlugField = (overrides = {}) => ({
  key: 'workspace_slug',
  label: 'Workspace',
  type: 'string',
  required: true,
  dynamic: 'workspace.slug.name',
  helpText: 'Must match the workspace this API key belongs to.',
  ...overrides,
});

const boardSlugField = (overrides = {}) => ({
  key: 'board_slug',
  label: 'Board',
  type: 'string',
  required: true,
  dynamic: 'board.slug.title',
  helpText: 'Board slug, e.g. `feature-requests`.',
  ...overrides,
});

const boardIdField = (overrides = {}) => ({
  key: 'board_id',
  label: 'Board',
  type: 'string',
  required: false,
  dynamic: 'board.id.title',
  helpText: 'Optional. Filter to a single board.',
  ...overrides,
});

const statusIdField = (overrides = {}) => ({
  key: 'status_id',
  label: 'Status',
  type: 'string',
  required: true,
  dynamic: 'status.id.name',
  ...overrides,
});

const postIdField = (overrides = {}) => ({
  key: 'post_id',
  label: 'Post',
  type: 'string',
  required: true,
  dynamic: 'post.id.title',
  ...overrides,
});

module.exports = {
  workspaceSlugField,
  boardSlugField,
  boardIdField,
  statusIdField,
  postIdField,
};
