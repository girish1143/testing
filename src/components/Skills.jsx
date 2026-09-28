import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Layout, Server, Cloud, Cpu, Sparkles } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryIcons = {
    'Frontend Architecture': <Layout size={22} />,
    'Backend & Systems': <Server size={22} />,
    'Cloud & DevOps': <Cloud size={22} />,
    'AI & Intelligent Tooling': <Cpu size={22} />,
  };

  const displayedCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((cat) => cat.category === selectedCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} />
            Technical Proficiency
          </span>
          <h2 className="section-title">
            Architecture & <span className="gradient-text">Core Capabilities</span>
          </h2>
          <p className="section-description">
            Battle-tested technical stack honed across fintech platforms, high-traffic SaaS systems, and autonomous agent frameworks.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-categories-nav">
          <button
            className={`skill-category-tab ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All Disciplines
          </button>
          {skillsData.map((cat) => (
            <button
              key={cat.category}
              className={`skill-category-tab ${selectedCategory === cat.category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.category)}
            >
              {categoryIcons[cat.category]}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {displayedCategories.map((domain) => (
            <div key={domain.category} className="skill-domain-card">
              <div className="domain-header">
                <div className="domain-title-wrap">
                  <h3>{domain.category}</h3>
                  <p className="domain-description">{domain.description}</p>
                </div>
                <div className="domain-icon-badge" aria-hidden="true">
                  {categoryIcons[domain.category] || <Cpu size={22} />}
                </div>
              </div>

              <div className="skills-list">
                {domain.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <div className="skill-name-wrap">
                        <span>{skill.name}</span>
                        {skill.highlight && (
                          <span className="highlight-tag">Core</span>
                        )}
                      </div>
                      <span className="skill-level-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-meter-bg">
                      <div
                        className="skill-meter-fill"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
