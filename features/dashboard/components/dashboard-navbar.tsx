"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getHeaderNavItems } from "@/config/nav/resolver"
import { isNavItemActive } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeManager } from "@/components/theme-manager"
import { Bell, Cog, User } from "lucide-react"

type DashboardNavbarProps = {
  showSidebarTrigger?: boolean
}

export function DashboardNavbar({
  showSidebarTrigger = true,
}: DashboardNavbarProps) {
  const pathname = usePathname()
  const navItems = getHeaderNavItems()

  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-6">
      {showSidebarTrigger ? <SidebarTrigger className="mr-3" /> : null}

      <div className="w-48">
        <p className="text-lg font-semibold tracking-tight">Ospyn Sign Legal</p>
      </div>

      <nav className="hidden flex-1 items-center justify-center gap-1 text-[13px] font-medium text-muted-foreground md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`cursor-pointer px-3 py-4 transition-colors hover:text-foreground ${
              isNavItemActive(pathname, item.href)
                ? "border-b-2 border-foreground text-foreground"
                : "border-b-2 border-transparent"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1">
        <Button size="lg" className="primary-button mr-1 rounded-full">
          Upload your Document
        </Button>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
          <Bell className="size-4" />
        </Button>
        <ThemeManager
          trigger={
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
              <Cog className="size-4" />
            </Button>
          }
        />
        <Button variant="outline" size="icon-sm" className="ml-1">
          <User className="size-4" />
        </Button>
      </div>
    </header>
  )
}
