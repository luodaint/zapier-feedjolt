'use strict';

const { listVersions } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_VERSION } = require('../lib/samples');

module.exports = {
  key: 'version',
  noun: 'Version',
  display: {
    label: 'List Versions',
    description: 'Hidden helper that powers version dropdowns.',
    hidden: true,
  },
  operation: {
    perform: listVersions,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_VERSION,
  },
};
