import type { CaseStudy } from './types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'ask-your-data',
    number: '5.1',
    anchor: '5-1-ask-your-data',
    title: 'Ask your data',
    summary: 'Plain-English questions answered with checked numbers and a chart.',
    status: 'Built; ready for a pilot',
    problem: 'Analysts wanted to ask a dashboard a question in their own words, but a language model that writes the answer can also invent the numbers.',
    built: [
      'A two-phase design: when the widget is created, one LLM call compiles the question into a structured plan; when it opens, the plan runs as ordinary code.',
      'Every claim the question takes for granted, such as a ranking or a rise, is checked in code before an answer is written, or the question is refused with a reason.',
      'Numbers stream to the screen first; a second LLM call only phrases those facts, and the backend checks every number in the text against them.',
      "The chart type is chosen in code from the question's intent, and prompt changes are tested against a bank of about 180 questions.",
    ],
    diagrams: [
      {
        caption: 'From question to checked answer',
        stages: [
          { title: 'Ask', blocks: [{ id: 'ask-question', label: 'question', pins: ['react', 'typescript'] }] },
          {
            title: 'Compile, once',
            blocks: [
              { id: 'ask-compile', label: 'compile plan · LLM', pins: ['llm'] },
              { id: 'ask-claim-check', label: 'claim check · Node', pins: ['node'] },
            ],
          },
          {
            title: 'Run, on every open',
            blocks: [
              { id: 'ask-query', label: 'query · Elasticsearch', pins: ['elasticsearch'] },
              { id: 'ask-facts', label: 'facts · Node', pins: ['node'] },
            ],
          },
          {
            title: 'Answer',
            blocks: [
              { id: 'ask-phrase', label: 'phrase facts · LLM', pins: ['llm'] },
              { id: 'ask-number-check', label: 'number check · Node', pins: ['node'] },
            ],
          },
          { title: 'Show', blocks: [{ id: 'ask-show', label: 'answer + chart', pins: ['react', 'typescript'] }] },
        ],
      },
    ],
    resultIds: [],
    pins: ['react', 'typescript', 'node', 'llm', 'elasticsearch'],
  },
  {
    id: 'chart-speed',
    number: '5.2',
    anchor: '5-2-chart-speed',
    title: 'Chart speed',
    summary: 'Tag breakdowns sent to Elasticsearch once instead of once per tab.',
    headlineResult: 'slowest-chart',
    status: 'Merged; awaiting release',
    problem: 'Charts that split results into tabs and break them down by tags took up to a minute to load, and some timed out during Excel export.',
    built: [
      "Measured where the time went with Elasticsearch's profiler: each tab rebuilt the full tag breakdown, so a seven-tab chart did the same heavy work seven times.",
      "Changed the query builder so tabs that share a breakdown send it once, and matched a tag's hand-picked posts with one terms clause instead of one clause per post.",
      'Proved the numbers were unchanged by comparing old and new answers chart by chart.',
    ],
    diagrams: [
      {
        caption: 'Before',
        stages: [
          { title: 'Request', blocks: [{ id: 'speed-before-request', label: 'chart with 7 tabs · NestJS', pins: ['nestjs', 'typescript'] }] },
          { title: 'Query', blocks: [{ id: 'speed-before-query', label: '7 copies of the tag breakdown · Elasticsearch', pins: ['elasticsearch'] }] },
          { title: 'Result', blocks: [{ id: 'speed-before-result', label: '63 s', pins: [] }] },
        ],
      },
      {
        caption: 'After',
        stages: [
          { title: 'Request', blocks: [{ id: 'speed-after-request', label: 'same chart · NestJS', pins: ['nestjs', 'typescript'] }] },
          { title: 'Query', blocks: [{ id: 'speed-after-query', label: '1 shared breakdown + 1 terms clause · Elasticsearch', pins: ['elasticsearch'] }] },
          { title: 'Result', blocks: [{ id: 'speed-after-result', label: '4.3 s, same numbers', pins: [] }] },
        ],
      },
    ],
    resultIds: ['slowest-chart', 'heavy-charts'],
    resultNote: 'Measured on a test environment with identical numbers; a replay of 10 days of production requests confirmed the gains.',
    pins: ['nestjs', 'typescript', 'elasticsearch'],
  },
  {
    id: 'ai-cost-dashboard',
    number: '5.3',
    anchor: '5-3-ai-cost-dashboard',
    title: 'AI cost dashboard',
    summary: 'AI spend per feature, user and request, in a tool I built alone.',
    status: 'Internal tool, built alone',
    problem: 'The company runs five AI features on several model providers, and nobody could see what each feature, user or request cost.',
    built: [
      "A NestJS service that ingests the LLM gateway's logs and the providers' own billing from OpenAI, Anthropic and OpenRouter into MongoDB.",
      "A React dashboard on TanStack Query and Recharts: cost over time, cost per feature, top users, and each request's cost down to its sub-calls.",
      "A product filter, so each product's AI spend can be read on its own.",
    ],
    diagrams: [
      {
        caption: 'From model calls to cost per request',
        stages: [
          {
            title: 'Sources',
            blocks: [
              { id: 'cost-gateway', label: 'LLM gateway logs', pins: ['llm'] },
              { id: 'cost-billing', label: 'provider billing: OpenAI, Anthropic, OpenRouter', pins: ['llm'] },
            ],
          },
          {
            title: 'Ingest',
            blocks: [
              { id: 'cost-ingest', label: 'ingestion API · NestJS', pins: ['nestjs', 'typescript'] },
              { id: 'cost-store', label: 'store · MongoDB', pins: ['mongodb'] },
            ],
          },
          { title: 'Read', blocks: [{ id: 'cost-dashboard', label: 'dashboard · React: feature, user, request', pins: ['react', 'typescript'] }] },
        ],
      },
    ],
    resultIds: [],
    pins: ['react', 'typescript', 'nestjs', 'mongodb', 'llm'],
  },
  {
    id: 'one-interface',
    number: '5.4',
    anchor: '5-4-one-interface',
    title: 'One interface',
    summary: 'Four UI patterns, each brought down to one component and kept there by lint rules.',
    headlineResult: 'dialog-components',
    status: 'Merged; awaiting release',
    problem: 'The app said the same things in different ways: confirmations on five components, large modals in twelve widths, success messages as toasts or as pop-ups, and six kinds of expandable list.',
    built: [
      'One dialog component in two sizes for all 43 confirmations, and one frame in three sizes for the 19 large modals.',
      'One feedback mechanism for 242 toast calls and 22 success pop-ups, with written rules for what every message says.',
      'One collapsible row for six lists.',
      'An ESLint rule for each pattern, so the old way cannot come back, and the end-to-end tests updated to match.',
    ],
    diagrams: [
      {
        caption: 'Many ways, one component each',
        stages: [
          {
            title: 'Before',
            blocks: [
              { id: 'ui-before-dialogs', label: '5 dialog components', pins: ['react'] },
              { id: 'ui-before-widths', label: '12 modal widths', pins: ['react'] },
              { id: 'ui-before-toasts', label: 'toasts and success pop-ups', pins: ['react'] },
              { id: 'ui-before-lists', label: '6 list types', pins: ['react'] },
            ],
          },
          {
            title: 'After',
            blocks: [
              { id: 'ui-after-dialog', label: 'Dialog, 2 sizes', pins: ['react', 'typescript'] },
              { id: 'ui-after-large', label: 'Large dialog, 3 sizes', pins: ['react', 'typescript'] },
              { id: 'ui-after-notify', label: 'useNotify', pins: ['react', 'typescript'] },
              { id: 'ui-after-collapse', label: 'CollapseList', pins: ['react', 'typescript'] },
            ],
          },
          {
            title: 'Kept',
            blocks: [
              { id: 'ui-kept-eslint', label: 'ESLint rules', pins: ['typescript'] },
              { id: 'ui-kept-e2e', label: 'end-to-end tests · Playwright', pins: ['testing'] },
            ],
          },
        ],
      },
    ],
    resultIds: ['dialog-components'],
    pins: ['react', 'typescript', 'testing'],
  },
]
