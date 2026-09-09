'use strict';

const { listWorkspaces } = require('../lib/operations');
const { SAMPLE_WORKSPACE } = require('../lib/samples');

module.exports = {
  key: 'list_workspaces',
  noun: 'Workspace',
  display: {
    label: 'List Workspaces',
    description: 'Lists workspaces available to this API key.',
  },
  operation: {
    perform: listWorkspaces,
    inputFields: [
      {
        key: 'name',
        label: 'Name or Slug',
        type: 'string',
        required: false,
        helpText: 'Optional. Filter workspaces by name or slug.',
      },
    ],
    sample: SAMPLE_WORKSPACE,
    outputFields: [
      { key: 'id', label: 'Workspace ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'slug', label: 'Slug', type: 'string' },
    ],
  },
};
