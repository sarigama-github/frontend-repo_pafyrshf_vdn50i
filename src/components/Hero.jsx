export default function Hero({ onStart }) {
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] overflow-hidden bg-[#0A4D8A]">
      {/* Decorative animated flag background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.10),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(0,180,216,0.15),transparent_60%)]" />

        {/* Austria badge */}
        <div className="flag-float shadow-2xl/white absolute -left-10 top-10 sm:left-8 sm:top-16 opacity-90 scale-[0.8] sm:scale-100" style={{ animationDelay: '0s' }}>
          <FlagBadge type="AT" />
        </div>

        {/* Switzerland badge */}
        <div className="flag-float shadow-2xl/white absolute right-[-30px] top-28 sm:right-10 sm:top-24 opacity-95" style={{ animationDelay: '0.6s' }}>
          <FlagBadge type="CH" />
        </div>

        {/* Liechtenstein badge */}
        <div className="flag-float shadow-2xl/white absolute left-1/3 bottom-6 sm:left-1/2 sm:bottom-10 opacity-90 scale-90" style={{ animationDelay: '1.2s' }}>
          <FlagBadge type="LI" />
        </div>

        {/* Soft gradient veil for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A4D8A]/30 via-[#0A4D8A]/60 to-[#0A4D8A]" />
      </div>

      {/* Copy & CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24 text-white">
        <div className="mb-6 text-sm sm:text-base font-medium tracking-wide uppercase text-white/80">Grenzgänger-Service by Easyjack</div>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight max-w-3xl">Finde die perfekte Krankenversicherung als Grenzgänger</h1>
        <p className="mt-3 sm:mt-4 text-white/90 text-base sm:text-lg">In 2 Minuten zum kostenlosen Vergleich</p>
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-white/80 space-x-2">
          <span>✓ 100% kostenlos</span>
          <span>•</span>
          <span>DSGVO-sicher</span>
          <span>•</span>
          <span>Persönliche Beratung</span>
        </div>
        <div className="mt-6 sm:mt-8">
          <button onClick={onStart} className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#00A0C0] text-slate-900 font-semibold px-5 sm:px-6 py-3 rounded-xl transition-colors shadow-lg">
            Jetzt vergleichen
          </button>
        </div>
      </div>
    </section>
  );
}

function FlagBadge({ type = 'AT', size = 180 }) {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  return (
    <div className="rounded-full backdrop-blur-[1px]" style={{ width: dimension, height: dimension }}>
      <svg width={dimension} height={dimension} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
        <defs>
          <clipPath id="circleClip">
            <circle cx="100" cy="100" r="95" />
          </clipPath>
          {/* glossy highlight */}
          <radialGradient id="gloss" cx="30%" cy="20%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="98" fill="rgba(255,255,255,0.08)" />
        <g clipPath="url(#circleClip)">
          {type === 'AT' && (
            <>
              <rect x="0" y="0" width="200" height="66.7" fill="#ED2939" />
              <rect x="0" y="66.7" width="200" height="66.6" fill="#FFFFFF" />
              <rect x="0" y="133.3" width="200" height="66.7" fill="#ED2939" />
            </>
          )}
          {type === 'CH' && (
            <>
              <rect width="200" height="200" fill="#D52B1E" />
              <rect x="85" y="40" width="30" height="120" fill="#FFFFFF" />
              <rect x="40" y="85" width="120" height="30" fill="#FFFFFF" />
            </>
          )}
          {type === 'LI' && (
            <>
              <rect width="200" height="100" fill="#002780" />
              <rect y="100" width="200" height="100" fill="#CE1126" />
              {/* simple crown */}
              <g transform="translate(28,38)">
                <path d="M0 30 H60 V45 H0 Z" fill="#F8D24A" />
                <path d="M5 30 L15 18 L25 30 L35 18 L45 30 L55 18 L60 30" fill="#F8D24A" />
                <circle cx="15" cy="18" r="3" fill="#FCE57E" />
                <circle cx="35" cy="18" r="3" fill="#FCE57E" />
                <circle cx="55" cy="18" r="3" fill="#FCE57E" />
              </g>
            </>
          )}
          <circle cx="100" cy="100" r="98" fill="url(#gloss)" />
        </g>
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      </svg>
    </div>
  );
}
