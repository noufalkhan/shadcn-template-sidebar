import * as React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type SidebarHeaderLayoutProps = {
  sidebar: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  contentClassName?: string
}

export function SidebarHeaderLayout({
  sidebar,
  header,
  children,
  defaultOpen = false,
  contentClassName,
}: SidebarHeaderLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {sidebar}
      <SidebarInset className="h-svh overflow-hidden">
        {header}
        <main className={contentClassName ?? "flex-1 overflow-y-auto"}>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
