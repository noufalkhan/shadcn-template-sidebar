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
  const breadcrumbText = crumbs.map((crumb) => crumb.label).join(" / ")

  return (
    <header className="border-b bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8">
        <div className="flex h-14 items-center gap-2 xl:hidden">
          <SidebarTrigger className="shrink-0" />
          <p className="min-w-0 truncate text-sm font-medium text-foreground">{breadcrumbText}</p>
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              size="icon-sm"
              className="primary-button rounded-full"
              aria-label="Upload your Document"
            >
              <Upload className="size-4" />
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
              className="flex items-center rounded-full border border-transparent p-1 text-left transition-colors hover:bg-muted/50"
              aria-label="Account menu"
            >
              <Avatar size="sm">
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>

        <div className="relative pb-3 xl:hidden">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="h-9 rounded-full bg-muted/50 pl-9"
          />
        </div>

        <div className="hidden h-16 grid-cols-[1fr_minmax(320px,480px)_1fr] items-center gap-4 xl:grid">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="shrink-0" />
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="flex-nowrap overflow-hidden text-sm whitespace-nowrap">
                {crumbs.map((crumb, idx) => {
                  const isLast = idx === crumbs.length - 1
                  return (
                    <React.Fragment key={`${crumb.label}-${idx}`}>
                      <BreadcrumbItem className="min-w-0">
                        {isLast || !crumb.href ? (
                          <BreadcrumbPage className="truncate font-medium text-foreground">
                            {crumb.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href} className="truncate text-muted-foreground">
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
          </div>

          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="h-9 rounded-full bg-muted/50 pl-9"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button size="lg" className="primary-button rounded-full">
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
              <div className="text-xs leading-tight">
                <p className="font-medium text-foreground">Aarav Mehta</p>
                <p className="text-muted-foreground">aaravmehta.1990@gmail.com</p>
              </div>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
