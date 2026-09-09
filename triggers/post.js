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
      page_size: 50,
    },
  });

module.exports = {
  key: 'post',
  noun: 'Post',
  display: {
    label: 'List Posts',
    description: 'Hidden helper that powers post dropdowns.',
    hidden: true,
  },
  operation: {
    perform,
    inputFields: [workspaceSlugField(), boardIdField()],
    sample: SAMPLE_POST,
  },
};
