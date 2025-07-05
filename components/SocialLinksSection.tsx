"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit3, FileText, X } from "lucide-react"
import type { SocialLink } from "@/types/portfolio"


interface SocialLinksProps {
  socials: SocialLink[]
  onUpdate: (socials: SocialLink[]) => void
}

export function SocialLinksSection({ socials, onUpdate }: SocialLinksProps) {
  const updateSocial = (index: number, updates: Partial<SocialLink>) => {
    const newSocials = [...socials]
    newSocials[index] = { ...newSocials[index], ...updates }
    onUpdate(newSocials)
  }

  const addSocial = () => {
    const newSocial: SocialLink = {
      url: "",
      name: "",
    }
    onUpdate([...socials, newSocial])
  }

  const removeSocial = (index: number) => {
    const newSocials = socials.filter((_, i) => i !== index)
    onUpdate(newSocials)
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Social Links</CardTitle>
          <Button onClick={addSocial} size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Social
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {socials.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No social links added yet.</p>
            <Button onClick={addSocial} variant="outline" className="mt-2">
              Add Your First Social Link
            </Button>
          </div>
        ) : (
          socials.map((social, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Platform (e.g., github, linkedin)"
                value={social.name}
                onChange={(e) => updateSocial(index, { name: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Input
                placeholder="URL"
                value={social.url}
                onChange={(e) => updateSocial(index, { url: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white flex-1"
              />
              <Button onClick={() => removeSocial(index)} variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}