import { SHOTS } from './Illos.jsx'
import { PATHS } from '../data/paths.js'

const PROOF = ['Memory ranked #1 on LoCoMo and LongMemEval', '17,000+ models behind one key', 'Agentic RAG, threads and tools that carry state']

export function AuthLayout({ path = 'studio', children }) {
  const Shot = SHOTS[path] || SHOTS.studio
  const base = import.meta.env.BASE_URL
  return (
    <div className="auth">
      <aside className="auth-side" aria-hidden="true">
        <div className="auth-brand"><img src={`${base}brand/emblem-white.png`} alt="" /><span>Backboard</span></div>
        <div className="auth-pitch">
          <h2>Ship stateful AI, fast.</h2>
          <ul>{PROOF.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="auth-visual" key={path}><Shot /><span className="auth-visual-cap">{PATHS[path]?.title || 'Backboard Studio'}</span></div>
      </aside>
      <main className="auth-form">
        <div className="auth-brand auth-brand-mobile"><img src={`${base}brand/emblem-white.png`} alt="" /><span>Backboard</span></div>
        <div className="auth-card">{children}</div>
      </main>
    </div>
  )
}

export function SoloLayout({ children }) {
  const base = import.meta.env.BASE_URL
  return (
    <div className="auth auth-solo">
      <main className="auth-form">
        <div className="auth-brand auth-brand-fixed"><img src={`${base}brand/emblem-white.png`} alt="" /><span>Backboard</span></div>
        <div className="auth-card">{children}</div>
      </main>
    </div>
  )
}

export function Wordmark() {
  const base = import.meta.env.BASE_URL
  return <a href={base} className="inline-brand"><img src={`${base}brand/emblem-white.png`} alt="" /><span>Backboard</span></a>
}
