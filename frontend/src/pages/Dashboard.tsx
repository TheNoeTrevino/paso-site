import { Database, Activity, HardDrive, RefreshCw, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function Dashboard() {
  const [copied, setCopied] = useState(false)
  const connectionString = 'postgresql://user:pass@pasodb-us-east-1.example.com:5432/mydb'

  const handleCopy = () => {
    navigator.clipboard.writeText(connectionString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    {
      label: 'Storage Used',
      value: '2.4 GB',
      max: '10 GB',
      percentage: 24,
      icon: HardDrive,
    },
    {
      label: 'Bandwidth',
      value: '45 GB',
      max: '100 GB',
      percentage: 45,
      icon: Activity,
    },
  ]

  const recentActivity = [
    { time: '2 minutes ago', action: 'Query executed', detail: 'SELECT * FROM users LIMIT 100' },
    { time: '15 minutes ago', action: 'Connection opened', detail: 'From 192.168.1.100' },
    { time: '1 hour ago', action: 'Backup completed', detail: 'Automated daily backup' },
    { time: '3 hours ago', action: 'Table created', detail: 'CREATE TABLE products' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h1>Database Dashboard</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Online</span>
            </div>
          </div>
          <p className="text-muted-foreground">mydb-production</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="border border-border rounded-xl p-6 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-semibold text-lg">
                      {stat.value} <span className="text-sm text-muted-foreground">/ {stat.max}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <section className="mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Connection String
            </h3>
            <div className="bg-code-bg border border-code-border rounded-lg p-4 font-mono text-sm flex items-center justify-between gap-4">
              <code className="flex-1 overflow-x-auto">{connectionString}</code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Copy connection string"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Use this connection string in your application. Keep it secure and never commit it to version control.
            </p>
          </div>
        </section>

        <section className="mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-border rounded-lg hover:border-accent transition-colors text-left group">
              <RefreshCw className="w-5 h-5 mb-2 text-accent group-hover:rotate-180 transition-transform duration-500" />
              <p className="font-medium text-sm">Backup Now</p>
              <p className="text-xs text-muted-foreground mt-1">Create manual backup</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:border-accent transition-colors text-left">
              <Database className="w-5 h-5 mb-2 text-accent" />
              <p className="font-medium text-sm">Restore</p>
              <p className="text-xs text-muted-foreground mt-1">Point-in-time recovery</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:border-accent transition-colors text-left">
              <Activity className="w-5 h-5 mb-2 text-accent" />
              <p className="font-medium text-sm">Metrics</p>
              <p className="text-xs text-muted-foreground mt-1">View performance</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:border-accent transition-colors text-left">
              <HardDrive className="w-5 h-5 mb-2 text-accent" />
              <p className="font-medium text-sm">Logs</p>
              <p className="text-xs text-muted-foreground mt-1">View recent logs</p>
            </button>
          </div>
        </section>

        <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="mb-4">Recent Activity</h3>
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="divide-y divide-border">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{activity.action}</p>
                      <p className="text-sm text-muted-foreground font-mono">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
