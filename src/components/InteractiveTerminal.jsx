import React, { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '../data/portfolioData';
import { Terminal, Activity, Layers, CornerDownLeft } from 'lucide-react';
import './InteractiveTerminal.css';

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState('cli');
  const [history, setHistory] = useState([
    {
      cmd: 'girish --status',
      output: 'Ready · Full Stack & AI Systems Architect · Online'
    },
    {
      cmd: 'help',
      output: terminalCommands.help
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, activeTab]);

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let response = terminalCommands[trimmed];
    let isSuccess = false;

    if (trimmed === 'sudo hire') {
      isSuccess = true;
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        setTimeout(() => {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }, 800);
      }
    } else if (!response) {
      response = `Command not recognized: "${trimmed}". Type 'help' to view available commands.`;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output: response, isSuccess }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const triggerQuickCmd = (cmd) => {
    handleCommand(cmd);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control-dot dot-red" onClick={() => setHistory([])} title="Clear terminal"></span>
          <span className="control-dot dot-yellow"></span>
          <span className="control-dot dot-green"></span>
        </div>

        <div className="terminal-tabs">
          <button
            className={`terminal-tab ${activeTab === 'cli' ? 'active' : ''}`}
            onClick={() => setActiveTab('cli')}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Terminal size={12} /> cli.sh
            </span>
          </button>
          <button
            className={`terminal-tab ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Activity size={12} /> telemetry
            </span>
          </button>
          <button
            className={`terminal-tab ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Layers size={12} /> stack.json
            </span>
          </button>
        </div>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {activeTab === 'cli' && (
          <>
            <div className="terminal-history">
              {history.map((item, idx) => (
                <div key={idx} className="history-block">
                  <div className="cmd-line">
                    <span className="cmd-prompt">visitor@girish-mac:~$</span>
                    <span className="cmd-input-text">{item.cmd}</span>
                  </div>
                  <div className={`cmd-output ${item.isSuccess ? 'success' : ''}`}>
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            <div className="terminal-input-row">
              <span className="cmd-prompt">visitor@girish-mac:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'skills', 'projects'..."
                autoFocus={false}
              />
              <CornerDownLeft size={14} style={{ color: '#64748b' }} />
            </div>
          </>
        )}

        {activeTab === 'telemetry' && (
          <div className="telemetry-grid">
            <div className="telemetry-card">
              <div className="telemetry-label">Cluster Status</div>
              <div className="telemetry-val" style={{ color: '#10b981' }}>OPERATIONAL</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '99.98%' }}></div>
              </div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-label">API Latency (p99)</div>
              <div className="telemetry-val">18 ms</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-label">Production Deployments</div>
              <div className="telemetry-val">45+ Apps</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '95%' }}></div>
              </div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-label">Vite + React Bundler</div>
              <div className="telemetry-val" style={{ color: '#38bdf8' }}>Ready (HMR Active)</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <pre style={{ margin: 0, color: '#93c5fd', fontSize: '0.8rem', lineHeight: '1.5' }}>
{`{
  "engineer": "Girish Sharma",
  "status": "Available For High-Impact Roles",
  "architecture": {
    "frontend": ["React 19", "Next.js", "TypeScript", "Tailwind", "Vite"],
    "backend": ["Node.js", "Express", "FastAPI", "Python", "WebSockets"],
    "data_layer": ["PostgreSQL", "Redis", "pgvector", "Kafka", "Prisma"],
    "cloud": ["AWS", "Docker", "Kubernetes", "Vercel", "GitHub Actions"],
    "ai_engine": ["OpenAI", "Anthropic", "LangChain", "Vector RAG"]
  },
  "principles": [
    "Clean code that scales gracefully",
    "Under 100ms user interaction responsiveness",
    "Accessibility & SEO by default"
  ]
}`}
          </pre>
        )}
      </div>

      {activeTab === 'cli' && (
        <div className="quick-commands">
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Quick Cmds:</span>
          {['help', 'skills', 'projects', 'status', 'sudo hire', 'clear'].map((cmd) => (
            <button
              key={cmd}
              className="quick-cmd-btn"
              onClick={() => triggerQuickCmd(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
