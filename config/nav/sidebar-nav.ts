import type { NavItem } from "@/config/nav/types"
import { Archive, FileText, LayoutDashboard, LayoutTemplate } from "lucide-react"

export const sidebarNavItems: NavItem[] = [
  { label: "Dashboard", href: "/sample-sidebar", icon: LayoutDashboard },
  { label: "Documents", href: "/sample-sidebar/documents", icon: FileText },
  { label: "Templates", href: "/sample-sidebar/templates", icon: LayoutTemplate },
  { label: "Archive", href: "/sample-sidebar/archive", icon: Archive },
]
