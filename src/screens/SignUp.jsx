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
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
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
            <p className="sub">Free. $5 memory credits. No credit card.</p>
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
            <div className="group-head"><h2>Continue with</h2></div>
            <div className="two">
              <Btn full onClick={() => social('google')}>Google</Btn>
              <Btn full onClick={() => social('github')}>GitHub</Btn>
            </div>
          </section>

          <section className="group">
            <div className="group-head"><h2>Or sign up with email</h2></div>
            <div className="two">
              <Field label="First name" value={first} onChange={(e) => setFirst(e.target.value)} autoFocus />
              <Field label="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
            </div>
            <div className="two">
              <Field label="Email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field label="Company" placeholder="Optional" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </section>

          <div className="signup-foot">
            <Btn primary full type="submit" disabled={!ready}>{p.button}</Btn>
            <p className="fine">Free. $5 memory credits. No credit card.</p>
          </div>
        </form>
        <p className="fine below"><Link to="/signin">Already have an account? Sign in</Link></p>
      </main>
    </div>
  )
}
