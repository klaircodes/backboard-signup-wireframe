import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AppBar, Btn, Video, Copy } from '../components/Hack.jsx'
import { isPath, PATHS } from '../data/paths.js'
import { getAccount, track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']

export default function Start() {
  const { path } = useParams()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/signup" replace />
  const p = PATHS[path]
  const account = getAccount()
  const first = account?.first?.trim()
  const cta = (detail) => track('start_cta_clicked', { path, hackathon: false, detail })

  return (
    <div className="page">
      <AppBar step={3} />
      <main className="wrap narrow">
        <div className="start2">
          <header className="done">
            <h1>{first ? `You're in, ${first}.` : "You're in."}</h1>
            <p className="sub">Your account is ready. {p.setup} to your first result.</p>
            <dl className="stats">
              <div><dt>Path</dt><dd>{p.title}</dd></div>
              <div><dt>Setup time</dt><dd>About {p.setup}</dd></div>
            </dl>
          </header>

          <section className="group">
            <div className="group-head"><h2>{path === 'studio' ? 'Get Backboard Studio' : path === 'rcli' ? 'Install Backboard R-CLI' : 'Connect your coding harness'}</h2></div>
            {path === 'studio' && (
              <>
                <p className="step-detail">Your account is already signed in. Open Studio and you are live.</p>
                <div className="two" style={{ marginTop: 10 }}>
                  <Btn primary onClick={() => cta('macos')}>Download for macOS</Btn>
                  <Btn onClick={() => cta('windows')}>Download for Windows</Btn>
                </div>
                <p className="help" style={{ marginTop: 6 }}>Apple Silicon by default. Also available for macOS Intel and Linux.</p>
              </>
            )}
            {path === 'rcli' && (
              <>
                <p className="steps-hint">Three commands. Copy each one.</p>
                <ol className="steps">
                  <li><button type="button" className="chk" role="checkbox" aria-checked="false"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button><div className="step-body"><div className="step-title">Install ({windows ? 'Windows' : 'macOS / Linux'})</div><Copy cmd={windows ? '[PowerShell one-liner from docs]' : 'curl -fsSL https://app.backboard.io/api/cli | bash'} onCopy={() => cta('copy-install')} /></div></li>
                  <li><button type="button" className="chk" role="checkbox" aria-checked="false"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button><div className="step-body"><div className="step-title">Sign in from the terminal</div><Copy cmd="backboard login" onCopy={() => cta('copy-login')} /></div></li>
                  <li><button type="button" className="chk" role="checkbox" aria-checked="false"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button><div className="step-body"><div className="step-title">Verify</div><Copy cmd="backboard --version" onCopy={() => cta('copy-verify')} /></div></li>
                </ol>
                <p className="help"><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show macOS / Linux' : 'On Windows? Show the PowerShell command'}</button></p>
              </>
            )}
            {path === 'api' && (
              <>
                <p className="step-detail">Claude Code, Cursor or VS Code. Also works with Codex, Windsurf and any MCP client.</p>
                <Btn primary full onClick={() => cta('studio-connect')} style={{ marginTop: 10 }}>Connect to Backboard Studio</Btn>
                <p className="help" style={{ marginTop: 8 }}>Don't have Studio installed? <button type="button" className="link" onClick={() => cta('studio-download')}><b>Download Backboard Studio</b></button>, then return here and click "Connect to Backboard Studio" to add the Backboard Docs MCP server.</p>
                <div className="three" style={{ marginTop: 16 }}>
                  {HARNESSES.map((h) => <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h) }}>{h}</Btn>)}
                </div>
                <p className="help" style={{ marginTop: 6 }}>Also: Codex, Windsurf, any MCP client</p>
                <div style={{ marginTop: 18 }}>
                  <p className="step-title" style={{ marginBottom: 6 }}>Or call it raw</p>
                  <Copy cmd="pip install backboard-sdk   ·   npm i backboard-sdk" onCopy={() => cta('copy-sdk')} />
                  <p className="help" style={{ marginTop: 6 }}>Your API key was created and is in the snippet.</p>
                </div>
              </>
            )}
          </section>

          <section className="group">
            <div className="group-head"><h2>Watch the walkthrough</h2></div>
            <Video youtube={p.video} caption={`${p.title} walkthrough`} className="start-video" />
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
