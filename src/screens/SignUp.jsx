import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AppBar, Btn, Field } from '../components/Hack.jsx'
import { GoogleIcon, GithubIcon } from '../components/Icons.jsx'
import { SHOTS } from '../components/Illos.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

// app.backboard.io/signup — same grouped single-column form as the hackathon step 2, without the team roster or promo code.
export default function SignUp() {
  const navigate = useNavigate()
  const [path] = usePathParam()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  if (!path) return <Navigate to="/" replace />
  const p = PATHS[path]
  const Shot = SHOTS[path]

  const ready = first.trim() && last.trim() && email.trim()
  const done = (provider) => {
    saveAccount({ path, hackathon: false, activated: false, email, first, provider })
    track('signup_completed', { path, hackathon: false, provider })
    navigate(`/start/${path}`)
  }
  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    done('email')
  }

  return (
    <div className="page">
      <AppBar />
      <main className="wrap narrow">
        <form className="signup" onSubmit={submit}>
          <header className="signup-head">
            <h1>Create your account</h1>
            <p className="sub">Free to start. $5 in memory credits, no card.</p>
          </header>

          <div className="path-row">
            <span className="path-thumb"><Shot /></span>
            <span className="path-text">
              <b>{p.title}</b>
              <span className="muted">{p.tagline}</span>
            </span>
            <Btn small onClick={() => navigate('/')}>Change</Btn>
          </div>

          <section className="group">
            <div className="group-head"><h2>Sign up with</h2></div>
            <div className="two">
              <Btn full className="social" type="button" onClick={() => done('google')}><GoogleIcon />Continue with Google</Btn>
              <Btn full className="social" type="button" onClick={() => done('github')}><GithubIcon />Continue with GitHub</Btn>
            </div>
            <div className="auth-or"><span>or use your email</span></div>
          </section>

          <section className="group">
            <div className="group-head"><h2>About you</h2></div>
            <div className="two">
              <Field label="First name" value={first} onChange={(e) => setFirst(e.target.value)} autoFocus />
              <Field label="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
            </div>
            <div className="two">
              <Field label="Email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field label="Company or school" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </section>

          <div className="signup-foot">
            <Btn primary full type="submit" disabled={!ready}>{p.button}</Btn>
            <p className="fine">Creates your account and adds $5 in memory credits. No card needed.</p>
          </div>
        </form>
        <p className="fine below">Already have an account? <Link to="/signin">Sign in</Link></p>
      </main>
    </div>
  )
}
