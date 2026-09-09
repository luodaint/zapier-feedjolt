'use strict';

const { listBoards } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_BOARD } = require('../lib/samples');

module.exports = {
  key: 'list_boards',
  noun: 'Board',
  display: {
    label: 'List Boards',
    description: 'Lists boards in a Feedjolt workspace.',
  },
  operation: {
    perform: listBoards,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_BOARD,
    outputFields: [
      { key: 'id', label: 'Board ID', type: 'string' },
      { key: 'title', label: 'Title', type: 'string' },
      { key: 'slug', label: 'Slug', type: 'string' },
    ],
  },
};
