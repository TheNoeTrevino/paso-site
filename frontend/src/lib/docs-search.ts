import Fuse, { type IFuseOptions } from 'fuse.js'

export interface DocSearchItem {
  id: string
  title: string
  section: string
  content: string
}

export const docsSearchIndex: DocSearchItem[] = [
  {
    id: 'quickstart',
    title: 'Quickstart',
    section: 'Getting Started',
    content: 'Get started with paso in less than 5 minutes. Install paso, create your first project, and start managing tasks from your terminal.',
  },
  {
    id: 'installation',
    title: 'Installation',
    section: 'Getting Started',
    content: 'Install paso using go install, brew, or download binaries. Shell completion for bash, zsh, fish, powershell.',
  },
  {
    id: 'tui',
    title: 'TUI Interface',
    section: 'Getting Started',
    content: 'Launch the interactive terminal user interface. Visual kanban board, keyboard navigation, real-time updates.',
  },
  {
    id: 'task',
    title: 'Task Commands',
    section: 'Task Management',
    content: 'paso task create, list, show, update, delete. Manage tasks with title, description, priority, type. JSON and quiet output modes.',
  },
  {
    id: 'task-workflow',
    title: 'Task Workflow',
    section: 'Task Management',
    content: 'paso task move, done, in-progress, to-ready. Move tasks between columns, mark as complete, track progress.',
  },
  {
    id: 'task-relationships',
    title: 'Task Relationships',
    section: 'Task Management',
    content: 'paso task link, ready, blocked, comment. Create parent-child, blocker, and related relationships. Add comments to tasks.',
  },
  {
    id: 'project',
    title: 'Project Commands',
    section: 'Project Management',
    content: 'paso project create, list, delete, tree. Manage projects, view hierarchical task structure, project descriptions.',
  },
  {
    id: 'column',
    title: 'Column Commands',
    section: 'Column Management',
    content: 'paso column create, list, update, delete. Customize kanban columns, set ready/in-progress/completed status.',
  },
  {
    id: 'label',
    title: 'Label Commands',
    section: 'Label Management',
    content: 'paso label create, list, update, delete, attach, detach. Color-coded labels, hex colors, organize tasks.',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    section: 'AI Tools',
    content: 'paso setup claude, opencode. Integrate with Claude Code and OpenCode. Automatic context injection, SessionStart hooks.',
  },
  {
    id: 'tutorial',
    title: 'Tutorial Command',
    section: 'AI Tools',
    content: 'paso tutorial. Output AI-optimized workflow context. Designed for hooks to prevent agents from forgetting paso workflow.',
  },
  {
    id: 'completion',
    title: 'Shell Completion',
    section: 'Reference',
    content: 'paso completion bash, zsh, fish, powershell. Generate shell completion scripts for tab completion.',
  },
  {
    id: 'output-flags',
    title: 'Output Flags',
    section: 'Reference',
    content: 'Global flags --json and --quiet. JSON output for agents, quiet mode for bash capture, minimal output.',
  },
]

const fuseOptions: IFuseOptions<DocSearchItem> = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'content', weight: 1 },
    { name: 'section', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
}

export const docsFuse = new Fuse(docsSearchIndex, fuseOptions)

export function searchDocs(query: string): DocSearchItem[] {
  if (!query.trim()) return []
  return docsFuse.search(query).map((result) => result.item)
}
