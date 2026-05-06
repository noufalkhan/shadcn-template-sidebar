# Ospyn Multi-Layout Template

A clean Next.js starter for building multiple applications with 3 layout modes:
- Workspace app (sidebar + header)
- Header-only app
- Minimal/full-screen app

## Simple Folder Guide

```text
app/
  layout.tsx
  page.tsx                     # "/" -> "/learn-minimal"
  (with-sidebar)/              # layout with sidebar + header
    layout.tsx
  (with-header)/               # layout with header only
    layout.tsx
    dashboard/page.tsx
    header-demo/page.tsx
  (minimal)/                   # minimal layout (no sidebar/header)
    layout.tsx
    minimal-demo/page.tsx

components/
  ui/                          # shadcn reusable primitives
  layout/                      # shared layout wrappers
    app-shell.tsx
    sidebar-header-layout.tsx
    header-layout.tsx
    minimal-layout.tsx
  common/                      # shared app-level parts
    app-header.tsx

features/
  dashboard/                   # feature-specific code only
    data.ts
    components/
      app-sidebar.tsx
      dashboard-navbar.tsx
      documents-dashboard-content.tsx
  showcase/
    components/
      ui-showcase-page.tsx     # full component catalog for internal reference
```

## App Branding Defaults

Project-level display text lives in `config/app.ts`:

- `name` for docs/title context
- `productName` for shared shell branding
- `primaryCtaLabel` for the main header CTA

Update these values once per project to rebrand the template quickly.

## Golden Rules

1. Keep `app/.../page.tsx` files thin (only compose feature components).
2. Put reusable chrome/layout in `components/layout`.
3. Put feature-only UI in `features/<feature>/components`.
4. Choose layout by route group:
   - `app/(with-sidebar)/...`
   - `app/(with-header)/...`
   - `app/(minimal)/...`

## URLs to Test

- With-header (main app): `/dashboard`
- With-header (demo): `/header-demo`
- UI Showcase (reference route): `/ui-showcase`
- Minimal: `/minimal-demo`

`/ui-showcase` is intentionally kept as a separate reference route and excluded from primary app nav, so dashboard/navigation stay business-focused.

## Create a New Page

1. Decide layout mode (with-sidebar/with-header/minimal).
2. Create route in matching group.
3. Build UI inside `features/<feature>/components`.
4. Import and render in route page.

Example:

```tsx
import { SectionPage } from "@/features/dashboard/components/section-page"

export default function BillingPage() {
  return <SectionPage title="Billing" description="Manage billing and invoices." />
}
```

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## More Routing Details

See `ROUTING_GUIDE.md` for layout selection rules, naming conventions, and the recommended minimal -> with-header app flow.

## Typography Consistency

Use `TYPOGRAPHY_GUIDE.md` as the source of truth for text size choices (sidebar, header, titles, descriptions, and body text).
