import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAccount } from '../lib/track.js'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const go = () => navigate(getAccount() ? '/dashboard' : '/signup')
  return (
    <div className="page">
      <header className="bar"><div className="bar-left"><a href="/" className="wordmark">Backboard</a></div><div /><div className="bar-right"><a href="#" onClick={e => e.preventDefault()}>Docs</a><Link to="/signup">Sign up</Link></div></header>
      <main className="content" style={{ maxWidth: 400 }}>
        <div className="auth-head"><h1>Sign in</h1></div>
        <div className="auth-social">
          <button type="button" className="btn full" onClick={go}>Continue with Google</button>
          <button type="button" className="btn full" onClick={go}>Continue with GitHub</button>
        </div>
        <div className="divider">or</div>
        <div className="auth-email">
          <input className="input" type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} />
          <button type="button" className="btn primary full" onClick={go}>Sign in</button>
        </div>
        <p className="auth-alt">New to Backboard? <Link to="/signup">Create an account</Link></p>
      </main>
    </div>
  )
}
