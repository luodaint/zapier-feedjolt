'use strict';

const { createChangelog } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_CHANGELOG } = require('../lib/samples');

module.exports = {
  key: 'create_changelog',
  noun: 'Changelog',
  display: {
    label: 'Create Changelog',
    description: 'Creates a draft changelog entry in a workspace.',
  },
  operation: {
    perform: createChangelog,
    inputFields: [
      workspaceSlugField(),
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
      {
        key: 'version_id',
        label: 'Version',
        type: 'string',
        required: false,
        dynamic: 'version.id.name',
        helpText: 'Optional product version to attach to this changelog entry.',
      },
    ],
    sample: SAMPLE_CHANGELOG,
  },
};
