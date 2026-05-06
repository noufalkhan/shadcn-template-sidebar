"use client"

import * as React from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats"
import { ActivityChart } from "@/features/dashboard/components/activity-chart"
import { BuyEstampCta } from "@/features/dashboard/components/buy-estamp-cta"
import { CreditUsageChart } from "@/features/dashboard/components/credit-usage-chart"
import { DashboardKpiCards } from "@/features/dashboard/components/dashboard-kpi-cards"
import { RequestsTable } from "@/features/dashboard/components/requests-table"

export function DashboardPage() {
  const { data: stats } = useDashboardStats()
  const [tab, setTab] = React.useState<"requests" | "batches">("requests")

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as "requests" | "batches")}
      >
        <TabsList variant="line" className="border-b border-border/60 px-0">
          <TabsTrigger value="requests" className="px-4">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="batches" className="px-4">
            Batches
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <DashboardKpiCards
          stats={stats.totals}
          className="md:col-span-12 md:grid-cols-4 lg:col-span-4 lg:grid-cols-2"
        />
        <div className="md:col-span-4 lg:col-span-3">
          <CreditUsageChart
            data={stats.creditUsage}
            total={stats.creditUsageTotal}
          />
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <ActivityChart data={stats.activity} summary={stats.activitySummary} />
        </div>
        <div className="md:col-span-4 lg:col-span-2">
          <BuyEstampCta />
        </div>
      </div>

      <RequestsTable />
    </div>
  )
}
