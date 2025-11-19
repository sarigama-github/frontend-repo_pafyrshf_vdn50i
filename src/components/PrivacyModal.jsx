export default function PrivacyModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6">
        <h3 className="text-xl font-semibold text-[#0A4D8A] mb-3">Datenschutz</h3>
        <div className="prose prose-sm max-w-none text-slate-700">
          <p>Wir speichern deine Angaben nur zur Beratung. Keine Gesundheitsdaten im Formular. Keine Werbung ohne Opt-in. Daten werden nach spätestens 24 Monaten gelöscht.</p>
          <p>Verantwortlich: Grenzgänger-Service by Easyjack. Kontakt: info@grenzgaenger-service.at</p>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-[#0A4D8A] text-white">Schließen</button>
        </div>
      </div>
    </div>
  );
}
