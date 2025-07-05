"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

interface SEOKeywordsProps {
  seoKeywords: string[]
  onUpdate: (seoKeywords: string[]) => void
}

export function SEOKeywordsSection({ seoKeywords, onUpdate }: SEOKeywordsProps) {
  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !seoKeywords.includes(keyword.trim())) {
      onUpdate([...seoKeywords, keyword.trim()])
    }
  }

  const removeKeyword = (index: number) => {
    const newKeywords = seoKeywords.filter((_, i) => i !== index)
    onUpdate(newKeywords)
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">SEO Keywords</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {seoKeywords.map((keyword, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="border-purple-500 text-purple-300 pr-1"
            >
              {keyword}
              <Button
                size="sm"
                variant="ghost"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => removeKeyword(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add keyword and press Enter"
            className="bg-gray-800 border-gray-600 text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addKeyword(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement
              if (input?.value) {
                addKeyword(input.value)
                input.value = ''
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}