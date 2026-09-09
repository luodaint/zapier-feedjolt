'use strict';

const SAMPLE_WORKSPACE = {
  id: '22222222-2222-4222-8222-222222222222',
  name: 'Acme',
  slug: 'acme',
  logo_url: null,
  favicon_url: null,
  settings: {},
  data_region: 'US',
  is_active: true,
  created_at: '2026-01-15T10:00:00.000Z',
  trial_started: false,
  email_intake_enabled: false,
};

const SAMPLE_BOARD = {
  id: '33333333-3333-4333-8333-333333333333',
  workspace_id: SAMPLE_WORKSPACE.id,
  title: 'Feature requests',
  description: 'Ideas from customers',
  slug: 'feature-requests',
  icon: null,
  visibility: 'PUBLIC',
  votes_enabled: true,
  moderation_enabled: false,
  notify_admins_on_new_post: true,
  pinned_post_id: null,
  archived: false,
  sort_order: 0,
  created_at: '2026-01-16T10:00:00.000Z',
  updated_at: '2026-01-16T10:00:00.000Z',
};

const SAMPLE_STATUS = {
  id: '55555555-5555-4555-8555-555555555555',
  workspace_id: SAMPLE_WORKSPACE.id,
  name: 'Open',
  color: '#4B1FAB',
  sort_order: 0,
  is_default: true,
  show_on_roadmap: true,
  public_bucket: 'PLANNED',
  created_at: '2026-01-16T10:00:00.000Z',
  updated_at: '2026-01-16T10:00:00.000Z',
};

// Static sample matching OpenAPI PostResponse.
const SAMPLE_POST = {
  id: '11111111-1111-4111-8111-111111111111',
  workspace_id: SAMPLE_WORKSPACE.id,
  board_id: SAMPLE_BOARD.id,
  author_type: 'API_KEY',
  author_id: '44444444-4444-4444-8444-444444444444',
  title: 'Add dark mode',
  body: 'Please add a dark theme to the dashboard.',
  status_id: SAMPLE_STATUS.id,
  owner_admin_id: null,
  is_draft: false,
  is_internal: false,
  eta: null,
  vote_count: 3,
  weighted_score: 3,
  comment_count: 1,
  is_spam: false,
  is_incognito: false,
  merged_into_id: null,
  created_at: '2026-09-01T12:00:00.000Z',
  updated_at: '2026-09-01T12:00:00.000Z',
  tags: [],
  author_name: 'API',
  author_email: null,
  author_avatar_url: null,
  owner_name: null,
  owner_email: null,
  owner_avatar_url: null,
  version_id: null,
  version: null,
  sentiment: null,
  sentiment_confidence: null,
  has_linear_issue: false,
};

const SAMPLE_CHANGELOG = {
  id: '66666666-6666-4666-8666-666666666666',
  workspace_id: SAMPLE_WORKSPACE.id,
  title: 'September release',
  body: 'Dark mode is now available in settings.',
  status: 'DRAFT',
  published_at: null,
  scheduled_at: null,
  author_id: '44444444-4444-4444-8444-444444444444',
  created_at: '2026-09-02T12:00:00.000Z',
  updated_at: '2026-09-02T12:00:00.000Z',
  linked_post_ids: [SAMPLE_POST.id],
  version: null,
};

const SAMPLE_ROADMAP = {
  id: 'roadmap:acme',
  total_posts: 1,
  columns: [
    {
      status: SAMPLE_STATUS,
      posts: [SAMPLE_POST],
    },
  ],
};

module.exports = {
  SAMPLE_WORKSPACE,
  SAMPLE_BOARD,
  SAMPLE_STATUS,
  SAMPLE_POST,
  SAMPLE_CHANGELOG,
  SAMPLE_ROADMAP,
};
