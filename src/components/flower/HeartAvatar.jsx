export default function HeartAvatar({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Heart body */}
      <path
        d="M50 82 C29 63 6 51 6 30 C6 16 17 6 30 6 C38 6 45 10 50 18 C55 10 62 6 70 6 C83 6 94 16 94 30 C94 51 71 63 50 82Z"
        fill="#E8607A"
      />
      {/* Soft inner highlight */}
      <path
        d="M50 72 C35 58 18 48 18 33 C18 25 24 18 32 18 C38 18 43 22 46 27"
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round"
      />
      {/* Closed happy eyes */}
      <path d="M36 38 Q39.5 34 43 38" stroke="#3D1020" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M57 38 Q60.5 34 64 38" stroke="#3D1020" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M42 51 Q50 58 58 51" stroke="#3D1020" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Left arm */}
      <path d="M13 57 Q22 69 37 63" stroke="white" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      {/* Right arm */}
      <path d="M87 57 Q78 69 63 63" stroke="white" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      {/* Hands */}
      <circle cx="37" cy="63" r="4" fill="white"/>
      <circle cx="63" cy="63" r="4" fill="white"/>
    </svg>
  )
}
