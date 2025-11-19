import { useState, useMemo } from 'react'
import Hero from './components/Hero'
import StepPersonal from './components/StepPersonal'
import StepSituation from './components/StepSituation'
import StepLoading from './components/StepLoading'
import StepResult from './components/StepResult'
import PrivacyModal from './components/PrivacyModal'
import CalendlyModal from './components/CalendlyModal'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [step, setStep] = useState(1)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [calOpen, setCalOpen] = useState(false)
  const [result, setResult] = useState(null)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_date: '',
    residence_at: '',
    work_ch: '',
    consent_email: false,
    consent_whatsapp: false,
    status: 'Neu-Grenzgänger',
    family: 'Allein',
    children_count: 0,
    health: 'Bespreche ich persönlich',
  })

  const onChange = (patch) => setForm(prev => ({...prev, ...patch}))

  const start = () => setStep(2)
  const nextFromPersonal = () => setStep(3)
  const submitSituation = async () => {
    setStep(4)
    try {
      const payload = { lead: { ...form } }
      const res = await fetch(`${BACKEND}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
    }
  }
  const gotoResult = () => setStep(5)

  const showCalendly = () => setCalOpen(true)
  const sendEmail = () => {
    const mailto = `mailto:info@grenzgaenger-service.at?subject=${encodeURIComponent('🔥 Neuer Lead: Grenzgänger-Rechner')}&body=${encodeURIComponent(JSON.stringify({ form, result }, null, 2))}`
    window.location.href = mailto
  }

  // Move from loading to result automatically
  if (step === 4 && result) {
    // small delay to keep animation
    setTimeout(()=> setStep(5), 700)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {step === 1 && <Hero onStart={start} />}
      {step === 2 && (
        <StepPersonal data={form} onChange={onChange} onNext={nextFromPersonal} onOpenPrivacy={()=>setPrivacyOpen(true)} />
      )}
      {step === 3 && (
        <StepSituation data={form} onChange={onChange} onNext={submitSituation} />
      )}
      {step === 4 && (
        <StepLoading onDone={gotoResult} />
      )}
      {step === 5 && (
        <StepResult result={result} onBook={showCalendly} onWhatsApp={()=>{}} onEmail={sendEmail} />
      )}

      {privacyOpen && <PrivacyModal open={privacyOpen} onClose={()=>setPrivacyOpen(false)} />}
      {calOpen && <CalendlyModal open={calOpen} onClose={()=>setCalOpen(false)} />}

      <footer className="max-w-5xl mx-auto px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div>
            <div className="font-semibold text-[#0A4D8A]">Grenzgänger-Service by Easyjack</div>
            <div className="text-slate-500">Versicherung – aber einfach</div>
          </div>
          <div className="text-right">
            <div>Kontakt: Daniel Peric</div>
            <div>+43 660 522 11 49 • info@grenzgaenger-service.at</div>
          </div>
        </div>
      </footer>

      {/* Cookie notice minimal */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border rounded-xl shadow p-3 text-sm max-w-md">
        <div>
          Wir verwenden nur technisch notwendige Cookies. <button className="underline text-[#0A4D8A]" onClick={()=>setPrivacyOpen(true)}>Mehr</button>
        </div>
      </div>

      {/* WhatsApp bubble */}
      <a href="https://wa.me/436605221149?text=Hi%20Daniel!%20Vom%20Grenzg%C3%A4nger-Rechner..." target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 bg-[#00B4D8] text-slate-900 font-semibold px-4 py-3 rounded-full shadow">💬 Fragen? WhatsApp</a>
    </div>
  )
}
