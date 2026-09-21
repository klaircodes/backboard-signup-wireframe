import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteNav, PathCard, Logos } from '../components/Hack.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { SHOTS } from '../components/Illos.jsx'
import { track } from '../lib/track.js'

const FEATURES = [
  { title: 'Persistent memory', desc: 'Your agents remember across sessions. #1 on LoCoMo and LongMemEval.' },
  { title: '17,000+ models', desc: 'OpenAI, Anthropic, open source, and everything on OpenRouter, behind one key.' },
  { title: 'Retrieval and threads', desc: 'Agentic RAG, stateful conversations, and tool calling that carries state.' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [path, setPath] = useState(null)
  const leaving = useRef(false)
  const select = (next) => {
    if (leaving.current) return
    leaving.current = true
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: false })
    setTimeout(() => navigate(`/signup/account?path=${next}`), 360)
  }

  return (
    <div className="page">
      <SiteNav />
      <main className="wrap">
        <section className="hero">
          <h1>Ship stateful AI, fast.</h1>
          <p className="sub">Memory, models, RAG, and threads behind one API. Three ways to build. Pick the one that fits how you work.</p>
          <Logos />
        </section>

        <section className="features">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="pick" id="pick">
          <div className="sec-head">
            <h2>Choose your setup.</h2>
          </div>
          <div className="cards" role="radiogroup" aria-label="Path">
            {PATH_ORDER.map((k) => <PathCard key={k} path={k} selected={path === k} onSelect={select} />)}
          </div>
          <p className="go hint">Not sure? <button type="button" className="link" onClick={() => select('api')}>Start with the API</button></p>
        </section>

        <section className="cols">
          {PATH_ORDER.map((k) => (
            <div key={k} className="col">
              <h3>{PATHS[k].title}</h3>
              <p className="lead">{PATHS[k].bestIf}</p>
              <p>{PATHS[k].column}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <span className="foot-brand">Backboard</span>
          <nav>
            <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Pricing</a>
            <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
