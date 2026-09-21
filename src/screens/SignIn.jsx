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
        <div className="bar-left"><Link to="/" className="wordmark">Backboard</Link></div>
        <div />
        <nav className="bar-links"><a href="#" onClick={(e) => e.preventDefault()}>Docs</a><Link to="/signup">Create account</Link></nav>
      </header>
      <main className="auth-main">
        <div className="auth-card">
          <h1>Sign in to Backboard</h1>
          <p className="auth-lede">Memory, models, and retrieval behind one key.</p>
          <div className="auth-stack">
            <Btn full onClick={go}>Continue with Google</Btn>
            <Btn full onClick={go}>Continue with GitHub</Btn>
            <div className="auth-or"><span>or</span></div>
            <Field type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            <Btn primary full onClick={go}>Continue with email</Btn>
          </div>
          <p className="auth-switch">New to Backboard? <Link to="/signup">Create an account</Link></p>
        </div>
      </main>
    </div>
  )
}
