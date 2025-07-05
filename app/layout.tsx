import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CVGeany - AI-Powered Resume to Portfolio Generator",
  description:
    "Transform your resume PDF into a professional portfolio website in seconds with CVGeany. Powered by AI for fast, accurate, and beautiful results.",
  keywords: ["resume", "portfolio", "generator", "AI", "PDF", "website", "professional"],
  authors: [{ name: "CVGeany Team" }],
  creator: "CVGeany",
  publisher: "CVGeany",
  robots: "index, follow",
  openGraph: {
    title: "CVGeany - AI-Powered Resume to Portfolio Generator",
    description: "Transform your resume PDF into a professional portfolio website in seconds",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVGeany - AI-Powered Resume to Portfolio Generator",
    description: "Transform your resume PDF into a professional portfolio website in seconds",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
      <Analytics />
      {children}
      </body>
    </html>
  )
}
