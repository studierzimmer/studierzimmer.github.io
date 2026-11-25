# Studierzimmer

Interactive portfolio and public book library built with React, TypeScript,
Vite, Three.js, Tailwind CSS, and Supabase.

## Local development

Use Node.js 22 or newer; Lighthouse audits require Node.js 22.19 or newer.

```sh
git clone https://github.com/studierzimmer/studierzimmer.github.io.git
cd studierzimmer.github.io
npm ci
npm run dev
```

Create `.env.local` with the public Supabase project URL and anonymous key:

```sh
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anonymous-key
```

The file is ignored by Git and must never contain a service-role key.

## Update the resumed Supabase project for the new portfolio

### Recommended: one complete, transactional update

Use **`supabase/sql/update_studierzimmer_complete.sql`** in the original
project's **SQL Editor > New query**, copying the **entire** file and selecting
Run. It replaces the need to run the individual portfolio/Featured In/comment
updates below. Do not paste only one internal section or run the maintenance
fragments separately. No SQL in this repository is executed automatically.

Before running it:

- Make and verify a database backup **and a separate backup of Storage files**.
- Compare the dashboard Project URL with `VITE_SUPABASE_URL` in `.env.local`.
  `supabase/config.toml` may point elsewhere: do not use an unverified `db push`.
- Use the existing project with its original books/pages/models and
  `public.is_admin()`. This script is **not** a fresh-server installer and never
  assigns an administrator, resets a password, or recreates original RPC logic.

The updater installs Artworks/Fashion/Featured In, the full comment schema
(title, colours, opacity, size, rich text), missing book/model UI columns,
and character schema when absent. Ocean text/labels/environment and all other
settings stay in the existing JSON, without resetting saved customizations.
It adds RLS allow policies **and restrictive guards**, so older permissive
policies cannot reopen browser writes to non-administrators. This also repairs
the original character policies that permitted any authenticated user to edit.
Unrelated buckets/policies and existing content remain intact.

Models and characters stay/become private and use published-only signed asset
access. **Book pages and site assets remain public:** knowing a file's public
URL is enough to download it, even when its catalogue entry is unpublished.
Do not put private files or CAD sources in those public buckets. Hiding a card
is not file privacy; changing this requires a separate client/storage migration.

All schema/security changes commit together. An incompatible original schema
or private media bucket aborts rather than silently replacing data or exposing
files. New checks validate old rows where possible; incompatible old values
are preserved and reported as `VERIFICARE`, while new writes are checked.
Read the final report and any SQL warnings. `DA RIVEDERE` on original RPCs is
intentional: their bodies/owners/grants and the admin predicate are not in this
repository and cannot be safely reinvented. Unknown restrictive policies may
still deny requests; they are reported instead of deleted. Analytics/archive
tables are hardened only if already installed, not initialized by this update.

This is scoped application hardening, **not a guarantee of total Supabase
security**. Review Security Advisor, administrator MFA, sign-up policy,
API/Edge Function rate limits, original SECURITY DEFINER functions and secrets.
Service-role keys bypass RLS and must never be shipped to the browser.

After Run, test public published content and admin upload/save on the site.
If SQL fails, preserve the full error; do not reset tables. The generated SQL
does not mark old migrations applied in Supabase's CLI migration history.

Maintainers can regenerate/check the single-file artifact without a connection:

```sh
node scripts/build-supabase-update.mjs
node scripts/build-supabase-update.mjs --check
node scripts/test-supabase-update.mjs --pglite=/absolute/path/to/@electric-sql/pglite/dist/index.js
```

The SQL execution tests use a separately installed temporary PGlite PostgreSQL
runtime and synthetic Supabase roles/storage metadata; they never connect to
the project, fetch credentials or change remote data. They do not replace an
end-to-end check of Supabase Storage HTTP serving or the original RPC bodies.

### Older individual updates (reference)

The local multi-image/Jewelry update adds `artworks.additional_images` and
`is_jewelry`. If the complete update was already run before those fields were
added, apply only `supabase/migrations/20261115020000_artwork_images.sql` after
approval, or rerun the regenerated complete updater. No script is applied
automatically. The first `media_url` remains the cover, extra original images
share the same artwork's title/description/year, and Jewelry uses the artwork
gallery filtered by its new checkbox. Legacy 3D catalogue entries are not
deleted or automatically converted into artworks.

