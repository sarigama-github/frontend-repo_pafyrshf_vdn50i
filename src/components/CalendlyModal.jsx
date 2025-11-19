import { useEffect } from 'react';

export default function CalendlyModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    d.body.appendChild(s);
    return () => { d.body.removeChild(s); };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-2" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold text-[#0A4D8A]">Termin buchen</div>
          <button onClick={onClose} className="text-slate-600">✕</button>
        </div>
        <div className="p-0">
          <div className="calendly-inline-widget" data-url="https://calendly.com/easyjack/grenzgaenger-beratung" style={{minWidth: '320px', height: '640px'}}></div>
        </div>
      </div>
    </div>
  );
}
