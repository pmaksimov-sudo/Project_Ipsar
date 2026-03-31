import { useRef, useState, useCallback } from 'react'
import styles from './WaterGraphic.module.css'

export default function WaterGraphic() {
  const wrapRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [off, setOff] = useState({ x: 0, y: 0 })
  const [hoveredChip, setHoveredChip] = useState(null)

  const chipStyle = (id) => ({
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  })

  const chipRect = (id) => ({
    fill: hoveredChip === id ? 'rgba(26,140,255,0.25)' : 'rgba(26,140,255,0.1)',
    stroke: hoveredChip === id ? 'rgba(26,140,255,0.7)' : 'rgba(26,140,255,0.28)',
    filter: hoveredChip === id ? 'url(#chip-glow)' : 'none',
    transition: 'fill 0.2s ease, stroke 0.2s ease',
  })

  const handleMouseMove = useCallback((e) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setTilt({ x: -dy * 10, y: dx * 10 })
    setOff({ x: dx * 8, y: dy * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setOff({ x: 0, y: 0 })
  }, [])

  // Atom positions — outer atoms move more than inner
  const oX = 263 + off.x * 1.3,  oY = 170 + off.y * 1.3
  const hLX = 77 + off.x * 0.9,  hLY = 170 + off.y * 0.9
  const hTX = 170 + off.x * 0.9, hTY = 77 + off.y * 0.9
  const botX = 170 + off.x * 0.6, botY = 263 + off.y * 0.6

  const atomTransition = 'transform 0.15s ease'

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
    >
      <svg
        viewBox="0 0 400 340"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={styles.svg}
      >
        <defs>
          <pattern id="wg-dots" patternUnits="userSpaceOnUse" width="28" height="28">
            <circle cx="14" cy="14" r="1.2" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <radialGradient id="wg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A8CFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1A8CFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wg-core" cx="38%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(26,140,255,0.25)" />
          </radialGradient>
          <filter id="chip-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dot grid background */}
        <rect width="400" height="340" fill="url(#wg-dots)" />

        {/* Outer dashed orbit */}
        <circle
          cx="170" cy="170" r="128"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="6 12"
        />

        {/* Middle orbit */}
        <circle
          cx="170" cy="170" r="93"
          fill="none"
          stroke="rgba(26,140,255,0.13)"
          strokeWidth="1"
        />

        {/* Inner orbit */}
        <circle
          cx="170" cy="170" r="63"
          fill="none"
          stroke="rgba(26,140,255,0.28)"
          strokeWidth="1.5"
        />

        {/* Glow halo */}
        <circle cx="170" cy="170" r="63" fill="url(#wg-glow)" className={styles.pulse} />

        {/* Core outer ring */}
        <circle
          cx="170" cy="170" r="43"
          fill="rgba(26,140,255,0.07)"
          stroke="rgba(26,140,255,0.45)"
          strokeWidth="1.5"
        />

        {/* Core inner sphere */}
        <circle cx="170" cy="170" r="27" fill="url(#wg-core)" />

        {/* H₂O label */}
        <text
          x="170" y="175"
          textAnchor="middle"
          fill="rgba(255,255,255,0.38)"
          fontSize="11"
          fontFamily="Inter, sans-serif"
          letterSpacing="2"
        >
          H₂O
        </text>

        {/* Bond lines — dynamic endpoints */}
        <line x1="170" y1="170" x2={oX}   y2={oY}   stroke="rgba(26,140,255,0.18)" strokeWidth="1" />
        <line x1="170" y1="170" x2={hLX}  y2={hLY}  stroke="rgba(26,140,255,0.18)" strokeWidth="1" />
        <line x1="170" y1="170" x2={hTX}  y2={hTY}  stroke="rgba(26,140,255,0.12)" strokeWidth="1" />
        <line x1="170" y1="170" x2={botX} y2={botY} stroke="rgba(26,140,255,0.08)" strokeWidth="1" />

        {/* Oxygen — right */}
        <g style={{ transition: atomTransition }} transform={`translate(${off.x * 1.3}, ${off.y * 1.3})`}>
          <circle cx="263" cy="170" r="8" fill="rgba(26,140,255,0.65)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          <text x="263" y="174" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600">O</text>
        </g>

        {/* Hydrogen — left */}
        <g style={{ transition: atomTransition }} transform={`translate(${off.x * 0.9}, ${off.y * 0.9})`}>
          <circle cx="77" cy="170" r="6.5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="77" y="174" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600">H</text>
        </g>

        {/* Hydrogen — top */}
        <g style={{ transition: atomTransition }} transform={`translate(${off.x * 0.9}, ${off.y * 0.9})`}>
          <circle cx="170" cy="77" r="5.5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <text x="170" y="81" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600">H</text>
        </g>

        {/* Faint bottom atom */}
        <g style={{ transition: atomTransition }} transform={`translate(${off.x * 0.6}, ${off.y * 0.6})`}>
          <circle cx="170" cy="263" r="4.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </g>

        {/* Outer orbit corner atoms */}
        <circle cx="258" cy="82"  r="4"   fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="82"  cy="82"  r="3.5" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.1)"  strokeWidth="1" />
        <circle cx="82"  cy="258" r="3.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <circle cx="258" cy="258" r="3"   fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

        {/* Connector lines to parameter chips */}
        <line x1="271" y1="165" x2="295" y2="126" stroke="rgba(26,140,255,0.2)"  strokeWidth="1" strokeDasharray="3 5" />
        <line x1="271" y1="170" x2="295" y2="178" stroke="rgba(26,140,255,0.2)"  strokeWidth="1" strokeDasharray="3 5" />
        <line x1="271" y1="175" x2="295" y2="228" stroke="rgba(26,140,255,0.16)" strokeWidth="1" strokeDasharray="3 5" />

        {/* Parameter chip 1 */}
        <g style={chipStyle(1)} onMouseEnter={() => setHoveredChip(1)} onMouseLeave={() => setHoveredChip(null)}>
          <rect x="295" y="108" width="98" height="36" rx="6" strokeWidth="1" style={chipRect(1)} />
          <text x="344" y="123" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8.5" fontFamily="Inter,sans-serif">Тип I</text>
          <text x="344" y="137" textAnchor="middle" fill="rgba(26,140,255,0.92)" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600">18,2 МОм·см</text>
        </g>

        {/* Parameter chip 2 */}
        <g style={chipStyle(2)} onMouseEnter={() => setHoveredChip(2)} onMouseLeave={() => setHoveredChip(null)}>
          <rect x="295" y="160" width="98" height="36" rx="6" strokeWidth="1" style={chipRect(2)} />
          <text x="344" y="175" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8.5" fontFamily="Inter,sans-serif">TOC</text>
          <text x="344" y="189" textAnchor="middle" fill="rgba(26,140,255,0.92)" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600">{'< 5 ppb'}</text>
        </g>

        {/* Parameter chip 3 */}
        <g style={chipStyle(3)} onMouseEnter={() => setHoveredChip(3)} onMouseLeave={() => setHoveredChip(null)}>
          <rect x="295" y="212" width="98" height="36" rx="6" strokeWidth="1" style={chipRect(3)} />
          <text x="344" y="227" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8.5" fontFamily="Inter,sans-serif">Бактерии</text>
          <text x="344" y="241" textAnchor="middle" fill="rgba(26,140,255,0.92)" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="600">{'< 0,1 КОЕ/мл'}</text>
        </g>

      </svg>
    </div>
  )
}
