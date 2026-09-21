import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { AppBar, Btn, Field } from '../components/Hack.jsx'
import { SHOTS } from '../components/Illos.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

export default function SignUp() {
  const navigate = useNavigate()
  const [path] = usePathParam()
  const [first, setFirst] = useState('')
  const [email, setEmail] = useState('')
  if (!path) return <Navigate to="/signup" replace />
  const p = PATHS[path]
  const Shot = SHOTS[path]

  const ready = first.trim() && email.trim()
  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    saveAccount({ path, hackathon: false, activated: false, email, first })
    track('signup_completed', { path, hackathon: false })
    navigate(`/start/${path}`)
  }
  const social = (provider) => {
    saveAccount({ path, hackathon: false, activated: false, email: '', first: '', provider })
    track('signup_completed', { path, hackathon: false, provider })
    navigate(`/start/${path}`)
  }

  return (
    <div className="page">
      <AppBar />
      <main className="wrap narrow">
        <form className="signup" onSubmit={submit}>
          <header className="signup-head">
            <h1>Create your account</h1>
          </header>

          <div className="path-row">
            <span className="path-thumb"><Shot /></span>
            <span className="path-text">
              <b>{p.title}</b>
              <span className="muted">{p.tagline}</span>
            </span>
            <Btn small onClick={() => navigate('/signup')}>Change</Btn>
          </div>

          <section className="group">
            <Btn full onClick={() => social('google')}>Continue with Google</Btn>
            <Btn full onClick={() => social('github')}>Continue with GitHub</Btn>
            <div className="signup-divider"><span>or</span></div>
            <div className="two">
              <Field label="Name" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" />
              <Field label="Work email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Btn primary full type="submit" disabled={!ready}>{p.button}</Btn>
          </section>

          <p className="signup-terms">Free to start. $5 in memory credits, no credit card.</p>
          <p className="fine below"><Link to="/signin">Already have an account? Sign in</Link></p>
        </form>
      </main>
    </div>
  )
}
