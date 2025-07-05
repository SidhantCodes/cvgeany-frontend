"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"
import { toast } from "sonner"
import Link from "next/link"

interface DownloadButtonProps {
  portfolio: Portfolio
}

export default function DownloadButton({ portfolio }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleDownload = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/generate-portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolio),
      })

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.statusText}`)
      }

      const blob = await response.blob()
      const filename = `${portfolio.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.zip`

      downloadBlob(blob, filename)

      toast.success("Your portfolio has been downloaded!", {
        description: (
          <>
            Follow the{" "}
            <Link
              href="/how-to-deploy"
              className="font-bold underline text-purple-400 hover:text-purple-300"
            >
              docs
            </Link>{" "}
            to see the next steps.
          </>
        ),
      })
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Generation Failed", {
        description: error instanceof Error ? error.message : "Failed to generate your portfolio. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isGenerating} className="w-full bg-purple-600 hover:bg-purple-700">
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Packaging your portfolio...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download Portfolio Zip
        </>
      )}
    </Button>
  )
}