import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { PasoDBLanding } from './pages/PasoDBLanding'
import { Pricing } from './pages/Pricing'
import { Dashboard } from './pages/Dashboard'
import { Docs } from './pages/Docs'
import { Auth } from './pages/Auth'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
      <Routes>
        {/* Auth routes - no layout */}
        <Route path="/login" element={<Auth initialMode="login" />} />
        <Route path="/signup" element={<Auth initialMode="signup" />} />

        {/* Main layout routes */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-background text-foreground">
              <Navbar
                onMenuClick={() => setSidebarOpen(true)}
                isDark={isDark}
                onThemeToggle={toggleTheme}
              />

              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />

              <main>
                <Routes>
                  <Route path="/" element={<PasoDBLanding />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/docs" element={<Docs />} />
                </Routes>
              </main>

              <footer className="border-t border-border bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold mb-4">Product</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="/" className="hover:text-accent transition-colors">PasoDB</a></li>
                        <li><a href="/pricing" className="hover:text-accent transition-colors">Pricing</a></li>
                        <li><a href="/docs" className="hover:text-accent transition-colors">Documentation</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Resources</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="/docs" className="hover:text-accent transition-colors">Docs</a></li>
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
                    <p>© 2026 Paso. All rights reserved.</p>
                    <p className="font-mono">Built with PostgreSQL</p>
                  </div>
                </div>
              </footer>
            </div>
          }
        />
      </Routes>
    </>
  )
}
