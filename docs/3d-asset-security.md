# 3D asset delivery security

## What this project enforces

- The Supabase `models-3d` bucket is private.
- Only administrators can upload, replace, or delete GLB files.
- Anonymous visitors can request a short-lived signed preview URL only for a
  model whose database row is published.
- The frontend no longer generates permanent Supabase public URLs.

Apply `supabase/migrations/20260715000000_book_backgrounds_and_private_models.sql`
to activate these rules in an existing project.

## Web limitation

A public visitor's browser must receive the GLB bytes to render the model.
Those delivered bytes can be copied from browser developer tools, the network
cache, a screen/geometry capture tool, or the short-lived signed response.
CSS selection blocking, disabled context menus, obscured filenames, and signed
URLs cannot make a publicly rendered asset impossible to download.

## Protecting valuable originals

Keep master/high-resolution GLBs in a separate private, administrator-only
bucket. Publish only an optimized, decimated, or watermarked derivative in
`models-3d`. Never place a protected model in `public/`, because every file in
that directory is served directly by the deployed site. In particular, remove
the local fallback files from `public/models/` after the Supabase preview is
confirmed in production if those files must not remain openly retrievable.

Never expose a Supabase service-role key in this frontend. The frontend should
contain only the publishable/anonymous key and rely on RLS policies.
