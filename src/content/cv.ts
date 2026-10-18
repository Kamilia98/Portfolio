import type { CvSkill } from './types'

// CV-only content. The site never imports this module, so none of it reaches the site's scripts.

/** On the CV only, never on the site. */
export const cvPhone = '+20 112 452 9888'

export const cvSkills: CvSkill[] = [
  { label: 'Core', items: 'React, TypeScript, Node.js, NestJS' },
  { label: 'Data', items: 'Elasticsearch, MongoDB' },
  { label: 'AI', items: 'LLM features via Portkey' },
  { label: 'Testing', items: 'Jest, Playwright' },
  { label: 'Also used', items: 'Next.js, Angular, Vue, Ant Design, Tailwind CSS, Material UI' },
]

export const cvHighlights: string[] = [
  'Site speed fix (gzip, trimmed CSS) with 17 production errors resolved.',
  'About 4,400 commits across 16 repositories by October 2026.',
]
