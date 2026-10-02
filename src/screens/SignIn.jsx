import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SoloLayout } from '../components/Shell.jsx'
import { Btn, Field } from '../components/Hack.jsx'
import { GoogleIcon, GithubIcon } from '../components/Icons.jsx'
import { getAccount, saveAccount, track } from '../lib/track.js'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  // Signing in means you already have an account. In the wireframe, stand one up if there isn't one yet
  // so the dashboard renders instead of dead-ending.
  const go = () => {
    if (!getAccount()) saveAccount({ path: 'studio', hackathon: false, activated: true, onboarded: true, email })
    track('signin_completed', { email })
    navigate('/dashboard')
  }
  return (
    <SoloLayout>
      <h1>Sign in</h1>
      <p className="auth-lede">Welcome back. Pick up where you left off.</p>
      <div className="auth-stack">
        <Btn full className="social" onClick={go}><GoogleIcon />Continue with Google</Btn>
        <Btn full className="social" onClick={go}><GithubIcon />Continue with GitHub</Btn>
        <div className="auth-or"><span>or</span></div>
        <Field type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        <Btn primary full onClick={go}>Sign in with email</Btn>
      </div>
      <div className="auth-fork">
        <span>New to Backboard?</span>
        <Link to="/get-started" className="btn">Create an account</Link>
      </div>
      <p className="auth-legal"><a href="#" onClick={(e) => e.preventDefault()}>Docs</a><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a><a href="#" onClick={(e) => e.preventDefault()}>Terms</a></p>
    </SoloLayout>
  )
}
