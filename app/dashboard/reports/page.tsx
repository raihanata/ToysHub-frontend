"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, BarChart2, PieChart, Users } from "lucide-react"

const reportTypes = ["all", "Financial", "Inventory", "Appointments", "Patients"]

const summary = [
  { icon: FileText, label: "Total Reports", value: 24 },
  { icon: BarChart2, label: "Financial Reports", value: 8 },
  { icon: PieChart, label: "Inventory Reports", value: 7 },
  { icon: Users, label: "Patient Reports", value: 9 },
]

const initialReports = [
  { id: 1, title: "May Financial Summary", type: "Financial", date: "2024-06-01", status: "Completed" },
  { id: 2, title: "Inventory Audit Q2", type: "Inventory", date: "2024-06-02", status: "In Progress" },
  { id: 3, title: "April Appointments Overview", type: "Appointments", date: "2024-06-03", status: "Completed" },
  { id: 4, title: "Patient Demographics", type: "Patients", date: "2024-06-04", status: "Completed" },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [reports] = useState(initialReports)

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType !== "all" ? r.type === selectedType : true
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summary.map((item) => (
          <Card key={item.label} className="flex flex-col items-center justify-center py-6">
            <item.icon className="h-8 w-8 text-teal-600 mb-2" />
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-muted-foreground">{item.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>View and filter your reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type === "all" ? "All Types" : type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="h-24 text-center">
                      No reports found.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((r) => (
                    <tr key={r.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{r.title}</td>
                      <td className="p-4 align-middle">{r.type}</td>
                      <td className="p-4 align-middle">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          r.status === "Completed"
                            ? "default"
                            : "outline"
                        }>
                          {r.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 