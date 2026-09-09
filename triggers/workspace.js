'use strict';

const { listWorkspaces } = require('../lib/operations');
const { SAMPLE_WORKSPACE } = require('../lib/samples');

module.exports = {
  key: 'workspace',
  noun: 'Workspace',
  display: {
    label: 'List Workspaces',
    description: 'Hidden helper that powers workspace dropdowns.',
    hidden: true,
  },
  operation: {
    perform: listWorkspaces,
    sample: SAMPLE_WORKSPACE,
  },
};
