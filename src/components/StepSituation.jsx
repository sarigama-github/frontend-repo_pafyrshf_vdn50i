export default function StepSituation({ data, onChange, onNext }) {
  const submit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <section className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-[#0A4D8A]">Deine Situation</h2>
      <p className="text-slate-600 mb-4">Keine Gesundheitsdetails online – das klären wir persönlich.</p>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Status</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Neu-Grenzgänger','Bereits Grenzgänger','Plane Wechsel'].map(v => (
              <label key={v} className={`border rounded-lg p-3 cursor-pointer ${data.status===v?'border-[#0A4D8A] bg-[#0A4D8A]/5':''}`}>
                <input type="radio" name="status" className="mr-2" checked={data.status===v} onChange={()=>onChange({status:v})} />{v}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Familie</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Allein','Mit Partner','Mit Kindern'].map(v => (
              <label key={v} className={`border rounded-lg p-3 cursor-pointer ${data.family===v?'border-[#0A4D8A] bg-[#0A4D8A]/5':''}`}>
                <input type="radio" name="family" className="mr-2" checked={data.family===v} onChange={()=>onChange({family:v})} />{v}
              </label>
            ))}
          </div>
          {data.family==='Mit Kindern' && (
            <div className="mt-3">
              <label className="text-sm text-slate-600">Anzahl Kinder</label>
              <input type="number" min="0" max="10" className="w-full border rounded-lg p-3" value={data.children_count||0} onChange={(e)=>onChange({children_count: Number(e.target.value)})} />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Gesundheit</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Keine Vorerkrankungen','Chronisch krank','Bespreche ich persönlich'].map(v => (
              <label key={v} className={`border rounded-lg p-3 cursor-pointer ${data.health===v?'border-[#0A4D8A] bg-[#0A4D8A]/5':''}`}>
                <input type="radio" name="health" className="mr-2" checked={data.health===v} onChange={()=>onChange({health:v})} />{v}
              </label>
            ))}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border text-sm">⚕️ Gesundheitsdaten nur im persönlichen Gespräch – nie online!</div>
        <div className="flex justify-end">
          <button className="bg-[#0A4D8A] text-white px-6 py-3 rounded-xl">Weiter</button>
        </div>
      </form>
    </section>
  );
}
