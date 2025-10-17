"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"

const initialPayments = [
  { id: 1, patient: "John Doe", amount: 120, method: "Credit Card", status: "Completed", date: "2024-06-01" },
  { id: 2, patient: "Sarah Johnson", amount: 80, method: "Cash", status: "Pending", date: "2024-06-02" },
  { id: 3, patient: "Mike Williams", amount: 200, method: "Insurance", status: "Completed", date: "2024-06-03" },
  { id: 4, patient: "Emily Davis", amount: 50, method: "Credit Card", status: "Failed", date: "2024-06-04" },
]

const methods = ["all", "Credit Card", "Cash", "Insurance"]
const statuses = ["all", "Completed", "Pending", "Failed"]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [payments, setPayments] = useState(initialPayments)
  const [dialogMethod, setDialogMethod] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = p.patient.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMethod = selectedMethod !== "all" ? p.method === selectedMethod : true
    const matchesStatus = selectedStatus !== "all" ? p.status === selectedStatus : true
    return matchesSearch && matchesMethod && matchesStatus
  })

  function handleAddPayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const newPayment = {
      id: payments.length + 1,
      patient: (form.elements.namedItem('patient') as HTMLInputElement).value,
      amount: Number((form.elements.namedItem('amount') as HTMLInputElement).value),
      method: dialogMethod,
      status: dialogStatus,
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
    }
    setPayments([newPayment, ...payments])
    setIsAddDialogOpen(false)
    setDialogMethod("")
    setDialogStatus("")
    form.reset()
  }

  useEffect(() => {
    if (!isAddDialogOpen) {
      setDialogMethod("")
      setDialogStatus("")
    }
  }, [isAddDialogOpen])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>Enter the payment details below.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddPayment}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">Patient</Label>
                <Input id="patient" name="patient" placeholder="Patient name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" name="amount" type="number" min="0" placeholder="0" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="method" className="text-right">Method</Label>
                <Select value={dialogMethod} onValueChange={setDialogMethod} required>
                  <SelectTrigger id="method" className="col-span-3">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {methods.filter(m => m !== "all").map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="method" value={dialogMethod} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={dialogStatus} onValueChange={setDialogStatus} required>
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.filter(s => s !== "all").map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="status" value={dialogStatus} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" name="date" type="date" className="col-span-3" required />
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
                  Save Payment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payments List</CardTitle>
          <CardDescription>Manage and track your payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method} value={method}>{method === "all" ? "All Methods" : method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status === "all" ? "All Statuses" : status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md border overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Patient</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Method</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-24 text-center">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((p) => (
                    <tr key={p.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{p.patient}</td>
                      <td className="p-4 align-middle">${'{'}p.amount.toFixed(2){'}'}</td>
                      <td className="p-4 align-middle">{p.method}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          p.status === "Completed"
                            ? "default"
                            : p.status === "Pending"
                            ? "outline"
                            : "destructive"
                        }>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{new Date(p.date).toLocaleDateString()}</td>
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