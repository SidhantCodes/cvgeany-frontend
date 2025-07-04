export interface WorkExperience {
  title: string
  company: string
  duration: string
  description: string
}

export interface Project {
  title: string
  desc: string
  image: string // Placeholder path, e.g., "/images/project1.png"
  livelink?: string
  repolink?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface SocialLink {
  url: string
  name: string // e.g., 'github', 'linkedin'
}

export interface Portfolio {
  name: string
  mail: string
  resumeLink: string
  aboutme: string
  workExperience: WorkExperience[]
  projects: Project[]
  skillsData: SkillCategory[]
  socials: SocialLink[]
  seoKeywords: string[]
  pdfLinks?: string[] | null
}
