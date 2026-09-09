'use strict';

const { listStatuses } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_STATUS } = require('../lib/samples');

module.exports = {
  key: 'list_statuses',
  noun: 'Status',
  display: {
    label: 'List Statuses',
    description: 'Lists workflow statuses in a Feedjolt workspace.',
  },
  operation: {
    perform: listStatuses,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_STATUS,
    outputFields: [
      { key: 'id', label: 'Status ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'color', label: 'Color', type: 'string' },
      { key: 'is_default', label: 'Is Default', type: 'boolean' },
    ],
  },
};
