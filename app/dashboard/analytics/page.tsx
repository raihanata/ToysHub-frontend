"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart2, PieChart, TrendingUp, Users } from "lucide-react"

const eventTypes = ["all", "Login", "Payment", "Appointment", "Inventory"]

const summary = [
  { icon: TrendingUp, label: "Total Events", value: 1200 },
  { icon: BarChart2, label: "Payments", value: 320 },
  { icon: PieChart, label: "Appointments", value: 450 },
  { icon: Users, label: "New Users", value: 180 },
]

const initialAnalytics = [
  { id: 1, event: "Login", user: "John Doe", date: "2024-06-01", status: "Success" },
  { id: 2, event: "Payment", user: "Sarah Johnson", date: "2024-06-02", status: "Success" },
  { id: 3, event: "Appointment", user: "Mike Williams", date: "2024-06-03", status: "Created" },
  { id: 4, event: "Inventory", user: "Emily Davis", date: "2024-06-04", status: "Updated" },
]

export default function AnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [analytics] = useState(initialAnalytics)

  const filteredAnalytics = analytics.filter((a) => {
    const matchesSearch = a.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType !== "all" ? a.event === selectedType : true
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summary.map((item) => (
          <Card key={item.label} className="flex flex-col items-center justify-center py-6">
            <item.icon className="h-8 w-8 text-teal-600 mb-2" />
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-muted-foreground">{item.label}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Visits Over Time</CardTitle>
            <CardDescription>Chart placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center text-muted-foreground">[Chart]</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Chart placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center text-muted-foreground">[Chart]</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Analytics Events</CardTitle>
          <CardDescription>View and filter analytics events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
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
                  {eventTypes.map((type) => (
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Event</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnalytics.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="h-24 text-center">
                      No analytics events found.
                    </td>
                  </tr>
                ) : (
                  filteredAnalytics.map((a) => (
                    <tr key={a.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{a.event}</td>
                      <td className="p-4 align-middle">{a.user}</td>
                      <td className="p-4 align-middle">{new Date(a.date).toLocaleDateString()}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          a.status === "Success"
                            ? "default"
                            : "outline"
                        }>
                          {a.status}
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