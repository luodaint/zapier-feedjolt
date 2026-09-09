'use strict';

const { findPost } = require('../lib/operations');
const { workspaceSlugField, postIdField } = require('../lib/fields');
const { SAMPLE_POST } = require('../lib/samples');

module.exports = {
  key: 'find_post',
  noun: 'Post',
  display: {
    label: 'Find Post',
    description:
      'Finds a post by ID, searches by text (min 2 characters), or lists recent posts.',
  },
  operation: {
    perform: findPost,
    inputFields: [
      workspaceSlugField(),
      postIdField({
        required: false,
        helpText: 'If set, fetches that post directly.',
      }),
      {
        key: 'q',
        label: 'Search Query',
        type: 'string',
        required: false,
        helpText: 'Used when Post is empty. Feedjolt requires at least 2 characters.',
      },
    ],
    sample: SAMPLE_POST,
  },
};
