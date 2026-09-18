import { useRef, useState } from 'react'
const YT = 'https://www.youtube-nocookie.com'
export default function Video({ youtube, caption, className = '' }) {
  const [muted, setMuted] = useState(true)
  const box = useRef(null); const frame = useRef(null)
  const send = (f) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: f, args: [] }), YT)
  const src = `${YT}/embed/${youtube}?autoplay=1&mute=1&loop=1&playlist=${youtube}&controls=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`
  return (
    <div className={`video ${className}`} ref={box}>
      <iframe ref={frame} src={src} title={caption || 'Video'} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
    </div>
  )
}
