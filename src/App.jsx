import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import PipelineVisualizer from './components/PipelineVisualizer';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import ArchitectureLab from './components/ArchitectureLab';
import ArticlesPage from './components/ArticlesPage';
import DevOpsToolbox from './components/DevOpsToolbox';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('girish_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Dynamic Hash Route Handling: 'home' | 'architecture' | 'articles' | 'toolbox'
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/architecture')) return 'architecture';
    if (hash.startsWith('#/articles')) return 'articles';
    if (hash.startsWith('#/toolbox')) return 'toolbox';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/architecture')) {
        setCurrentRoute('architecture');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#/articles')) {
        setCurrentRoute('articles');
        if (!hash.includes('?id=')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash.startsWith('#/toolbox')) {
        setCurrentRoute('toolbox');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
        // If there is an in-page anchor like #projects, scroll to it
        if (hash && hash !== '#/' && hash !== '#home' && !hash.startsWith('#/')) {
          const id = hash.replace('#', '');
          const el = document.getElementById(id);
          if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('girish_theme', theme);
  }, [theme]);

  // Global keyboard shortcut for Command Palette: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateToPage = (route) => {
    if (route === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${route}`;
    }
  };

  return (
    <div className="portfolio-app">
      {/* Background Ambient Glow */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        currentRoute={currentRoute}
        onNavigate={navigateToPage}
      />

      {/* Main Content View Switcher */}
      <main>
        {currentRoute === 'home' && (
          <>
            <Hero />
            <Projects onSelectProject={(project) => setActiveModalProject(project)} />
            <PipelineVisualizer />
            <Skills />
            <Certifications />
            <Experience />
            <Testimonials />
            <Contact />
          </>
        )}

        {currentRoute === 'architecture' && <ArchitectureLab />}

        {currentRoute === 'articles' && <ArticlesPage />}

        {currentRoute === 'toolbox' && <DevOpsToolbox />}
      </main>

      {/* Global Footer */}
      <Footer currentRoute={currentRoute} onNavigate={navigateToPage} />

      {/* Architecture Deep Dive Simulation Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}

      {/* Global Developer Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={navigateToPage}
      />
    </div>
  );
}

export default App;
