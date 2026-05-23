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

// Half-open bud (stage 4) — petals starting to unfurl
function HalfBloom({ c, type }) {
  if (type === 'lily') {
    return (
      <g>
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a} cx="50" cy="26" rx="4" ry="11"
            fill={c.petal} opacity="0.78"
            transform={`rotate(${a} 50 36)`} />
        ))}
        <circle cx="50" cy="36" r="3" fill={c.center} />
      </g>
    )
  }
  if (type === 'peony') {
    return (
      <g>
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a} cx="50" cy="27" rx="6" ry="10"
            fill={c.petal} opacity="0.75"
            transform={`rotate(${a} 50 36)`} />
        ))}
        {[30, 90, 150, 210, 270, 330].map(a => (
          <ellipse key={a} cx="50" cy="30" rx="4" ry="7"
            fill={c.inner} opacity="0.7"
            transform={`rotate(${a} 50 36)`} />
        ))}
        <circle cx="50" cy="36" r="3.5" fill={c.center} />
      </g>
    )
  }
  // rose
  return (
    <g>
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx="50" cy="27" rx="6" ry="10"
          fill={c.petal} opacity="0.78"
          transform={`rotate(${a} 50 36)`} />
      ))}
      {[36, 108, 180, 252, 324].map(a => (
        <ellipse key={a} cx="50" cy="30" rx="4.5" ry="7"
          fill={c.inner} opacity="0.7"
          transform={`rotate(${a} 50 36)`} />
      ))}
      <circle cx="50" cy="36" r="4" fill={c.center} />
    </g>
  )
}

export default function Flower({ type = 'rose', waterCount = 0, size = 100 }) {
  const c = COLORS[type] || COLORS.rose
  const stage = Math.min(5, Math.max(0, Math.round(waterCount)))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ overflow: 'visible' }}
    >
      {/* Ground mound — always shown */}
      <ellipse cx="50" cy="93" rx="24" ry="7" fill="#C49060" opacity="0.45" />
      <ellipse cx="50" cy="91" rx="18" ry="4.5" fill="#D4A878" opacity="0.4" />

      {/* ── Stage 0: seed ── */}
      {stage === 0 && (
        <ellipse cx="50" cy="89" rx="5.5" ry="3" fill="#A07840" opacity="0.55" />
      )}

      {/* ── Stage 1: sprout — tiny curl just breaking ground ── */}
      {stage === 1 && (
        <>
          <path d="M 50 90 Q 48 86 50 82"
            stroke={c.stem} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* tiny unfurling leaf */}
          <path d="M 50 84 Q 44 81 45 86 Q 47 86 50 84"
            fill={c.leaf} opacity="0.7" />
        </>
      )}

      {/* ── Stage 2: sapling — short stem, small leaves ── */}
      {stage === 2 && (
        <>
          <path d="M 50 90 C 49 84 51 78 50 72"
            stroke={c.stem} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 50 80 Q 42 76 42 82 Q 46 83 50 80" fill={c.leaf} />
          <path d="M 50 74 Q 58 70 58 76 Q 54 77 50 74" fill={c.leaf} opacity="0.8" />
        </>
      )}

      {/* ── Stage 3: baby bud — taller, leaves, tiny closed bud ── */}
      {stage === 3 && (
        <>
          <path d="M 50 90 C 48 78 52 65 50 50"
            stroke={c.stem} strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M 50 76 Q 38 70 38 78 Q 43 79 50 76" fill={c.leaf} />
          <path d="M 50 64 Q 62 58 62 66 Q 57 67 50 64" fill={c.leaf} opacity="0.85" />
          {/* tiny closed bud */}
          <ellipse cx="50" cy="44" rx="5" ry="7" fill={c.petal} opacity="0.8" />
          <ellipse cx="50" cy="44" rx="3" ry="5" fill={c.inner} opacity="0.6" />
        </>
      )}

      {/* ── Stage 4: half bloom — bud opening ── */}
      {stage === 4 && (
        <>
          <path d="M 50 90 C 48 75 52 58 50 36"
            stroke={c.stem} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 50 74 Q 34 67 32 77 Q 40 78 50 74" fill={c.leaf} />
          <path d="M 50 60 Q 66 53 68 63 Q 60 64 50 60" fill={c.leaf} />
          <HalfBloom c={c} type={type} />
        </>
      )}

      {/* ── Stage 5: full bloom ── */}
      {stage === 5 && (
        <>
          <path d="M 50 90 C 48 75 52 58 50 36"
            stroke={c.stem} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 50 74 Q 34 67 32 77 Q 40 78 50 74" fill={c.leaf} />
          <path d="M 50 60 Q 66 53 68 63 Q 60 64 50 60" fill={c.leaf} />
          {type === 'rose'  ? <RoseBloom c={c} /> :
           type === 'peony' ? <PeonyBloom c={c} /> :
           <LilyBloom c={c} />}
        </>
      )}
    </svg>
  )
}
