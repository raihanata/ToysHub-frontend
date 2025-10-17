"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { CalendarPlus, Clock, Filter, Search } from "lucide-react"

// Sample appointment data
const appointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    date: "2025-05-11",
    time: "10:00 AM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    doctor: "Dr. Wilson",
    date: "2025-05-11",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: 3,
    patient: "Mike Williams",
    doctor: "Dr. Brown",
    date: "2025-05-11",
    time: "1:00 PM",
    type: "Check-up",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. Smith",
    date: "2025-05-11",
    time: "2:30 PM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: 5,
    patient: "Robert Miller",
    doctor: "Dr. Wilson",
    date: "2025-05-11",
    time: "4:00 PM",
    type: "Follow-up",
    status: "Cancelled",
  },
  {
    id: 6,
    patient: "Jennifer Lee",
    doctor: "Dr. Brown",
    date: "2025-05-12",
    time: "9:00 AM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: 7,
    patient: "David Wilson",
    doctor: "Dr. Smith",
    date: "2025-05-12",
    time: "10:30 AM",
    type: "Check-up",
    status: "Confirmed",
  },
  {
    id: 8,
    patient: "Lisa Anderson",
    doctor: "Dr. Wilson",
    date: "2025-05-12",
    time: "1:00 PM",
    type: "Follow-up",
    status: "Pending",
  },
]

// Sample doctors data
const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "General Medicine" },
  { id: 2, name: "Dr. Wilson", specialty: "Cardiology" },
  { id: 3, name: "Dr. Brown", specialty: "Pediatrics" },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>("all")
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter appointments based on search query, selected date, doctor, and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDate = date ? appointment.date === date.toISOString().split("T")[0] : true

    const matchesDoctor = selectedDoctor && selectedDoctor !== "all" ? appointment.doctor === selectedDoctor : true

    const matchesStatus = selectedStatus && selectedStatus !== "all" ? appointment.status === selectedStatus : true

    return matchesSearch && matchesDate && matchesDoctor && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <CalendarPlus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
              <DialogDescription>Create a new appointment for a patient.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Patient
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Williams">Mike Williams</SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      <SelectItem value="Robert Miller">Robert Miller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Check-up">Check-up</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <div className="col-span-3">
                  <Input id="notes" placeholder="Additional notes" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // In a real app, this would save the appointment to the database
                  setIsAddDialogOpen(false)
                }}
              >
                Save Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search appointments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Doctors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Doctor</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="h-24 text-center">
                            No appointments found.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appointment) => (
                          <tr
                            key={appointment.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{appointment.patient}</td>
                            <td className="p-4 align-middle">{appointment.doctor}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {appointment.time}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{appointment.type}</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant={
                                  appointment.status === "Confirmed"
                                    ? "default"
                                    : appointment.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {appointment.status}
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
            </div>
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-[300px]">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setDate(new Date())}>
                    Today
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date
                      ? date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "All Appointments"}
                  </CardTitle>
                  <CardDescription>{filteredAppointments.length} appointments scheduled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <h3 className="text-lg font-medium">No appointments found</h3>
                          <p className="text-sm text-muted-foreground">
                            There are no appointments scheduled for this date.
                          </p>
                        </div>
                      </div>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="grid gap-1">
                            <div className="font-medium">{appointment.patient}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.doctor} • {appointment.type}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span>{appointment.time}</span>
                              </div>
                              <Badge
                                variant={
                                  appointment.status === "Confirmed"
                                    ? "default"
                                    : appointment.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                                className="mt-1"
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                              <span className="sr-only">More</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
