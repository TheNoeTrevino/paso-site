import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BlogHome } from './components/pages/BlogHome';
import { BlogPost } from './components/pages/BlogPost';
import { PasoDBLanding } from './components/pages/PasoDBLanding';
import { Pricing } from './components/pages/Pricing';
import { Dashboard } from './components/pages/Dashboard';
import { Docs } from './components/pages/Docs';

type Page = 'blog' | 'blog-post' | 'pasodb' | 'pricing' | 'dashboard' | 'docs';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('blog');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (postId: number) => {
    setCurrentPage('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <BlogHome onPostClick={handlePostClick} />;
      case 'blog-post':
        return <BlogPost onBack={handleBackToBlog} />;
      case 'pasodb':
        return <PasoDBLanding onNavigate={handleNavigate} />;
      case 'pricing':
        return <Pricing />;
      case 'dashboard':
        return <Dashboard />;
      case 'docs':
        return <Docs />;
      default:
        return <BlogHome onPostClick={handlePostClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="transition-opacity duration-300">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => handleNavigate('pasodb')} className="hover:text-accent transition-colors">PasoDB</button></li>
                <li><button onClick={() => handleNavigate('pricing')} className="hover:text-accent transition-colors">Pricing</button></li>
                <li><button onClick={() => handleNavigate('docs')} className="hover:text-accent transition-colors">Documentation</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => handleNavigate('blog')} className="hover:text-accent transition-colors">Blog</button></li>
                <li><a href="#" className="hover:text-accent transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Dev Blog. All rights reserved.</p>
            <p className="font-mono">Built with ♥ and PostgreSQL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
