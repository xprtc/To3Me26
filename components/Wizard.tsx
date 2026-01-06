
import React, { useState, useEffect } from 'react';
import { CRM_CONTACTS, PERSONAS } from '../constants';
import { 
  X, Briefcase, UserPlus, Zap, ChevronRight, Check, 
  Target, Wallet, Calendar, Bot, ShieldCheck, ArrowRight,
  Rocket, Globe, Search, Plus, Clock, FileText, LayoutGrid,
  TrendingUp, Layers, CheckCircle2, AlertCircle
} from 'lucide-react';

interface WizardProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

const PRODUCT_CATALOG = [
  { id: 'p1', category: 'Webdesign', name: 'Digital Presence Starter Kit', price: 760, description: 'Die essenzielle Basis für Sichtbarkeit (5 Seiten).' },
  { id: 'p2', category: 'Webdesign', name: 'Expertico Enterprise Growth Engine', price: 1860, description: 'Full-Service inkl. Deep SEO, Chatbot & Lead Magnet.' },
  { id: 'p3', category: 'Webdesign', name: 'Elite E-Commerce Powerhouse', price: 3840, description: 'Komplettes Shop-System mit Stripe & Bexio.' },
  { id: 'p4', category: 'SEO', name: 'Authority Blog Pillar', price: 280, description: 'KI-gestützter Fachbeitrag (800 Wörter).' },
  { id: 'p5', category: 'SEO', name: 'Deep SEO Dominance', price: 480, description: 'Kontinuierliche Optimierung (Monthly).' },
  { id: 'p6', category: 'Content', name: 'Cinematic Business Short', price: 960, description: '90-sekündiges Firmenvideo.' },
  { id: 'p7', category: 'Conversion', name: 'Lead-Magnet Interactive', price: 180, description: 'Individuelle Quizze oder Rechner.' },
  { id: 'p8', category: 'Conversion', name: 'AI Concierge Agent', price: 280, description: '24/7 Leads- und Terminmaschine.' },
  { id: 'p9', category: 'Conversion', name: 'Precision Scheduling Tool', price: 340, description: 'Automatisierter Empfangsservice.' },
  { id: 'p10', category: 'Ads', name: 'Performance Google Ads', price: 380, description: 'KI-optimierte Kampagnen (Monthly).' },
];

