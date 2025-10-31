"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SERVER_URL } from "../../../lib/url.js"
import Cookies from "js-cookie";
import CustomerAction from "@/components/ui/customerAction";
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
import Categories from "@/components/ui/categories.jsx";

// Sample inventory data

///catogory type
interface customer {
  _id?: string
  customerName: string;
  customerPhone: string;

}
// const categories = ["all", "Playsets", "Equipment", "Supplies"]
const statuses = ["all", "In Stock", "Low Stock", "Out of Stock"]

export default function Customers() {
  const token = Cookies.get("auth_token");
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  // const [inventory, setInventory] = useState(initialInventory)
  const [dialogCategory, setDialogCategory] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")
  //usestates employeee add
  const [customersData, setcustomersData] = useState<customer>({
    customerName: "",
    customerPhone: "",

  });

  const [loading, setLoading] = useState(false);
  const [customersList, setCustomersList] = useState<customer[]>([])
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [SelectedCustomer, setSelectedCustomer] = useState<customer | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState<customer>({
    customerName: "",
    customerPhone: "",

  });


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setcustomersData(prev => ({ ...prev, [name]: value }))
  }



  const fetchcustomers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/customer/get`,
        {
          headers: { Authorization: `Bearer ${token}` }
        },
      );
      console.log("data", response)
      setCustomersList(response.data.data);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };



  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${SERVER_URL}/customer/update`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { id: editData._id },
        }
      );

      if (res.data.status) {
        alert("customer updated successfully!");
        setIsEditDialogOpen(false);
        fetchcustomers()
      }
      else {
        alert("Failed to update customers");
      }
    } catch (error) {
      console.error("Error updating customers:", error);
      alert("Server error");
    }
  };

  const handleDeleteEmployee = async (customer: any) => {
    if (!confirm(`Are you sure you want to delete ${customer.customerName}?`)) return;

    try {
      const res = await axios.delete(`${SERVER_URL}/customer/delete`, {
        params: { id: customer._id }, // send as query param
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status) {
        alert("customer deleted successfully!");
        fetchcustomers(); // refresh list
      } else {
        alert("Failed to delete customers");
      }
    } catch (error) {
      console.error("Error deleting customers:", error);
      alert("Server error");
    }
  };

  // Reset dialog state when dialog closes
  useEffect(() => {
    if (!isAddDialogOpen) {
      setDialogCategory("")
      setDialogStatus("")
    }


    fetchcustomers()
  }, [isAddDialogOpen])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>

      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customers List </CardTitle>
          {/* <CardDescription>Manage and track your inventory items.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Customer..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

          </div>
          <div className="rounded-md border overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Phone</th>

                  <th className="h-12 px-4 text-left align-middle font-medium">Action</th>

                </tr>
              </thead>
              <tbody>
                {customersList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-24 text-center">
                      No Employees found.
                    </td>
                  </tr>
                ) : (
                  customersList.map((li: any) => (
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{li.customerName} </td>
                      <td className="p-4 align-middle">{li.customerPhone}</td>


                      <td className="p-4 align-middle">
                        <CustomerAction
                          customer={li}
                          onView={(customer: any) => {
                            setSelectedCustomer(customer);
                            setIsViewDialogOpen(true);
                          }}
                          onEdit={(customer: any) => {
                            setEditData(customer);
                            setSelectedCustomer(customer);
                            setIsEditDialogOpen(true);
                          }}
                          onDelete={handleDeleteEmployee}
                        />

                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 👇 View customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>customer Details</DialogTitle>
            <DialogDescription>
              View complete details of the selected customer.
            </DialogDescription>
          </DialogHeader>

          {SelectedCustomer ? (
            <div className="space-y-2">
              <p>
                <strong>Customer Name:</strong>
                {SelectedCustomer.customerName}
              </p>
              
              <p>
                <strong>Phone:</strong> {SelectedCustomer.customerPhone}
              </p>

            </div>
          ) : (
            <p>No customers selected.</p>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*  EDIT customer DIALOG - */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Customers</DialogTitle>
            <DialogDescription>Update Customers details below.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customerName"> Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={editData.customerName}
                onChange={handleEditChange}
              />
            </div>

            <div>
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                value={editData.customerPhone}
                onChange={handleEditChange}
              />
            </div>



            <div className="flex justify-end">
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
