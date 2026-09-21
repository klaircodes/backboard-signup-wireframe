import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Btn, Field } from '../components/Hack.jsx'
import { getAccount } from '../lib/track.js'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const base = import.meta.env.BASE_URL
  const go = () => navigate(getAccount() ? '/dashboard' : '/signup')
  return (
    <div className="login">
      <div className="login-card">
        <img className="login-mark" src={`${base}brand/emblem-white.png`} alt="" />
        <h1>Sign in to Backboard</h1>
        <p className="login-lede">Memory, models, and retrieval behind one key.</p>
        <div className="auth-stack">
          <Btn full onClick={go}>Continue with Google</Btn>
          <Btn full onClick={go}>Continue with GitHub</Btn>
          <div className="auth-or"><span>or</span></div>
          <Field type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          <Btn primary full onClick={go}>Sign in</Btn>
        </div>
        <div className="login-new">
          <div>
            <b>New to Backboard?</b>
            <span>Create an account and pick how you want to build. Free to start, no card.</span>
          </div>
          <Link to="/signup" className="btn full">Create an account</Link>
        </div>
        <p className="login-foot"><a href="#" onClick={(e) => e.preventDefault()}>Docs</a><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a><a href="#" onClick={(e) => e.preventDefault()}>Terms</a></p>
      </div>
    </div>
  )
}
