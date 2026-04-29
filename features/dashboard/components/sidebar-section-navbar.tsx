"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeManager } from "@/components/theme-manager"
import { Bell, Cog, User } from "lucide-react"

export function SidebarSectionNavbar() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-6">
      <SidebarTrigger className="mr-3" />

      <div className="w-48">
        <p className="text-lg font-semibold tracking-tight">Sidebar Section</p>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button size="lg" className="primary-button mr-1 rounded-full">
          New Item
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
