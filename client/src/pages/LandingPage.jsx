import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .landing-container { font-family: 'Inter', sans-serif; background: #FFFFFF; color: #111827; margin: 0; padding: 0; min-height: 100vh; }
          * { box-sizing: border-box; }
          .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; border-bottom: 1px solid #F3F4F6; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 50; }
          .logo { font-size: 20px; font-weight: 700; color: #111827; display: flex; align-items: center; gap: 8px; letter-spacing: -0.02em; }
          .logo-dot { width: 12px; height: 12px; border-radius: 50%; background: #4F46E5; }
          .nav-btn { padding: 8px 20px; border-radius: 8px; border: 1px solid #E5E7EB; font-size: 14px; font-weight: 600; cursor: pointer; background: #FFFFFF; color: #374151; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          .nav-btn:hover { background: #F9FAFB; border-color: #D1D5DB; }
          .hero { padding: 96px 40px 80px; text-align: center; max-width: 800px; margin: 0 auto; }
          .badge { display: inline-flex; align-items: center; background: #EEF2FF; color: #4F46E5; font-size: 13px; font-weight: 600; padding: 6px 16px; border-radius: 9999px; margin-bottom: 24px; border: 1px solid #E0E7FF; }
          .hero h1 { font-size: 56px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #111827; letter-spacing: -0.02em; }
          .hero h1 span { color: #4F46E5; }
          .hero p { font-size: 18px; color: #6B7280; line-height: 1.6; margin-bottom: 40px; }
          .cta-row { display: flex; justify-content: center; align-items: center; gap: 16px; }
          .btn-primary { padding: 12px 32px; background: #111827; color: #FFFFFF; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .btn-primary:hover { background: #374151; transform: translateY(-1px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .btn-ghost { padding: 12px 32px; background: #FFFFFF; color: #374151; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          .btn-ghost:hover { background: #F9FAFB; border-color: #9CA3AF; }
          .stats { display: flex; justify-content: center; gap: 64px; padding: 48px 40px; border-top: 1px solid #F3F4F6; border-bottom: 1px solid #F3F4F6; background: #F9FAFB; }
          .stat { text-align: center; }
          .stat-num { font-size: 36px; font-weight: 800; color: #111827; margin-bottom: 4px; }
          .stat-label { font-size: 13px; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; }
          .section { padding: 80px 40px; max-width: 1200px; margin: 0 auto; }
          .section-label { font-size: 13px; color: #4F46E5; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
          .section-title { font-size: 36px; font-weight: 800; margin-bottom: 16px; color: #111827; letter-spacing: -0.01em; }
          .section-sub { font-size: 18px; color: #6B7280; margin-bottom: 48px; }
          .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .card { background: #FFFFFF; border: 1px solid #F3F4F6; border-radius: 16px; padding: 32px; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
          .card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); border-color: #E5E7EB; }
          .card-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; font-size: 20px; }
          .card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #111827; }
          .card p { font-size: 15px; color: #6B7280; line-height: 1.6; }
          .flow { display: flex; align-items: flex-start; gap: 16px; margin-top: 48px; }
          .flow-step { flex: 1; text-align: left; padding: 24px; background: #FFFFFF; border: 1px solid #F3F4F6; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s; }
          .flow-step:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: #E5E7EB; transform: translateY(-2px); }
          .flow-arrow { width: 32px; text-align: center; color: #9CA3AF; font-size: 20px; flex-shrink: 0; margin-top: 32px; }
          .flow-num { width: 32px; height: 32px; border-radius: 8px; background: #F3F4F6; color: #4B5563; font-size: 14px; font-weight: 700; display: flex; justify-content: center; align-items: center; margin-bottom: 16px; border: 1px solid #E5E7EB; }
          .flow-step h4 { font-size: 16px; font-weight: 600; margin-bottom: 6px; color: #111827; }
          .flow-step p { font-size: 14px; color: #6B7280; line-height: 1.5; }
          .jml { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
          .jml-card { border-radius: 16px; padding: 32px; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
          .jml-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }
          .jml-card.joiner { background: #F0FDF4; border: 1px solid #DCFCE7; }
          .jml-card.mover { background: #EEF2FF; border: 1px solid #E0E7FF; }
          .jml-card.leaver { background: #FEF2F2; border: 1px solid #FEE2E2; }
          .jml-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
          .jml-card.joiner .jml-title { color: #166534; }
          .jml-card.mover .jml-title { color: #3730A3; }
          .jml-card.leaver .jml-title { color: #991B1B; }
          .jml-desc { font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
          .jml-card.joiner .jml-desc { color: #15803D; }
          .jml-card.mover .jml-desc { color: #4338CA; }
          .jml-card.leaver .jml-desc { color: #B91C1C; }
          .jml-tag { display: inline-block; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; margin: 4px; }
          .joiner .jml-tag { background: #DCFCE7; color: #166534; border: 1px solid #BBF7D0; }
          .mover .jml-tag { background: #E0E7FF; color: #3730A3; border: 1px solid #C7D2FE; }
          .leaver .jml-tag { background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA; }
          .footer { padding: 32px 40px; border-top: 1px solid #F3F4F6; display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; }
          .footer p { font-size: 14px; color: #6B7280; font-weight: 500; }
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
