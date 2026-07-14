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
