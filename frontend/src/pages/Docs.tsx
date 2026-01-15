import { useState } from 'react'
import { Book, ChevronRight, Search } from 'lucide-react'
import { DocsSearchDialog, useDocsSearch } from '../components/DocsSearchDialog'

const docSections = [
  {
    title: 'Getting Started',
    items: [
      { id: 'quickstart', label: 'Quickstart' },
      { id: 'installation', label: 'Installation' },
      { id: 'tui', label: 'TUI Interface' },
    ],
  },
  {
    title: 'Task Management',
    items: [
      { id: 'task', label: 'Task Commands' },
      { id: 'task-workflow', label: 'Task Workflow' },
      { id: 'task-relationships', label: 'Task Relationships' },
    ],
  },
  {
    title: 'Project Management',
    items: [
      { id: 'project', label: 'Project Commands' },
    ],
  },
  {
    title: 'Column Management',
    items: [
      { id: 'column', label: 'Column Commands' },
    ],
  },
  {
    title: 'Label Management',
    items: [
      { id: 'label', label: 'Label Commands' },
    ],
  },
  {
    title: 'AI Tools',
    items: [
      { id: 'ai-integration', label: 'AI Integration' },
      { id: 'tutorial', label: 'Tutorial Command' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { id: 'completion', label: 'Shell Completion' },
      { id: 'output-flags', label: 'Output Flags' },
    ],
  },
]

interface DocContent {
  title: string
  content: React.ReactNode
}

const CodeBlock = ({ children }: { children: string }) => (
  <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
    <pre className="text-foreground whitespace-pre-wrap">{children}</pre>
  </div>
)

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted border-l-4 border-accent p-6 rounded-lg mt-8 mb-6">
    <p className="text-sm">{children}</p>
  </div>
)

