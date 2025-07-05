"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"
import type { SkillCategory } from "@/types/portfolio"

interface SkillsProps {
  skillsData: SkillCategory[]
  onUpdate: (skillsData: SkillCategory[]) => void
}

export function SkillsSection({ skillsData, onUpdate }: SkillsProps) {
  const updateSkillCategory = (index: number, updates: Partial<SkillCategory>) => {
    const newSkillsData = [...skillsData]
    newSkillsData[index] = { ...newSkillsData[index], ...updates }
    onUpdate(newSkillsData)
  }

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      category: "",
      skills: [],
    }
    onUpdate([...skillsData, newCategory])
  }

  const removeSkillCategory = (index: number) => {
    const newSkillsData = skillsData.filter((_, i) => i !== index)
    onUpdate(newSkillsData)
  }

  const addSkillToCategory = (categoryIndex: number, skill: string) => {
    if (skill.trim() && !skillsData[categoryIndex].skills.includes(skill.trim())) {
      const newSkillsData = [...skillsData]
      newSkillsData[categoryIndex].skills.push(skill.trim())
      onUpdate(newSkillsData)
    }
  }

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const newSkillsData = [...skillsData]
    newSkillsData[categoryIndex].skills.splice(skillIndex, 1)
    onUpdate(newSkillsData)
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Skills</CardTitle>
          <Button onClick={addSkillCategory} size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skillsData.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No skill categories added yet.</p>
            <Button onClick={addSkillCategory} variant="outline" className="mt-2">
              Add Your First Category
            </Button>
          </div>
        ) : (
          skillsData.map((skillCategory, index) => (
            <div key={index} className="space-y-3 p-4 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Category (e.g., Frontend, Backend)"
                  value={skillCategory.category}
                  onChange={(e) => updateSkillCategory(index, { category: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white flex-1"
                />
                <Button onClick={() => removeSkillCategory(index)} variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skillCategory.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex} 
                    variant="secondary" 
                    className="bg-purple-600/20 text-purple-300 pr-1"
                  >
                    {skill}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => removeSkillFromCategory(index, skillIndex)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add skill and press Enter"
                  className="bg-gray-800 border-gray-600 text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkillToCategory(index, e.currentTarget.value)
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
                      addSkillToCategory(index, input.value)
                      input.value = ''
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}