This is an additive update to the existing Studier Zimmer project, not a fresh
installation or a database reset. It keeps books, pages, models, users, and
existing saved CMS content. No frontend is deployed by this SQL update.

1. Wait for the resumed project to be active. Compare its Project URL with
   `VITE_SUPABASE_URL` in `.env.local`; do not replace keys with a service-role key.
2. In that project's **SQL Editor > New query**, paste the entire file
   `supabase/migrations/20261112000000_site_content.sql` and select **Run**.
   The update is transactional and can be run again. It requires the original
   `books`, `book_pages`, `models_3d`, and `is_admin()` objects; it stops with a
   diagnostic if they are missing. Three `OK` rows indicate completion.
3. Run `node scripts/check-supabase.mjs` from this folder. This only checks public
   API access and prints no credentials or records. The CLI project's reference
   in `supabase/config.toml` may differ from the browser configuration; do not run
   a blanket `supabase db push` against an unverified project.
4. Run `npm run dev`, open the printed Local URL, and sign in at `/login` with
   the existing site administrator. **SITO** edits menu/logo/BIO; **ARTWORKS**
   manages the gallery and Fashion flag; **3D** assigns model categories.

By default, the new CMS saves local previews to this browser's IndexedDB. To
explicitly test saving the new CMS to the resumed Supabase project from localhost,
add this setting to `.env.local` and restart Vite:

```sh
VITE_SITE_CONTENT_MODE=remote
```

This makes subsequent CMS saves/uploads real Supabase writes, subject to the
existing administrator permissions. Previously saved local drafts are not
uploaded or merged automatically. Set the value to `local` (or remove it during
local development) and restart Vite to return to local drafts. Existing book
and model administration already uses Supabase directly.

The new public `site-assets` bucket and gallery uploader use a 50 MB per-file
limit for Supabase Free compatibility (logo/title images: 15 MB). Source CAD
files must stay in the existing private model bucket.

Seeing the new frontend at the public GitHub Pages URL requires a separate
approved frontend deployment; resuming or updating Supabase alone does not
publish local React changes.

### Featured In, inline editing, and sketch comment colours

The next additive updates are separate files; they have **not** been applied
automatically. Run them in the same project's SQL Editor after the portfolio
update above:

1. `supabase/migrations/20261114000000_featured_in_and_ocean.sql` adds the
   Featured In flag and external article URL. Ocean text uses the existing
   settings JSON; no data reset is needed.
2. `supabase/migrations/20261114010000_comment_colors.sql` adds balloon/text
   colours, per-comment background opacity, text size, and optional titles to existing sketch
   comments. If `book_comments` does not exist yet,
   first apply `supabase/migrations/20260725000000_create_book_comments.sql`.
3. `supabase/migrations/20261115010000_comment_rich_content.sql` adds optional
   structured comment formatting. Plain comments remain readable without it;
   saving bold/italic or paragraph alignment requires this migration. It has
   not been applied automatically.

After administrator login, the pencil edits the actual page fields. The
compact Save/Cancel controls stage text changes rather than saving on blur.
New CMS/gallery data remains local in local-content mode; existing book,
comment, and 3D model metadata saves still use their Supabase repositories.
The editor labels the 3D save destination explicitly.

Sketch comments appear after 1 second of settling on a spread and remain
visible until a page flip, zoom, or a click outside the balloons. Ordinary mouse
movement and balloon actions do not dismiss them. Sharp cool-grey balloons are the default,
with editable colours, 75% background opacity, and 14px text by default.
An optional title can accompany each caption; the comment body remains required.
Balloon boxes wrap their text, and long captions scroll within the available
viewport. Default-style comments remain compatible with the older schema;
custom styles require the comment migration.
The editor lives outside the page-flip DOM, so typing does not rebuild pages.
The book backend's Comments panel lists and edits comments across books.

In annotation mode, the placement point stays marked while composing, and a
move handle repositions an existing comment without flipping the page. Double
click/tap the comment text for the full-screen reader; click the text again to
return to the unchanged book spread.

The focused reader uses an invisible readable-width column: body paragraphs
are justified with a left-aligned final line, and an optional title is centered.
Words and short glyph groups move between measured balloon/reader positions;
the paragraph is not repeatedly rewrapped during expansion or return. The
reader's current scroll position is included when returning to the balloon.
Inline and backend editors support selected bold/italic text and paragraph
alignment using a safe versioned JSON format, never arbitrary HTML.

