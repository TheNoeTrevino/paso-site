import { Database, Zap, Shield, DollarSign, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PasoDBLanding() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized PostgreSQL instances with NVMe SSDs for maximum performance.',
    },
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'Encrypted connections, automated backups, and point-in-time recovery.',
    },
    {
      icon: DollarSign,
      title: 'Simple Pricing',
      description: 'Just $5/month. No hidden fees, no surprise charges.',
    },
  ]

  const useCases = [
    'Side projects and prototypes',
    'Production-ready applications',
    'Development and staging environments',
    'Small to medium-sized databases',
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-2xl mb-6">
            <Database className="w-10 h-10 text-accent" />
          </div>
          <h1 className="mb-6">PostgreSQL Hosting, Simplified</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Managed PostgreSQL databases for $5/month. Deploy in seconds, scale effortlessly,
            and focus on building your application.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/docs"
              className="px-8 py-3 border border-border rounded-lg hover:bg-muted font-medium"
            >
              View Docs
            </Link>
          </div>
        </div>

        <div className="bg-code-bg border border-code-border rounded-xl p-8 font-mono text-sm max-w-3xl mx-auto animate-slide-up">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            </div>
            <span className="ml-4 text-xs">connection.ts</span>
          </div>
          <pre className="text-foreground overflow-x-auto">
{`import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.PASODB_URL,
  ssl: { rejectUnauthorized: false }
});

// Ready to query!
const result = await pool.query('SELECT * FROM users');`}
          </pre>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <h2 className="text-center mb-16">Why PasoDB?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-4">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-muted/50 rounded-2xl p-12">
          <h2 className="mb-12 text-center">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={useCase}
                className="flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="text-foreground">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center border border-border rounded-2xl p-12 hover:border-accent transition-colors">
          <h2 className="mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your first PostgreSQL database in under a minute.
          </p>
          <Link
            to="/pricing"
            className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center gap-2 group"
          >
            View Pricing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
