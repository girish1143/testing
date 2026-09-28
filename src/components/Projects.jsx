import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';
import { Search, Star, Terminal, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { Github } from './SocialIcons';
import './Projects.css';

export default function Projects({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI & Cloud', 'Full Stack', 'Frontend / UI'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category.toLowerCase().includes(activeCategory.toLowerCase());
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} />
            Featured Work & Architecture
          </span>
          <h2 className="section-title">
            Production-Grade <span className="gradient-text">Engineering Feats</span>
          </h2>
          <p className="section-description">
            Explore distributed cloud platforms, real-time reactive applications, and AI agent frameworks built with focus on sub-millisecond latencies and high availability.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-filter-bar">
          <div className="filter-pills" role="tablist" aria-label="Project categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? 'All Systems' : cat}
              </button>
            ))}
          </div>

          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              id="project-search"
              type="text"
              className="search-input"
              placeholder="Search by tech, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <Layers size={40} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              No projects found matching "<strong>{searchQuery}</strong>".
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                {/* Banner Header */}
                <div
                  className="project-card-banner"
                  style={{ background: project.bannerGradient }}
                >
                  <div className="banner-overlay" />
                  <div className="banner-content">
                    <span className="project-category-tag">{project.category}</span>
                    <div className="project-stats-pill" title={`${project.stars} GitHub stars`}>
                      <Star size={13} fill="#fcd34d" color="#fcd34d" />
                      <span>{project.stars}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="project-card-body">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tagline">{project.tagline}</div>
                  </div>

                  <div className="project-metric-badge">
                    <span>⚡</span>
                    <span>{project.metrics}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  {/* Tech stack chips */}
                  <div className="project-tech-tags" aria-label="Technologies used">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="project-card-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => onSelectProject(project)}
                      id={`inspect-${project.id}`}
                    >
                      <Terminal size={14} />
                      Deep Dive & Sim
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-icon btn-sm"
                      title="View GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github size={16} />
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-icon btn-sm"
                      title="Launch Live Demo"
                      aria-label="Live Demo Link"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
