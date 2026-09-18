import { useState } from 'react'
export default function Copy({ cmd, onCopy }) {
  const [done, setDone] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(cmd).catch(() => {}); onCopy?.(cmd); setDone(true); setTimeout(() => setDone(false), 1400) }
  return <div className="cmd"><span>{cmd}</span><button type="button" className={`copy-btn ${done ? 'done' : ''}`} onClick={copy}>{done ? 'Copied' : 'Copy'}</button></div>
}
