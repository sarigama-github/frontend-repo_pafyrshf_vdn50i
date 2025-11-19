export default function StepResult({ result, onBook, onWhatsApp, onEmail }) {
  const Card = ({ title, cost, pros, cons, highlight }) => (
    <div className={`border rounded-2xl p-5 bg-white ${highlight ? 'border-[#00B4D8] shadow-lg' : 'border-slate-200'}`}>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-xl font-bold mt-1">{cost}</div>
      <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
        {pros.map((p,i)=>(<li key={i} className="text-green-700">{p}</li>))}
        {cons.map((c,i)=>(<li key={i} className="text-red-700">{c}</li>))}
      </ul>
    </div>
  );

  return (
    <section className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-[#0A4D8A]">Dein Ergebnis</h2>
      <p className="text-slate-600">Sparpotential: Bis zu 3.600 EUR/Jahr</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <Card title="Option A: CH-Versicherung" cost="CHF 350–450/Monat" pros={["Umfassend in CH"]} cons={["Teuer, kompliziert in AT"]} />
        <Card title="Option B: AT-Versicherung + Befreiung" cost="EUR 150–250/Monat" pros={["Günstiger, einfach in AT"]} cons={["Zusatz für CH nötig"]} />
        <Card title="Option C: Hybrid (Empfehlung)" cost="Individuell" pros={["Beste Absicherung"]} cons={["Abhängig von Prioritäten"]} highlight />
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button onClick={onBook} className="flex-1 bg-[#00B4D8] text-slate-900 font-semibold px-6 py-3 rounded-xl">📅 Termin buchen</button>
        <a href="https://wa.me/436605221149?text=Hi%20Daniel!%20Vom%20Grenzg%C3%A4nger-Rechner..." target="_blank" rel="noreferrer" className="flex-1 text-center bg-white border border-slate-200 px-6 py-3 rounded-xl">💬 WhatsApp</a>
        <button onClick={onEmail} className="flex-1 bg-white border border-slate-200 px-6 py-3 rounded-xl">✉️ Bericht per E-Mail</button>
      </div>
      <div className="mt-6 text-sm text-slate-600">Lead-Score: <span className="font-semibold">{result?.score}</span> • Kategorie: <span className="font-semibold">{result?.category}</span> • Empfehlung: <span className="font-semibold">{result?.recommended_model}</span></div>
    </section>
  );
}
