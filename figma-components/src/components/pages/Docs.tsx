import { useState } from 'react';
import { Book, ChevronRight } from 'lucide-react';

const docSections = [
  {
    title: 'Getting Started',
    items: [
      { id: 'quickstart', label: 'Quickstart' },
      { id: 'setup', label: 'Setup & Configuration' },
      { id: 'first-query', label: 'Your First Query' },
    ],
  },
  {
    title: 'Database Management',
    items: [
      { id: 'connections', label: 'Connection Pooling' },
      { id: 'backups', label: 'Backups & Recovery' },
      { id: 'migrations', label: 'Running Migrations' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { id: 'rest-api', label: 'REST API' },
      { id: 'cli', label: 'CLI Commands' },
      { id: 'environment', label: 'Environment Variables' },
    ],
  },
];

const docContent: Record<string, { title: string; content: JSX.Element }> = {
  quickstart: {
    title: 'Quickstart Guide',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Get started with PasoDB in less than 5 minutes.
        </p>

        <h2 className="mt-12 mb-4">1. Create Your Database</h2>
        <p className="text-foreground/90 mb-4">
          After signing up, navigate to the dashboard and click "Create Database". 
          Choose a name and region closest to your users.
        </p>

        <h2 className="mt-12 mb-4">2. Get Your Connection String</h2>
        <p className="text-foreground/90 mb-4">
          Once created, you'll receive a connection string. Copy it and add it to your 
          environment variables:
        </p>
        <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">
{`DATABASE_URL=postgresql://user:pass@pasodb.example.com:5432/mydb`}
          </pre>
        </div>

        <h2 className="mt-12 mb-4">3. Connect From Your Application</h2>
        <p className="text-foreground/90 mb-4">
          Use any PostgreSQL client library. Here's an example with Node.js:
        </p>
        <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">
{`import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Query your database
const result = await pool.query('SELECT NOW()');
console.log(result.rows[0]);`}
          </pre>
        </div>

        <div className="bg-muted border-l-4 border-accent p-6 rounded-lg mt-8">
          <p className="text-sm">
            <strong className="text-accent">Next steps:</strong> Learn about connection 
            pooling, backups, and running migrations in the other documentation sections.
          </p>
        </div>
      </>
    ),
  },
  connections: {
    title: 'Connection Pooling',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Efficiently manage database connections for better performance.
        </p>

        <h2 className="mt-12 mb-4">Why Connection Pooling?</h2>
        <p className="text-foreground/90 mb-4">
          Creating a new database connection is expensive. Connection pooling reuses existing 
          connections, dramatically improving performance and reducing resource usage.
        </p>

        <h2 className="mt-12 mb-4">Using pg.Pool</h2>
        <p className="text-foreground/90 mb-4">
          The recommended way to connect is using the pg.Pool class:
        </p>
        <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">
{`import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// The pool will manage connections automatically
export default pool;`}
          </pre>
        </div>

        <h2 className="mt-12 mb-4">Recommended Settings</h2>
        <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-6 ml-4">
          <li><code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">max</code>: Start with 20-50 connections</li>
          <li><code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">idleTimeoutMillis</code>: 30000 (30 seconds)</li>
          <li><code className="font-mono text-sm bg-code-bg px-2 py-1 rounded">connectionTimeoutMillis</code>: 2000 (2 seconds)</li>
        </ul>
      </>
    ),
  },
  backups: {
    title: 'Backups & Recovery',
    content: (
      <>
        <p className="text-xl text-muted-foreground mb-8">
          Your data is automatically backed up daily with point-in-time recovery.
        </p>

        <h2 className="mt-12 mb-4">Automatic Backups</h2>
        <p className="text-foreground/90 mb-4">
          PasoDB creates daily backups of your database at 2 AM UTC. Backups are retained 
          for 7 days on the standard plan.
        </p>

        <h2 className="mt-12 mb-4">Manual Backups</h2>
        <p className="text-foreground/90 mb-4">
          You can create manual backups anytime from the dashboard or using the CLI:
        </p>
        <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">
{`pasodb backup create mydb-production --name "pre-migration"`}
          </pre>
        </div>

        <h2 className="mt-12 mb-4">Point-in-Time Recovery</h2>
        <p className="text-foreground/90 mb-4">
          Restore your database to any point in time within the last 7 days:
        </p>
        <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">
{`pasodb restore mydb-production \\
  --timestamp "2026-01-10 14:30:00" \\
  --target mydb-restored`}
          </pre>
        </div>

        <div className="bg-muted border-l-4 border-accent p-6 rounded-lg mt-8">
          <p className="text-sm">
            <strong className="text-accent">Important:</strong> Point-in-time recovery 
            creates a new database. Your original database remains untouched.
          </p>
        </div>
      </>
    ),
  },
};

export function Docs() {
  const [activeDoc, setActiveDoc] = useState('quickstart');
  const currentDoc = docContent[activeDoc] || docContent.quickstart;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Book className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Documentation</h3>
              </div>
              
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

          {/* Mobile menu */}
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

          {/* Content */}
          <main className="flex-1 max-w-3xl">
            <article className="prose prose-lg max-w-none animate-fade-in">
              <h1 className="mb-4">{currentDoc.title}</h1>
              {currentDoc.content}
            </article>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
