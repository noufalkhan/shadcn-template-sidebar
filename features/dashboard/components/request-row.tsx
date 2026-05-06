"use client"

import { FileText, MoreVertical, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Request, RequestStatus } from "@/features/dashboard/types"

const STATUS_LABEL: Record<RequestStatus, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  draft: "Draft",
  rejected: "Rejected",
}

const STATUS_DOT: Record<RequestStatus, string> = {
  "in-progress": "bg-amber-500",
  completed: "bg-emerald-500",
  draft: "bg-muted-foreground",
  rejected: "bg-rose-500",
}

const CHANNEL_BADGE: Record<Request["channel"], string> = {
  FTP:
    "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  API:
    "border-transparent bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  WEB:
    "border-transparent bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
}

const STAMP_KEY_TINT: Record<Request["stampDetailsKey"], string> = {
  JK: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  KA: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  MH: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  TN: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  DL: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
}

const SIGNER_TINTS = [
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
]

type RequestRowProps = {
  request: Request
}

export function RequestRow({ request }: RequestRowProps) {
  const visibleSigners = request.signers.slice(0, 3)
  const overflow = Math.max(request.signers.length - visibleSigners.length, 0)

  return (
    <div className="grid grid-cols-12 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30">
      <div className="col-span-12 flex items-start gap-3 md:col-span-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold tracking-tight">{request.id}</p>
            <Badge className={cn("text-xs", CHANNEL_BADGE[request.channel])}>
              {request.channel}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{request.dateTime}</p>
        </div>
      </div>

      <div className="col-span-6 flex items-center gap-2 md:col-span-1">
        <FileText className="size-4 text-muted-foreground" aria-hidden />
        <div className="leading-tight">
          <p className="text-xs text-muted-foreground">Documents</p>
          <p className="text-sm font-medium tabular-nums">
            {String(request.documentsCount).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="col-span-6 flex items-center gap-3 md:col-span-2">
        <div className="leading-tight">
          <p className="text-xs text-muted-foreground">Signers</p>
          <div className="mt-0.5 flex items-center gap-2">
            <AvatarGroup className="-space-x-1.5">
              {visibleSigners.map((signer, idx) => (
                <Avatar
                  key={signer.initials + idx}
                  size="sm"
                  className="ring-2 ring-background"
                >
                  <AvatarFallback
                    className={cn(
                      "text-xs font-semibold",
                      SIGNER_TINTS[idx % SIGNER_TINTS.length]
                    )}
                  >
                    {signer.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" />
              {request.signers.length} signers
              {overflow > 0 ? ` (+${overflow})` : null}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-6 leading-tight md:col-span-2">
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">Stamp Details</p>
          <span
            className={cn(
              "inline-flex h-4 min-w-6 items-center justify-center rounded-sm px-1 text-xs font-semibold",
              STAMP_KEY_TINT[request.stampDetailsKey]
            )}
          >
            {request.stampDetailsKey}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-sm">
          <span className="font-medium tabular-nums">
            {request.amount === null ? "--" : `₹${request.amount}`}
          </span>
          {request.amount !== null ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" />
              {request.partiesCount} Parties
            </span>
          ) : null}
        </div>
      </div>

      <div className="col-span-10 leading-tight md:col-span-3">
        <div className="flex items-center gap-2">
          <span
            className={cn("size-2 rounded-full", STATUS_DOT[request.status])}
            aria-hidden
          />
          <p className="text-sm font-medium">{STATUS_LABEL[request.status]}</p>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {request.lastActionLabel} <span aria-hidden>·</span> {request.lastActionAgo}
        </p>
      </div>

      <div className="col-span-2 flex justify-end md:col-span-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
              aria-label="Request actions"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
