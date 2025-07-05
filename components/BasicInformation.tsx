"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit3 } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"

interface PortfolioEditorProps {
  portfolio: Portfolio
  onBack: () => void
}

// Basic Information Component
interface BasicInfoProps {
  portfolio: Portfolio
  onUpdate: (updates: Partial<Portfolio>) => void
}

export function BasicInformation({ portfolio, onUpdate }: BasicInfoProps) {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Edit3 className="h-5 w-5" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Name</label>
            <Input
              value={portfolio.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <Input
              value={portfolio.mail}
              onChange={(e) => onUpdate({ mail: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">About Me</label>
          <Textarea
            value={portfolio.aboutme}
            onChange={(e) => onUpdate({ aboutme: e.target.value })}
            className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Resume Link</label>
          <Input
            value={portfolio.resumeLink}
            onChange={(e) => onUpdate({ resumeLink: e.target.value })}
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>
      </CardContent>
    </Card>
  )
}