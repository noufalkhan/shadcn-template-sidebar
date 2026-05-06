# Routing Guide

This project uses Next.js App Router route groups to apply different app shells.

## Layout Modes

- `app/(minimal)/...`
  - No sidebar, no header.
  - Use for login, onboarding, invite acceptance, and distraction-free flows.

- `app/(with-sidebar)/...`
  - Sidebar + header shell.
  - Use when a page needs persistent side navigation plus top actions.

- `app/(with-header)/...`
  - Header only, no sidebar.
  - Use for simple app sections that need global actions but not a persistent side nav.

## Important Rule About Route Groups

Folders in parentheses are route groups and do not appear in the URL.

Examples:

- `app/(with-header)/dashboard/page.tsx` -> `/dashboard`
- `app/(minimal)/learn-minimal/page.tsx` -> `/learn-minimal`
- `app/(with-header)/header-demo/page.tsx` -> `/header-demo`

## Recommended Flow (Golden Path)

For starter apps and handoff templates, use this sequence:

1. `/` redirects to a minimal entry page (currently `/learn-minimal`).
2. User clicks a CTA/icon to enter the product.
3. Route to a with-header page such as `/dashboard`.

This keeps first-run flows clean while preserving full app navigation after entry.

## Naming Conventions

- Route groups should describe shell intent:
  - `(minimal)`
  - `(with-sidebar)`
  - `(with-header)`
- Prefer route segment names that describe feature intent, not UI implementation:
  - Good: `dashboard`, `billing`, `settings`, `onboarding`
  - Avoid: `topbar-demo`, `chromeless-demo`

## New Route Checklist

1. Pick the right shell (`minimal`, `with-sidebar`, `with-header`).
2. Create `page.tsx` inside that group.
3. Keep the route file thin; render feature components from `features/...`.
4. Add links with `next/link` between flows (`minimal` -> `with-header` as needed).

## Navigation Configuration

Navigation config lives in `config/nav/`:

- `header-nav.ts` for with-header shell routes
- `sidebar-nav.ts` for with-sidebar shell routes
- `shared-nav.ts` optional shared route list
- `settings.ts` controls mode via `navMode`
- `resolver.ts` picks shared or separate items for each shell

Use `navMode = "separate"` by default to avoid cross-shell route conflicts.
Switch to `navMode = "shared"` when both shells should use identical routes.

## UI Showcase Route

The component reference gallery lives at `/ui-showcase` (implemented in `features/showcase/...`).

- Keep this route separate from business pages.
- Avoid adding it to primary product nav by default.
- Use it as an internal developer reference during implementation.

## Troubleshooting

If you rename route groups (for example `(topbar)` -> `(with-header)`), clear Next.js cache once so generated validators are refreshed:

```bash
# macOS/Linux
rm -rf .next

# Windows PowerShell
Remove-Item -Recurse -Force .next

pnpm dev
```
