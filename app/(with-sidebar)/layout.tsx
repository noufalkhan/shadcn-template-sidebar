import { SidebarHeaderLayout } from "@/components/layout/sidebar-header-layout"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { DocumentsAppHeader } from "@/components/layout/documents-app-header"

export default function WithSidebarLayoutGroup({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarHeaderLayout
      sidebar={<AppSidebar />}
      header={<DocumentsAppHeader />}
      defaultOpen
      contentClassName="flex-1 overflow-y-auto bg-muted/30 p-6"
    >
      {children}
    </SidebarHeaderLayout>
  )
}
