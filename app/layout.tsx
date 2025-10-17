import type React from "react"
import type { Metadata } from "next"
import { Inter,Chelsea_Market} from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] })
const ChelseaMarket = Chelsea_Market({ subsets: ["latin"], weight: ["400"] })
export const metadata: Metadata = {
  title: "Toyshub-shop-management",
  description: "All-in-one Booking & ERP solution for clinics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className={ChelseaMarket.className}></div>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Toaster/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
