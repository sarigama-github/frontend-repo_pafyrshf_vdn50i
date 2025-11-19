import Spline from '@splinetool/react-spline';

export default function Hero({ onStart }) {
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] overflow-hidden bg-[#0A4D8A]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A4D8A]/30 via-[#0A4D8A]/60 to-[#0A4D8A] pointer-events-none" />
      </div>
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
