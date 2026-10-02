import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Btn, Video, Copy } from '../components/Hack.jsx'
import { Wordmark } from '../components/Shell.jsx'
import { isPath, PATHS } from '../data/paths.js'
import { getAccount, track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']
const READY = [
  ['Docs', 'Every command and endpoint, with examples.'],
  ['Model library', 'Browse 17,000+ models and route per task.'],
  ['Examples', 'Starter projects you can clone and run.'],
  ['Support', 'Talk to the team when you get stuck.'],
]

function Check() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// The win, 1:1 with the hackathon start page: tick each step, or let it tick itself.
export default function Start() {
  const { path } = useParams()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  const [done, setDone] = useState({})
  if (!isPath(path)) return <Navigate to="/signup" replace />
  const account = getAccount()
  if (!account) return <Navigate to="/signup" replace />
  if (account.onboarded) return <Navigate to="/dashboard" replace />
  const p = PATHS[path]
  const first = account.first?.trim()
  const mark = (i) => setDone((d) => ({ ...d, [i]: true }))
  const cta = (detail, i) => { track('start_cta_clicked', { path, hackathon: false, detail }); if (i !== undefined) mark(i) }
  const doneCount = Object.values(done).filter(Boolean).length
  const heading = { studio: 'Get Backboard Studio', rcli: 'Install Backboard R-CLI', api: 'Connect your coding harness' }[path]

  return (
    <div className="page">
      <div className="topline"><Wordmark /><Link to="/dashboard" className="topline-link">Dashboard</Link></div>
      <main className="wrap narrow">
        <div className="start2">
          <header className="done">
            <h1>{first ? `You're in, ${first}.` : "You're in."}</h1>
            <p className="sub">Your account is ready. About {p.setup} to your first result.</p>
            <dl className="stats">
              <div><dt>Path</dt><dd>{p.title}</dd></div>
              <div><dt>Setup time</dt><dd>About {p.setup}</dd></div>
            </dl>
          </header>

          <section className="group">
            <div className="group-head"><h2>{heading}</h2><span className="meta">{doneCount} of {p.steps.length} done</span></div>
            <p className="steps-hint">Tick each step as you go, or let it tick itself when you copy a command or click a download.</p>
            <ol className="steps">
              {p.steps.map((s, i) => (
                <li key={s.title} className={done[i] ? 'is-done' : ''}>
                  <button type="button" className="chk" onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))} role="checkbox" aria-checked={!!done[i]} aria-label={`Mark "${s.title}" done`}>
                    <Check />
                  </button>
                  <div className="step-body">
                    <div className="step-title">{s.title}</div>
                    <p className="step-detail">{s.detail}</p>
                    {path === 'studio' && i === 0 ? (
                      <div className="two">
                        <Btn primary onClick={() => cta('macos', 0)}>Download for macOS</Btn>
                        <Btn onClick={() => cta('windows', 0)}>Download for Windows</Btn>
                        <p className="help" style={{ gridColumn: '1 / -1' }}>Apple Silicon by default. Also available for macOS Intel and Linux.</p>
                      </div>
                    ) : null}
                    {s.harness ? (
                      <>
                        <Btn primary full onClick={() => cta('studio-connect', i)}>Connect to Backboard Studio</Btn>
                        <p className="help">Don't have Studio installed? <button type="button" className="link" onClick={() => cta('studio-download', i)}><b>Download Backboard Studio</b></button>, then return here and click "Connect to Backboard Studio" to add the Backboard Docs MCP server.</p>
                        <div className="three">
                          {HARNESSES.map((h) => <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h, i) }}>{h}</Btn>)}
                        </div>
                      </>
                    ) : null}
                    {s.cmd && path === 'rcli' && i === 0 ? (
                      <>
                        <Copy cmd={windows ? s.winCmd : s.cmd} onCopy={() => cta('copy-install', 0)} />
                        <p className="help"><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show the macOS / Linux command' : 'On Windows? Show the PowerShell command'}</button></p>
                      </>
                    ) : s.cmd ? <Copy cmd={s.cmd} onCopy={() => cta(`copy-${i}`, i)} /> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="group">
            <div className="group-head"><h2>Watch the walkthrough</h2></div>
            <Video youtube={p.video} caption={`${p.title} walkthrough`} className="start-video" />
          </section>

          <section className="group">
            <div className="group-head"><h2>When you're ready</h2></div>
            <div className="ready">
              {READY.map(([t, d]) => (
                <a key={t} href="#" className="ready-tile" onClick={(e) => e.preventDefault()}>
                  <b>{t}</b><span>{d}</span>
                </a>
              ))}
            </div>
          </section>

          <div className="end-row">
            <div>
              <b>All set?</b>
              <span className="help">You can come back to this page any time from Settings.</span>
            </div>
            <Link to="/dashboard" className="btn primary">Open the dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
