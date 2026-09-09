'use strict';

const { listChangelog } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_CHANGELOG } = require('../lib/samples');

module.exports = {
  key: 'list_changelog',
  noun: 'Changelog',
  display: {
    label: 'List Changelog',
    description: 'Lists public changelog entries for a workspace.',
  },
  operation: {
    perform: listChangelog,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_CHANGELOG,
  },
};
