import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Bar } from '../components/Shell.jsx'
import { PATHS } from '../data/paths.js'
import { SHOTS } from '../components/Illos.jsx'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

export default function Account() {
  const navigate = useNavigate()
  const [path] = usePathParam()
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  if (!path) return <Navigate to="/signup" replace />
  const p = PATHS[path]; const Shot = SHOTS[path]
  const done = (provider) => { saveAccount({ path, hackathon: false, activated: false, email, first, provider }); track('signup_completed', { path, hackathon: false, provider }); navigate(`/start/${path}`) }

  return (
    <div className="page">
      <Bar step={2} right={<a href="#" onClick={e => e.preventDefault()}>Help</a>} />
      <main className="content" style={{ maxWidth: 480 }}>
        <div className="auth-head">
          <h1 style={{ fontSize: 26 }}>Create your account</h1>
          <p>Free. $5 memory credits. No credit card.</p>
        </div>
        <div className="path-chip">
          <span className="path-chip-thumb"><Shot /></span>
          <b>{p.title}</b>
          <button className="change" onClick={() => navigate('/signup')}>Change</button>
        </div>
        <div className="auth-social">
          <button type="button" className="btn full" onClick={() => done('google')}>Continue with Google</button>
          <button type="button" className="btn full" onClick={() => done('github')}>Continue with GitHub</button>
        </div>
        <div className="divider">or</div>
        <div className="auth-email">
          <div className="two">
            <label className="fld"><span>Name</span><input className="input" value={first} onChange={e => setFirst(e.target.value)} placeholder="First name" /></label>
            <label className="fld"><span>Email</span><input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" /></label>
          </div>
          <button type="button" className="btn primary full" disabled={!email.trim()} onClick={() => done('email')} style={{ marginTop: 6 }}>{p.button}</button>
        </div>
        <p className="auth-alt">Already have an account? <Link to="/signin">Sign in</Link></p>
      </main>
    </div>
  )
}
