import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { DashboardMetric, DocumentRow } from "@/features/dashboard/data"
import Link from "next/link"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
  X,
} from "lucide-react"

type DocumentsDashboardContentProps = {
  metrics: DashboardMetric[]
  rows: DocumentRow[]
}

export function DocumentsDashboardContent({
  metrics,
  rows,
}: DocumentsDashboardContentProps) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Documents</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          View, manage, and track the status of all your Documents
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/learn-minimal">Open minimal layout learning page</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sample-sidebar">Open sidebar sample page</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((card) => (
          <div key={card.title} className="rounded-lg border bg-background p-4">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <p className="text-[11px] font-medium text-muted-foreground">{card.title}</p>
              <EllipsisVertical className="size-3.5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold tracking-tight">{card.value}</p>
              {card.delta ? (
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${card.deltaTone ?? ""}`}
                >
                  {card.delta}
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{card.subtext}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="flex flex-wrap items-center gap-3 border-b p-3">
          <div className="relative min-w-56 flex-1">
            <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents or signers..."
              className="h-9 bg-muted/30 pl-9 text-[13px]"
            />
          </div>
          <Button variant="outline" size="icon-sm" className="h-9 w-9">
            <X className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 min-w-36 justify-between text-[13px] font-normal"
          >
            All Statuses
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
          <Button
            variant="outline"
            className="h-9 min-w-28 justify-between text-[13px] font-normal"
          >
            All Types
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </div>

        <table className="w-full text-[13px]">
          <thead className="bg-muted/40 text-left text-[11px] font-medium text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Certificate No.</th>
              <th className="px-4 py-3 font-medium">Document Type</th>
              <th className="px-4 py-3 font-medium">Doc ID</th>
              <th className="px-4 py-3 font-medium">Parties</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isPending = row.status === "Pending"
              return (
                <tr key={`${row.certificateNo}-${row.docId}`} className="border-t">
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">
                    {row.certificateNo}
                  </td>
                  <td className="px-4 py-3 text-[13px] font-medium">{row.documentType}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{row.docId}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{row.parties}</td>
                  <td className="px-4 py-3">{row.amount}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[12px]">
                      <span
                        className={`inline-block size-1.5 rounded-full ${
                          isPending ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <EllipsisVertical className="size-4" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t px-4 py-3 text-[12px] text-muted-foreground">
          <p>Showing 1-10 of 18 results</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" className="h-7 w-7">
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button className="h-7 min-w-7 px-2 text-[12px]">1</Button>
            <Button variant="outline" className="h-7 min-w-7 px-2 text-[12px]">
              2
            </Button>
            <Button variant="outline" size="icon-sm" className="h-7 w-7">
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
