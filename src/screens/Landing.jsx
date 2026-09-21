import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteNav, PathCard, Logos } from '../components/Hack.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { track } from '../lib/track.js'

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
          <h1>What are you building with?</h1>
          <p className="sub">Persistent memory, 17,000+ models, retrieval and threads. Pick your tool and you're set up in about two minutes.</p>
          <Logos />
        </section>

        <section className="pick" id="pick">
          <div className="sec-head">
            <h2>Pick how you want to build.</h2>
            <p>Free to start. $5 in memory credits, no credit card.</p>
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
          </nav>
        </div>
      </footer>
    </div>
  )
}
