"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import cookies from 'js-cookie'
import {
  BarChart3,
  Calendar,
  ClipboardList,
  Home,
  Menu,
  Package,
  PieChart,
  Settings,
  Users,
  LogOut,
  Pill,
  CreditCard,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const role = cookies.get('user_role')

  useEffect(()=> {
    console.log(role, 'eolr')
  }, [role])  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    router.push("/login")
  }

  const renderNavigation = ()=> {

    const nav = role === 'admin' ? adminNavigation : employeeNavigatoin

    return (
        <div className="grid gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname === item.href
                      ? "bg-teal-100 text-teal-900 dark:bg-teal-800/20 dark:text-teal-50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
    )
  }

  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Toys inventory", href: "/dashboard/inventory", icon: Home },
    { name: "Categories", href: "/dashboard/categories", icon: Calendar },
    { name: "Customers", href: "/dashboard/patients", icon: Users },
      { name: "Sales", href: "/dashboard/payments", icon: Users },
       { name: "Suppliers", href: "/dashboard/payments", icon: Users },
       { name: " Employees", href: "/dashboard/patients", icon: Users },
      
    // { name: "Consultations", href: "/dashboard/consultations", icon: ClipboardList },
    // { name: "Pharmacy", href: "/dashboard/pharmacy", icon: Pill },
    // { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]
  const employeeNavigatoin = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Toys Management", href: "/dashboard/toys-management", icon: Home },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-teal-600"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-red-600">ToysHub</span>
              </Link>
             {
               renderNavigation()
             }
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-teal-600"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
           <span className="text-red-600">ToysHub</span>
        </Link>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
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
              className="h-5 w-5"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
         {
        renderNavigation()
          }
            <div className="mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
//  const adminNavigation = [
//     { name: "Dashboard", href: "/dashboard", icon: Home },
//     { name: "Toys inventory", href: "/dashboard/inventory", icon: Home },
//     { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
//     { name: "Patients", href: "/dashboard/patients", icon: Users },
//     // { name: "Consultations", href: "/dashboard/consultations", icon: ClipboardList },
//     { name: "Pharmacy", href: "/dashboard/pharmacy", icon: Pill },
//     { name: "Inventory", href: "/dashboard/inventory", icon: Package },
//     { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
//     { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
//     { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
//     { name: "Settings", href: "/dashboard/settings", icon: Settings },
//   ]