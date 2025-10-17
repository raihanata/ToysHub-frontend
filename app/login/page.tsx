"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Import } from "lucide-react"
import axios from "axios"
import { ToastAction } from "@radix-ui/react-toast"
import { toast } from "sonner"
import { useNavigation } from "react-day-picker"
import Cookies from 'js-cookie'

 interface FormData {
  email: String
  password: String
 }

export default function LoginPage() {
const router = useRouter()
const [formData,setFormdata] = useState<FormData>({
  email:"",
  password:""
})

const handleLogin = async(e: React.FormEvent)=>{
   e.preventDefault() 
  try {

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!
    console.log("SERVER_URL =", SERVER_URL)
    const res = await axios.post(`${SERVER_URL}/login`, formData);

    if (res.data && res.data.status) {
      const token = res.data.token;
      const role = res.data.data.role; 

      console.log("Token:", token);
      console.log("Role:", role);


      Cookies.set("auth_token", token); 
      Cookies.set("user_role", role);

      router.push("/dashboard");
    } else {
      toast.error("Invalid login credentials");
    }

 
  } catch (error) {
    console.error("Login failed:", error)
  }
}


  // const router = useRouter()
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError("")

  //   // For demo purposes, we'll use hardcoded credentials
  //   // In a real app, this would connect to Supabase auth
  //   if (email === "admin@medicare.com" && password === "admin123") {
  //     // Simulate API call delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     router.push("/dashboard")
  //   } else if (email === "doctor@medicare.com" && password === "doctor123") {
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     router.push("/dashboard")
  //   } else if (email === "reception@medicare.com" && password === "reception123") {
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     router.push("/dashboard")
  //   } else {
  //     setError("Invalid email or password")
  //   }

  //   setLoading(false)
  // }

  return (

    <div className="flex items-center justify-center h-screen bg-gray-50">
       
     <form
      onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-3"
     >
         <h2 className="text-xl font-bold text-center">Login</h2>
      <input
          type="email"
          placeholder="Email"
          value={formData.email}
        
          onChange={(e)=>setFormdata({...formData,email:e.target.value})}
          className="w-full border p-2 "
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e)=>setFormdata({...formData,password:e.target.value})}
          className="w-full border p-2 "
        />
        <button className="w-full bg-red-500 text-white p-2  hover:bg-red-600">
          Login
        </button>
        <a href="" className="flex items-center justify-center  text-blue p-3  ">Forgot Password</a>
     </form>
    </div>






    // <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900 p-4">
    //   <Card className="w-full max-w-md">
    //     <CardHeader className="space-y-1">
    //       <div className="flex items-center justify-center mb-2">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           className="h-10 w-10 text-teal-600"
    //         >
    //           <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    //         </svg>
    //       </div>
    //       <CardTitle className="text-2xl text-center">Login to MediCare</CardTitle>
    //       <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
    //     </CardHeader>
    //     <CardContent className="space-y-4">
    //       {error && (
    //         <Alert variant="destructive">
    //           <AlertDescription>{error}</AlertDescription>
    //         </Alert>
    //       )}
    //       <form onSubmit={handleLogin} className="space-y-4">
    //         <div className="space-y-2">
    //           <Label htmlFor="email">Email</Label>
    //           <Input
    //             id="email"
    //             type="email"
    //             placeholder="admin@medicare.com"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <div className="space-y-2">
    //           <div className="flex items-center justify-between">
    //             <Label htmlFor="password">Password</Label>
    //             <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
    //               Forgot password?
    //             </Link>
    //           </div>
    //           <Input
    //             id="password"
    //             type="password"
    //             placeholder="••••••••"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
    //           {loading ? "Logging in..." : "Log in"}
    //         </Button>
    //       </form>
    //       <div className="mt-4 text-center text-sm">
    //         <p>Demo Credentials:</p>
    //         <p className="text-muted-foreground">Admin: admin@medicare.com / admin123</p>
    //         <p className="text-muted-foreground">Doctor: doctor@medicare.com / doctor123</p>
    //         <p className="text-muted-foreground">Reception: reception@medicare.com / reception123</p>
    //       </div>
    //     </CardContent>
    //     <CardFooter className="flex flex-col space-y-4">
    //       <div className="text-center text-sm">
    //         Don&apos;t have an account?{" "}
    //         <Link href="/register" className="text-teal-600 hover:underline">
    //           Sign up
    //         </Link>
    //       </div>
    //     </CardFooter>
    //   </Card>
    // </div>
  )
}
