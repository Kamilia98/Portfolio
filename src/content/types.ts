export type PinId = 'react' | 'typescript' | 'node' | 'nestjs' | 'elasticsearch' | 'mongodb' | 'llm' | 'testing'
export interface Pin { id: PinId; label: string }
export type CaseStudyId = 'ask-your-data' | 'chart-speed' | 'ai-cost-dashboard' | 'one-interface'
export interface Result { id: string; label: string; before: number; after: number; unit: 's' | ''; caseStudy?: CaseStudyId }
export interface DiagramBlock { id: string; label: string; pins: PinId[] }
export interface DiagramStage { title: string; blocks: DiagramBlock[] }
export interface Diagram { caption: string; stages: DiagramStage[] }
export interface CaseStudy {
  id: CaseStudyId
  number: string
  anchor: string
  title: string
  summary: string
  cv: string
  headlineResult?: string
  status: string
  problem: string
  built: string[]
  diagrams: Diagram[]
  resultIds: string[]
  resultNote?: string
  pins: PinId[]
}
export interface Profile {
  name: string
  fullName: string
  role: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  site: string
  cvFile: string
  description: string[]
}
export interface EarlierWork { name: string; what: string; stack: string; url: string; live?: string }
export interface HistoryEntry { period: string; title: string; detail: string }
export interface SectionInfo { id: string; number: number; title: string }
export interface CvSkill { label: string; items: string }
