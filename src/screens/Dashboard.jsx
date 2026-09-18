import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const [account, setAccount] = useState(getAccount())
  useEffect(() => { const s = () => setAccount(getAccount()); window.addEventListener('bb:account', s); return () => window.removeEventListener('bb:account', s) }, [])
  const p = account ? PATHS[account.path] : null
  return (
    <div className="page">
      <header className="bar"><div className="bar-left"><a href="/" className="wordmark">Backboard</a></div><div /><div className="bar-right"><a href="#" onClick={e => e.preventDefault()}>Help</a></div></header>
      <main className="content wide">
        {!account ? <p style={{ color: 'var(--text-2)' }}>No account yet. <Link to="/signup">Sign up</Link>.</p> : (
          <>
            {!account.activated && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '14px 18px', border: '1px solid var(--line-2)', borderRadius: 8, background: 'var(--s1)', marginBottom: 24 }}><span><b>Finish setting up {p.title}.</b> <span style={{ color: 'var(--text-2)' }}>{p.win}</span></span><button className="btn small primary" onClick={() => navigate(`/start/${account.path}`)}>Open start page</button></div>}
            <h1 style={{ fontSize: 26, marginBottom: 24 }}>Dashboard</h1>
            <div className="two"><div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '16px 18px', background: 'var(--s1)' }}><span style={{ fontSize: 13, color: 'var(--text-3)' }}>Total Memories</span><div style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 500, marginTop: 4 }}>0</div></div><div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '16px 18px', background: 'var(--s1)' }}><span style={{ fontSize: 13, color: 'var(--text-3)' }}>API Calls</span><div style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 500, marginTop: 4 }}>0</div></div></div>
          </>
        )}
      </main>
    </div>
  )
}
