"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, Cog, Search, Upload } from "lucide-react"

import { ThemeManager } from "@/components/theme-manager"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

type Crumb = { label: string; href?: string }

const ROUTE_CRUMBS: Record<string, Crumb[]> = {
  "/sample-sidebar": [
    { label: "Documents", href: "/sample-sidebar/documents" },
    { label: "My Requests" },
  ],
  "/sample-sidebar/documents": [{ label: "Documents" }],
  "/sample-sidebar/templates": [{ label: "Templates" }],
  "/sample-sidebar/archive": [{ label: "Archive" }],
}

function getCrumbsFor(pathname: string): Crumb[] {
  return ROUTE_CRUMBS[pathname] ?? [{ label: "Documents" }]
}

export function DocumentsAppHeader() {
  const pathname = usePathname()
  const crumbs = getCrumbsFor(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="shrink-0" />

      <Breadcrumb className="hidden md:block">
        <BreadcrumbList className="text-sm">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1
            return (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                <BreadcrumbItem>
                  {isLast || !crumb.href ? (
                    <BreadcrumbPage className="font-medium text-foreground">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href} className="text-muted-foreground">
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast ? <BreadcrumbSeparator /> : null}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex flex-1 items-center justify-end gap-2 md:ml-6 md:justify-start">
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="h-9 rounded-full bg-muted/50 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="lg" className="primary-button hidden rounded-full sm:inline-flex">
          <Upload className="size-4" data-icon="inline-start" />
          Upload your Document
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </Button>

        <ThemeManager
          trigger={
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
              aria-label="Theme settings"
            >
              <Cog className="size-4" />
            </Button>
          }
        />

        <button
          type="button"
          className="ml-1 flex items-center gap-2 rounded-full border border-transparent px-1.5 py-1 text-left transition-colors hover:bg-muted/50"
        >
          <Avatar size="sm">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="hidden text-xs leading-tight md:block">
            <p className="font-medium text-foreground">Aarav Mehta</p>
            <p className="text-muted-foreground">aaravmehta.1990@gmail.com</p>
          </div>
          <ChevronDown className="hidden size-3.5 text-muted-foreground md:block" />
        </button>
      </div>
    </header>
  )
}
