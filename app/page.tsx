import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Banner from "@/components/ui/banner"
import Categories from "@/components/ui/categories"

import Gallery from "@/components/gallery"
import Discovereco from "@/components/discover-eco"
import Collection from "@/components/ui/collection"

import Footersection from "@/components/ui/footersection"
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/toyslogo.svg" alt="toyslogo"  width={30} height={30}/>
            <span className="text-2xl font-bold text-red-600">ToysHub</span>
          </div>
          <nav className="hidden md:flex gap-10">
            <Link href="#features" className="text-base font-medium text-red-600">
              Home
            </Link>
            <Link href="#testimonials" className="text-base font-medium text-red-600">
              Collections
            </Link>
            <Link href="#pricing" className="text-base font-medium text-red-600">
           Offers
            </Link>
            <Link href="#contact" className="text-base font-medium text-red-600">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="text-base font-medium text-red-600">Log In</Button>
            </Link>
            {/* <Link href="/register" className="hidden md:block">
              <Button>Sign Up</Button>
            </Link> */}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section>
     <Banner/>
        </section>
        <Collection/>
           <Categories/>
           <Discovereco/>
           <Gallery/>
           {/* <Footersection/> */}
        {/* <Discovereco/> */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Streamline Your Clinic Operations
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    All-in-one solution for appointment booking, patient management, billing, and more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Clinic Management Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section> */}
     
       
      </main>
      <footer className="w-full border-t bg-red-200 py-1">
        <div className="container">
        <Footersection/>
        <div className=" container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
               <Image src="/toyslogo.svg" alt="toyslogo"  width={30} height={30}/>
            <span className="text-lg font-bold">ToysHub</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 MediCare. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
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
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
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
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        </div>
      </footer>
    </div>
  )
}
