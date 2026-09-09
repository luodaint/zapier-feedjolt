'use strict';

const { createPost } = require('../lib/operations');
const {
  workspaceSlugField,
  boardSlugField,
  statusIdField,
} = require('../lib/fields');
const { SAMPLE_POST } = require('../lib/samples');

module.exports = {
  key: 'create_post',
  noun: 'Post',
  display: {
    label: 'Create Post',
    description: 'Creates a post on a Feedjolt board.',
  },
  operation: {
    perform: createPost,
    inputFields: [
      workspaceSlugField(),
      boardSlugField(),
      {
        key: 'title',
        label: 'Title',
        type: 'string',
        required: true,
      },
      {
        key: 'body',
        label: 'Body',
        type: 'text',
        required: false,
      },
      statusIdField({ required: false }),
      {
        key: 'is_internal',
        label: 'Internal',
        type: 'boolean',
        required: false,
        default: 'false',
        helpText: 'If true, the post is only visible to workspace members.',
      },
      {
        key: 'is_draft',
        label: 'Draft',
        type: 'boolean',
        required: false,
        default: 'false',
      },
      {
        key: 'eta',
        label: 'ETA',
        type: 'datetime',
        required: false,
      },
    ],
    sample: SAMPLE_POST,
  },
};
