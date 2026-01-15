import { X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ isOpen, onClose, currentPage, onNavigate }: SidebarProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-medium text-lg">Menu</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {/* Blog */}
            <button
              onClick={() => handleNavigate('blog')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-post'
                  ? 'bg-accent-light text-accent'
                  : 'hover:bg-muted'
              }`}
            >
              <span className="font-medium">Blog</span>
            </button>

            {/* Services */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium">Services</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* PasoDB submenu */}
              {servicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-4">
                  <button
                    onClick={() => handleNavigate('pasodb')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      currentPage === 'pasodb'
                        ? 'bg-accent-light text-accent'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    PasoDB
                  </button>
                  <button
                    onClick={() => handleNavigate('pricing')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      currentPage === 'pricing'
                        ? 'bg-accent-light text-accent'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => handleNavigate('dashboard')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      currentPage === 'dashboard'
                        ? 'bg-accent-light text-accent'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigate('docs')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      currentPage === 'docs'
                        ? 'bg-accent-light text-accent'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    Documentation
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">© 2026 Dev Blog</p>
          </div>
        </div>
      </aside>
    </>
  );
}
