import { useState } from 'react'
import { Link } from 'react-router-dom'

const STEPS = ['Pick a path', 'Sign up', 'Start building']

export function Bar({ step = 1, right }) {
  return (
    <header className="bar">
      <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
      <div className="bar-center">
        <nav className="crumbs">
          {STEPS.map((label, i) => {
            const n = i + 1
            const state = n < step ? 'done' : n === step ? 'on' : ''
            return (
              <span key={label} className="crumb-wrap">
                <span className={`crumb ${state}`}>{label}</span>
                {i < STEPS.length - 1 ? <span className="crumb-sep">›</span> : null}
              </span>
            )
          })}
        </nav>
        <span className="bar-progress" style={{ transform: `scaleX(${step / STEPS.length})` }} />
      </div>
      <div className="bar-right">{right}</div>
    </header>
  )
}

export function Copy({ cmd, onCopy }) {
  const [done, setDone] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(cmd).catch(() => {}); onCopy?.(cmd); setDone(true); setTimeout(() => setDone(false), 1400) }
  return <div className="cmd"><span>{cmd}</span><button type="button" className={`copy-btn ${done ? 'done' : ''}`} onClick={copy}>{done ? 'Copied' : 'Copy'}</button></div>
}
