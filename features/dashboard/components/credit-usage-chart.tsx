"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import type { DashboardStats } from "@/features/dashboard/types"

type CreditUsageChartProps = {
  data: DashboardStats["creditUsage"]
  total: DashboardStats["creditUsageTotal"]
}

export function CreditUsageChart({ data, total }: CreditUsageChartProps) {
  return (
    <Card size="sm" className="h-full rounded-lg ring-foreground/5 shadow-none">
      <CardContent className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground">Credit Usage</p>
          <div className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {total.periodLabel}
          </div>
        </div>

        <div className="h-[110px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="label"
                hide
              />
              <Bar
                dataKey="value"
                fill="var(--color-credit-usage, oklch(0.64 0.18 304))"
                radius={[4, 4, 4, 4]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Average Spendings</span>
          <span className="tabular-nums">
            {total.used} / {total.total}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
