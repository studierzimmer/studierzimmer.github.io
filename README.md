# Studierzimmer

Interactive portfolio and public book library built with React, TypeScript,
Vite, Three.js, Tailwind CSS, and Supabase.

## Local development

Use Node.js 22 or newer.

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

## Validation

```sh
npm run lint
npx tsc --noEmit
npm run predeploy
```

`predeploy` builds the production site, optimizes deploy-only images, removes
unused public artifacts, and adds the GitHub Pages files required for SPA
routing.

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

Live site: https://studierzimmer.github.io
