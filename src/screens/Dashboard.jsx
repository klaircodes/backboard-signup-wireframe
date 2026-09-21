import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from '../components/Shell.jsx'
import { PATHS } from '../data/paths.js'
import { getAccount, updateAccount } from '../lib/track.js'

export default function Dashboard() {
  const [account, setAccount] = useState(getAccount())
  useEffect(() => { const s = () => setAccount(getAccount()); window.addEventListener('bb:account', s); return () => window.removeEventListener('bb:account', s) }, [])
  useEffect(() => { const a = getAccount(); if (a && !a.onboarded) updateAccount({ onboarded: true }) }, [])
  const p = account ? PATHS[account.path] : null
  return (
    <div className="page">
      <div className="topline"><Wordmark /><a href="#" className="topline-link" onClick={(e) => e.preventDefault()}>Help</a></div>
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 88 }}>
        {!account ? <p className="sub">No account yet. <Link to="/signup">Sign up</Link>.</p> : (
          <>
                        <h1 style={{ fontSize: 28, marginTop: 16 }}>Dashboard</h1>
            <p className="sub" style={{ marginBottom: 24 }}>Key usage metrics and analytics</p>
            <div className="two"><div className="credits"><b>Total Memories</b><br />0</div><div className="credits"><b>API Calls</b><br />0</div></div>
          </>
        )}
      </main>
    </div>
  )
}
