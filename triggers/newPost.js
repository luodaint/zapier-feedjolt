'use strict';

const { listPosts } = require('../lib/operations');
const { workspaceSlugField, boardIdField } = require('../lib/fields');
const { SAMPLE_POST } = require('../lib/samples');

const perform = (z, bundle) =>
  listPosts(z, {
    ...bundle,
    inputData: {
      ...bundle.inputData,
      sort_by: 'newest',
      page_size: 20,
    },
  });

module.exports = {
  key: 'new_post',
  noun: 'Post',
  display: {
    label: 'New Post',
    description: 'Triggers when a new post is created on a Feedjolt board.',
  },
  operation: {
    type: 'polling',
    perform,
    inputFields: [
      workspaceSlugField(),
      boardIdField(),
    ],
    sample: SAMPLE_POST,
    outputFields: [
      { key: 'id', label: 'Post ID', type: 'string' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'body', label: 'Body', type: 'string' },
      { key: 'workspace_id', label: 'Workspace ID', type: 'string' },
      { key: 'board_id', label: 'Board ID', type: 'string' },
      { key: 'status_id', label: 'Status ID', type: 'string' },
      { key: 'vote_count', label: 'Vote Count', type: 'integer' },
      { key: 'comment_count', label: 'Comment Count', type: 'integer' },
      { key: 'created_at', label: 'Created At', type: 'datetime' },
      { key: 'updated_at', label: 'Updated At', type: 'datetime' },
    ],
  },
};
