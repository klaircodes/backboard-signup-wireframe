import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Bar, Copy } from '../components/Shell.jsx'
import { isPath, PATHS } from '../data/paths.js'
import { track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']
const YT = 'https://www.youtube-nocookie.com'

export default function Start() {
  const { path } = useParams()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/signup" replace />
  const p = PATHS[path]
  const cta = (d) => track('start_cta_clicked', { path, hackathon: false, detail: d })

  const titles = { studio: 'Download Studio', rcli: 'Install R-CLI', api: 'Connect your editor' }

  return (
    <div className="page">
      <Bar step={3} right={<a href="#" onClick={e => e.preventDefault()}>Help</a>} />
      <main className="content">
        <div className="win">
          <h1>{titles[path]}</h1>
          <p className="win-sub">{path === 'studio' ? 'Your account is signed in. Open Studio and you are live.' : path === 'rcli' ? 'Three commands, then your first agent run.' : 'Same key, same memory, same 17,000+ models, in your editor.'}</p>

          {path === 'studio' && (
            <div style={{ marginTop: 14 }}>
              <div className="two">
                <button type="button" className="btn primary" onClick={() => cta('macos')}>Download for macOS</button>
                <button type="button" className="btn" onClick={() => cta('windows')}>Download for Windows</button>
              </div>
              <p className="win-help">Apple Silicon by default. Also available for macOS Intel and Linux.</p>
            </div>
          )}

          {path === 'rcli' && (
            <div className="win-steps">
              <div className="win-step"><span className="win-step-n">1</span><div className="win-step-body"><b>Install ({windows ? 'Windows' : 'macOS / Linux'})</b><Copy cmd={windows ? '[PowerShell one-liner from docs]' : 'curl -fsSL https://app.backboard.io/api/cli | bash'} onCopy={() => cta('copy-install')} /></div></div>
              <div className="win-step"><span className="win-step-n">2</span><div className="win-step-body"><b>Sign in</b><Copy cmd="backboard login" onCopy={() => cta('copy-login')} /></div></div>
              <div className="win-step"><span className="win-step-n">3</span><div className="win-step-body"><b>Verify</b><Copy cmd="backboard --version" onCopy={() => cta('copy-verify')} /></div></div>
              <p className="win-help"><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show macOS / Linux' : 'On Windows?'}</button></p>
            </div>
          )}

          {path === 'api' && (
            <>
              <div className="three" style={{ marginTop: 14 }}>
                {HARNESSES.map(h => <button key={h} type="button" className={`btn ${harness === h ? 'primary' : ''}`} onClick={() => { setHarness(h); cta(h) }}>{h}</button>)}
              </div>
              <p className="win-help">Also: Codex, Windsurf, any MCP client</p>
              <div className="win-section">
                <h2>Or call it raw</h2>
                <Copy cmd="pip install backboard-sdk   ·   npm i backboard-sdk" onCopy={() => cta('copy-sdk')} />
                <p className="win-help">Your API key is created and in the snippet.</p>
              </div>
            </>
          )}

          <div className="win-section">
            <h2>Walkthrough</h2>
            <div className="video"><iframe src={`${YT}/embed/${p.video}?autoplay=1&mute=1&loop=1&playlist=${p.video}&controls=0&rel=0&playsinline=1&modestbranding=1`} title={`${p.title} walkthrough`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
          </div>

          <div className="win-end">
            <div><b>All set?</b><br /><span>Come back any time from Settings.</span></div>
            <Link to="/dashboard" className="btn primary">Open the dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
