import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Stepper, Btn, Field } from '../components/Hack.jsx'
import { SHOTS } from '../components/Illos.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

function Tile({ path, selected, onSelect }) {
  const p = PATHS[path]; const Shot = SHOTS[path]
  return (
    <button type="button" className={`tile ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} role="radio" aria-checked={selected}>
      <span className="tile-shot"><Shot /></span>
      <span className="tile-name">{p.short === 'API' ? 'Unified API' : p.title.replace('Backboard ', '')}</span>
    </button>
  )
}

export default function SignUp() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const [email, setEmail] = useState('')
  const p = path ? PATHS[path] : null

  const select = (next) => { setPath(next); track('path_selected', { path: next, source: 'click', hackathon: false }) }
  const done = (provider) => {
    if (!path) return
    saveAccount({ path, hackathon: false, activated: false, email, provider })
    track('signup_completed', { path, hackathon: false, provider })
    navigate(`/start/${path}`)
  }

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><Link to="/" className="wordmark">Backboard</Link></div>
        <Stepper step={path ? 2 : 1} />
        <nav className="bar-links"><a href="#" onClick={(e) => e.preventDefault()}>Docs</a></nav>
      </header>
      <main className="auth-main">
        <div className="auth-card">
          <h1>Create your account</h1>
          <p className="auth-lede">Free to start. $5 in memory credits, no card.</p>

          <div className="tiles" role="radiogroup" aria-label="What are you here for?">
            {PATH_ORDER.map((k) => <Tile key={k} path={k} selected={path === k} onSelect={select} />)}
          </div>
          <p className="tile-desc">{p ? `${p.line} Best for: ${p.bestForInline}` : 'Pick how you want to build. You can switch later.'}</p>

          <div className={`auth-stack ${path ? '' : 'waiting'}`}>
            <Btn full disabled={!path} onClick={() => done('google')}>Continue with Google</Btn>
            <Btn full disabled={!path} onClick={() => done('github')}>Continue with GitHub</Btn>
            <div className="auth-or"><span>or</span></div>
            <Field type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!path} />
            <Btn primary full disabled={!path || !email.trim()} onClick={() => done('email')}>{p ? p.button : 'Pick a path to continue'}</Btn>
          </div>
          <p className="auth-switch">Already have an account? <Link to="/">Sign in</Link></p>
        </div>
      </main>
    </div>
  )
}
