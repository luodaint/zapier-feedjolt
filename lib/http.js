'use strict';

const { BASE_URL } = require('./constants');

const unwrapCollection = (data, preferredKeys = []) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (!data || typeof data !== 'object') {
    return [];
  }

  for (const key of preferredKeys) {
    if (Array.isArray(data[key])) {
      return data[key];
    }
  }

  for (const value of Object.values(data)) {
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      value.every((item) => item && typeof item === 'object')
    ) {
      return value;
    }
  }

  return [];
};

const compactBody = (fields) => {
  const body = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === '') {
      continue;
    }
    body[key] = value;
  }
  return body;
};

const feedjoltRequest = (z, options) => {
  const { path, ...rest } = options;
  return z.request({
    url: `${BASE_URL}${path}`,
    ...rest,
  });
};

const workspacePath = (workspaceSlug, suffix = '') =>
  `/workspaces/${encodeURIComponent(workspaceSlug)}${suffix}`;

module.exports = {
  unwrapCollection,
  compactBody,
  feedjoltRequest,
  workspacePath,
};
