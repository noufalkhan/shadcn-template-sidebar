import { SidebarHeaderLayout } from "@/components/layout/sidebar-header-layout"
import { AppSidebar } from "@/features/dashboard/components/app-sidebar"
import { SidebarSectionNavbar } from "@/features/dashboard/components/sidebar-section-navbar"

export default function WithSidebarLayoutGroup({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarHeaderLayout
      sidebar={<AppSidebar />}
      header={<SidebarSectionNavbar />}
      contentClassName="flex-1 overflow-y-auto bg-muted/30 p-6"
    >
      {children}
    </SidebarHeaderLayout>
  )
}
