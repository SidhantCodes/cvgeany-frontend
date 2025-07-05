"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react"
import { FaFileUpload } from "react-icons/fa";
import type { Portfolio } from "@/types/portfolio"
import { toast } from "@/hooks/use-toast"
import Features from "./Features"
import Hero from "./Hero"

interface UploaderProps {
  onUploadSuccess: (portfolio: Portfolio) => void
}

export default function Uploader({ onUploadSuccess }: UploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setUploadProgress("Uploading resume...")

    try {
      const formData = new FormData()
      formData.append("file", file)

      setUploadProgress("Analyzing resume...")

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || 'http://localhost:8000'}/upload-resume`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      setUploadProgress("Extracting skills...")

      const portfolio: Portfolio = await response.json()

      setUploadProgress("Structuring portfolio data...")

      // Simulate final processing step
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onUploadSuccess(portfolio)
      toast({
        title: "Success!",
        description: "Your resume has been processed successfully.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to process your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress("")
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  if (isUploading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
          <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-white">{uploadProgress}</h3>
          <p className="text-gray-400">This may take a few moments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Hero />
      {/* Upload Area */}
      <Card className="border-2 border-dashed border-gray-700 bg-gray-900/50 hover:border-purple-500/50 transition-colors">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`cursor-pointer text-center space-y-4 p-8 rounded-lg transition-all ${
              isDragActive ? "bg-purple-500/10 border-purple-500" : "hover:bg-gray-800/50"
            }`}
          >
            <input {...getInputProps()} />

            <div className="flex justify-center">
              {isDragActive ? (
                <Upload className="h-16 w-16 text-purple-500 animate-bounce" />
              ) : (
                <FaFileUpload className="h-16 w-16 text-gray-400" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">
                {isDragActive ? "Drop your resume here" : "Upload your resume"}
              </h3>
              <p className="text-gray-400">Drag and drop your PDF resume, or click to browse</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Messages */}
      {fileRejections.length > 0 && (
        <Card className="border-red-500 bg-red-500/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <span>Please upload a valid PDF file only.</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Features />
    </div>
  )
}