Sketches exposes an editable Book List label in its revealed navigation.
Horizontal drags starting in the white space outside the actual visible pages
(including above/below the book) select another book. A gesture starting on
either visible page stays with the native page/view controls, even if it
later crosses an edge. The adjacent book gives one diagonal corner peek on
entry, then fully retracts; there is no persistent border, arrow or sound.
The deck follows the pointer and settles with its release momentum.
Per-book session memory restores the exact previous leaf. Unvisited books enter
closed and open only once their translated entry is complete; a slow or failed
incoming load leaves the existing book available.
The bottom-right single/double view controls reveal/hide with the toolbar.
Phones start in single view (up to 767px); an explicit saved choice takes
precedence and is not reset when resizing or rotating the device.
Single view centers the selected leaf without masking the adjacent page: a
within-spread gesture moves the view, a boundary gesture folds the page while
the view follows that fold. Double tap, Escape or the explicit zoom-exit control
return from magnification without changing the selected leaf.

The public login link is intentionally absent: open `/login` directly. This
does not replace authentication or grant access to the administration panels.
Menu/BIO text and page backgrounds are editable together; Ocean has a separate
text colour and optional transparent text-panel background. These settings are
stored in the existing JSON data and require no additional SQL.
Menu order can be changed through position controls in the backend or arrows
in the inline editor. Existing title labels, destinations and PNGs are kept.
Main-menu return links read Studierzimmer (Exit inside Ocean only); the separate model Index opens the
sliding model list. Zoomed 3D cameras return elastically before route/model
exit, including browser Back. Ocean uses a persistent zero-density-above-water
fog variant to avoid recompilation at the surface, and a symmetric movement
layout keeps the joystick centered. Its opening restores the historical
1.5s anticipation plus 3s medium/pinch/full/hold animation, without fading;
the symmetric return omits an unnecessary blank anticipation delay.
Ocean retains its original flat geometry, fine ripple/reflection shader,
model lighting and underwater rendering. Its above-water extension adds a
visible sun, near-water transmission and a soft distance color gradient
(`#0E545D` near, `#04060B` far). A localized warm floor glow follows the character;
the rest of the seabed is unchanged. After Start, drag orbits the character,
Shift/right-drag pans, and wheel/pinch zooms. Movement buttons are square;
the round joystick stays centered. Transparent route containers pass world
gestures through while controls, editing and privacy choices remain interactive.
Logged-in administrators can adjust water, sun and floor glow through the
inline pencil, using the existing Save/Cancel workflow. These settings live in
the existing `site_settings` JSON payload and need no additional SQL migration.
Ocean's title, subtitle, About copy and Exit/start/about/figure/music labels
are editable directly in place after administrator login, including after
Start. Editing pauses movement and replaces actions with native text fields;
Save/Cancel restores exploration. Figure loading/error messages are editable
in the backend. All labels use the same existing settings JSON; intentional
empty text is preserved. The optional water/sun controls collapse so they do
not obstruct text editing on small screens.
Physical-device GPU validation is still
needed; these changes do not reduce model/image quality.

## Validation

```sh
npm run lint
npx tsc -p tsconfig.app.json --noEmit
node scripts/test-admin-book-comments.mjs
node scripts/test-book-comment-repository.mjs
node scripts/test-book-performance.mjs
node scripts/test-book-rich-text.mjs
node scripts/test-comment-text-morph.mjs
node scripts/test-book-deck.mjs
node scripts/test-book-view-mode.mjs
node scripts/test-site-menu.mjs
node scripts/test-camera-return.mjs
node scripts/test-route-preparation.mjs
node scripts/test-ocean-surface.mjs
node scripts/test-ocean-aperture.mjs
node scripts/test-ocean-environment.mjs
node scripts/test-ocean-text.mjs
node scripts/test-gallery-performance.mjs
node scripts/test-artwork-images.mjs
node scripts/test-watch-visibility.mjs
node scripts/test-public-route-lifecycle.mjs
npm run predeploy
node scripts/test-public-route-lifecycle.mjs --built
npm run audit:assets
```

The regression scripts use isolated fixtures/mocks: they do not write to
Supabase, upload assets, or change browser drafts. They check comment editing,
book-engine/image scheduling, gallery/model loading, visibility pause/resume,
and the public route's static import graph. The `--built` check additionally
inspects production chunks so a shared bundler helper cannot silently pull
lazy 3D/book code back into Home.

