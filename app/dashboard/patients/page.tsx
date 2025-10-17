"use client"

import { useState } from "react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, UserPlus } from "lucide-react"

// Sample patient data
const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, CA 12345",
    lastVisit: "2025-05-01",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@example.com",
    address: "456 Oak Ave, Somewhere, CA 12345",
    lastVisit: "2025-04-28",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Williams",
    age: 28,
    gender: "Male",
    phone: "+1 (555) 345-6789",
    email: "mike.williams@example.com",
    address: "789 Pine St, Nowhere, CA 12345",
    lastVisit: "2025-04-15",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 52,
    gender: "Female",
    phone: "+1 (555) 456-7890",
    email: "emily.davis@example.com",
    address: "101 Elm St, Anywhere, CA 12345",
    lastVisit: "2025-05-05",
    status: "Active",
  },
  {
    id: 5,
    name: "Robert Miller",
    age: 67,
    gender: "Male",
    phone: "+1 (555) 567-8901",
    email: "robert.miller@example.com",
    address: "202 Maple Ave, Everywhere, CA 12345",
    lastVisit: "2025-03-20",
    status: "Active",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    age: 41,
    gender: "Female",
    phone: "+1 (555) 678-9012",
    email: "jennifer.lee@example.com",
    address: "303 Cedar St, Somewhere, CA 12345",
    lastVisit: "2025-04-10",
    status: "Active",
  },
  {
    id: 7,
    name: "David Wilson",
    age: 35,
    gender: "Male",
    phone: "+1 (555) 789-0123",
    email: "david.wilson@example.com",
    address: "404 Birch Ave, Anywhere, CA 12345",
    lastVisit: "2025-05-03",
    status: "Active",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    age: 29,
    gender: "Female",
    phone: "+1 (555) 890-1234",
    email: "lisa.anderson@example.com",
    address: "505 Walnut St, Nowhere, CA 12345",
    lastVisit: "2025-04-22",
    status: "Inactive",
  },
]

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("all")
  const [selectedGender, setSelectedGender] = useState<string | undefined>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter patients based on search query, status, and gender
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)

    const matchesStatus = selectedStatus && selectedStatus !== "all" ? patient.status === selectedStatus : true

    const matchesGender = selectedGender && selectedGender !== "all" ? patient.gender === selectedGender : true

    return matchesSearch && matchesStatus && matchesGender
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient's information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input id="name" placeholder="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input id="age" type="number" placeholder="35" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select>
                  <SelectTrigger id="gender" className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" placeholder="123 Main St, Anytown, CA 12345" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // In a real app, this would save the patient to the database
                  setIsAddDialogOpen(false)
                }}
              >
                Save Patient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="recent">Recent Visits</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Patient</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Age/Gender</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Last Visit</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="h-24 text-center">
                        No patients found.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-xs text-muted-foreground">ID: {patient.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span>{patient.phone}</span>
                            <span className="text-xs text-muted-foreground">{patient.email}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span>{patient.age} years</span>
                            <span className="text-xs text-muted-foreground">{patient.gender}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{new Date(patient.lastVisit).toLocaleDateString()}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Patients</CardTitle>
              <CardDescription>Patients who are currently active in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients
                  .filter((patient) => patient.status === "Active")
                  .map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.gender}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Patients</CardTitle>
              <CardDescription>Patients who are currently inactive in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients
                  .filter((patient) => patient.status === "Inactive")
                  .map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.gender}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          Activate
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
              <CardDescription>Patients who visited in the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients
                  .filter((patient) => {
                    const lastVisit = new Date(patient.lastVisit)
                    const thirtyDaysAgo = new Date()
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                    return lastVisit >= thirtyDaysAgo
                  })
                  .map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          Schedule Follow-up
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
