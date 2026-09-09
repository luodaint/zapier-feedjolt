'use strict';

const { listBoards } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_BOARD } = require('../lib/samples');

module.exports = {
  key: 'board',
  noun: 'Board',
  display: {
    label: 'List Boards',
    description: 'Hidden helper that powers board dropdowns.',
    hidden: true,
  },
  operation: {
    perform: listBoards,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_BOARD,
  },
};
