import React, { useState, useEffect } from 'react';
import { articlesData } from '../data/articlesData';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  Check,
  Copy,
  ChevronRight,
  Sparkles,
  Terminal,
  Layers,
  ShieldCheck
} from 'lucide-react';
import './ArticlesPage.css';

export default function ArticlesPage() {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedArticles, setLikedArticles] = useState({});
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Check URL hash for direct deep-link to article e.g. #/articles?id=eks-gitops-zero-downtime
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('?id=')) {
        const id = hash.split('?id=')[1];
        if (articlesData.some((a) => a.id === id)) {
          setSelectedArticleId(id);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const categories = ['All', ...new Set(articlesData.map((a) => a.category))];

  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeArticle = articlesData.find((a) => a.id === selectedArticleId);

  const handleSelectArticle = (id) => {
    setSelectedArticleId(id);
    window.location.hash = `#/articles?id=${id}`;
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticleId(null);
    window.location.hash = '#/articles';
  };

  const handleToggleLike = (id, e) => {
    e.stopPropagation();
    setLikedArticles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeSnippet(index);
    setTimeout(() => setCopiedCodeSnippet(null), 2000);
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  return (
    <div className="articles-page">
      {/* Header Banner */}
      <section className="articles-hero-section">
        <div className="container">
          <div className="arch-breadcrumb">
            <a href="#/" className="breadcrumb-link">Home</a>
            <ChevronRight size={14} />
            <a
              href="#/articles"
              onClick={handleBackToList}
              className={`breadcrumb-link ${!activeArticle ? 'breadcrumb-current' : ''}`}
            >
              Case Studies & Articles
            </a>
            {activeArticle && (
              <>
                <ChevronRight size={14} />
                <span className="breadcrumb-current">{activeArticle.title.slice(0, 36)}...</span>
              </>
            )}
          </div>

          {!activeArticle ? (
            <>
              <div className="articles-badge">
                <BookOpen size={14} />
                <span>DevOps Architecture Decision Records & Playbooks</span>
              </div>
              <h1 className="articles-hero-title">
                Technical Articles & <span className="gradient-text">Case Studies</span>
              </h1>
              <p className="articles-hero-desc">
                In-depth engineering walkthroughs on GitOps rollouts, Terraform multi-environment state locking, Docker distroless security hardening, and production Kubernetes post-mortems.
              </p>

              {/* Search & Category Filter Toolbar */}
              <div className="articles-toolbar">
                <div className="articles-search-wrap">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles by keyword, technology (e.g. ArgoCD, Terraform, DNS)..."
                    className="articles-search-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="search-clear-btn"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="articles-category-pills">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="article-reader-top-bar">
              <button onClick={handleBackToList} className="btn btn-outline btn-sm">
                <ArrowLeft size={14} />
                <span>Back to All Articles</span>
              </button>
              <div className="reader-actions">
                <button
                  onClick={() => handleToggleLike(activeArticle.id, { stopPropagation: () => {} })}
                  className={`btn btn-sm ${likedArticles[activeArticle.id] ? 'btn-liked' : 'btn-outline'}`}
                >
                  <Heart
                    size={14}
                    fill={likedArticles[activeArticle.id] ? 'currentColor' : 'none'}
                  />
                  <span>
                    {activeArticle.likes + (likedArticles[activeArticle.id] ? 1 : 0)} Likes
                  </span>
                </button>
                <button onClick={handleShareArticle} className="btn btn-outline btn-sm">
                  {copiedShareLink ? <Check size={14} /> : <Share2 size={14} />}
                  <span>{copiedShareLink ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="articles-content-section">
        <div className="container">
          {!activeArticle ? (
            /* Articles Card Grid */
            <div className="articles-grid">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => {
                  const isLiked = likedArticles[article.id];
                  return (
                    <article
                      key={article.id}
                      onClick={() => handleSelectArticle(article.id)}
                      className="article-card"
                    >
                      <div className="article-card-header">
                        <span className="article-cat-tag">{article.category}</span>
                        <div className="article-meta-row">
                          <span className="meta-time">
                            <Clock size={12} />
                            {article.readTime}
                          </span>
                          <span className="meta-date">
                            <Calendar size={12} />
                            {article.date}
                          </span>
                        </div>
                      </div>

                      <h3 className="article-card-title">{article.title}</h3>
                      <p className="article-card-tagline">{article.tagline}</p>

                      <div className="article-tags-wrap">
                        {article.tags.slice(0, 4).map((tag, idx) => (
                          <span key={idx} className="article-tag-chip">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="article-card-footer">
                        <div className="article-author-info">
                          <div className="author-avatar-sm">GS</div>
                          <div>
                            <span className="author-name">{article.author}</span>
                            <span className="author-role">Associate DevOps</span>
                          </div>
                        </div>

                        <div className="article-card-actions">
                          <button
                            onClick={(e) => handleToggleLike(article.id, e)}
                            className={`like-icon-btn ${isLiked ? 'liked' : ''}`}
                            title="Like this case study"
                            aria-label="Like"
                          >
                            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                            <span>{article.likes + (isLiked ? 1 : 0)}</span>
                          </button>

                          <span className="read-more-btn">
                            <span>Read</span>
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="no-articles-found">
                  <BookOpen size={36} />
                  <h3>No case studies found</h3>
                  <p>Try searching for a different keyword or select another category filter.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Full Article Reader View */
            <div className="article-full-view">
              <div className="article-header-hero">
                <div className="article-header-meta">
                  <span className="article-cat-tag large">{activeArticle.category}</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-time">
                    <Clock size={14} />
                    {activeArticle.readTime}
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-date">
                    <Calendar size={14} />
                    {activeArticle.date}
                  </span>
                </div>

                <h1 className="article-full-title">{activeArticle.title}</h1>
                <p className="article-full-tagline">{activeArticle.tagline}</p>

                <div className="article-author-card">
                  <div className="author-avatar-lg">GS</div>
                  <div className="author-meta-lg">
                    <span className="author-name-lg">{activeArticle.author}</span>
                    <span className="author-bio-lg">
                      Associate Cloud & DevOps Engineer • Specializing in AWS, Docker, Kubernetes & Terraform
                    </span>
                  </div>
                </div>
              </div>

              {/* Executive Summary Callout */}
              <div className="article-executive-summary">
                <div className="summary-title">
                  <ShieldCheck size={18} />
                  <span>Executive Architecture Summary</span>
                </div>
                <p>{activeArticle.summary}</p>
              </div>

              {/* Article Content Sections */}
              <div className="article-body-content">
                {activeArticle.sections.map((section, idx) => (
                  <div key={idx} className="article-body-section">
                    <h2 className="section-title">{section.heading}</h2>
                    <div className="section-text">
                      {section.content.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {section.code && (
                      <div className="article-code-box">
                        <div className="code-header">
                          <span className="code-lang font-mono">{section.codeLanguage || 'yaml'}</span>
                          <button
                            onClick={() => handleCopyCode(section.code, idx)}
                            className="code-copy-btn"
                          >
                            {copiedCodeSnippet === idx ? (
                              <>
                                <Check size={13} style={{ color: 'var(--accent-emerald)' }} />
                                <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy Snippet</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="code-pre font-mono">
                          <code>{section.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Article Footer & Key Takeaways */}
              <div className="article-full-footer">
                <div className="article-tags-full">
                  <span className="tags-label">Topics:</span>
                  {activeArticle.tags.map((tag, idx) => (
                    <span key={idx} className="article-tag-chip large">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="reader-cta-box">
                  <div className="cta-text">
                    <h4>Have questions about this implementation?</h4>
                    <p>Connect with Girish to discuss real-world infrastructure challenges and architectural trade-offs.</p>
                  </div>
                  <a href="#contact" className="btn btn-primary">
                    <span>Reach Out</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