const docContent: Record<string, DocContent> = {
  quickstart: {
    title: 'Quickstart',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Get started with paso in less than 5 minutes.
        </p>

        <CodeBlock>{`Paso is a zero-setup, terminal-based kanban board for personal task management.

Use 'paso tui' to launch the interactive TUI.
Use 'paso task create ...' for CLI commands.

Usage:
  paso [command]

Available Commands:
  column      Manage columns
  completion  Generate shell completion script
  help        Help about any command
  label       Manage labels
  project     Manage projects
  setup       Setup integrations with AI tools
  task        Manage tasks
  tui         Launch the interactive TUI
  tutorial    Output AI-optimized workflow context

Flags:
  -h, --help      help for paso
  -v, --version   version for paso

Use "paso [command] --help" for more information about a command.`}</CodeBlock>

        <h2 className="mt-12 mb-4">1. Create Your First Project</h2>
        <p className="text-foreground/90 mb-4">
          Start by creating a project to organize your tasks:
        </p>
        <CodeBlock>{`paso project create --title="My Project" --description="My first paso project"`}</CodeBlock>

        <h2 className="mt-12 mb-4">2. Create Some Tasks</h2>
        <p className="text-foreground/90 mb-4">
          Add tasks to your project:
        </p>
        <CodeBlock>{`paso task create --title="Build feature X" --project=1 --priority=high
paso task create --title="Write tests" --project=1 --type=task
paso task create --title="Deploy to production" --project=1`}</CodeBlock>

        <h2 className="mt-12 mb-4">3. Launch the TUI</h2>
        <p className="text-foreground/90 mb-4">
          View your kanban board in the terminal:
        </p>
        <CodeBlock>{`paso tui`}</CodeBlock>

        <h2 className="mt-12 mb-4">4. Move Tasks Through Your Workflow</h2>
        <p className="text-foreground/90 mb-4">
          Track progress using the CLI:
        </p>
        <CodeBlock>{`paso task in-progress 1    # Start working on task 1
paso task done 1          # Mark task 1 as complete`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Next steps:</strong> Set up AI integration with{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">paso setup claude</code>{' '}
          to have your AI assistant automatically track tasks.
        </Tip>
      </>
    ),
  },

  installation: {
    title: 'Installation',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Install paso on your system.
        </p>

        <h2 className="mt-12 mb-4">Using Go</h2>
        <p className="text-foreground/90 mb-4">
          If you have Go installed:
        </p>
        <CodeBlock>{`go install github.com/TheNoeTrevino/paso@latest`}</CodeBlock>

        <h2 className="mt-12 mb-4">Using Homebrew (macOS/Linux)</h2>
        <CodeBlock>{`brew install thenoetrevino/tap/paso`}</CodeBlock>

        <h2 className="mt-12 mb-4">Download Binary</h2>
        <p className="text-foreground/90 mb-4">
          Download the latest release from GitHub for your platform (Linux, macOS, Windows).
        </p>

        <h2 className="mt-12 mb-4">Verify Installation</h2>
        <CodeBlock>{`paso --version
paso --help`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Shell Completion:</strong> After installing, run{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">paso completion --help</code>{' '}
          to set up tab completion for your shell.
        </Tip>
      </>
    ),
  },

  tui: {
    title: 'TUI Interface',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Launch the interactive terminal user interface for managing tasks visually.
        </p>

        <CodeBlock>{`Launch the interactive terminal user interface for managing tasks visually.

Usage:
  paso tui [flags]

Flags:
  -h, --help   help for tui`}</CodeBlock>

        <h2 className="mt-12 mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-6 ml-4">
          <li>Visual kanban board with columns and tasks</li>
          <li>Keyboard navigation for fast workflow</li>
          <li>Real-time updates as you move tasks</li>
          <li>View task details, relationships, and comments</li>
          <li>Create and edit tasks without leaving the TUI</li>
        </ul>

        <h2 className="mt-12 mb-4">Launch</h2>
        <CodeBlock>{`paso tui`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Note:</strong> The TUI provides the same functionality as
          the CLI commands but with a visual interface. Use whichever fits your workflow.
        </Tip>
      </>
    ),
  },

  task: {
    title: 'Task Commands',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Create, list, show, update, and delete tasks.
        </p>

        <CodeBlock>{`Manage tasks

Usage:
  paso task [command]

Available Commands:
  blocked     List blocked tasks
  comment     Add a comment to a task
  create      Create a new task
  delete      Delete a task
  done        Move a task to the completed column
  in-progress Move a task to in-progress or list in-progress tasks
  link        Link tasks with relationships
  list        List tasks
  move        Move a task to another column
  ready       List tasks ready to work on
  show        Show task details
  to-ready    Move a task to the ready column
  update      Update a task

Flags:
  -h, --help   help for task

Use "paso task [command] --help" for more information about a command.`}</CodeBlock>

        <h2 className="mt-12 mb-4">task create</h2>
        <CodeBlock>{`Create a new task with specified attributes.

Examples:
  # Simple task (human-readable output)
  paso task create --title="Fix bug" --project=1 --blocked-by 15 --blocks 20

  # JSON output for agents
  paso task create --title="Fix bug" --project=1 --json

  # Quiet mode for bash capture
  TASK_ID=$(paso task create --title="Fix bug" --project=1 --quiet)

  # Full example with all options
  paso task create \\
    --title="Add authentication" \\
    --description="Implement JWT auth" \\
    --type=feature \\
    --priority=high \\
    --parent=3 \\
    --project=1

Usage:
  paso task create [flags]

Flags:
      --blocked-by int       Task ID that blocks this task
      --blocks int           Task ID that is blocked by this task
      --column string        Column name (defaults to first column)
      --description string   Task description (use - for stdin)
  -h, --help                 help for create
      --json                 Output in JSON format
      --parent int           Parent task ID (creates dependency)
      --priority string      Priority: trivial, low, medium, high, critical (default "medium")
      --project int          Project ID (uses git branch association if not specified)
      --quiet                Minimal output (ID only)
      --title string         Task title (required)
      --type string          Task type: task or feature (default "task")`}</CodeBlock>

        <h2 className="mt-12 mb-4">task list</h2>
        <CodeBlock>{`List all tasks in a project.

Usage:
  paso task list [flags]

Flags:
  -h, --help          help for list
      --json          Output in JSON format
      --project int   Project ID (uses git branch association if not specified)
      --quiet         Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task show</h2>
        <CodeBlock>{`Display all details of a task including description, relationships, labels, and metadata.

Usage:
  paso task show [id] [flags]

Flags:
  -h, --help     help for show
      --id int   Task ID (can also be provided as positional argument)
      --json     Output in JSON format
      --quiet    Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task update</h2>
        <CodeBlock>{`Update task title, description, or priority.

Usage:
  paso task update [flags]

Flags:
      --description string   New task description
  -h, --help                 help for update
      --id int               Task ID (required)
      --json                 Output in JSON format
      --priority string      New priority: trivial, low, medium, high, critical
      --quiet                Minimal output (ID only)
      --title string         New task title`}</CodeBlock>

        <h2 className="mt-12 mb-4">task delete</h2>
        <CodeBlock>{`Delete a task by ID (requires confirmation unless --force or --quiet).

Usage:
  paso task delete [flags]

Flags:
      --force    Skip confirmation
  -h, --help     help for delete
      --id int   Task ID (required)
      --json     Output in JSON format
      --quiet    Minimal output`}</CodeBlock>
      </>
    ),
  },

  'task-workflow': {
    title: 'Task Workflow',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Move tasks through your workflow columns.
        </p>

        <h2 className="mt-12 mb-4">task move</h2>
        <CodeBlock>{`Move a task to another column by direction or column name.

Examples:
  # Move to next column
  paso task move --id 1 next

  # Move to previous column
  paso task move --id 1 prev

  # Move to specific column by name (case-insensitive)
  paso task move --id 1 "In Progress"
  paso task move --id 1 done

  # JSON output for agents
  paso task move --id 1 next --json

  # Quiet mode for bash capture
  paso task move --id 1 next --quiet

Usage:
  paso task move [flags]

Flags:
  -h, --help     help for move
      --id int   Task ID (required)
      --json     Output in JSON format
      --quiet    Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task done</h2>
        <CodeBlock>{`Move a task to the column designated as holding completed tasks.

The completed column is marked with holds_completed_tasks = true.
Use 'paso column update --id=<column_id> --completed' to designate a completed column.

Examples:
  # Move task to completed column
  paso task done 42

  # JSON output for agents
  paso task done 42 --json

  # Quiet mode for bash capture
  paso task done 42 --quiet

Usage:
  paso task done <task_id> [flags]

Flags:
  -h, --help    help for done
      --json    Output in JSON format
      --quiet   Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task in-progress</h2>
        <CodeBlock>{`Move a task to the column designated as holding in-progress tasks,
or list all in-progress tasks for a project.

The in-progress column is marked with holds_in_progress_tasks = true.
Use 'paso column update --id=<column_id> --in-progress' to designate an in-progress column.

Examples:
  # Move task to in-progress column
  paso task in-progress 42

  # List all in-progress tasks for a project
  paso task in-progress --project=1

  # JSON output for agents
  paso task in-progress --project=1 --json

  # Quiet mode for bash capture
  paso task in-progress 42 --quiet

Usage:
  paso task in-progress [<task_id>] [flags]

Flags:
  -h, --help          help for in-progress
      --json          Output in JSON format
      --project int   Project ID (for listing in-progress tasks)
      --quiet         Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task to-ready</h2>
        <CodeBlock>{`Move a task to the column designated as holding ready tasks.

The ready column is marked with holds_ready_tasks = true.
Use 'paso column update --id=<column_id> --ready' to designate a ready column.

Examples:
  # Move task to ready column
  paso task to-ready 42

  # JSON output for agents
  paso task to-ready 42 --json

  # Quiet mode for bash capture
  paso task to-ready 42 --quiet

Usage:
  paso task to-ready <task_id> [flags]

Flags:
  -h, --help    help for to-ready
      --json    Output in JSON format
      --quiet   Minimal output (ID only)`}</CodeBlock>

        <Tip>
          <strong className="text-accent">AI Agents:</strong> When working with AI assistants,
          always move tasks to in-progress before starting work. This helps track active work
          across context compactions.
        </Tip>
      </>
    ),
  },

  'task-relationships': {
    title: 'Task Relationships',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Link tasks together and track dependencies.
        </p>

        <h2 className="mt-12 mb-4">task link</h2>
        <CodeBlock>{`Create a relationship between two tasks.

Relationship Types:
  (default)  Parent-Child: Non-blocking hierarchical relationship
  --blocker  Blocked By/Blocker: Blocking relationship (parent blocked by child)
  --related  Related To: Non-blocking associative relationship

The --blocker and --related flags are mutually exclusive. If neither is specified,
a parent-child relationship is created.

Examples:
  # Parent-child relationship (default)
  paso task link --parent=5 --child=3

  # Blocking relationship (task 5 blocked by task 3)
  paso task link --parent=5 --child=3 --blocker

  # Related relationship
  paso task link --parent=5 --child=3 --related

Usage:
  paso task link [flags]

Flags:
      --blocker      Create blocking relationship (Blocked By/Blocker)
      --child int    Child task ID (required)
  -h, --help         help for link
      --json         Output in JSON format
      --parent int   Parent task ID (required)
      --quiet        Minimal output
      --related      Create related relationship (Related To)`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Understanding --blocker:</strong> When using --blocker,
          the --parent flag specifies the task that IS BLOCKED (waits for the other), and
          --child specifies the task DOING THE BLOCKING (must be completed first).
        </Tip>

        <h2 className="mt-12 mb-4">task ready</h2>
        <CodeBlock>{`List all tasks that have no blocking dependencies.

These are tasks that can be started immediately as they are not
waiting on any other tasks to be completed.

Examples:
  # Human-readable output
  paso task ready --project=1

  # JSON output for agents
  paso task ready --project=1 --json

  # Quiet mode for bash capture
  TASK_IDS=$(paso task ready --project=1 --quiet)

Usage:
  paso task ready [flags]

Flags:
  -h, --help          help for ready
      --json          Output in JSON format
      --project int   Project ID (uses git branch association if not specified)
      --quiet         Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task blocked</h2>
        <CodeBlock>{`List all tasks that are blocked by dependencies.

These are tasks that cannot be started until their blocking
dependencies are completed.

Examples:
  # Human-readable output
  paso task blocked --project=1

  # JSON output for agents
  paso task blocked --project=1 --json

  # Quiet mode for bash capture
  TASK_IDS=$(paso task blocked --project=1 --quiet)

Usage:
  paso task blocked [flags]

Flags:
  -h, --help          help for blocked
      --json          Output in JSON format
      --project int   Project ID (uses git branch association if not specified)
      --quiet         Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">task comment</h2>
        <CodeBlock>{`Add a comment to a task.

Comments are limited to 1000 characters and are displayed in the task detail view.

Examples:
  # Add a comment to task #42
  paso task comment --id=42 --message="Need to follow up with team"

  # Add a longer comment
  paso task comment --id=42 --message="Blocked by API changes in PR #123"

  # JSON output for agents
  paso task comment --id=42 --message="Investigation complete" --json

  # Quiet mode for bash capture
  COMMENT_ID=$(paso task comment --id=42 --message="Fixed" --quiet)

Usage:
  paso task comment [flags]

Flags:
      --author string    Comment author (defaults to current user)
  -h, --help             help for comment
      --id int           Task ID (required)
      --json             Output in JSON format
      --message string   Comment message (required, max 1000 chars)
      --quiet            Minimal output (comment ID only)`}</CodeBlock>
      </>
    ),
  },

  project: {
    title: 'Project Commands',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Create and manage projects.
        </p>

        <CodeBlock>{`Manage projects

Usage:
  paso project [command]

Available Commands:
  create      Create a new project
  delete      Delete a project
  list        List all projects
  tree        Display tasks in a tree structure

Flags:
  -h, --help   help for project

Use "paso project [command] --help" for more information about a command.`}</CodeBlock>

        <h2 className="mt-12 mb-4">project create</h2>
        <CodeBlock>{`Create a new project with specified attributes.

Examples:
  # Simple project (human-readable output)
  paso project create --title="Backend API"

  # JSON output for agents
  paso project create --title="Backend API" --json

  # Quiet mode for bash capture
  PROJECT_ID=$(paso project create --title="Backend API" --quiet)

  # With description
  paso project create \\
    --title="Backend API" \\
    --description="REST API for mobile app"

Usage:
  paso project create [flags]

Flags:
      --description string   Project description
  -h, --help                 help for create
      --json                 Output in JSON format
      --quiet                Minimal output (ID only)
      --title string         Project title (required)`}</CodeBlock>

        <h2 className="mt-12 mb-4">project list</h2>
        <CodeBlock>{`List all projects with their details.

Usage:
  paso project list [flags]

Flags:
  -h, --help    help for list
      --json    Output in JSON format
      --quiet   Minimal output (IDs only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">project delete</h2>
        <CodeBlock>{`Delete a project by ID (requires confirmation unless --force or --quiet).

Usage:
  paso project delete [flags]

Flags:
      --force    Skip confirmation
  -h, --help     help for delete
      --id int   Project ID (required)
      --json     Output in JSON format
      --quiet    Minimal output`}</CodeBlock>

        <h2 className="mt-12 mb-4">project tree</h2>
        <CodeBlock>{`Display all tasks in a project as a hierarchical tree structure.
Subtasks are indented under their parent tasks. Blocking relationships
are highlighted in red to show the blocking chain.

Usage:
  paso project tree [project-id] [flags]

Flags:
  -h, --help             help for tree
      --json             Output in JSON format
      --project-id int   Project ID (can also be provided as positional argument)
      --quiet            Minimal output (IDs with relation labels in tree order)`}</CodeBlock>
      </>
    ),
  },

  column: {
    title: 'Column Commands',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Customize kanban columns.
        </p>

        <CodeBlock>{`Manage columns

Usage:
  paso column [command]

Available Commands:
  create      Create a new column
  delete      Delete a column
  list        List columns in a project
  update      Update a column

Flags:
  -h, --help   help for column

Use "paso column [command] --help" for more information about a command.`}</CodeBlock>

        <h2 className="mt-12 mb-4">column create</h2>
        <CodeBlock>{`Create a new column in a project.

Examples:
  # Create column at end (human-readable output)
  paso column create --name="Review" --project=1

  # JSON output for agents
  paso column create --name="Review" --project=1 --json

  # Quiet mode for bash capture
  COLUMN_ID=$(paso column create --name="Review" --project=1 --quiet)

  # Create column after specific column
  paso column create --name="Done" --project=1 --after=3

Usage:
  paso column create [flags]

Flags:
      --after int     Insert after column ID (0 = append to end)
      --completed     Mark this column as holding completed tasks
  -h, --help          help for create
      --json          Output in JSON format
      --name string   Column name (required)
      --project int   Project ID (uses git branch association if not specified)
      --quiet         Minimal output (ID only)
      --ready         Mark this column as holding ready tasks`}</CodeBlock>

        <h2 className="mt-12 mb-4">column list</h2>
        <CodeBlock>{`List all columns in a project (in order).

Examples:
  # Human-readable list
  paso column list --project=1

  # JSON output for agents
  paso column list --project=1 --json

  # Quiet mode (one ID per line)
  paso column list --project=1 --quiet

Usage:
  paso column list [flags]

Flags:
  -h, --help          help for list
      --json          Output in JSON format
      --project int   Project ID (uses git branch association if not specified)
      --quiet         Minimal output (IDs only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">column update</h2>
        <CodeBlock>{`Update a column's name.

Examples:
  # Update column name (human-readable output)
  paso column update --id=1 --name="Completed"

  # JSON output for agents
  paso column update --id=1 --name="Completed" --json

  # Quiet mode
  paso column update --id=1 --name="Completed" --quiet

Usage:
  paso column update [flags]

Flags:
      --completed     Set this column as holding completed tasks
      --force         Force setting completed column even if one already exists
  -h, --help          help for update
      --id int        Column ID (required)
      --in-progress   Set this column as holding in-progress tasks
      --json          Output in JSON format
      --name string   New column name
      --quiet         Minimal output
      --ready         Set this column as holding ready tasks`}</CodeBlock>

        <h2 className="mt-12 mb-4">column delete</h2>
        <CodeBlock>{`Delete a column by ID (requires confirmation unless --force or --quiet).

Warning: Deleting a column will move all tasks in that column to the project's first column.

Examples:
  # Delete with confirmation
  paso column delete --id=1

  # Skip confirmation
  paso column delete --id=1 --force

  # Quiet mode (no confirmation)
  paso column delete --id=1 --quiet

Usage:
  paso column delete [flags]

Flags:
      --force    Skip confirmation
  -h, --help     help for delete
      --id int   Column ID (required)
      --json     Output in JSON format
      --quiet    Minimal output`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Column Types:</strong> Use{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--ready</code>,{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--in-progress</code>, and{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--completed</code> flags
          to designate special columns that work with{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">paso task done</code>,{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">paso task in-progress</code>, and{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">paso task to-ready</code>.
        </Tip>
      </>
    ),
  },

  label: {
    title: 'Label Commands',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Organize tasks with color-coded labels.
        </p>

        <CodeBlock>{`Manage labels

Usage:
  paso label [command]

Available Commands:
  attach      Attach a label to a task
  create      Create a new label
  delete      Delete a label
  detach      Detach a label from a task
  list        List labels in a project
  update      Update a label

Flags:
  -h, --help   help for label

Use "paso label [command] --help" for more information about a command.`}</CodeBlock>

        <h2 className="mt-12 mb-4">label create</h2>
        <CodeBlock>{`Create a new label with a name and color.

Examples:
  # Create label (human-readable output)
  paso label create --name="bug" --color="#FF0000" --project=1

  # JSON output for agents
  paso label create --name="bug" --color="#FF0000" --project=1 --json

  # Quiet mode for bash capture
  LABEL_ID=$(paso label create --name="bug" --color="#FF0000" --project=1 --quiet)

Usage:
  paso label create [flags]

Flags:
      --color string   Label color in hex format #RRGGBB (required)
  -h, --help           help for create
      --json           Output in JSON format
      --name string    Label name (required)
      --project int    Project ID (uses git branch association if not specified)
      --quiet          Minimal output (ID only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">label list</h2>
        <CodeBlock>{`List all labels in a project.

Examples:
  # Human-readable list
  paso label list --project=1

  # JSON output for agents
  paso label list --project=1 --json

  # Quiet mode (one ID per line)
  paso label list --project=1 --quiet

Usage:
  paso label list [flags]

Flags:
  -h, --help          help for list
      --json          Output in JSON format
      --project int   Project ID (uses git branch association if not specified)
      --quiet         Minimal output (IDs only)`}</CodeBlock>

        <h2 className="mt-12 mb-4">label update</h2>
        <CodeBlock>{`Update a label's name and/or color.

Examples:
  # Update both name and color
  paso label update --id=1 --name="critical-bug" --color="#FF0000"

  # Update only name (keeps existing color)
  paso label update --id=1 --name="critical-bug"

  # Update only color (keeps existing name)
  paso label update --id=1 --color="#FF0000"

  # JSON output
  paso label update --id=1 --name="urgent" --json

Usage:
  paso label update [flags]

Flags:
      --color string   New label color in hex format #RRGGBB
  -h, --help           help for update
      --id int         Label ID (required)
      --json           Output in JSON format
      --name string    New label name
      --quiet          Minimal output`}</CodeBlock>

        <h2 className="mt-12 mb-4">label delete</h2>
        <CodeBlock>{`Delete a label by ID (requires confirmation unless --force or --quiet).

Examples:
  # Delete with confirmation
  paso label delete --id=1

  # Skip confirmation
  paso label delete --id=1 --force

  # Quiet mode (no confirmation)
  paso label delete --id=1 --quiet

Usage:
  paso label delete [flags]

Flags:
      --force    Skip confirmation
  -h, --help     help for delete
      --id int   Label ID (required)
      --json     Output in JSON format
      --quiet    Minimal output`}</CodeBlock>

        <h2 className="mt-12 mb-4">label attach</h2>
        <CodeBlock>{`Attach a label to a task by their IDs.

Examples:
  # Attach label to task
  paso label attach --task=5 --label=2

  # JSON output
  paso label attach --task=5 --label=2 --json

  # Quiet mode
  paso label attach --task=5 --label=2 --quiet

Usage:
  paso label attach [flags]

Flags:
  -h, --help        help for attach
      --json        Output in JSON format
      --label int   Label ID (required)
      --quiet       Minimal output
      --task int    Task ID (required)`}</CodeBlock>

        <h2 className="mt-12 mb-4">label detach</h2>
        <CodeBlock>{`Detach a label from a task by their IDs.

Examples:
  # Detach label from task
  paso label detach --task=5 --label=2

  # JSON output
  paso label detach --task=5 --label=2 --json

  # Quiet mode
  paso label detach --task=5 --label=2 --quiet

Usage:
  paso label detach [flags]

Flags:
  -h, --help        help for detach
      --json        Output in JSON format
      --label int   Label ID (required)
      --quiet       Minimal output
      --task int    Task ID (required)`}</CodeBlock>
      </>
    ),
  },

  'ai-integration': {
    title: 'AI Integration',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Integrate paso with AI coding assistants like Claude Code and OpenCode.
        </p>

        <CodeBlock>{`Configure paso to work with AI coding assistants like Claude Code and OpenCode.

Usage:
  paso setup [command]

Available Commands:
  claude      Setup Claude Code integration
  opencode    Setup OpenCode integration

Flags:
  -h, --help   help for setup

Use "paso setup [command] --help" for more information about a command.`}</CodeBlock>

        <h2 className="mt-12 mb-4">setup claude</h2>
        <CodeBlock>{`Install hooks to automatically run 'paso tutorial' on SessionStart and PreCompact.

This ensures AI agents always have paso workflow context, even after context compaction.

Examples:
  # Install globally (default)
  paso setup claude

  # Install for current project only
  paso setup claude --project

  # Check installation status
  paso setup claude --check

  # Remove hooks
  paso setup claude --remove

Usage:
  paso setup claude [flags]

Flags:
      --check     Check installation status
  -h, --help      help for claude
      --project   Install for current project only
      --remove    Remove hooks`}</CodeBlock>

        <h2 className="mt-12 mb-4">setup opencode</h2>
        <CodeBlock>{`Install the opencode-paso plugin for automatic context injection.

This ensures AI agents always have paso workflow context at session start.

Examples:
  # Install globally (default)
  paso setup opencode

  # Install for current project only
  paso setup opencode --project

  # Check installation status
  paso setup opencode --check

  # Remove plugin
  paso setup opencode --remove

Usage:
  paso setup opencode [flags]

Flags:
      --check     Check installation status
  -h, --help      help for opencode
      --project   Install for current project only
      --remove    Remove plugin`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Why integrate?</strong> AI assistants can lose context
          during long sessions. The hooks ensure they always know how to use paso for task
          tracking, even after context compaction.
        </Tip>
      </>
    ),
  },

  tutorial: {
    title: 'Tutorial Command',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Output AI-optimized workflow context.
        </p>

        <CodeBlock>{`Output essential paso workflow context in AI-optimized markdown format.

Designed for Claude Code hooks (SessionStart, PreCompact) to prevent
agents from forgetting paso workflow after context compaction.

Usage:
  paso tutorial [flags]

Flags:
  -h, --help   help for tutorial`}</CodeBlock>

        <h2 className="mt-12 mb-4">What It Outputs</h2>
        <p className="text-foreground/90 mb-4">
          The tutorial command outputs a comprehensive guide that includes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-6 ml-4">
          <li>Critical task tracking rules</li>
          <li>Essential commands reference</li>
          <li>Workflow examples for AI agents</li>
          <li>Dependency relationship explanations</li>
          <li>Output flags for automation</li>
        </ul>

        <h2 className="mt-12 mb-4">Usage</h2>
        <p className="text-foreground/90 mb-4">
          Run directly to see the output:
        </p>
        <CodeBlock>{`paso tutorial`}</CodeBlock>

        <p className="text-foreground/90 mb-4">
          Or pipe to a file:
        </p>
        <CodeBlock>{`paso tutorial > paso-context.md`}</CodeBlock>

        <Tip>
          <strong className="text-accent">Automatic usage:</strong> When you run{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">paso setup claude</code>,
          the tutorial command is automatically called at session start and before context
          compaction.
        </Tip>
      </>
    ),
  },

  completion: {
    title: 'Shell Completion',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Generate shell completion scripts for tab completion.
        </p>

        <CodeBlock>{`Generate shell completion script for paso.

To load completions:

Bash:
  $ source <(paso completion bash)

  # To load completions for each session, execute once:
  # Linux:
  $ paso completion bash > /etc/bash_completion.d/paso
  # macOS:
  $ paso completion bash > $(brew --prefix)/etc/bash_completion.d/paso

Zsh:
  # If shell completion is not already enabled in your environment,
  # you will need to enable it. You can execute the following once:
  $ echo "autoload -U compinit; compinit" >> ~/.zshrc

  # To load completions for each session, execute once:
  $ paso completion zsh > "\${fpath[1]}/_paso"

  # You will need to start a new shell for this setup to take effect.

Fish:
  $ paso completion fish | source

  # To load completions for each session, execute once:
  $ paso completion fish > ~/.config/fish/completions/paso.fish

PowerShell:
  PS> paso completion powershell | Out-String | Invoke-Expression

  # To load completions for every new session, run:
  PS> paso completion powershell > paso.ps1
  # and source this file from your PowerShell profile.

Usage:
  paso completion [bash|zsh|fish|powershell]

Flags:
  -h, --help   help for completion`}</CodeBlock>
      </>
    ),
  },

  'output-flags': {
    title: 'Output Flags',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Global flags available on all commands for automation and scripting.
        </p>

        <h2 className="mt-12 mb-4">--json</h2>
        <p className="text-foreground/90 mb-4">
          Output in JSON format. Useful for parsing responses programmatically or for
          AI agents that need structured data.
        </p>
        <CodeBlock>{`# Get task details as JSON
paso task show 42 --json

# List all projects as JSON
paso project list --json`}</CodeBlock>

        <h2 className="mt-12 mb-4">--quiet</h2>
        <p className="text-foreground/90 mb-4">
          Minimal output, typically just IDs. Useful for bash scripts and command chaining.
        </p>
        <CodeBlock>{`# Capture task ID in a variable
TASK_ID=$(paso task create --title="New task" --project=1 --quiet)

# Use the captured ID
paso task in-progress $TASK_ID

# Later, mark it done
paso task done $TASK_ID`}</CodeBlock>

        <h2 className="mt-12 mb-4">Confirmation Handling</h2>
        <p className="text-foreground/90 mb-4">
          Destructive commands (delete) require confirmation unless:
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-6 ml-4">
          <li><code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--force</code> flag is used</li>
          <li><code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--quiet</code> flag is used</li>
        </ul>
        <CodeBlock>{`# Delete without confirmation
paso task delete --id=42 --force

# Or using quiet mode
paso task delete --id=42 --quiet`}</CodeBlock>

        <Tip>
          <strong className="text-accent">For AI Agents:</strong> Always use{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--quiet</code> when
          capturing IDs for subsequent commands, and{' '}
          <code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">--json</code> when
          you need to parse complex responses.
        </Tip>
      </>
    ),
  },
}

export function Docs() {
  const [activeDoc, setActiveDoc] = useState('quickstart')
  const currentDoc = docContent[activeDoc] || docContent.quickstart
  const { open: searchOpen, setOpen: setSearchOpen } = useDocsSearch()

  return (
    <>
      <DocsSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={setActiveDoc}
      />
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Documentation</h3>
              </div>

              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 mb-6 text-sm text-muted-foreground bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="flex-1 text-left">Search docs...</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <nav className="space-y-6">
                {docSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      {section.title}
                    </h4>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveDoc(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                              activeDoc === item.id
                                ? 'bg-accent-light text-accent font-medium'
                                : 'hover:bg-muted text-foreground/80'
                            }`}
                          >
                            {item.label}
                            {activeDoc === item.id && (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <div className="lg:hidden w-full mb-8">
            <select
              value={activeDoc}
              onChange={(e) => setActiveDoc(e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg"
            >
              {docSections.map((section) => (
                <optgroup key={section.title} label={section.title}>
                  {section.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <main className="flex-1 max-w-3xl">
            <article className="prose prose-lg max-w-none animate-fade-in">
              <h1 className="mb-4">{currentDoc.title}</h1>
              {currentDoc.content}
            </article>
          </main>
        </div>
      </div>
    </div>
    </>
  )
}
