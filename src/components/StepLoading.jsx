import { useEffect, useState } from 'react';

const texts = [
  '🤖 Optionen werden analysiert...',
  '💡 Vergleiche erstellt...',
  '✅ Fast fertig...'
];

export default function StepLoading({ onDone }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % texts.length);
    }, 1200);
    const total = setTimeout(() => onDone(), 3600);
    return () => { clearInterval(interval); clearTimeout(total); };
  }, [onDone]);

  return (
    <section className="max-w-xl mx-auto p-6 text-center">
      <div className="animate-pulse text-[#0A4D8A] font-semibold">{texts[idx]}</div>
      <div className="mt-6 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#00B4D8] animate-[progress_3.6s_linear_forwards]" style={{width:'100%'}} />
      </div>
      <style>{`@keyframes progress{from{width:0%}to{width:100%}}`}</style>
    </section>
  );
}
