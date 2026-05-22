const COLORS = {
  rose:  { petal: '#E8607A', inner: '#C43060', center: '#8B1A3A', leaf: '#5A8A5A', stem: '#4E7A4E' },
  peony: { petal: '#F0A0B8', inner: '#D47898', center: '#9A3858', leaf: '#5A8A5A', stem: '#4E7A4E' },
  lily:  { petal: '#F4B8CC', inner: '#E090A8', center: '#B85070', leaf: '#5A8A5A', stem: '#4E7A4E' },
}

function RoseBloom({ c }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx="50" cy="24" rx="7" ry="12"
          fill={c.petal} opacity="0.82"
          transform={`rotate(${a} 50 36)`} />
      ))}
      {[36, 108, 180, 252, 324].map(a => (
        <ellipse key={a} cx="50" cy="28" rx="5.5" ry="9"
          fill={c.inner} opacity="0.75"
          transform={`rotate(${a} 50 36)`} />
      ))}
      <circle cx="50" cy="36" r="5" fill={c.center} />
    </g>
  )
}

function PeonyBloom({ c }) {
  return (
    <g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <ellipse key={a} cx="50" cy="25" rx="7" ry="11"
          fill={c.petal} opacity="0.72"
          transform={`rotate(${a} 50 36)`} />
      ))}
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse key={a} cx="50" cy="28" rx="6" ry="9"
          fill={c.inner} opacity="0.78"
          transform={`rotate(${a} 50 36)`} />
      ))}
      {[0, 90, 180, 270].map(a => (
        <ellipse key={a} cx="50" cy="31" rx="4" ry="6"
          fill={c.petal} opacity="0.88"
          transform={`rotate(${a} 50 36)`} />
      ))}
      <circle cx="50" cy="36" r="4" fill={c.center} />
    </g>
  )
}

function LilyBloom({ c }) {
  return (
    <g>
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse key={a} cx="50" cy="19" rx="5" ry="17"
          fill={c.petal} opacity="0.82"
          transform={`rotate(${a} 50 36)`} />
      ))}
      {[30, 90, 150, 210, 270, 330].map(a => (
        <line key={a} x1="50" y1="34" x2="50" y2="27"
          stroke={c.inner} strokeWidth="1.2"
          transform={`rotate(${a} 50 34)`} />
      ))}
      <circle cx="50" cy="36" r="3.5" fill={c.center} />
    </g>
  )
}

export default function Flower({ type = 'rose', waterCount = 0, size = 100 }) {
  const c = COLORS[type] || COLORS.rose
  const stage = Math.min(4, Math.max(0, Math.round(waterCount)))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ overflow: 'visible' }}
    >
      {/* Ground mound */}
      <ellipse cx="50" cy="93" rx="24" ry="7" fill="#C49060" opacity="0.45" />
      <ellipse cx="50" cy="91" rx="18" ry="4.5" fill="#D4A878" opacity="0.4" />

      {/* Stem */}
      {stage === 1 && (
        <path d="M 50 90 C 49 83 51 76 50 68"
          stroke={c.stem} strokeWidth="3" strokeLinecap="round" />
      )}
      {stage >= 2 && (
        <path d="M 50 90 C 48 75 52 58 50 36"
          stroke={c.stem} strokeWidth="3.5" strokeLinecap="round" />
      )}

      {/* Leaves */}
      {stage >= 2 && (
        <>
          <path d="M 50 74 Q 34 67 32 77 Q 40 78 50 74" fill={c.leaf} />
          <path d="M 50 60 Q 66 53 68 63 Q 60 64 50 60" fill={c.leaf} />
        </>
      )}

      {/* Bud */}
      {stage === 3 && (
        <g>
          <ellipse cx="50" cy="31" rx="7.5" ry="11" fill={c.petal} />
          <path d="M 43.5 35 Q 50 27 56.5 35" fill={c.inner} opacity="0.65" />
          <path d="M 44 33 Q 50 29 56 33 Q 56 36 50 37 Q 44 36 44 33Z" fill={c.inner} opacity="0.38" />
        </g>
      )}

      {/* Full bloom */}
      {stage === 4 && (
        type === 'rose'  ? <RoseBloom c={c} /> :
        type === 'peony' ? <PeonyBloom c={c} /> :
        <LilyBloom c={c} />
      )}

      {/* Seed */}
      {stage === 0 && (
        <ellipse cx="50" cy="89" rx="5.5" ry="3" fill="#A07840" opacity="0.55" />
      )}
    </svg>
  )
}
