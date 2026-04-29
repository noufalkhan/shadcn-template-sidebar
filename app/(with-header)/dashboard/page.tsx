import { DocumentsDashboardContent } from "@/features/dashboard/components/documents-dashboard-content"
import { documentRows, metrics } from "@/features/dashboard/data"

export default function DashboardPage() {
  return <DocumentsDashboardContent metrics={metrics} rows={documentRows} />
}
