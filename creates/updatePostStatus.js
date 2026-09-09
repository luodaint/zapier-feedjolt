'use strict';

const { updatePostStatus } = require('../lib/operations');
const {
  workspaceSlugField,
  postIdField,
  statusIdField,
} = require('../lib/fields');
const { SAMPLE_POST } = require('../lib/samples');

module.exports = {
  key: 'update_post_status',
  noun: 'Post',
  display: {
    label: 'Update Post Status',
    description: 'Changes the workflow status of an existing post.',
  },
  operation: {
    perform: updatePostStatus,
    inputFields: [workspaceSlugField(), postIdField(), statusIdField()],
    sample: SAMPLE_POST,
  },
};
