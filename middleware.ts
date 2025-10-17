// middleware.ts

import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"


const PUBLIC_ROUTES = ['/', '/login', 'register']



export async function middleware(req: NextRequest) {
    
    const { pathname } = req.nextUrl
    const cookieStore:any = cookies()
    const token = (await cookieStore).get('auth_token')
    const role = (await cookieStore).get('user_role')

    if (!token) {

        return NextResponse.redirect(new URL("/", req.url))
    }
   if(role === "admin" ||  role === "employee" )
   
     
  
   return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    

 
// Apply middleware to all protected routes
export const config = {
  matcher: ["/dashboard/:path*"],
}
