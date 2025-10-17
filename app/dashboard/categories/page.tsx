"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SERVER_URL } from "../../../lib/url.js"
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
import axios from "axios"

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
///catogory type
interface Category {
  _id:string
  name: string;
  categorydes: string;
}
// const categories = ["all", "Playsets", "Equipment", "Supplies"]
const statuses = ["all", "In Stock", "Low Stock", "Out of Stock"]

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [inventory, setInventory] = useState(initialInventory)
  const [dialogCategory, setDialogCategory] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")
  //usestates catogory add
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
  // Filter inventory based on search, category, and status
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory !== "all" ? item.category === selectedCategory : true
    const matchesStatus = selectedStatus !== "all" ? item.status === selectedStatus : true
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Add category
 async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement

     const newItem: Category = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      categorydes: (form.elements.namedItem("categorydes") as HTMLInputElement).value,
    };
    if (!newItem.name || !newItem.categorydes) {
      alert('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${SERVER_URL}/category/add`, newItem); 
     

      if (response.status === 201 || response.status === 200) {
        alert('Category added successfully!');
        setIsAddDialogOpen(false);
        form.reset();
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to save category');
    } finally {
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/category/view`);
       console.log("data",response)
      setCategoryData(response.data.data);
     
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

async function handleDelete(id:string){
   if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const response = await axios.delete(`${SERVER_URL}/category/delete/`,
        {
      data: { id } // <-- send ID in request body
    } );
      if (response.status === 200) {
        alert("Category deleted successfully!");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
}
  // Reset dialog state when dialog closes
  useEffect(() => {
    if (!isAddDialogOpen) {
      setDialogCategory("")
      setDialogStatus("")
    }
   
  
  fetchCategories();
  }, [isAddDialogOpen])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Toys Category</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Category Item</DialogTitle>
              <DialogDescription>Enter the category details below.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddItem}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" placeholder="Category Name" className="col-span-3" required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Description</Label>
                <Input id="categorydes" name="categorydes" placeholder="Category Description" className="col-span-3" required />
              </div>
              
             
           
             
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
                  Save category
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          {/* <CardDescription>Manage and track your inventory items.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Catogorry..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <div className="flex flex-col gap-2 sm:flex-row">
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
            </div> */}
          </div>
          <div className="rounded-md border overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Category Description</th>
                   <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {categoryData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-24 text-center">
                      No inventory items found.
                    </td>
                  </tr>
                ) : (
                  categoryData.map((item) => (
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle">{item.categorydes}</td>

                        <td className="p-4 align-middle">
                           <Button variant="outline"onClick={() => handleDelete(item._id)} >
                          {/* <Filter className="h-4 w-4" /> */}
                          DELETE
                      </Button>
                        </td>
                      {/* <td className="p-4 align-middle">{item.quantity}</td>
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
                      <td className="p-4 align-middle">{new Date(item.expiry).toLocaleDateString()}</td> */}
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
