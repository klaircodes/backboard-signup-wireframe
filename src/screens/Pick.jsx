import { useNavigate } from 'react-router-dom'
import { Bar } from '../components/Shell.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { SHOTS } from '../components/Illos.jsx'
import { track } from '../lib/track.js'

function Panel({ path, onSelect }) {
  const p = PATHS[path]; const Shot = SHOTS[path]
  return (
    <button type="button" className="panel" onClick={() => onSelect(path)}>
      <div className="panel-thumb"><Shot /></div>
      <div className="panel-text">
        <h3>{p.title}</h3>
        <p>{p.line}</p>
        <div className="best">Best for: {p.bestForInline}</div>
      </div>
      <span className="panel-cta">{p.button}</span>
    </button>
  )
}

export default function Pick() {
  const navigate = useNavigate()
  const select = (path) => {
    track('path_selected', { path, source: 'click', hackathon: false })
    navigate(`/signup/account?path=${path}`)
  }

  return (
    <div className="page">
      <Bar step={1} right={<><a href="#" onClick={e => e.preventDefault()}>Docs</a><a href="#" onClick={e => e.preventDefault()}>Sign in</a></>} />
      <main className="content wide">
        <div className="pick-head">
          <h1>What are you building with?</h1>
          <p>Pick one and you'll be set up in about two minutes.</p>
        </div>
        <div className="panels">
          {PATH_ORDER.map(k => <Panel key={k} path={k} onSelect={select} />)}
        </div>
        <p className="pick-foot">Not sure? <button type="button" className="link" onClick={() => select('api')}>Start with the Unified API.</button></p>
      </main>
    </div>
  )
}