const Wizard: React.FC<WizardProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState<'project' | 'lead' | 'task' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    newClientName: '',
    productId: '',
    newProductName: '',
    newProductPrice: '',
    agentId: 's1', // Default Saby
    notes: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else onComplete({ type: creationType, ...formData });
  };

  const selectedProduct = PRODUCT_CATALOG.find(p => p.id === formData.productId);
  const totalPrice = isAddingNewProduct ? Number(formData.newProductPrice) : (selectedProduct?.price || 0);

  const CreationTypeCard = ({ type, label, icon: Icon, description, color, activeColor }: any) => (
    <button
      onClick={() => { setCreationType(type); setStep(2); }}
      className={`p-8 rounded-[2.5rem] border-2 text-left transition-all duration-300 group relative overflow-hidden flex flex-col h-full
        ${creationType === type 
          ? `border-orange-500 bg-orange-500/5 shadow-[0_0_40px_rgba(249,115,22,0.15)]` 
          : 'border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:border-orange-500/40 hover:scale-[1.02]'}`}
    >
      <div className={`p-4 rounded-2xl w-fit mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${color} ${creationType === type ? activeColor : ''}`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h3 className="text-sm font-black uppercase tracking-[0.15em] mb-2">{label}</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{description}</p>
      {creationType === type && <div className="absolute top-4 right-4 text-orange-500"><Check size={20} strokeWidth={3} /></div>}
    </button>
  );

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-2xl cursor-pointer" onClick={onSkip} />
      <div className="absolute w-[900px] h-[900px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className={`max-w-[950px] w-full bg-white/95 dark:bg-[#0d1017]/95 border border-white/20 dark:border-slate-800/50 rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.6)] overflow-hidden relative transition-all duration-500 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 flex h-1.5 bg-slate-100/50 dark:bg-white/5">
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className={`h-full transition-all duration-700 ${i <= step ? 'flex-1 bg-gradient-to-r from-orange-400 to-amber-500' : 'w-0'}`} />
           ))}
        </div>

        {/* Header */}
        <div className="px-14 pt-16 pb-8 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-orange-500 text-white rounded-3xl shadow-2xl shadow-orange-500/40 animate-pulse">
                 <Rocket size={28} strokeWidth={2.5} />
              </div>
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tight">Project Genesis</h2>
                 <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.5em] mt-2 opacity-90">Expertico Fast-Track Engine V7.0</p>
              </div>
           </div>
           <button onClick={onSkip} className="p-5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90">
              <X size={32} className="text-slate-400" />
           </button>
        </div>

        <div className="px-14 py-8 min-h-[520px]">
          {/* STEP 1: MISSION */}
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-400">
              <div className="text-center space-y-4">
                 <h3 className="text-4xl font-black uppercase tracking-tight">Mission Initialisierung</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Wählen Sie den Pfad für maximale Profitabilität</p>
              </div>
              <div className="grid grid-cols-3 gap-8">
                 <CreationTypeCard 
                   type="project" label="Projekt" icon={Briefcase} 
                   description="Vollständige Umsetzung inkl. 5-Tage Timeline." color="bg-blue-500/10 text-blue-500" activeColor="bg-blue-500 text-white"
                 />
                 <CreationTypeCard 
                   type="lead" label="Lead Hub" icon={UserPlus} 
                   description="Lead Erfassung & Pipeline Automation." color="bg-emerald-500/10 text-emerald-500" activeColor="bg-emerald-500 text-white"
                 />
                 <CreationTypeCard 
                   type="task" label="AI Task" icon={Bot} 
                   description="Einmaliger Workflow durch spezialisierte Agenten." color="bg-fuchsia-500/10 text-fuchsia-500" activeColor="bg-fuchsia-500 text-white"
                 />
              </div>
            </div>
          )}

          {/* STEP 2: IDENTITY & CLIENT */}
          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-400">
              <div className="text-center space-y-3">
                 <h3 className="text-3xl font-black uppercase tracking-tight">Kunden Mapping</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Wer steht im Zentrum dieser Mission?</p>
              </div>
              <div className="max-w-2xl mx-auto space-y-8">
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-3 block ml-1">Projekt-Titel</label>
                    <input autoFocus className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-8 py-6 text-base font-black outline-none focus:border-orange-500 transition-all shadow-inner" placeholder="z.B. Q3 Growth Engine Architecture" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} />
                 </div>
                 
                 {!isAddingNewClient ? (
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-3 block ml-1">Existierender Kunde</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-8 py-6 text-base font-black outline-none focus:border-orange-500 appearance-none transition-all cursor-pointer" value={formData.client} onChange={e => handleInputChange('client', e.target.value)}>
                          <option value="">Aus Datenbank wählen...</option>
                          {CRM_CONTACTS.slice(0, 10).map(c => <option key={c.id} value={c.company || c.name}>{c.company || c.name}</option>)}
                        </select>
                        <ChevronRight size={20} className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                      </div>
                      <button onClick={() => setIsAddingNewClient(true)} className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-500 hover:opacity-70 transition-all ml-2 pt-2">
                        <Plus size={14} strokeWidth={3}/> Neuen Kunden erstellen
                      </button>
                   </div>
                 ) : (
                   <div className="p-8 bg-orange-500/5 border-2 border-orange-500/30 rounded-[2rem] space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black uppercase text-orange-500 tracking-widest">Neuer Kunde (Fast-Entry)</h4>
                        <button onClick={() => setIsAddingNewClient(false)} className="text-slate-400 hover:text-rose-500"><X size={18}/></button>
                      </div>
                      <input className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Firma / Name" value={formData.newClientName} onChange={e => handleInputChange('newClientName', e.target.value)} />
                   </div>
                 )}
              </div>
            </div>
          )}

          {/* STEP 3: PRODUCT CATALOG */}
          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-400">
               <div className="text-center space-y-3">
                 <h3 className="text-3xl font-black uppercase tracking-tight">Produkt Auswahl</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Profit-Mapping: Günstige Preise, hohe Effizienz</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-4 scrollbar-hide">
                  {PRODUCT_CATALOG.map(p => (
                    <button key={p.id} onClick={() => { handleInputChange('productId', p.id); setIsAddingNewProduct(false); }} className={`p-6 border-2 rounded-[2rem] text-left transition-all group relative flex flex-col justify-between ${formData.productId === p.id && !isAddingNewProduct ? 'border-orange-500 bg-orange-500/5 shadow-lg' : 'border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:border-orange-500/30'}`}>
                       <div>
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{p.category}</span>
                             <span className="text-sm font-black text-orange-500">CHF {p.price}.-</span>
                          </div>
                          <h4 className="text-[11px] font-black uppercase tracking-widest leading-tight group-hover:text-orange-500 transition-colors">{p.name}</h4>
                       </div>
                       {formData.productId === p.id && !isAddingNewProduct && <div className="absolute top-4 right-4 text-orange-500"><Check size={18} strokeWidth={3} /></div>}
                    </button>
                  ))}
                  <button onClick={() => { setIsAddingNewProduct(true); handleInputChange('productId', ''); }} className={`p-6 border-2 border-dashed rounded-[2rem] text-center transition-all flex flex-col items-center justify-center gap-3 ${isAddingNewProduct ? 'border-orange-500 bg-orange-500/5 shadow-lg' : 'border-slate-200 dark:border-slate-800 hover:border-orange-500/40 text-slate-400'}`}>
                     <Plus size={24} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Eigenes Produkt erstellen</span>
                  </button>
               </div>

               {isAddingNewProduct && (
                 <div className="mt-4 grid grid-cols-2 gap-4 p-6 bg-orange-500/5 border-2 border-orange-500/20 rounded-[2rem] animate-in zoom-in-95 duration-300">
                    <input className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold" placeholder="Produkt Name" value={formData.newProductName} onChange={e => handleInputChange('newProductName', e.target.value)} />
                    <input type="number" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold" placeholder="Preis in CHF" value={formData.newProductPrice} onChange={e => handleInputChange('newProductPrice', e.target.value)} />
                 </div>
               )}
            </div>
          )}

          {/* STEP 4: HYPER-SPEED TIMELINE */}
          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-400">
               <div className="text-center space-y-3">
                 <h3 className="text-3xl font-black uppercase tracking-tight">5-Tage Hyper-Speed</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Standardisierte Exzellenz in Rekordzeit</p>
               </div>

               <div className="grid grid-cols-5 gap-3 h-[280px]">
                  {[
                    { d: 1, t: 'Intelligence', a: 'Saby (40%)', desc: 'Strategy Build' },
                    { d: 2, t: 'Design', a: 'Leyla (60%)', desc: 'UI Sprint' },
                    { d: 3, t: 'Content', a: 'Leyla (60%)', desc: 'SEO Build' },
                    { d: 4, t: 'Tech', a: 'Leyla (60%)', desc: 'Automation' },
                    { d: 5, t: 'QA & Delivery', a: 'Saby (40%)', desc: 'Final Sync' }
                  ].map(day => (
                    <div key={day.d} className="flex flex-col gap-4">
                       <div className="flex-1 p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center group hover:border-orange-500/50 transition-all">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-orange-500 mb-3 text-xs group-hover:scale-110 transition-transform">D{day.d}</div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white leading-tight">{day.t}</h4>
                          <p className="text-[8px] font-bold text-slate-500 mt-2">{day.desc}</p>
                       </div>
                       <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 text-center">
                          <span className="text-[8px] font-black uppercase tracking-widest">{day.a}</span>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-4">
                  <Clock size={20} className="text-blue-500" />
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-relaxed">
                     "Out of Time is Out of Money!" - Das System blockiert automatisch Zeitslots in den Agenten-Kalendern.
                  </p>
               </div>
            </div>
          )}

          {/* STEP 5: DEPLOYMENT */}
          {step === 5 && (
            <div className="space-y-10 animate-in zoom-in-95 duration-400 text-center">
               <div className="relative inline-block">
                  <div className="w-28 h-28 bg-emerald-500 text-white rounded-[3rem] flex items-center justify-center mx-auto shadow-[0_30px_70px_rgba(16,185,129,0.4)] mb-8 relative z-10">
                    <Check size={56} strokeWidth={4} />
                  </div>
                  <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-5xl font-black uppercase tracking-tight">Ready for Deployment</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Alle System-Parameter wurden erfolgreich validiert</p>
               </div>
               <div className="max-w-[500px] mx-auto p-12 bg-slate-50 dark:bg-slate-900/40 rounded-[3.5rem] border-2 border-white/50 dark:border-slate-800/50 shadow-inner space-y-6">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase border-b border-slate-200 dark:border-slate-800 pb-4">
                     <span className="text-slate-400 tracking-widest">Mandant</span>
                     <span className="text-slate-900 dark:text-white">{isAddingNewClient ? formData.newClientName : (formData.client || 'Hausintern')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black uppercase border-b border-slate-200 dark:border-slate-800 pb-4">
                     <span className="text-slate-400 tracking-widest">Investition</span>
                     <span className="text-orange-500">CHF {totalPrice}.-</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black uppercase">
                     <span className="text-slate-400 tracking-widest">Zahlungsplan</span>
                     <div className="text-right">
                        <p className="text-emerald-500">50% Anzahlung (Start)</p>
                        <p className="text-slate-500 opacity-60">50% Restzahlung (D5)</p>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-14 py-12 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <div className="flex items-center gap-6">
              <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Checkpoint {step}/5</span>
              <div className="flex gap-2">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i === step ? 'w-14 bg-orange-500' : 'w-3 bg-slate-300 dark:bg-slate-700'}`} />
                 ))}
              </div>
           </div>
           <div className="flex items-center gap-6">
             {step > 1 && (
               <button onClick={() => setStep(step - 1)} className="px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">Zurück</button>
             )}
             <button onClick={handleNext} disabled={step === 1 && !creationType} className={`flex items-center gap-4 px-16 py-6 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95 ${step === 1 && !creationType ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-orange-500/40 hover:translate-y-[-4px] hover:shadow-orange-500/60'}`}>
               {step === 5 ? 'Mission starten' : 'Weiter'} <ArrowRight size={20} strokeWidth={3} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
