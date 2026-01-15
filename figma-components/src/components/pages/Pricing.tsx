import { Check, ArrowRight } from 'lucide-react';

export function Pricing() {
  const features = [
    '10 GB storage',
    '100 GB bandwidth',
    'Daily automated backups',
    'Point-in-time recovery',
    'SSL connections',
    'Monitoring & alerts',
    'Email support',
    '99.9% uptime SLA',
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One plan, everything included. No hidden fees, no surprises.
          </p>
        </header>

        {/* Pricing card */}
        <div className="max-w-md mx-auto">
          <div className="border-2 border-accent rounded-2xl p-8 bg-card relative overflow-hidden animate-slide-up">
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-medium font-mono">
              MOST POPULAR
            </div>

            {/* Price */}
            <div className="mb-8 mt-4">
              <h2 className="mb-2">Standard Plan</h2>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-semibold">$5</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Billed monthly • Cancel anytime
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h3 className="mb-2">Can I upgrade my storage?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently, we offer a single plan with 10 GB of storage. For most applications, 
                this is more than enough. If you need more, please contact support and we'll work 
                something out.
              </p>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h3 className="mb-2">What happens to my data if I cancel?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data is backed up for 30 days after cancellation. You can export your database 
                at any time using standard PostgreSQL tools like pg_dump.
              </p>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <h3 className="mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! If you're not satisfied within the first 7 days, we'll issue a full refund, 
                no questions asked.
              </p>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <h3 className="mb-2">What PostgreSQL version do you use?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We run PostgreSQL 16, the latest stable version. We handle upgrades and security 
                patches automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-24 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 border border-border rounded-2xl hover:border-accent transition-colors">
            <p className="text-lg text-muted-foreground">
              Still have questions?
            </p>
            <button className="text-accent hover:underline font-medium">
              Contact Support →
            </button>
          </div>
        </section>
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
