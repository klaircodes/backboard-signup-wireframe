import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/Shell.jsx'
import { Btn, Field } from '../components/Hack.jsx'
import { GoogleIcon, GithubIcon } from '../components/Icons.jsx'
import { SHOTS } from '../components/Illos.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

const SHORT = { studio: 'Studio', rcli: 'R-CLI', api: 'Unified API' }

function Tile({ path, selected, onSelect }) {
  const Shot = SHOTS[path]
  return (
    <button type="button" className={`tile ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} role="radio" aria-checked={selected}>
      <span className="tile-shot"><Shot /></span>
      <span className="tile-name">{SHORT[path]}</span>
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
    <AuthLayout path={path || 'studio'}>
      <h1>Create your account</h1>
      <p className="auth-lede">Free to start. $5 in memory credits, no card.</p>
      <p className="tile-q">What are you building with?</p>
      <div className="tiles" role="radiogroup" aria-label="What are you building with?">
        {PATH_ORDER.map((k) => <Tile key={k} path={k} selected={path === k} onSelect={select} />)}
      </div>
      <p className="tile-desc">{p ? `${p.line} Best for: ${p.bestForInline}` : 'Pick one to continue. You can switch later.'}</p>
      <div className={`auth-stack ${path ? '' : 'waiting'}`}>
        <Btn full className="social" disabled={!path} onClick={() => done('google')}><GoogleIcon />Continue with Google</Btn>
        <Btn full className="social" disabled={!path} onClick={() => done('github')}><GithubIcon />Continue with GitHub</Btn>
        <div className="auth-or"><span>or</span></div>
        <Field type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!path} />
        <Btn primary full disabled={!path || !email.trim()} onClick={() => done('email')}>{p ? p.button : 'Pick a path to continue'}</Btn>
      </div>
      <p className="auth-switch">Already have an account? <Link to="/">Sign in</Link></p>
    </AuthLayout>
  )
}
