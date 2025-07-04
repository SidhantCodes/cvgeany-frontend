"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"
import { toast } from "@/hooks/use-toast"

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/upload-resume`, {
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
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-purple-500">CV</span>Geany
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Turn your Resume PDF into a downloadable portfolio website in seconds
        </p>
        <p className="text-sm text-gray-400">Powered by AI • Professional • Fast</p>
      </div>

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
                <FileText className="h-16 w-16 text-gray-400" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">
                {isDragActive ? "Drop your resume here" : "Upload your resume"}
              </h3>
              <p className="text-gray-400">Drag and drop your PDF resume, or click to browse</p>
            </div>

            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white bg-transparent"
            >
              Choose File
            </Button>
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

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
            <Upload className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">Easy Upload</h3>
          <p className="text-gray-400 text-sm">Simply drag and drop your PDF resume</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
            <Loader2 className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">AI Processing</h3>
          <p className="text-gray-400 text-sm">Advanced AI extracts and structures your data</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
            <FileText className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">Ready Portfolio</h3>
          <p className="text-gray-400 text-sm">Download your complete portfolio website</p>
        </div>
      </div>
    </div>
  )
}
