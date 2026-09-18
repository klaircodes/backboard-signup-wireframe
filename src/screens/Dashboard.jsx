import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

const INTEGRATIONS = [
  { key: 'studio', label: 'Backboard Desktop' },
  { key: 'rcli', label: 'Backboard R-CLI' },
  { key: 'api', label: 'Cursor · VS Code · Claude Code' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [account, setAccount] = useState(getAccount())
  useEffect(() => { const s = () => setAccount(getAccount()); window.addEventListener('bb:account', s); return () => window.removeEventListener('bb:account', s) }, [])
  const p = account ? PATHS[account.path] : null

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <div />
        <nav className="bar-links"><a href="#" onClick={e => e.preventDefault()}>Help</a></nav>
      </header>
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 88 }}>
        {!account ? (
          <p className="sub">No account yet. <Link to="/signup">Sign up</Link>.</p>
        ) : (
          <>
            {!account.activated && (
              <div className="dash-banner"><span><b>Finish setting up {p.title}.</b> {p.win}</span><button type="button" className="btn small primary" onClick={() => navigate(`/start/${account.path}`)}>Open start page</button></div>
            )}
            <div className="dash-grid">
              <nav className="dash-side">
                <span className="dash-section">TRAFFIC</span>
                <span className="dash-item active">Dashboard</span><span className="dash-item">Memories</span><span className="dash-item">API Calls</span><span className="dash-item">Documents</span><span className="dash-item">Chat</span>
                <span className="dash-section">INTEGRATIONS</span>
                {INTEGRATIONS.map(i => <span key={i.key} className={`dash-item ${i.key === account.path ? 'active' : ''}`}>{i.label}</span>)}
              </nav>
              <div className="dash-main">
                <h1 style={{ fontSize: 28 }}>Dashboard</h1>
                <p className="sub" style={{ marginBottom: 24 }}>Key usage metrics and analytics</p>
                <div className="two">
                  <div className="stat-card"><span className="stat-label">Total Memories</span><span className="stat-n">0</span></div>
                  <div className="stat-card"><span className="stat-label">API Calls</span><span className="stat-n">0</span></div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
