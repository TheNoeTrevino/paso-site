import { Calendar, Clock, ArrowLeft, ThumbsUp, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

interface BlogPostProps {
  onBack: () => void;
}

export function BlogPost({ onBack }: BlogPostProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Sarah Chen',
      content: 'Great article! The section on indexing strategies was particularly helpful. I\'ve been struggling with slow queries and this gave me some good ideas.',
      date: 'Jan 11, 2026',
      likes: 12,
    },
    {
      id: 2,
      author: 'Mike Johnson',
      content: 'Would love to see a follow-up on connection pooling and how it affects performance at scale.',
      date: 'Jan 11, 2026',
      likes: 8,
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: 'You',
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to blog
        </button>

        {/* Article header */}
        <header className="mb-12">
          <h1 className="mb-6">Building Scalable APIs with PostgreSQL</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Jan 10, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              8 min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['PostgreSQL', 'Backend', 'Performance'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article content */}
        <article className="prose prose-lg max-w-none mb-16">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            When building modern web applications, the database layer is often the bottleneck. 
            In this article, we'll explore strategies for designing efficient PostgreSQL schemas 
            that can handle high-traffic applications.
          </p>

          <h2 className="mt-12 mb-4">Understanding Indexing Strategies</h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Indexes are the foundation of database performance. A well-placed index can turn a 
            slow query into a fast one, but too many indexes can slow down writes. The key is 
            understanding when and where to use them.
          </p>

          <div className="bg-code-bg border border-code-border rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
            <pre className="text-foreground">
{`CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Composite index for common query patterns
CREATE INDEX idx_posts_user_status 
  ON posts(user_id, status, created_at DESC);`}
            </pre>
          </div>

          <p className="text-foreground/90 leading-relaxed mb-6">
            In the example above, we create indexes that support common query patterns. The composite 
            index on posts allows PostgreSQL to efficiently query posts by user and status, while also 
            supporting sorting by creation date.
          </p>

          <h2 className="mt-12 mb-4">Query Optimization Tips</h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Writing efficient queries is just as important as having the right indexes. Here are some 
            key principles to follow:
          </p>

          <ul className="list-disc list-inside space-y-3 text-foreground/90 mb-6 ml-4">
            <li>Use EXPLAIN ANALYZE to understand query execution plans</li>
            <li>Avoid SELECT * - only fetch the columns you need</li>
            <li>Use appropriate JOIN types and understand their performance implications</li>
            <li>Leverage PostgreSQL's window functions for complex aggregations</li>
            <li>Consider partitioning for very large tables</li>
          </ul>

          <h2 className="mt-12 mb-4">Connection Pooling</h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Database connections are expensive resources. Using a connection pooler like PgBouncer 
            can dramatically improve your application's scalability by reusing connections efficiently.
          </p>

          <div className="bg-muted border-l-4 border-accent p-6 rounded-lg mb-6">
            <p className="text-sm text-foreground/90">
              <strong className="text-accent">Pro tip:</strong> Start with a pool size equal to the 
              number of CPU cores on your database server, then tune based on your workload patterns.
            </p>
          </div>

          <h2 className="mt-12 mb-4">Conclusion</h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Building scalable APIs with PostgreSQL requires attention to schema design, indexing 
            strategies, and query optimization. By following these principles, you can build 
            applications that perform well even under heavy load.
          </p>
        </article>

        {/* Comments section */}
        <section className="border-t border-border pt-12">
          <h3 className="mb-8 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments ({comments.length})
          </h3>

          {/* Comment form */}
          <form onSubmit={handleSubmitComment} className="mb-12">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent min-h-[120px]"
            />
            <button
              type="submit"
              className="mt-3 px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Post Comment
            </button>
          </form>

          {/* Comments list */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-sm text-muted-foreground">{comment.date}</p>
                  </div>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    {comment.likes}
                  </button>
                </div>
                <p className="text-foreground/90 leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
