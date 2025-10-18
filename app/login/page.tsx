"use client"

import type React from "react"
import { Spinner } from '@/components/ui/spinner';
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
  email: string
  password: string
 }

export default function LoginPage() {
const router = useRouter()
const [loading, setLoading] = useState(false)
const [formData,setFormdata] = useState<FormData>({
  email:"",
  password:""
})

const handleLogin = async(e: React.FormEvent)=>{
   e.preventDefault() 
   setLoading(true)
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
  setLoading(false)
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
          name="password"        
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e)=>setFormdata({...formData,password:e.target.value})}
          className="w-full border p-2 "
        />
        <button type="submit" disabled={loading} className="w-full bg-red-500 text-white p-2  hover:bg-red-600 flex justify-center">
          { loading ? <Spinner/>: "Log in" }
        </button>
        <a href="" className="flex items-center justify-center  text-blue p-3  ">Forgot Password</a>
     </form>
    </div>


  )
}