`predeploy` builds the production site, removes explicitly unused public
artifacts and stale deployment metadata, verifies original asset integrity,
and writes `.nojekyll`. It does **not** resize, rotate, recompress or reduce
the animation frames of portfolio media. `npm run audit:assets` repeats the
SHA-256 comparison between emitted image copies and their sources in
`src/img` / `src/Portrait`, and between shipped public raster/model/HDR files
and their originals. Changed bytes or missing expected public media fail the
check; tree-shaken images and explicitly omitted unused artifacts are exempt.

These commands prepare and validate local output only; they do not publish it.
Supabase SQL migrations remain a separate, manual operation in the verified
project's SQL Editor, as described above. Frontend deployment also requires
separate owner approval.

### Production performance audits

Build before auditing, then keep the preview server running:

```sh
npm run predeploy
npm run preview -- --host 127.0.0.1 --port 4174
```

In another terminal using Node.js **22.19+**, make a separately installed
Lighthouse CLI available on `PATH`, or set `LIGHTHOUSE_CLI` to its
`lighthouse/cli/index.js` file. Then run:

```sh
npm run audit:lighthouse -- --url=http://127.0.0.1:4174 --routes=/,/bio,/sketches --runs=3 --devices=mobile,desktop --out=artifacts/performance/local
```

Add gallery, model and Ocean routes to `--routes` when checking those flows.
The audit uses isolated cold Chrome profiles and writes individual HTML/JSON
reports plus an `index.html` and `summary.json` with successful-run medians,
score ranges, environment details and failures. Use the production preview,
not the development server; finish encoders and other heavy background jobs
before comparing runs. The original animated splash, media detail and normal
application behaviour are retained during audits; no audit-only rendering or
lower-quality assets are used.

Lighthouse mobile results are simulated Chromium lab measurements, not field
data or proof of full device coverage. Physical iPhone/iPad and Android
testing is not complete: touch page turns, WebGL, transparency, audio and
repeated navigation still need real-device checks. Desktop Safari smoke tests
do not replace physical Mobile Safari validation.

## STEP / STP model imports

Authenticated administrators can upload GLB, STL, STEP, or STP files from the
3D model manager. STEP files are tessellated locally with OpenCascade
WebAssembly, converted to a GLB preview, and stored with the original CAD file
in the private Supabase model bucket. Public visitors receive only the signed
GLB preview.

Before the first STEP upload, apply
`supabase/migrations/20260715020000_add_step_model_sources.sql` in the Supabase
SQL editor or with `supabase db push`.

## Supabase contact function

Configure these Supabase function secrets before deploying the contact
function:

```sh
RESEND_API_KEY=your-resend-key
CONTACT_FROM_EMAIL=Studierzimmer <your-verified-sender@example.com>
CONTACT_TO_EMAIL=tostudierzimmer@gmail.com
```

## GitHub Pages deployment

The source lives on `main`. The compiled site is published to `gh-pages`:

```sh
npm run deploy
```

Live site: https://www.studierzimmer.ch (the GitHub Pages URL redirects here).
Keep `public/CNAME` in the build so deployments preserve the existing custom domain.

## Private traffic statistics

The admin statistics panel includes arrivals by hour for a selected day in
`Europe/Rome`, including 23/25-hour daylight-saving days. Arrivals count the
earliest recorded `session_start` per session ID within that day, not unique
people. Reloads in the same session do not add hourly arrivals.

Instagram arrivals use genuine Instagram referrer hosts, or the dedicated link:
`https://www.studierzimmer.ch/?utm_source=instagram`. Only the allowlisted entry
source is retained in memory until consent; no full query string is collected.
For `session_start` only, the existing nullable `value_int` column reserves `1`
for a declared Instagram entry. Other events keep their existing numeric values.
Missing historical attribution and visits without analytics consent cannot be
reconstructed. No new Supabase migration is needed: hourly reports use the
existing admin-only SELECT policy on `analytics_events`.

Development builds and local/loopback previews never send analytics. In the
private panel, **Escludi questo browser dalle statistiche** also disables future
collection from the production browser used for editing and testing. This is a
separate preference from consent and must be enabled on each working browser
and device. It does not delete old records. If persistent browser storage is
unavailable, the panel explains that exclusion lasts only for the current tab.
