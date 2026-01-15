import { Calendar, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable APIs with PostgreSQL',
    excerpt: 'Learn how to design and implement efficient database schemas for high-performance applications. We\'ll cover indexing strategies, query optimization, and common pitfalls to avoid.',
    date: 'Jan 10, 2026',
    readTime: '8 min read',
    tags: ['PostgreSQL', 'Backend', 'Performance'],
  },
  {
    id: 2,
    title: 'React Server Components: A Deep Dive',
    excerpt: 'Exploring the new paradigm of React Server Components and how they change the way we think about rendering. Understanding the benefits and tradeoffs of server-side rendering.',
    date: 'Jan 5, 2026',
    readTime: '12 min read',
    tags: ['React', 'Frontend', 'Performance'],
  },
  {
    id: 3,
    title: 'Deploying Node.js Apps to Production',
    excerpt: 'A comprehensive guide to deploying Node.js applications with best practices for security, monitoring, and scalability. From development to production deployment.',
    date: 'Dec 28, 2025',
    readTime: '10 min read',
    tags: ['Node.js', 'DevOps', 'Deployment'],
  },
  {
    id: 4,
    title: 'Understanding Database Indexes',
    excerpt: 'Indexes are crucial for database performance, but when should you use them? This guide covers B-tree, hash, and full-text indexes with practical examples.',
    date: 'Dec 20, 2025',
    readTime: '6 min read',
    tags: ['Database', 'PostgreSQL', 'Performance'],
  },
  {
    id: 5,
    title: 'TypeScript Best Practices in 2026',
    excerpt: 'Modern TypeScript patterns and techniques for writing type-safe, maintainable code. Covering advanced types, generics, and architectural patterns.',
    date: 'Dec 15, 2025',
    readTime: '9 min read',
    tags: ['TypeScript', 'Best Practices', 'Frontend'],
  },
];

interface BlogHomeProps {
  onPostClick: (postId: number) => void;
}

export function BlogHome({ onPostClick }: BlogHomeProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 animate-fade-in">
          <h1 className="mb-4">Developer Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Thoughts on software engineering, databases, and building things that scale.
          </p>
        </header>

        {/* Blog posts */}
        <div className="space-y-12">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onPostClick(post.id)}
            >
              <div className="pb-8 border-b border-border hover:border-accent transition-colors">
                <h2 className="mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
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
