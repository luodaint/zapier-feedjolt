# zapier-feedjolt

Zapier Platform CLI integration for [Feedjolt](https://www.feedjolt.com) customer feedback boards.

- Auth: workspace API key (`fjk_…`) as `Authorization: Bearer <key>` (custom auth, not Zapier's built-in API Key type)
- Base URL: `https://api.feedjolt.com/api/v1`
- OpenAPI: https://api.feedjolt.com/openapi.json
- Platform: `zapier-platform-cli` / `zapier-platform-core` **19.1.0**, Node.js 22

Do not commit secrets. Do not put `FEEDJOLT_API_KEY` or a deploy key in git.

## Local development

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm test
npx zapier-platform validate
```

Tests mock HTTP with [nock](https://github.com/nock/nock) and disable live network access. They never call `api.feedjolt.com`.

Copy `.env.example` to `.env` only if you later run live `zapier-platform invoke` against your own workspace. That file is gitignored.

## What v1 includes

| Kind | Key | Notes |
| --- | --- | --- |
| Auth | custom `api_key` | Test = `GET /workspaces`. Connection label is workspace `name (slug)`. |
| Trigger | `new_post` | Polls `GET /workspaces/{slug}/posts?sort_by=newest`. Optional `board_id` filter. Dedupes on `id`. |
| Search | `list_workspaces` | `GET /workspaces` |
| Search | `list_boards` | `GET /workspaces/{slug}/boards` |
| Search | `list_posts` | `GET /workspaces/{slug}/posts` |
| Search | `find_post` | Get by id, or `GET …/posts/search?q=`, or list recent |
| Search | `list_statuses` | `GET /workspaces/{slug}/statuses` |
| Search | `get_roadmap` | `GET /workspaces/{slug}/roadmap` |
| Search | `list_changelog` | `GET /workspaces/{slug}/changelog` |
| Create | `create_post` | `POST /workspaces/{slug}/boards/{board_slug}/posts` (`PostCreate`) |
| Create | `update_post_status` | `PUT /workspaces/{slug}/posts/{post_id}/status` |
| Create | `create_changelog` | `POST /workspaces/{slug}/changelog` (`ChangelogCreate`) |

Hidden triggers (`workspace`, `board`, `status`, `post`) power dynamic dropdowns:

`workspace_slug` → `board` / `status` / `post` as appropriate.

## Planned for v1.1

- **Webhooks / REST Hooks** for new posts and status changes (OpenAPI already has workspace webhook endpoints). Polling only in v1.
- Publish / unpublish changelog, link posts to changelog, vote, comments.

## Publish (Marc / Partner)

These steps need a human Zapier account. This repo cannot `register` or `push` without credentials, and it does not invent deploy keys.

1. Create / sign in at [developer.zapier.com](https://developer.zapier.com).
2. Install the CLI if you have not already: `npm install -g zapier-platform-cli@19.1.0`.
3. Log in and store a **deploy key** locally (never commit `.zapierapprc`):

   ```bash
   npx zapier-platform login
   ```

   Partner blocker: you need an active Zapier developer account that can create private integrations. If login fails, check that the deploy key from the Platform UI is valid.

4. Register the integration once (from this directory):

   ```bash
   npx zapier-platform register Feedjolt
   ```

   This writes `.zapierapprc` (gitignored). Re-running register on an existing app is not required.

5. Push this version:

   ```bash
   npm test
   npx zapier-platform validate
   npx zapier-platform push
   ```

6. In the Platform UI, complete branding, then use **Integration Testing** with the partner workspace `integration-testing@zapier.com` (Zapier's standard review inbox). Invite that workspace to a private version before requesting public review.
7. Publish from the Platform UI when Zapier review is ready. Do not run `promote` until review asks for it.

### Partner blockers to unblock first

| Blocker | Why it matters |
| --- | --- |
| [developer.zapier.com](https://developer.zapier.com) account | Required for `login`, `register`, and `push`. |
| Deploy key | `zapier-platform login` stores it in `~/.zapierrc`. Without it, push is impossible. |
| `integration-testing@zapier.com` workspace | Zapier Partner review uses this mailbox/workspace. Invite it before submitting. |
| Feedjolt workspace API key | Needed only for live invoke / editor tests. Create in **Settings → API keys**. Never commit it. |

## Layout

Custom-auth template shape:

- `authentication.js` — custom `api_key` field, test, connection label
- `middleware.js` — Bearer + `Accept: application/json`, 401 mapping
- `index.js` — app export
- `triggers/`, `searches/`, `creates/`, `lib/`
- `test/` — nock unit tests

## Reference

- n8n: https://github.com/luodaint/n8n-nodes-feedjolt
- Activepieces: https://github.com/activepieces/activepieces/pull/15401
- Feedjolt developers: https://www.feedjolt.com/en/docs/developers
