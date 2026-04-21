import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="brutalist-container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
          
          .brutalist-container {
            font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #FAFAFA;
            color: #111111;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          * { box-sizing: border-box; }

          /* Top Nav */
          .nav-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 48px;
            background: #18181A;
            color: #FFFFFF;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .nav-top-left, .nav-top-right {
            display: flex;
            gap: 32px;
            align-items: center;
          }
          .nav-top-link {
            color: #A1A1AA;
            cursor: pointer;
            transition: color 0.15s;
          }
          .nav-top-link:hover { color: #FFFFFF; }
          .logo {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.2em;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .logo-accent { color: #EF4444; }

          /* Sub Nav */
          .nav-sub {
            padding: 12px 48px;
            background: #27272A;
            color: #A1A1AA;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-align: center;
          }

          /* Hero Section */
          .hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            padding: 80px 48px;
            background: #FFFFFF;
            border-bottom: 1px solid #E5E5E5;
            align-items: flex-start;
          }
          
          .hero-left {
            max-width: 600px;
          }
          .hero-pretitle {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #52525B;
            margin-bottom: 24px;
          }
          .hero h1 {
            font-size: 56px;
            font-weight: 500;
            line-height: 1.1;
            margin-bottom: 32px;
            color: #111111;
            letter-spacing: -0.02em;
            text-transform: uppercase;
          }
          .hero p {
            font-size: 18px;
            color: #52525B;
            line-height: 1.6;
            margin-bottom: 48px;
            max-width: 480px;
          }
          .hero-cta {
            display: flex;
            gap: 16px;
          }
          .btn-solid {
            padding: 16px 32px;
            background: #111111;
            color: #FFFFFF;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            border: 1px solid #111111;
            cursor: pointer;
            transition: all 0.2s;
          }
          .btn-solid:hover {
            background: #27272A;
            border-color: #27272A;
          }
          .btn-outline {
            padding: 16px 32px;
            background: #FFFFFF;
            color: #111111;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            border: 1px solid #E5E5E5;
            cursor: pointer;
            transition: all 0.2s;
          }
          .btn-outline:hover {
            border-color: #111111;
          }

          /* Hero Right - Terminal Box */
          .hero-right {
            background: #FAFAFA;
            border: 1px solid #E5E5E5;
            padding: 32px;
            width: 100%;
          }
          .terminal-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            border-bottom: 1px solid #111111;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .terminal-header h3 {
            font-size: 18px;
            font-weight: 500;
            letter-spacing: 0.05em;
            margin: 0;
            text-transform: uppercase;
          }
          .terminal-version {
            font-size: 24px;
            font-weight: 400;
            color: #A1A1AA;
          }
          
          .sys-row {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            border-bottom: 1px solid #E5E5E5;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
          }
          .sys-label { color: #111111; }
          .sys-val { color: #52525B; font-family: 'Space Mono', monospace; }
          .sys-val.online { color: #10B981; border: 1px solid #10B981; padding: 2px 8px; }

          .terminal-box-label {
            margin-top: 32px;
            margin-bottom: 12px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.15em;
            color: #111111;
            text-transform: uppercase;
          }
          .terminal-window {
            background: #111111;
            padding: 24px;
            font-family: 'Space Mono', monospace;
            font-size: 11px;
            line-height: 1.8;
            color: #A1A1AA;
          }
          .log-ts { color: #71717A; }
          .log-sys { color: #EF4444; }
          .log-auth { color: #F59E0B; }
          .log-exec { color: #3B82F6; }
          .log-audit { color: #10B981; }
          .log-msg { color: #10B981; }
          .log-msg-2 { color: #A1A1AA; }
          .log-hash { color: #059669; }

          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            background: #FFFFFF;
            border-bottom: 1px solid #E5E5E5;
          }
          .stat-cell {
            padding: 40px 48px;
            border-right: 1px solid #E5E5E5;
          }
          .stat-cell:last-child {
            border-right: none;
          }
          .stat-num {
            font-size: 40px;
            font-weight: 400;
            color: #111111;
            margin-bottom: 12px;
          }
          .stat-label {
            font-size: 12px;
            font-weight: 700;
            color: #A1A1AA;
            letter-spacing: 0.15em;
            text-transform: uppercase;
          }

          /* Sections General */
          .section {
            padding: 80px 48px;
            background: #FAFAFA;
            border-bottom: 1px solid #E5E5E5;
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-bottom: 16px;
            border-bottom: 1px solid #111111;
            margin-bottom: 48px;
          }
          .section-header-left {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .section-caption {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.15em;
            color: #111111;
            text-transform: uppercase;
          }
          .section-header h2 {
            font-size: 32px;
            font-weight: 500;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }
          .section-link {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #111111;
            text-decoration: underline;
            cursor: pointer;
          }

          /* JML Cards */
          .jml-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .jml-card {
            background: #FFFFFF;
            border: 1px solid #E5E5E5;
            padding: 32px;
          }
          .jml-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 24px;
            border-bottom: 1px dotted #E5E5E5;
            margin-bottom: 24px;
          }
          .jml-card-title {
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.05em;
          }
          .jml-card-tag {
            font-family: 'Space Mono', monospace;
            font-size: 10px;
            color: #A1A1AA;
          }
          .jml-card p {
            font-size: 14px;
            color: #52525B;
            line-height: 1.6;
            min-height: 80px;
            margin-bottom: 32px;
          }
          .jml-targets-label {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.15em;
            color: #A1A1AA;
            text-transform: uppercase;
            margin-bottom: 16px;
          }
          .jml-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .mono-tag {
            font-family: 'Space Mono', monospace;
            font-size: 9px;
            padding: 4px 8px;
            border: 1px solid #E5E5E5;
            color: #52525B;
            background: #FAFAFA;
          }
          .mono-tag.danger {
            color: #EF4444;
            border-color: #F87171;
          }

          /* Flow Steps */
          .flow-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            margin-top: 64px;
          }
          .flow-line {
            position: absolute;
            top: 24px;
            left: 0;
            right: 0;
            height: 1px;
            background: #E5E5E5;
            z-index: 1;
          }
          .flow-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            z-index: 2;
            width: 180px;
            background: #FAFAFA; /* to cover the line */
          }
          .flow-box {
            width: 48px;
            height: 48px;
            border: 1px solid #111111;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #FFFFFF;
            font-family: 'Space Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 24px;
          }
          .flow-step h4 {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 12px;
            color: #111111;
          }
          .flow-step p {
            font-size: 12px;
            color: #52525B;
            line-height: 1.5;
          }

          /* Specifications Grid */
          .specs-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border: 1px solid #E5E5E5;
            background: #FFFFFF;
          }
          .spec-cell {
            padding: 40px;
            border-right: 1px solid #E5E5E5;
            border-bottom: 1px solid #E5E5E5;
          }
          .spec-cell:nth-child(3n) { border-right: none; }
          .spec-cell:nth-last-child(-n+3) { border-bottom: none; }
          
          .spec-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            color: #A1A1AA;
          }
          .spec-icon {
            font-size: 16px;
            font-family: 'Space Mono', monospace;
          }
          .spec-id {
            font-family: 'Space Mono', monospace;
            font-size: 10px;
          }
          .spec-cell h4 {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .spec-cell p {
            font-size: 13px;
            color: #52525B;
            line-height: 1.6;
          }
          
          .footer {
            padding: 32px 48px;
            background: #111111;
            color: #A1A1AA;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            text-align: center;
          }
        `}
      </style>

      {/* Top Nav */}
      <nav className="nav-top">
        <div className="nav-top-left">
          <span className="nav-top-link" onClick={() => document.getElementById('architecture-section')?.scrollIntoView({ behavior: 'smooth' })}>Features</span>
        </div>
        <div className="logo">
          ILAP <span className="logo-accent">{"<"}</span>
        </div>
        <div className="nav-top-right">
          {/* Emptied per user request */}
        </div>
      </nav>
      <div className="nav-sub">
        Platform &nbsp;/&nbsp; System Control &nbsp;/&nbsp; Identity Automation
      </div>

      {/* Hero */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-pretitle">Identity Lifecycle Automation Platform</div>
          <h1>Replace Spreadsheets With Systematic Control.</h1>
          <p>Automate Joiner, Mover, and Leaver workflows instantly through conversational interfaces and zero-trust Role-Based Access Control.</p>
          <div className="hero-cta">
            <button className="btn-solid" onClick={() => navigate('/login')}>Get Started</button>
            <button className="btn-outline" onClick={() => navigate('/login')}>Watch Demo</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="terminal-header">
            <h3>System Module</h3>
            <span className="terminal-version">V.2.4</span>
          </div>
          <div className="sys-row">
            <span className="sys-label">Module ID</span>
            <span className="sys-val">ILP-REQ-0992</span>
          </div>
          <div className="sys-row">
            <span className="sys-label">Status</span>
            <span className="sys-val online">ONLINE</span>
          </div>
          <div className="terminal-box-label">Live Audit Stream</div>
          <div className="terminal-window">
            <div><span className="log-ts">[10:42:01]</span> <span className="log-sys">SYS</span> <span className="log-msg">REQ_PROVISION user=j.doe role=ENG_TIER2</span></div>
            <div><span className="log-ts">[10:42:02]</span> <span className="log-auth">AUTH</span> <span className="log-msg">RBAC_CHECK policy=STRICT ... PASSED</span></div>
            <div><span className="log-ts">[10:42:03]</span> <span className="log-exec">EXEC</span> <span className="log-msg">GRANT access=AWS_PROD, GITHUB_ORG</span></div>
            <div><span className="log-ts">[10:42:04]</span> <span className="log-audit">AUDIT</span> <span className="log-hash">LOG_WRITTEN hash=9f86d081884c7d659a</span></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-cell">
          <div className="stat-num">3x</div>
          <div className="stat-label">Faster Onboarding</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num">100%</div>
          <div className="stat-label">Audit Coverage</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num">0</div>
          <div className="stat-label">Orphaned Accounts</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num">Zero</div>
          <div className="stat-label">Trust Architecture</div>
        </div>
      </div>

      {/* JML */}
      <div className="section">
        <div className="section-header">
          <div className="section-header-left">
            <span className="section-caption">Core Capabilities</span>
            <h2>JML Automation</h2>
          </div>
          <span className="section-link">Review Full Specs</span>
        </div>
        <div className="jml-grid">
          <div className="jml-card">
            <div className="jml-card-header">
              <span className="jml-card-title">01. JOINER</span>
              <span className="jml-card-tag">J-REQ-NEW</span>
            </div>
            <p>Automated provisioning of Day 1 access based on HRIS triggers. Role-based templates ensure immediate productivity without over-permissioning.</p>
            <div className="jml-targets-label">Provisioning Targets</div>
            <div className="jml-tags">
              <span className="mono-tag">SSO Profile</span>
              <span className="mono-tag">Email Alias</span>
              <span className="mono-tag">Base Slack</span>
              <span className="mono-tag">Dept Drive</span>
            </div>
          </div>
          <div className="jml-card">
            <div className="jml-card-header">
              <span className="jml-card-title">02. MOVER</span>
              <span className="jml-card-tag">M-REQ-MOD</span>
            </div>
            <p>Dynamic access adjustment upon role change. Automatically revokes legacy permissions while seamlessly bridging access to new departmental systems.</p>
            <div className="jml-targets-label">Modification Protocols</div>
            <div className="jml-tags">
              <span className="mono-tag">Grace Period: 48h</span>
              <span className="mono-tag">Delta Sync</span>
              <span className="mono-tag">Manager Apprv</span>
            </div>
          </div>
          <div className="jml-card">
            <div className="jml-card-header">
              <span className="jml-card-title">03. LEAVER</span>
              <span className="jml-card-tag">L-REQ-TERM</span>
            </div>
            <p>Instantaneous, system-wide access revocation. Transforms manual offboarding into a single-click script, eliminating security liabilities.</p>
            <div className="jml-targets-label">Termination Actions</div>
            <div className="jml-tags">
              <span className="mono-tag danger">Kill Sessions</span>
              <span className="mono-tag">Wipe Devices</span>
              <span className="mono-tag">Archive Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Steps */}
      <div id="architecture-section" className="section" style={{ background: '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-caption" style={{ marginBottom: '16px' }}>Process Architecture</div>
          <h2 style={{ fontSize: '24px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#111111' }}>Conversational Execution Flow</h2>
        </div>
        
        <div className="flow-container">
          <div className="flow-line"></div>
          
          <div className="flow-step" style={{ background: '#FFFFFF' }}>
            <div className="flow-box">01</div>
            <h4>Chat Trigger</h4>
            <p>Manager requests access via Slack/Teams bot.</p>
          </div>
          <div className="flow-step" style={{ background: '#FFFFFF' }}>
            <div className="flow-box">02</div>
            <h4>System Parsing</h4>
            <p>NLP translates request into strict RBAC parameters.</p>
          </div>
          <div className="flow-step" style={{ background: '#FFFFFF' }}>
            <div className="flow-box">03</div>
            <h4>Approve</h4>
            <p>Multi-stage contextual routing for authorization.</p>
          </div>
          <div className="flow-step" style={{ background: '#FFFFFF' }}>
            <div className="flow-box">04</div>
            <h4>Provision</h4>
            <p>API executes creation/modification instantly.</p>
          </div>
          <div className="flow-step" style={{ background: '#FFFFFF' }}>
            <div className="flow-box">05</div>
            <h4>Audit Log</h4>
            <p>Immutable record written to compliance ledger.</p>
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="section">
        <div className="section-header">
          <div className="section-header-left">
            <h2>Platform Specifications</h2>
          </div>
        </div>
        <div className="specs-grid">
          <div className="spec-cell">
            <div className="spec-header"><span className="spec-icon">💬</span><span className="spec-id">SYS.01</span></div>
            <h4>Conversational Bot</h4>
            <p>Execute complex identity workflows directly from existing chat interfaces without context switching.</p>
          </div>
          <div className="spec-cell">
            <div className="spec-header"><span className="spec-icon">🔒</span><span className="spec-id">SYS.02</span></div>
            <h4>Zero-Trust RBAC</h4>
            <p>Strict adherence to least-privilege principles. Access is leased dynamically based on verified context.</p>
          </div>
          <div className="spec-cell">
            <div className="spec-header"><span className="spec-icon">✓</span><span className="spec-id">SYS.03</span></div>
            <h4>Approval Logic</h4>
            <p>Configurable multi-tier routing matrices based on departmental hierarchy and risk classification.</p>
          </div>
          <div className="spec-cell">
            <div className="spec-header"><span className="spec-icon">📄</span><span className="spec-id">SYS.04</span></div>
            <h4>Immutable Ledger</h4>
            <p>Cryptographically secure, tamper-proof logs of every access request, approval, and system modification.</p>
          </div>
          <div className="spec-cell">
            <div className="spec-header"><span className="spec-icon">⚙️</span><span className="spec-id">SYS.05</span></div>
            <h4>Template Engine</h4>
            <p>Pre-configured operational baselines. Standardize access packages by department, level, and location.</p>
          </div>
          <div className="spec-cell">
            <div className="spec-header"><span className="spec-icon">📊</span><span className="spec-id">SYS.06</span></div>
            <h4>Live Telemetry</h4>
            <p>Real-time dashboarding of provisioning queues, security anomalies, and automated workflow metrics.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        ILAP // Identity Lifecycle Automation Platform // System Active
      </div>
    </div>
  );
};

export default LandingPage;
