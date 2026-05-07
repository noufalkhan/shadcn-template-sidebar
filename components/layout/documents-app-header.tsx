"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, Cog, Search, Upload } from "lucide-react"

import { getSidebarNavItems } from "@/config/nav/resolver"
import { ThemeManager } from "@/components/theme-manager"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { isNavItemActive } from "@/lib/navigation"

type Crumb = { label: string; href?: string }

const ROUTE_CRUMBS: Record<string, Crumb[]> = {
  "/sample-sidebar": [{ label: "Dashboard" }],
  "/sample-sidebar/documents": [{ label: "Documents" }],
  "/sample-sidebar/templates": [{ label: "Templates" }],
  "/sample-sidebar/archive": [{ label: "Archive" }],
}

function getCrumbsFor(pathname: string): Crumb[] {
  return ROUTE_CRUMBS[pathname] ?? [{ label: "Documents" }]
}

export function DocumentsAppHeader() {
  const pathname = usePathname()
  const navItems = getSidebarNavItems()
  const activeSidebarItem = navItems.find((item) => isNavItemActive(pathname, item.href))
  const crumbs = getCrumbsFor(pathname)
  const pageTitle = activeSidebarItem?.label ?? crumbs[crumbs.length - 1]?.label ?? "Dashboard"
  const breadcrumbText = pageTitle

  return (
    <header className="border-b bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8">
        <div className="flex h-14 items-center gap-2 md:hidden">
          <SidebarTrigger className="shrink-0" />
          <p className="min-w-0 truncate text-sm font-medium text-foreground">{breadcrumbText}</p>
          <div className="ml-auto flex items-center gap-1.5">
            <Button asChild size="sm" className="primary-button rounded-full">
              <Link href="/document-upload" aria-label="Upload your Document">
                <Upload className="size-4" />
                Upload your Document
              </Link>
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

        <div className="relative pb-3 md:hidden">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="h-9 rounded-full bg-muted/50 pl-9"
          />
        </div>

        <div className="hidden h-16 grid-cols-[minmax(0,1fr)_minmax(220px,320px)_auto] items-center gap-3 md:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)_auto] xl:grid-cols-[1fr_minmax(320px,480px)_auto]">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="shrink-0" />
            <p className="min-w-0 truncate text-sm font-medium text-foreground">{pageTitle}</p>
          </div>

          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="h-9 rounded-full bg-muted/50 pl-9"
            />
          </div>

          <div className="flex items-center justify-end gap-1.5 pl-2 lg:gap-2 lg:pl-3">
            <Button
              asChild
              size="icon-sm"
              className="primary-button rounded-full xl:hidden"
            >
              <Link href="/document-upload" aria-label="Upload your Document">
                <Upload className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="primary-button hidden rounded-full xl:inline-flex"
            >
              <Link href="/document-upload" aria-label="Upload your Document">
                <Upload className="size-4" data-icon="inline-start" />
                Upload your Document
              </Link>
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
              className="ml-1 flex items-center rounded-full border border-transparent p-1 text-left transition-colors hover:bg-muted/50 lg:px-1.5 lg:py-1"
              aria-label="Account menu"
            >
              <Avatar size="sm">
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="hidden text-xs leading-tight xl:block">
                <p className="font-medium text-foreground">Aarav Mehta</p>
                <p className="text-muted-foreground">aaravmehta.1990@gmail.com</p>
              </div>
              <ChevronDown className="ml-1 hidden size-3.5 text-muted-foreground xl:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
