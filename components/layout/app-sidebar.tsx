"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronUp, Crown, User2 } from "lucide-react"

import { appConfig } from "@/config/app"
import { getSidebarNavItems } from "@/config/nav/resolver"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { isNavItemActive } from "@/lib/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = getSidebarNavItems()

  return (
    <Sidebar collapsible="icon" className="[--sidebar-width-icon:3.75rem]" {...props}>
      <SidebarHeader className="h-16 justify-center px-3 py-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="pointer-events-none h-11 rounded-lg px-2"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {appConfig.productName.slice(0, 1).toUpperCase()}
              </div>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-semibold">{appConfig.productName}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="px-3">
        <Separator className="bg-sidebar-border/65" />
      </div>
      <SidebarContent className="pt-3">
        <SidebarGroup className="px-3 py-0">
          <SidebarGroupLabel className="sr-only">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isNavItemActive(pathname, item.href)}
                    tooltip={item.label}
                    className="h-10 rounded-xl px-3 text-sm font-medium data-[active=true]:bg-[linear-gradient(100deg,var(--primary-button-from)_0%,var(--primary-button-to)_100%)] data-[active=true]:text-primary-foreground data-[active=true]:shadow-[inset_0_0_0_1px_hsl(var(--sidebar-border))]"
                  >
                    <Link
                      href={item.href}
                      prefetch
                      onMouseEnter={() => router.prefetch(item.href)}
                      onFocus={() => router.prefetch(item.href)}
                    >
                      {item.icon ? <item.icon /> : null}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/65 px-3 py-3">
        <div className="mb-2 rounded-xl border border-white/10 bg-[linear-gradient(135deg,var(--primary-button-from)_0%,var(--primary-button-to)_100%)] p-3 text-primary-foreground shadow-md group-data-[collapsible=icon]:hidden">
          <div className="mb-1 flex items-start justify-between gap-2">
            <p className="text-[1.35rem] leading-none font-semibold tracking-tight">Upgrade Pro!</p>
            <Crown className="mt-1 size-4 shrink-0" />
          </div>
          <p className="mb-3 text-xs leading-relaxed text-primary-foreground/85">
            Add more credits for seamless e-stamp purchases and e-sign workflows.
          </p>
          <div className="mb-2 flex items-center gap-2">
            <Progress
              value={50}
              className="h-1.5 bg-white/30 **:data-[slot=progress-indicator]:bg-white"
            />
            <span className="text-xs font-semibold text-primary-foreground/90">5/10</span>
          </div>
          <Button
            size="sm"
            className="h-8 w-full bg-background font-semibold text-foreground hover:bg-background/95"
          >
            Upgrade
          </Button>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <User2 />
                  <span>Account</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-(--radix-popper-anchor-width)">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
