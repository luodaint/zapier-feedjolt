'use strict';

const { getRoadmap } = require('../lib/operations');
const { workspaceSlugField } = require('../lib/fields');
const { SAMPLE_ROADMAP } = require('../lib/samples');

module.exports = {
  key: 'get_roadmap',
  noun: 'Roadmap',
  display: {
    label: 'Get Roadmap',
    description: 'Gets the public roadmap columns and posts for a workspace.',
  },
  operation: {
    perform: getRoadmap,
    inputFields: [workspaceSlugField()],
    sample: SAMPLE_ROADMAP,
  },
};
