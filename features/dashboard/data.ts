export type DashboardMetric = {
  title: string
  value: string
  delta?: string
  deltaTone?: string
  subtext: string
}

export type DocumentStatus = "Completed" | "Pending"

export type DocumentRow = {
  certificateNo: string
  documentType: string
  docId: string
  parties: string
  amount: string
  status: DocumentStatus
}

export const metrics: DashboardMetric[] = [
  {
    title: "Documents",
    value: "100",
    delta: "+3.4%",
    deltaTone: "text-emerald-700 bg-emerald-50",
    subtext: "from last month",
  },
  {
    title: "E-Signed documents",
    value: "12",
    delta: "-1.4%",
    deltaTone: "text-rose-700 bg-rose-50",
    subtext: "from last month",
  },
  {
    title: "E-Stamped documents",
    value: "55",
    delta: "+8.4%",
    deltaTone: "text-emerald-700 bg-emerald-50",
    subtext: "from last month",
  },
  {
    title: "Documents in Draft",
    value: "3",
    subtext: "drafts expiring this week",
  },
]

export const documentRows: DocumentRow[] = [
  {
    certificateNo: "IN-DL29384",
    documentType: "Sale Deed",
    docId: "#ES-9402",
    parties: "2",
    amount: "Rs 15,000",
    status: "Completed",
  },
  {
    certificateNo: "IN-DL29385",
    documentType: "Lease Agreement",
    docId: "#ES-9403",
    parties: "1",
    amount: "Rs 10,000",
    status: "Completed",
  },
  {
    certificateNo: "IN-DL29386",
    documentType: "Power of Attorney",
    docId: "#ES-9404",
    parties: "3",
    amount: "Rs 8,500",
    status: "Pending",
  },
  {
    certificateNo: "IN-DL29387",
    documentType: "Mortgage Deed",
    docId: "#ES-9405",
    parties: "1",
    amount: "Rs 20,000",
    status: "Completed",
  },
  {
    certificateNo: "IN-DL29388",
    documentType: "Gift Deed",
    docId: "#ES-9406",
    parties: "2",
    amount: "Rs 12,000",
    status: "Pending",
  },
  {
    certificateNo: "IN-DL29389",
    documentType: "Partnership Deed",
    docId: "#ES-9407",
    parties: "4",
    amount: "Rs 18,000",
    status: "Pending",
  },
  {
    certificateNo: "IN-DL29390",
    documentType: "Will",
    docId: "#ES-9408",
    parties: "1",
    amount: "Rs 7,500",
    status: "Completed",
  },
  {
    certificateNo: "IN-DL29391",
    documentType: "Trust Deed",
    docId: "#ES-9409",
    parties: "2",
    amount: "Rs 13,000",
    status: "Pending",
  },
  {
    certificateNo: "IN-DL29392",
    documentType: "Trust Deed",
    docId: "#ES-9410",
    parties: "2",
    amount: "Rs 13,000",
    status: "Pending",
  },
]
