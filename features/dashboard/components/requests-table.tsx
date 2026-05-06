"use client"

import * as React from "react"

import { useRequests } from "@/features/dashboard/hooks/use-requests"
import { RequestRow } from "@/features/dashboard/components/request-row"
import { RequestsFilters } from "@/features/dashboard/components/requests-filters"

export function RequestsTable() {
  const { data: requests } = useRequests()
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState("newest")

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    const list = term
      ? requests.filter((req) =>
          [req.id, req.channel, req.lastActionLabel].some((field) =>
            field.toLowerCase().includes(term)
          )
        )
      : requests

    const sorted = [...list]
    switch (sort) {
      case "oldest":
        return sorted.reverse()
      case "amount-desc":
        return sorted.sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0))
      case "amount-asc":
        return sorted.sort((a, b) => (a.amount ?? 0) - (b.amount ?? 0))
      case "newest":
      default:
        return sorted
    }
  }, [requests, search, sort])

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="border-b px-3 py-3 sm:px-4">
          <RequestsFilters
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            No requests found.
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((request) => (
              <RequestRow key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
