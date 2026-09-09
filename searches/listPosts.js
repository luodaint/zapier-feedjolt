'use strict';

const { listPosts } = require('../lib/operations');
const { workspaceSlugField, boardIdField, statusIdField } = require('../lib/fields');
const { SAMPLE_POST } = require('../lib/samples');

module.exports = {
  key: 'list_posts',
  noun: 'Post',
  display: {
    label: 'List Posts',
    description: 'Lists posts in a workspace, optionally filtered by board or status.',
  },
  operation: {
    perform: listPosts,
    inputFields: [
      workspaceSlugField(),
      boardIdField(),
      statusIdField({ required: false }),
    ],
    sample: SAMPLE_POST,
  },
};
