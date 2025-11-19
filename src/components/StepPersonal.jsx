import { useState } from 'react';

const ResidenceOptions = ["Vorarlberg", "Tirol", "andere"];
const WorkOptions = [
  "Zürich (ZH)", "St. Gallen (SG)", "Graubünden (GR)", "Basel (BS/BL)", "Genf (GE)", "Bern (BE)", "Liechtenstein"
];

export default function StepPersonal({ data, onChange, onNext, onOpenPrivacy }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.first_name) e.first_name = 'Bitte Vornamen eingeben';
    if (!data.last_name) e.last_name = 'Bitte Nachnamen eingeben';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Gültige E-Mail angeben';
    if (data.phone && !/^\+43\d{7,13}$/.test(data.phone)) e.phone = 'Format: +43...';
    if (!data.residence_at) e.residence_at = 'Bitte wählen';
    if (!data.work_ch) e.work_ch = 'Bitte wählen';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <section className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-[#0A4D8A]">Deine Daten</h2>
      <p className="text-slate-600 mb-4">Wir brauchen nur das Nötigste. Du kannst jederzeit widerrufen.</p>
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-600">Vorname*</label>
          <input className="w-full border rounded-lg p-3" value={data.first_name||''} onChange={(e)=>onChange({first_name:e.target.value})} />
          {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-600">Nachname*
          </label>
          <input className="w-full border rounded-lg p-3" value={data.last_name||''} onChange={(e)=>onChange({last_name:e.target.value})} />
          {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-600">E-Mail*</label>
          <input type="email" className="w-full border rounded-lg p-3" value={data.email||''} onChange={(e)=>onChange({email:e.target.value})} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-600">Telefon (optional)</label>
          <input placeholder="+43..." className="w-full border rounded-lg p-3" value={data.phone||''} onChange={(e)=>onChange({phone:e.target.value})} />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-600">Geburtsdatum</label>
          <input type="date" className="w-full border rounded-lg p-3" value={data.birth_date||''} onChange={(e)=>onChange({birth_date:e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-slate-600">Wohnort (AT)</label>
          <select className="w-full border rounded-lg p-3" value={data.residence_at||''} onChange={(e)=>onChange({residence_at:e.target.value})}>
            <option value="">Bitte wählen</option>
            {ResidenceOptions.map(o=> <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.residence_at && <p className="text-red-600 text-sm">{errors.residence_at}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-600">Arbeitsort (CH/FL)</label>
          <select className="w-full border rounded-lg p-3" value={data.work_ch||''} onChange={(e)=>onChange({work_ch:e.target.value})}>
            <option value="">Bitte wählen</option>
            {WorkOptions.map(o=> <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.work_ch && <p className="text-red-600 text-sm">{errors.work_ch}</p>}
        </div>
        <div className="sm:col-span-2 border rounded-lg p-3 space-y-2 bg-slate-50">
          <div className="flex items-center gap-2">
            <input id="consent_email" type="checkbox" checked={!!data.consent_email} onChange={(e)=>onChange({consent_email:e.target.checked})} />
            <label htmlFor="consent_email" className="text-sm">E-Mail-Kontakt erlaubt (widerrufbar)</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="consent_whatsapp" type="checkbox" checked={!!data.consent_whatsapp} onChange={(e)=>onChange({consent_whatsapp:e.target.checked})} />
            <label htmlFor="consent_whatsapp" className="text-sm">WhatsApp/Telefon erlaubt (optional)</label>
          </div>
          <button type="button" onClick={onOpenPrivacy} className="text-[#0A4D8A] underline text-sm">Datenschutz</button>
        </div>
        <div className="sm:col-span-2 flex justify-end">
          <button className="bg-[#0A4D8A] text-white px-6 py-3 rounded-xl">Weiter</button>
        </div>
      </form>
    </section>
  );
}
