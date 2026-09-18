import { useState } from "react"
import { Link } from 'react-router-dom'

const STEPS = ['Pick a path', 'Sign up', 'Start building']

export function Bar({ step = 1, right }) {
  return (
    <header className="bar">
      <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
      <nav className="bar-center">
        {STEPS.map((s, i) => {
          const n = i + 1
          return <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {i > 0 && <span>›</span>}
            {n === step ? <b>{s}</b> : <span style={{ opacity: n < step ? 1 : undefined }}>{s}</span>}
          </span>
        })}
      </nav>
      <div className="bar-right">{right}</div>
      <div className="bar-progress" style={{ width: `${(step / STEPS.length) * 100}%` }} />
    </header>
  )
}

export function Copy({ cmd, onCopy }) {
  const [done, setDone] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(cmd).catch(() => {}); onCopy?.(cmd); setDone(true); setTimeout(() => setDone(false), 1400) }
  return <div className="cmd"><span>{cmd}</span><button type="button" className={`copy-btn ${done ? 'done' : ''}`} onClick={copy}>{done ? 'Copied' : 'Copy'}</button></div>
}
