"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, CheckCircle } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"
import { toast } from "@/hooks/use-toast"

interface DownloadButtonProps {
  portfolio: Portfolio
}

export default function DownloadButton({ portfolio }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

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
    setIsComplete(false)

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

      setIsComplete(true)
      toast({
        title: "Success!",
        description: "Your CVGeany portfolio has been generated and downloaded successfully.",
      })

      // Reset complete state after 3 seconds
      setTimeout(() => setIsComplete(false), 3000)
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate your portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  if (isComplete) {
    return (
      <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
        <CheckCircle className="h-4 w-4 mr-2" />
        Downloaded Successfully!
      </Button>
    )
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
