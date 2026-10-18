import type { Layer, Pin } from './types'

export const layers: Layer[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data' },
  { id: 'ai', label: 'AI' },
  { id: 'testing', label: 'Testing' },
]

export const pins: Pin[] = [
  { id: 'react', label: 'React', layer: 'frontend' },
  { id: 'typescript', label: 'TypeScript', layer: 'frontend' },
  { id: 'node', label: 'Node.js', layer: 'backend' },
  { id: 'nestjs', label: 'NestJS', layer: 'backend' },
  { id: 'elasticsearch', label: 'Elasticsearch', layer: 'data' },
  { id: 'mongodb', label: 'MongoDB', layer: 'data' },
  { id: 'llm', label: 'LLMs', layer: 'ai' },
  { id: 'testing', label: 'Jest / Playwright', layer: 'testing' },
]
