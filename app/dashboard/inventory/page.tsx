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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"

// Sample inventory data
const initialInventory = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Medicine",
    quantity: 120,
    status: "In Stock",
    supplier: "Pharma Inc.",
    expiry: "2025-12-31",
  },
  {
    id: 2,
    name: "Syringe 5ml",
    category: "Equipment",
    quantity: 50,
    status: "Low Stock",
    supplier: "MedEquip",
    expiry: "2027-01-01",
  },
  {
    id: 3,
    name: "Bandage Roll",
    category: "Supplies",
    quantity: 200,
    status: "In Stock",
    supplier: "HealthSupplies",
    expiry: "2026-06-15",
  },
  {
    id: 4,
    name: "Ibuprofen 200mg",
    category: "Medicine",
    quantity: 0,
    status: "Out of Stock",
    supplier: "Pharma Inc.",
    expiry: "2025-08-20",
  },
]

const categories = ["all", "Playsets", "Equipment", "Supplies"]
const statuses = ["all", "In Stock", "Low Stock", "Out of Stock"]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [inventory, setInventory] = useState(initialInventory)
  const [dialogCategory, setDialogCategory] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")

  // Filter inventory based on search, category, and status
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory !== "all" ? item.category === selectedCategory : true
    const matchesStatus = selectedStatus !== "all" ? item.status === selectedStatus : true
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Add new inventory item (mock)
  function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const newItem = {
      id: inventory.length + 1,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      category: dialogCategory,
      quantity: Number((form.elements.namedItem('quantity') as HTMLInputElement).value),
      status: dialogStatus,
      supplier: (form.elements.namedItem('supplier') as HTMLInputElement).value,
      expiry: (form.elements.namedItem('expiry') as HTMLInputElement).value,
    }
    setInventory([newItem, ...inventory])
    setIsAddDialogOpen(false)
    setDialogCategory("")
    setDialogStatus("")
    form.reset()
  }

  // Reset dialog state when dialog closes
  useEffect(() => {
    if (!isAddDialogOpen) {
      setDialogCategory("")
      setDialogStatus("")
    }
  }, [isAddDialogOpen])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Enter the item details below.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddItem}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" placeholder="Item name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select value={dialogCategory} onValueChange={setDialogCategory} required>
                  <SelectTrigger id="category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "all").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="quantity" name="quantity" type="number" min="0" placeholder="0" className="col-span-3" required />
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
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right">Supplier</Label>
                <Input id="supplier" name="supplier" placeholder="Supplier name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry" className="text-right">Expiry</Label>
                <Input id="expiry" name="expiry" type="date" className="col-span-3" required />
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
                  Save Item
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
          <CardDescription>Manage and track your inventory items.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</SelectItem>
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Quantity</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Supplier</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-24 text-center">
                      No inventory items found.
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((item) => (
                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle">{item.category}</td>
                      <td className="p-4 align-middle">{item.quantity}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          item.status === "In Stock"
                            ? "default"
                            : item.status === "Low Stock"
                            ? "outline"
                            : "destructive"
                        }>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{item.supplier}</td>
                      <td className="p-4 align-middle">{new Date(item.expiry).toLocaleDateString()}</td>
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
