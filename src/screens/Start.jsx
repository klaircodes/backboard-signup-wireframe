import { useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { isPath, PATHS } from '../data/paths.js'
import Copy from '../components/Copy.jsx'
import Video from '../components/Video.jsx'
import { track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']
function detect() { const u = navigator.userAgent || ''; if (/Windows/i.test(u)) return 'windows'; if (/Linux/i.test(u) && !/Android/i.test(u)) return 'linux'; return 'mac' }

export default function Start() {
  const { path } = useParams()
  const navigate = useNavigate()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/signup" replace />
  const p = PATHS[path]
  const cta = (d) => track('start_cta_clicked', { path, hackathon: false, detail: d })
  const skip = () => navigate('/dashboard')

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <div />
        <nav className="bar-links"><a href="#" onClick={e => e.preventDefault()}>Help</a></nav>
      </header>
      <main className="wrap narrow">
        <div className="start">
          <h1>{path === 'studio' ? 'Get Backboard Studio' : path === 'rcli' ? 'Install Backboard R-CLI' : 'Connect your coding harness'}</h1>
          <p className="sub">{path === 'studio' ? 'Your account is already signed in. Open Studio and you are live.' : path === 'rcli' ? 'Three commands. Copy each one.' : 'Same key, same memory, same 17,000+ models, inside the tool you open every day.'}</p>

          {path === 'studio' && (
            <div className="start-group">
              <div className="two">
                <button type="button" className="btn primary" onClick={() => cta(detect())}>Download for {detect() === 'mac' ? 'macOS' : detect() === 'windows' ? 'Windows' : 'Linux'}</button>
                <button type="button" className="btn" onClick={() => cta(detect() !== 'mac' ? 'macos' : 'windows')}>{detect() !== 'mac' ? 'Download for macOS' : 'Download for Windows'}</button>
              </div>
              <p className="help" style={{ marginTop: 8 }}>Apple Silicon by default. Also available for macOS Intel and Linux.</p>
            </div>
          )}

          {path === 'rcli' && (
            <div className="start-group">
              <div className="start-steps">
                <div><span className="step-n">1</span><span className="step-label">Install ({windows ? 'Windows PowerShell' : 'macOS / Linux'})</span></div>
                <Copy cmd={windows ? '[PowerShell one-liner from docs]' : 'curl -fsSL https://app.backboard.io/api/cli | bash'} onCopy={() => cta('copy-install')} />
                <div><span className="step-n">2</span><span className="step-label">Sign in from the terminal</span></div>
                <Copy cmd="backboard login" onCopy={() => cta('copy-login')} />
                <div><span className="step-n">3</span><span className="step-label">Verify</span></div>
                <Copy cmd="backboard --version" onCopy={() => cta('copy-verify')} />
              </div>
              <p className="help" style={{ marginTop: 8 }}><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show the macOS / Linux command' : 'On Windows? Show the PowerShell command'}</button></p>
            </div>
          )}

          {path === 'api' && (
            <div className="start-group">
              <div className="three">{HARNESSES.map(h => <button key={h} type="button" className={`btn ${harness === h ? 'primary' : ''}`} onClick={() => { setHarness(h); cta(h) }}>{h}</button>)}</div>
              <p className="help" style={{ marginTop: 8 }}>Also: Codex, Windsurf, any MCP client</p>
              <div className="start-steps" style={{ marginTop: 20 }}>
                <span className="step-label">Or call it raw</span>
                <Copy cmd="pip install backboard-sdk   ·   npm i backboard-sdk" onCopy={() => cta('copy-sdk')} />
              </div>
              <p className="help" style={{ marginTop: 8 }}>Your API key was created and is in the snippet. Python and JavaScript, same as today.</p>
            </div>
          )}

          <div className="start-section">
            <h2>Watch the walkthrough</h2>
            <Video youtube={p.video} caption={`${p.title} walkthrough`} className="start-video" />
          </div>

          <div className="start-skip"><button type="button" className="link" onClick={skip}>Skip, go to dashboard</button></div>
        </div>
      </main>
    </div>
  )
}
