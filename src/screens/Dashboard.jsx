import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Btn } from '../components/Hack.jsx'
import { PATHS } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

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
        <nav className="bar-links"><a href="#" onClick={(e) => e.preventDefault()}>Help</a></nav>
      </header>
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 88 }}>
        {!account ? <p className="sub">No account yet. <Link to="/signup">Sign up</Link>.</p> : (
          <>
            {!account.activated && <div className="credits"><b>Finish setting up {p.title}.</b> {p.win} <Btn small primary onClick={() => navigate(`/start/${account.path}`)}>Open start page</Btn></div>}
            <h1 style={{ fontSize: 28, marginTop: 16 }}>Dashboard</h1>
            <p className="sub" style={{ marginBottom: 24 }}>Key usage metrics and analytics</p>
            <div className="two"><div className="credits"><b>Total Memories</b><br />0</div><div className="credits"><b>API Calls</b><br />0</div></div>
          </>
        )}
      </main>
    </div>
  )
}
