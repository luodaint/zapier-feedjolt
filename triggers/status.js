'use strict';

const { listStatuses } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_STATUS } = require('../lib/samples');

module.exports = {
  key: 'status',
  noun: 'Status',
  display: {
    label: 'List Statuses',
    description: 'Hidden helper that powers status dropdowns.',
    hidden: true,
  },
  operation: {
    perform: listStatuses,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_STATUS,
  },
};
