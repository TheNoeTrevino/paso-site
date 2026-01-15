import { Menu, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Navbar({ onMenuClick, isDark, onThemeToggle }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-muted rounded-lg"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-mono font-medium text-sm">D</span>
              </div>
              <span className="font-medium text-lg hidden sm:inline-block">Dev Blog</span>
            </a>
          </div>

          {/* Right: Theme toggle + Sign in */}
          <div className="flex items-center gap-3">
            <button
              onClick={onThemeToggle}
              className="p-2 hover:bg-muted rounded-lg hover:rotate-12"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-accent" />
              )}
            </button>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
