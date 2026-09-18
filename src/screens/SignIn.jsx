import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Btn, Field } from '../components/Hack.jsx'
import { getAccount } from '../lib/track.js'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const go = () => navigate(getAccount() ? '/dashboard' : '/signup')
  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <div />
        <nav className="bar-links"><a href="#" onClick={(e) => e.preventDefault()}>Docs</a><Link to="/signup">Sign up</Link></nav>
      </header>
      <main className="wrap narrow" style={{ paddingTop: 48, paddingBottom: 88, maxWidth: 440 }}>
        <h1 style={{ fontSize: 30, marginBottom: 20 }}>Sign in</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn full onClick={go}>Continue with Google</Btn>
          <Btn full onClick={go}>Continue with GitHub</Btn>
          <p style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-3)' }}>or</p>
          <Field type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Btn primary full onClick={go}>Sign in</Btn>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-2)' }}>New to Backboard? <Link to="/signup" style={{ color: 'var(--text)' }}>Create an account</Link></p>
        </div>
      </main>
    </div>
  )
}
