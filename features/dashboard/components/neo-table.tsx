"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RequestRow } from "@/features/dashboard/components/request-row"
import { RequestSort, RequestsFilters } from "@/features/dashboard/components/requests-filters"
import { useRequests } from "@/features/dashboard/hooks/use-requests"

const ROWS_PER_PAGE = 8

export function NeoTable() {
  const { data: requests } = useRequests()
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<RequestSort>("newest")
  const [page, setPage] = React.useState(1)

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))

  React.useEffect(() => {
    setPage(1)
  }, [search, sort])

  React.useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages))
  }, [totalPages])

  const paginatedRequests = React.useMemo(() => {
    const startIndex = (page - 1) * ROWS_PER_PAGE
    return filtered.slice(startIndex, startIndex + ROWS_PER_PAGE)
  }, [filtered, page])

  const pageStart = filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1
  const pageEnd = Math.min(page * ROWS_PER_PAGE, filtered.length)

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-background">
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
          <Table className="min-w-[980px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-8 px-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Request
                </TableHead>
                <TableHead className="h-8 px-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Documents
                </TableHead>
                <TableHead className="h-8 px-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Signers
                </TableHead>
                <TableHead className="h-8 px-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Stamp
                </TableHead>
                <TableHead className="h-8 px-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="h-8 px-2 text-right text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/20">
                  <RequestRow request={request} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {filtered.length > 0 ? (
          <div className="border-t px-3 py-3 sm:px-4">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-xs text-muted-foreground">
                Showing {pageStart}-{pageEnd} of {filtered.length} requests
              </p>
              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        setPage((currentPage) => Math.max(currentPage - 1, 1))
                      }}
                      aria-disabled={page === 1}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === page}
                        onClick={(event) => {
                          event.preventDefault()
                          setPage(pageNumber)
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        setPage((currentPage) => Math.min(currentPage + 1, totalPages))
                      }}
                      aria-disabled={page === totalPages}
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
