import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
      <style>
        {`
          .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; border-bottom: 0.5px solid var(--color-border-tertiary); background: var(--color-background-primary); }
          .logo { font-size: 18px; font-weight: 500; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px; }
          .logo-dot { width: 10px; height: 10px; border-radius: 50%; background: #534AB7; }
          .nav-btn { padding: 7px 18px; border-radius: var(--border-radius-md); border: 0.5px solid var(--color-border-secondary); font-size: 13px; cursor: pointer; background: var(--color-background-primary); color: var(--color-text-primary); }
          .hero { padding: 72px 40px 56px; text-align: center; max-width: 720px; margin: 0 auto; }
          .badge { display: inline-block; background: #EEEDFE; color: #3C3489; font-size: 12px; padding: 4px 12px; border-radius: 99px; margin-bottom: 20px; }
          .hero h1 { font-size: 36px; font-weight: 500; line-height: 1.25; margin-bottom: 18px; color: var(--color-text-primary); }
          .hero h1 span { color: #534AB7; }
          .hero p { font-size: 15px; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 32px; }
          .cta-row { display: flex; justify-content: center; align-items: center; gap: 12px; }
          .btn-primary { padding: 10px 28px; background: #534AB7; color: #EEEDFE; border: none; border-radius: var(--border-radius-md); font-size: 14px; cursor: pointer; font-weight: 500; }
          .btn-ghost { padding: 10px 24px; background: transparent; color: var(--color-text-secondary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 14px; cursor: pointer; }
          .stats { display: flex; justify-content: center; gap: 48px; padding: 32px 40px; border-top: 0.5px solid var(--color-border-tertiary); border-bottom: 0.5px solid var(--color-border-tertiary); background: var(--color-background-secondary); }
          .stat { text-align: center; }
          .stat-num { font-size: 22px; font-weight: 500; color: #534AB7; }
          .stat-label { font-size: 12px; color: var(--color-text-secondary); margin-top: 2px; }
          .section { padding: 56px 40px; }
          .section-label { font-size: 12px; color: #534AB7; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
          .section-title { font-size: 24px; font-weight: 500; margin-bottom: 8px; }
          .section-sub { font-size: 14px; color: var(--color-text-secondary); margin-bottom: 36px; }
          .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .card { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 20px; }
          .card-icon { width: 36px; height: 36px; border-radius: var(--border-radius-md); display: flex; justify-content: center; align-items: center; margin-bottom: 14px; font-size: 16px; }
          .card h3 { font-size: 14px; font-weight: 500; margin-bottom: 6px; }
          .card p { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }
          .flow { display: flex; align-items: center; gap: 0; margin-top: 36px; }
          .flow-step { flex: 1; text-align: center; padding: 20px 12px; background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); }
          .flow-arrow { width: 32px; text-align: center; color: var(--color-text-secondary); font-size: 16px; flex-shrink: 0; }
          .flow-num { width: 28px; height: 28px; border-radius: 50%; background: #EEEDFE; color: #3C3489; font-size: 13px; font-weight: 500; display: flex; justify-content: center; align-items: center; margin: 0 auto 10px; }
          .flow-step h4 { font-size: 13px; font-weight: 500; margin-bottom: 4px; }
          .flow-step p { font-size: 11px; color: var(--color-text-secondary); }
          .jml { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
          .jml-card { border-radius: var(--border-radius-lg); padding: 20px; }
          .jml-card.joiner { background: #EAF3DE; border: 0.5px solid #C0DD97; }
          .jml-card.mover { background: #EEEDFE; border: 0.5px solid #CECBF6; }
          .jml-card.leaver { background: #FAECE7; border: 0.5px solid #F5C4B3; }
          .jml-title { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
          .jml-card.joiner .jml-title { color: #27500A; }
          .jml-card.mover .jml-title { color: #3C3489; }
          .jml-card.leaver .jml-title { color: #712B13; }
          .jml-desc { font-size: 12px; margin-bottom: 14px; }
          .jml-card.joiner .jml-desc { color: #3B6D11; }
          .jml-card.mover .jml-desc { color: #534AB7; }
          .jml-card.leaver .jml-desc { color: #993C1D; }
          .jml-tag { display: inline-block; font-size: 11px; padding: 3px 8px; border-radius: 99px; margin: 2px; }
          .joiner .jml-tag { background: #C0DD97; color: #27500A; }
          .mover .jml-tag { background: #CECBF6; color: #26215C; }
          .leaver .jml-tag { background: #F5C4B3; color: #711B13; }
          .footer { padding: 24px 40px; border-top: 0.5px solid var(--color-border-tertiary); display: flex; justify-content: space-between; align-items: center; }
          .footer p { font-size: 12px; color: var(--color-text-secondary); }
        `}
      </style>

      <nav className="nav">
        <div className="logo"><div className="logo-dot"></div> ILAP</div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Features</span>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginLeft: '16px' }}>How it works</span>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginLeft: '16px' }}>Security</span>
          <button className="nav-btn" style={{ marginLeft: '16px' }} onClick={() => navigate('/login')}>Get started →</button>
        </div>
      </nav>

      <div className="hero">
        <div className="badge">Identity Lifecycle Automation Platform</div>
        <h1>Stop managing access<br />with <span>spreadsheets</span></h1>
        <p>ILAP automates the full employee identity lifecycle — from day-one onboarding to final offboarding — using a conversational interface, role-based access control, and complete audit trails.</p>
        <div className="cta-row">
          <button className="btn-primary" onClick={() => navigate('/login')}>Get started free →</button>
          <button className="btn-ghost" onClick={() => navigate('/login')}>Watch demo</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><div className="stat-num">3x</div><div className="stat-label">faster onboarding</div></div>
        <div className="stat"><div className="stat-num">100%</div><div className="stat-label">audit coverage</div></div>
        <div className="stat"><div className="stat-num">0</div><div className="stat-label">orphaned accounts</div></div>
        <div className="stat"><div className="stat-num">RBAC</div><div className="stat-label">zero-trust model</div></div>
      </div>

      <div className="section">
        <div style={{ textAlign: 'center', marginBottom: 0 }}>
          <div className="section-label">Core workflows</div>
          <div className="section-title">Joiner · Mover · Leaver</div>
          <div className="section-sub">The three events that define every employee's access lifecycle</div>
        </div>
        <div className="jml">
          <div className="jml-card joiner">
            <div className="jml-title">Joiner</div>
            <div className="jml-desc">New employee onboarding with automatic access provisioning</div>
            <div><span className="jml-tag">Email access</span><span className="jml-tag">GitHub</span><span className="jml-tag">Slack</span><span className="jml-tag">Jira</span><span className="jml-tag">VPN</span></div>
          </div>
          <div className="jml-card mover">
            <div className="jml-title">Mover</div>
            <div className="jml-desc">Role or department change with automatic permission swap</div>
            <div><span className="jml-tag">Revoke old role</span><span className="jml-tag">Apply new role</span><span className="jml-tag">Audit logged</span></div>
          </div>
          <div className="jml-card leaver">
            <div className="jml-title">Leaver</div>
            <div className="jml-desc">Secure offboarding with instant access revocation</div>
            <div><span className="jml-tag">Disable account</span><span className="jml-tag">Revoke all</span><span className="jml-tag">Zero orphans</span></div>
          </div>
        </div>
      </div>

      <div className="section" style={{ background: 'var(--color-background-secondary)', padding: '48px 40px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-label">How it works</div>
          <div className="section-title">From chat to provisioned in seconds</div>
          <div className="section-sub">A manager types one command. The system does the rest.</div>
        </div>
        <div className="flow">
          <div className="flow-step"><div className="flow-num">1</div><h4>Manager chats</h4><p>Types "Joiner" in the chatbot</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><div className="flow-num">2</div><h4>Request created</h4><p>Stored as Pending in DB</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><div className="flow-num">3</div><h4>Admin approves</h4><p>Via requests dashboard</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><div className="flow-num">4</div><h4>Access granted</h4><p>RBAC engine provisions</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><div className="flow-num">5</div><h4>Audit logged</h4><p>Every action traced</p></div>
        </div>
      </div>

      <div className="section">
        <div style={{ textAlign: 'center' }}>
          <div className="section-label">Platform features</div>
          <div className="section-title">Built for enterprise IAM</div>
          <div className="section-sub">Everything you need to govern identity lifecycle at scale</div>
        </div>
        <div className="cards">
          <div className="card"><div className="card-icon" style={{ background: '#EEEDFE' }}>🤖</div><h3>Conversational chatbot</h3><p>Scripted JML workflows via natural chat commands — no forms, no tickets.</p></div>
          <div className="card"><div className="card-icon" style={{ background: '#EAF3DE' }}>🔐</div><h3>Zero-trust RBAC</h3><p>JWT-secured roles. Employees see only what their role permits — nothing more.</p></div>
          <div className="card"><div className="card-icon" style={{ background: '#E6F1FB' }}>✅</div><h3>Approval workflows</h3><p>All Joiner and Mover requests require manager sign-off before execution.</p></div>
          <div className="card"><div className="card-icon" style={{ background: '#FAECE7' }}>📋</div><h3>Immutable audit logs</h3><p>Every provisioning event is permanently recorded with timestamps and actor details.</p></div>
          <div className="card"><div className="card-icon" style={{ background: '#FAEEDA' }}>🗂️</div><h3>Role template engine</h3><p>Bundle permissions into reusable roles like "Backend Developer" or "HR Manager".</p></div>
          <div className="card"><div className="card-icon" style={{ background: '#E1F5EE' }}>📊</div><h3>Live dashboard</h3><p>Real-time metrics on employees, active roles, pending requests, and access changes.</p></div>
        </div>
      </div>

      <div className="footer">
        <p>ILAP · Identity Lifecycle Automation Platform · Hackathon 2026</p>
        <button className="btn-primary" onClick={() => navigate('/login')}>Get started →</button>
      </div>
    </div>
  );
};

export default LandingPage;
