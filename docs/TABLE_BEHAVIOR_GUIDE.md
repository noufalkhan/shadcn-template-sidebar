# Table Behavior Guide

This project uses two table patterns:

1. Base reusable table primitives from `components/ui/table.tsx`
2. Feature-specific request table UI in `features/dashboard/components/requests-table.tsx`

Use this guide to choose the right one and keep implementation consistent.

## Quick Decision Rule

- Use `components/ui/table.tsx` when you need a normal, reusable data table.
- Use `features/dashboard/components/requests-table.tsx` when you need the custom "request row" design (badges, avatars, stamp amount block, status timeline, inline action menu, inset vertical separators).

## 1) Base Table (Reusable Primitive)

### Purpose

Generic table structure for most pages.

### Source

- `components/ui/table.tsx`

### What it provides

- Semantic table primitives:
  - `Table`
  - `TableHeader`
  - `TableBody`
  - `TableFooter`
  - `TableRow`
  - `TableHead`
  - `TableCell`
  - `TableCaption`
- Shared baseline style and spacing
- Consistent behavior across the app

### When to use

- Standard lists (users, invoices, audit logs)
- Pages that do not need heavy custom row UI
- New features that need predictable, low-maintenance table patterns

### Example

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function UsersTable({ rows }: { rows: { id: string; name: string; status: string }[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## 2) Requests Table (Feature-Specific Composite)

### Purpose

A rich dashboard table for request tracking UI, tailored to the request domain.

### Sources

- `features/dashboard/components/requests-table.tsx`
- `features/dashboard/components/request-row.tsx`
- `features/dashboard/components/requests-filters.tsx`

### What it includes

- Search, sort, and filter controls above the table
- Custom row content blocks:
  - Request id + channel badge
  - Documents count block
  - Signers avatar group + counts
  - Stamp details key + amount + parties
  - Status dot + latest action summary
  - Row action dropdown
- Inset vertical separators inside row cells (not full grid borders)

### When to use

- Dashboard request screens
- Flows that use request domain shape from `features/dashboard/types.ts`
- Cases where this exact UI language is required

### Usage

```tsx
import { RequestsTable } from "@/features/dashboard/components/requests-table"

export function RequestsDashboardTab() {
  return <RequestsTable />
}
```

## Extension Guidelines

- Do not edit `components/ui/table.tsx` for one-off feature styles.
- Prefer composing feature-specific styles around base primitives.
- If multiple features need the same custom variant, create a shared abstraction only after confirming reuse.
- Keep row domain logic in feature folders (`features/<feature>/...`), not in `components/ui`.

## Visual Behavior Notes (Current Requests Table)

- Outer card/table border: removed for a flatter dashboard look
- Row separators: horizontal row lines from base table styles
- Column separators: inset vertical lines using pseudo-elements on data cells
- Header: no vertical separators to reduce visual noise

## Future Maintenance Checklist

- If request shape changes, update:
  - `features/dashboard/types.ts`
  - `features/dashboard/data/requests.ts` (mock source)
  - `request-row.tsx` render mapping
- If adding new list tables in other features, start with base table primitives first.
