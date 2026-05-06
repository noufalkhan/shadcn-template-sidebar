"use client"

import { Clock, FileText, PenLine, Stamp, type LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DashboardStat } from "@/features/dashboard/types"

const STAT_ICONS: Record<DashboardStat["id"], LucideIcon> = {
  documents: FileText,
  esigned: PenLine,
  estamped: Stamp,
  draft: Clock,
}

const STAT_ICON_TINTS: Record<DashboardStat["id"], string> = {
  documents: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  esigned: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  estamped: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  draft: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
}

type DashboardKpiCardsProps = {
  stats: DashboardStat[]
  className?: string
}

export function DashboardKpiCards({ stats, className }: DashboardKpiCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.id]
        const isPositive = stat.delta >= 0
        return (
          <Card
            key={stat.id}
            size="sm"
            className="rounded-lg ring-foreground/5 shadow-none flex-row items-center justify-between gap-3 px-4 py-3"
          >
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-3xl leading-none font-semibold tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p
                className={cn(
                  "text-xs font-medium tabular-nums",
                  isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}
              >
                {isPositive ? "+" : ""}
                {stat.delta.toFixed(1)}%
              </p>
            </div>
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                STAT_ICON_TINTS[stat.id]
              )}
              aria-hidden
            >
              <Icon className="size-5" />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
