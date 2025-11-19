import { useState, useMemo } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function NetCalculator() {
  const [values, setValues] = useState({
    gross_chf: 8000,
    work_ch: 'Zürich',
    residence_at: 'Vorarlberg',
    age: 30,
    marital: 'single',
    children_count: 0,
    exchange_rate: 0.95,
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (k, v) => setValues(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/calc/net`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error('Fehler bei der Berechnung')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-6">
          <header>
            <span className="text-xs uppercase tracking-widest text-[#0A4D8A]/80 font-medium">Angebot</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A4D8A] mt-1">Brutto/Netto-Rechner für Grenzgänger</h2>
            <p className="text-slate-600 mt-2">In wenigen Sekunden erhältst du eine unverbindliche Netto-Schätzung in CHF und EUR. Kostenlos, datensparsam und ohne Risiko – du kannst nur gewinnen.</p>
          </header>

          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
            <div>
              <label className="text-sm text-slate-600">Bruttolohn (CHF/Monat)</label>
              <input type="number" min="0" step="100" value={values.gross_chf} onChange={e=>onChange('gross_chf', parseFloat(e.target.value||0))} className="mt-1 w-full rounded-lg border px-3 py-2" required />
            </div>
            <div>
              <label className="text-sm text-slate-600">Arbeitsort (Kanton/FL)</label>
              <input type="text" value={values.work_ch} onChange={e=>onChange('work_ch', e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" required />
            </div>
            <div>
              <label className="text-sm text-slate-600">Wohnsitz (AT)</label>
              <select value={values.residence_at} onChange={e=>onChange('residence_at', e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
                <option>Vorarlberg</option>
                <option>Tirol</option>
                <option>andere</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">Alter</label>
              <input type="number" min="16" max="70" value={values.age} onChange={e=>onChange('age', parseInt(e.target.value||0))} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Familienstand</label>
              <select value={values.marital} onChange={e=>onChange('marital', e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
                <option value="single">Single</option>
                <option value="married">Verheiratet</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600">Kinder</label>
              <input type="number" min="0" max="10" value={values.children_count} onChange={e=>onChange('children_count', parseInt(e.target.value||0))} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-slate-600">CHF → EUR Kurs</label>
              <input type="number" step="0.01" min="0.1" value={values.exchange_rate} onChange={e=>onChange('exchange_rate', parseFloat(e.target.value||0.95))} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-[#00B4D8] hover:bg-[#00A0C0] text-slate-900 font-semibold px-4 py-3 rounded-xl shadow">Jetzt Netto berechnen</button>
            </div>
          </form>

          {error && <div className="text-red-600">{error}</div>}
          {loading && <div className="text-slate-600">Berechne…</div>}

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card title="Dein Nettolohn (CHF)">
                <div className="text-3xl font-bold">CHF {result.net_chf.toLocaleString('de-AT')}</div>
                <p className="text-slate-600">Monatlich, nach Abzügen</p>
              </Card>
              <Card title="Dein Nettolohn (EUR)">
                <div className="text-3xl font-bold">€ {result.net_eur.toLocaleString('de-AT')}</div>
                <p className="text-slate-600">Mit deinem Wechselkurs</p>
              </Card>
              <Card title="Gesamtabzüge">
                <div className="text-3xl font-bold">CHF {result.total_deductions.toLocaleString('de-AT')}</div>
                <p className="text-slate-600">AHV/IV/EO, ALV, NBU, BVG, Quellensteuer</p>
              </Card>

              <div className="md:col-span-2 bg-white border rounded-xl p-4">
                <div className="font-semibold mb-2">Aufschlüsselung</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  {Object.entries(result.breakdown).map(([k,v]) => (
                    <li key={k} className="flex justify-between"><span>{k}</span><span>CHF {Number(v).toLocaleString('de-AT')}</span></li>
                  ))}
                </ul>
                <div className="text-xs text-slate-500 mt-3">{result.assumptions.disclaimer}</div>
              </div>

              <div className="bg-white border rounded-xl p-4">
                <div className="font-semibold mb-2">Mehr Netto sichern</div>
                <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                  <li>Optimale Krankenversicherung (CH vs. AT vs. Hybrid)</li>
                  <li>Steuerklasse und Quellensteuer prüfen</li>
                  <li>BVG und NBU smart wählen</li>
                </ul>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="#compare" className="inline-flex items-center justify-center gap-2 bg-[#0A4D8A] text-white px-4 py-2 rounded-lg">Versicherungen vergleichen</a>
                  <a href="https://calendly.com/easyjack/grenzgaenger-beratung" target="_blank" className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] text-slate-900 px-4 py-2 rounded-lg">Kostenloses Beratungsgespräch</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-1">{children}</div>
    </div>
  )
}
