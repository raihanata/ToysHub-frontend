"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SERVER_URL } from "../../../lib/url.js"
import Cookies from "js-cookie";
import EmployeesAction from "@/components/ui/employeesAction"
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
interface employee {
  _id?: string
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  place: string;
  gender: string;
  password: string;
  role: string;
}
// const categories = ["all", "Playsets", "Equipment", "Supplies"]
const statuses = ["all", "In Stock", "Low Stock", "Out of Stock"]

export default function Employees() {
  const token = Cookies.get("auth_token");
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  // const [inventory, setInventory] = useState(initialInventory)
  const [dialogCategory, setDialogCategory] = useState("")
  const [dialogStatus, setDialogStatus] = useState("")
  //usestates employeee add
  const [employeeData, setEmployeeData] = useState<employee>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    place: "",
    gender: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState<employee[]>([])
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    place: "",
    gender: "",
    role: "",
  });


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setEmployeeData(prev => ({ ...prev, [name]: value }))
  }

  // Add employee
  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {


      console.log("token", token);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/employee/register`,
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        alert("employee added successfully!");
        console.log(res.data.data);
        setEmployeeData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          place: "",
          gender: "",
          password: "",
          role: "",
        })
        setIsAddDialogOpen(false)
      } else {
      }
      alert("Failed to add empoyee.");

    } catch (error) {
      console.error(error);
      alert("Error saving employee");
    }
  };


  const fetchemployees = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/employee/get`,
        {
          headers: { Authorization: `Bearer ${token}` }
        },
      );
      console.log("data", response)
      setEmployeeList(response.data.data);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };



  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${SERVER_URL}/employee/update/${selectedEmployee._id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.status) {
        alert("Employee updated successfully!");
        setIsEditDialogOpen(false);
        fetchemployees(); // refresh list
      } else {
        alert("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Server error");
    }
  };

  const handleDeleteEmployee = async (employee: any) => {
    if (!confirm(`Are you sure you want to delete ${employee.firstname}?`)) return;

    try {
      const res = await axios.delete(`${SERVER_URL}/employee/delete`, {
        params: { id: employee._id }, // 👈 send as query param
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status) {
        alert("Employee deleted successfully!");
        fetchemployees(); // refresh list
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Server error");
    }
  };

  // Reset dialog state when dialog closes
  useEffect(() => {
    if (!isAddDialogOpen) {
      setDialogCategory("")
      setDialogStatus("")
    }


    fetchemployees()
  }, [isAddDialogOpen])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the Employee details below.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddItem}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right"> First Name</Label>
                <Input id="firstname" name="firstname" placeholder=" First Name" className="col-span-3" value={employeeData.firstname} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastname" className="text-right"> Last Name</Label>
                <Input id="lastname" name="lastname" placeholder=" Last Name" className="col-span-3" value={employeeData.lastname} onChange={handleInputChange} required />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" name="phone" placeholder="Phone" className="col-span-3" value={employeeData.phone} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" name="email" placeholder="Email" className="col-span-3" value={employeeData.email} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Password</Label>
                <Input id="password" name="password" placeholder="Password" className="col-span-3" value={employeeData.password} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="place" className="text-right">Place</Label>
                <Input id="place" name="place" placeholder="Place" className="col-span-3" value={employeeData.place} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentMethod">Gender</Label>
                <select
                  id="gender"
                  value={employeeData.gender}
                  onChange={(e) =>
                    setEmployeeData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="border rounded-md p-2 w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>

                </select>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" type="submit">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employees List </CardTitle>
          {/* <CardDescription>Manage and track your inventory items.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Employee..."
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Place</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Gender</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Action</th>

                </tr>
              </thead>
              <tbody>
                {employeeList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-24 text-center">
                      No Employees found.
                    </td>
                  </tr>
                ) : (
                  employeeList.map((li: any) => (
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{li.firstname} {li.lastname}</td>
                      <td className="p-4 align-middle">{li.phone}</td>
                      <td className="p-4 align-middle">{li.place}</td>
                      <td className="p-4 align-middle">{li.email}</td>
                      <td className="p-4 align-middle">{li.gender}</td>

                      <td className="p-4 align-middle">
                        <EmployeesAction
                          employee={li}
                          onView={(employee: any) => {
                            setSelectedEmployee(employee);
                            setIsViewDialogOpen(true);
                          }}
                          onEdit={(employee: any) => {
                            setEditData(employee);
                            setSelectedEmployee(employee);
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

      {/* 👇 View Employee Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              View complete details of the selected employee.
            </DialogDescription>
          </DialogHeader>

          {selectedEmployee ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedEmployee.firstname}{" "}
                {selectedEmployee.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedEmployee.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedEmployee.phone}
              </p>
              <p>
                <strong>Place:</strong> {selectedEmployee.place}
              </p>
              <p>
                <strong>Gender:</strong> {selectedEmployee.gender}
              </p>
              <p>
                <strong>Role:</strong> {selectedEmployee.role || "N/A"}
              </p>
            </div>
          ) : (
            <p>No employee selected.</p>
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

      {/* ---------------- EDIT EMPLOYEE DIALOG ---------------- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update employee details below.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                value={editData.firstname}
                onChange={handleEditChange}
              />
            </div>

            <div>
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                value={editData.lastname}
                onChange={handleEditChange}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editData.email}
                onChange={handleEditChange}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
              />
            </div>

            <div>
              <Label htmlFor="place">Place</Label>
              <Input
                id="place"
                name="place"
                value={editData.place}
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
