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
  /** A measured result, shown with its computed change on the Features row. */
  headlineResult?: string
  /** A checkable figure for the Features row when the study has no headline result. */
  figure?: string
  status: string
  problem: string
  built: string[]
  diagrams: Diagram[]
  resultIds: string[]
  resultNote?: string
  /** Said after the results on the CV bullet: where they were measured. */
  cvResultNote?: string
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
export interface HistoryEntry {
  period: string
  /** Where, when it is worth saying: shown after the period on the CV. */
  place?: string
  title: string
  detail: string
}
export type SectionId =
  | '1-features'
  | '2-description'
  | '3-pin-configuration'
  | '4-typical-performance'
  | '5-detailed-description'
  | '6-related-parts'
  | '7-revision-history'
  | '8-ordering-information'
export interface SectionInfo { id: SectionId; number: number; title: string }
export interface CvSkill { label: string; items: string }
