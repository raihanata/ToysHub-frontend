import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Calendar, CreditCard, DollarSign, Users, Package, Pill, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+42 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">6 pending, 18 confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,563</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">12 items low in stock</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Revenue Chart</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>You had 12 appointments today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Activity className="h-4 w-4 text-teal-600" />,
                      title: "Dr. Smith completed consultation",
                      description: "Patient: John Doe",
                      timestamp: "2 hours ago",
                    },
                    {
                      icon: <Pill className="h-4 w-4 text-teal-600" />,
                      title: "New prescription added",
                      description: "Patient: Sarah Johnson",
                      timestamp: "3 hours ago",
                    },
                    {
                      icon: <CreditCard className="h-4 w-4 text-teal-600" />,
                      title: "Payment received",
                      description: "$150 - Consultation fee",
                      timestamp: "5 hours ago",
                    },
                    {
                      icon: <Calendar className="h-4 w-4 text-teal-600" />,
                      title: "New appointment scheduled",
                      description: "Patient: Mike Williams",
                      timestamp: "6 hours ago",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-800/20">{item.icon}</div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next 5 scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      patient: "John Doe",
                      time: "10:00 AM",
                      doctor: "Dr. Smith",
                      type: "Follow-up",
                    },
                    {
                      patient: "Sarah Johnson",
                      time: "11:30 AM",
                      doctor: "Dr. Wilson",
                      type: "Consultation",
                    },
                    {
                      patient: "Mike Williams",
                      time: "1:00 PM",
                      doctor: "Dr. Brown",
                      type: "Check-up",
                    },
                    {
                      patient: "Emily Davis",
                      time: "2:30 PM",
                      doctor: "Dr. Smith",
                      type: "Consultation",
                    },
                    {
                      patient: "Robert Miller",
                      time: "4:00 PM",
                      doctor: "Dr. Wilson",
                      type: "Follow-up",
                    },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.type}
                        </p>
                      </div>
                      <div className="text-sm text-right">
                        <p>{appointment.doctor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
                <CardDescription>Items that need to be restocked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Paracetamol 500mg",
                      quantity: 15,
                      threshold: 20,
                    },
                    {
                      name: "Amoxicillin 250mg",
                      quantity: 8,
                      threshold: 15,
                    },
                    {
                      name: "Ibuprofen 400mg",
                      quantity: 12,
                      threshold: 25,
                    },
                    {
                      name: "Omeprazole 20mg",
                      quantity: 5,
                      threshold: 10,
                    },
                    {
                      name: "Surgical Gloves",
                      quantity: 30,
                      threshold: 50,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Threshold: {item.threshold}</p>
                      </div>
                      <div className="text-sm">
                        <p
                          className={`font-medium ${
                            item.quantity < item.threshold / 2 ? "text-red-500" : "text-amber-500"
                          }`}
                        >
                          {item.quantity} left
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      patient: "John Doe",
                      amount: "$150",
                      type: "Consultation",
                      status: "Completed",
                    },
                    {
                      patient: "Sarah Johnson",
                      amount: "$85",
                      type: "Pharmacy",
                      status: "Completed",
                    },
                    {
                      patient: "Mike Williams",
                      amount: "$200",
                      type: "Lab Tests",
                      status: "Pending",
                    },
                    {
                      patient: "Emily Davis",
                      amount: "$120",
                      type: "Consultation",
                      status: "Completed",
                    },
                    {
                      patient: "Robert Miller",
                      amount: "$65",
                      type: "Pharmacy",
                      status: "Completed",
                    },
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{payment.patient}</p>
                        <p className="text-sm text-muted-foreground">{payment.type}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <p
                          className={`text-xs ${payment.status === "Completed" ? "text-green-500" : "text-amber-500"}`}
                        >
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Analytics Dashboard</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">Reports Dashboard</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>View all system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "System Update",
                    description: "The system will be updated tonight at 2:00 AM. Expect 30 minutes of downtime.",
                    timestamp: "1 hour ago",
                  },
                  {
                    title: "New Feature",
                    description: "We've added a new feature to the pharmacy module. Check it out!",
                    timestamp: "3 hours ago",
                  },
                  {
                    title: "Maintenance Complete",
                    description: "The scheduled maintenance has been completed successfully.",
                    timestamp: "Yesterday",
                  },
                  {
                    title: "Staff Meeting",
                    description: "Reminder: Staff meeting tomorrow at 9:00 AM in the conference room.",
                    timestamp: "Yesterday",
                  },
                ].map((notification, index) => (
                  <div key={index} className="flex flex-col space-y-1 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
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
