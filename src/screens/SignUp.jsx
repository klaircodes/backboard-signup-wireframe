import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { SHOTS } from '../components/Illos.jsx'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

function PathRow({ path, selected, onSelect }) {
  const p = PATHS[path]; const Shot = SHOTS[path]
  return (
    <button type="button" className={`path-row ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} aria-pressed={selected}>
      <span className="path-row-thumb"><Shot /></span>
      <span className="path-row-text">
        <b>{p.title}</b>
        <span>{p.line}</span>
        <span className="path-row-best">Best for: {p.bestForInline}</span>
      </span>
      <span className="path-row-dot" />
    </button>
  )
}

export default function SignUp() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const [email, setEmail] = useState('')
  const tracked = useRef(false)
  useEffect(() => { if (path && !tracked.current) { tracked.current = true; track('path_selected', { path, source: 'url' }) } }, [path])
  const select = (next, source = 'click') => { setPath(next); track('path_selected', { path: next, source }) }
  const complete = (provider) => { if (!path) return; saveAccount({ path, hackathon: false, provider, activated: false }); track('signup_completed', { path, hackathon: false, provider }); navigate(`/start/${path}`) }

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <div />
        <nav className="bar-links"><a href="#" onClick={e => e.preventDefault()}>Docs</a><Link to="/signin">Sign in</Link></nav>
      </header>
      <main className="wrap mid" style={{ paddingTop: 48, paddingBottom: 88 }}>
        <div className="signup-layout">
          <div className="signup-left">
            <h1>What are you here for?</h1>
            <div className="path-rows">{PATH_ORDER.map(k => <PathRow key={k} path={k} selected={path === k} onSelect={select} />)}</div>
            <p className="signup-hint">Not sure? <button type="button" className="link" onClick={() => select('api', 'default')}>Start with the Unified API.</button></p>
          </div>
          <div className="signup-divider" />
          <div className="signup-right">
            <h2>Create your account</h2>
            <div className="auth">
              <button type="button" className="btn full" disabled={!path} onClick={() => complete('google')}>Continue with Google</button>
              <button type="button" className="btn full" disabled={!path} onClick={() => complete('github')}>Continue with GitHub</button>
              <p className="auth-or">or</p>
              <input className="input" type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} disabled={!path} />
              <button type="button" className="btn primary full" disabled={!path} onClick={() => complete('email')}>{path ? PATHS[path].button : 'Sign up'}</button>
              <p className="auth-fine">Free. $5 memory credits. No credit card.</p>
              <p className="auth-alt">Already have an account? <Link to="/signin">Sign in</Link></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
