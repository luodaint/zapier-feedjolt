'use strict';

const authentication = require('./authentication');
const { befores = [], afters = [] } = require('./middleware');

const newPost = require('./triggers/newPost');
const workspace = require('./triggers/workspace');
const board = require('./triggers/board');
const status = require('./triggers/status');
const post = require('./triggers/post');
const version = require('./triggers/version');

const listWorkspaces = require('./searches/listWorkspaces');
const listBoards = require('./searches/listBoards');
const listPosts = require('./searches/listPosts');
const findPost = require('./searches/findPost');
const listStatuses = require('./searches/listStatuses');
const getRoadmap = require('./searches/getRoadmap');
const listChangelog = require('./searches/listChangelog');

const createPost = require('./creates/createPost');
const updatePostStatus = require('./creates/updatePostStatus');
const createChangelog = require('./creates/createChangelog');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  flags: {
    cleanInputData: false,
  },

  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {
    [newPost.key]: newPost,
    [workspace.key]: workspace,
    [board.key]: board,
    [status.key]: status,
    [post.key]: post,
    [version.key]: version,
  },

  searches: {
    [listWorkspaces.key]: listWorkspaces,
    [listBoards.key]: listBoards,
    [listPosts.key]: listPosts,
    [findPost.key]: findPost,
    [listStatuses.key]: listStatuses,
    [getRoadmap.key]: getRoadmap,
    [listChangelog.key]: listChangelog,
  },

  creates: {
    [createPost.key]: createPost,
    [updatePostStatus.key]: updatePostStatus,
    [createChangelog.key]: createChangelog,
  },

  resources: {},
};
