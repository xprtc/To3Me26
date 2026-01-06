
import React, { useState, useEffect } from 'react';
// Fix: Removed non-existent export 'Persona' from '../constants'
import { CRM_CONTACTS, PERSONAS } from '../constants';
import { 
  X, Briefcase, UserPlus, Zap, ChevronRight, Check, 
  Target, Wallet, Calendar, Bot, ShieldCheck, ArrowRight,
  Sparkles, LayoutGrid, Star, Rocket, Globe
} from 'lucide-react';

interface WizardProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

const Wizard: React.FC<WizardProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState<'project' | 'lead' | 'task' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    budget: '',
    deadline: '',
    agentId: '',
    priority: 'medium',
    notes: ''
  });

  useEffect(() => {
    // Snappy enter animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete({ type: creationType, ...formData });
  };

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
      
      {creationType === type && (
        <div className="absolute top-4 right-4 text-orange-500">
           <Check size={20} strokeWidth={3} />
        </div>
      )}
    </button>
  );

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-200 
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* High-End Backdrop with Glow */}
      <div 
        className="absolute inset-0 bg-slate-900/30 dark:bg-black/40 backdrop-blur-2xl cursor-pointer"
        onClick={onSkip}
      />
      
      {/* Halo Effect */}
      <div className="absolute w-[800px] h-[800px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div 
        className={`max-w-[850px] w-full bg-white/90 dark:bg-[#0f121d]/90 border border-white/20 dark:border-slate-800/50 rounded-[3.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.5)] overflow-hidden relative transition-all duration-300 transform
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        {/* Progress System */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 bg-slate-100/50 dark:bg-white/5">
           {[1, 2, 3, 4].map(i => (
             <div 
               key={i} 
               className={`h-1.5 flex-1 rounded-full transition-all duration-700
                 ${i <= step ? 'bg-gradient-to-r from-orange-400 to-amber-500' : 'bg-slate-200 dark:bg-slate-800'}`} 
             />
           ))}
        </div>

        {/* Header */}
        <div className="px-12 pt-14 pb-8 flex items-center justify-between">
           <div className="flex items-center gap-5">
              <div className="p-4 bg-orange-500 text-white rounded-3xl shadow-2xl shadow-orange-500/30 animate-pulse">
                 <Rocket size={24} strokeWidth={2.5} />
              </div>
              <div>
                 <h2 className="text-2xl font-black uppercase tracking-tight">Project Genesis</h2>
                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mt-1.5 opacity-80">
                    V7.0 Fast-Track Deployment
                 </p>
              </div>
           </div>
           <button 
             onClick={onSkip} 
             className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90"
           >
              <X size={28} className="text-slate-400" />
           </button>
        </div>

        {/* Body Area */}
        <div className="px-12 py-6 min-h-[480px]">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-300">
              <div className="text-center space-y-3">
                 <h3 className="text-3xl font-black uppercase tracking-tight">Mission auswählen</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Initialisieren Sie Ihren nächsten Meilenstein</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <CreationTypeCard 
                   type="project" 
                   label="Projekt" 
                   icon={Briefcase} 
                   description="Full Lifecycle Management für Kunden-Erfolge" 
                   color="bg-blue-500/10 text-blue-500"
                   activeColor="bg-blue-500 text-white"
                 />
                 <CreationTypeCard 
                   type="lead" 
                   label="Lead Hub" 
                   icon={UserPlus} 
                   description="CRM-Zuwachs & Strategische Opportunities" 
                   color="bg-emerald-500/10 text-emerald-500"
                   activeColor="bg-emerald-500 text-white"
                 />
                 <CreationTypeCard 
                   type="task" 
                   label="AI Task" 
                   icon={Bot} 
                   description="Automatisierte Strategie-Workflows" 
                   color="bg-fuchsia-500/10 text-fuchsia-500"
                   activeColor="bg-fuchsia-500 text-white"
                 />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center gap-3">
                 <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform"/> Zurück zur Auswahl
                 </button>
              </div>
              
              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div className="group">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block ml-1">Projekt-Identität</label>
                       <input 
                         autoFocus
                         className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-6 py-5 text-sm font-black outline-none focus:border-orange-500 transition-all shadow-inner"
                         placeholder="z.B. Q3 Scaling Roadmap"
                         value={formData.title}
                         onChange={e => handleInputChange('title', e.target.value)}
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block ml-1">Client Association</label>
                       <div className="relative">
                          <select 
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-6 py-5 text-sm font-black outline-none focus:border-orange-500 appearance-none transition-all cursor-pointer"
                            value={formData.client}
                            onChange={e => handleInputChange('client', e.target.value)}
                          >
                            <option value="">Aus Datenbank wählen...</option>
                            {CRM_CONTACTS.map(c => <option key={c.id} value={c.company}>{c.company || c.name}</option>)}
                          </select>
                          <ChevronRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                       </div>
                    </div>
                 </div>
                 
                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block ml-1">Budget</label>
                          <div className="relative">
                            <input 
                              type="number"
                              className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-6 py-5 text-sm font-black outline-none focus:border-orange-500 transition-all"
                              placeholder="0"
                              value={formData.budget}
                              onChange={e => handleInputChange('budget', e.target.value)}
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">CHF</span>
                          </div>
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block ml-1">Deadline</label>
                          <input 
                            type="date"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-6 py-5 text-xs font-black outline-none focus:border-orange-500 transition-all"
                            value={formData.deadline}
                            onChange={e => handleInputChange('deadline', e.target.value)}
                          />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block ml-1">Briefing / Fokus</label>
                       <textarea 
                         rows={2}
                         className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-6 py-5 text-sm font-bold outline-none focus:border-orange-500 transition-all resize-none shadow-inner"
                         placeholder="Ziele, Pain Points & Milestones..."
                         value={formData.notes}
                         onChange={e => handleInputChange('notes', e.target.value)}
                       />
                    </div>
                 </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-300">
               <div className="text-center space-y-3">
                 <h3 className="text-3xl font-black uppercase tracking-tight">AI Division Zuweisung</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Welche Expertise soll das Projekt leiten?</p>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  {PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleInputChange('agentId', p.id)}
                      className={`p-6 border-2 rounded-[2rem] text-left transition-all flex items-center gap-5 group relative
                        ${formData.agentId === p.id 
                          ? 'border-blue-500 bg-blue-500/5 shadow-lg' 
                          : 'border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:border-blue-500/30'}`}
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black transition-all duration-500 ${formData.agentId === p.id ? 'bg-blue-500 text-white scale-110 rotate-3' : 'text-slate-400 group-hover:text-blue-500'}`}>
                         {p.name[0]}
                      </div>
                      <div className="flex-1">
                         <h4 className="text-[11px] font-black uppercase tracking-widest">{p.name}</h4>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{p.role}</p>
                      </div>
                      {formData.agentId === p.id && (
                        <div className="absolute top-4 right-4 text-blue-500">
                           <ShieldCheck size={20} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-in zoom-in-95 duration-300 text-center">
               <div className="relative inline-block">
                  <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_20px_50px_rgba(16,185,129,0.3)] mb-8 relative z-10">
                    <Check size={48} strokeWidth={4} />
                  </div>
                  <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
               </div>
               
               <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase tracking-tight">Ready for Deployment</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Alle System-Parameter wurden erfolgreich validiert</p>
               </div>

               <div className="max-w-[450px] mx-auto p-10 bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border-2 border-white/50 dark:border-slate-800/50 shadow-inner space-y-5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase border-b border-slate-200 dark:border-slate-800 pb-4">
                     <span className="text-slate-400 tracking-widest">Typus</span>
                     <span className="text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">{creationType?.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase border-b border-slate-200 dark:border-slate-800 pb-4">
                     <span className="text-slate-400 tracking-widest">Mission</span>
                     <span className="truncate max-w-[200px] text-slate-900 dark:text-white">{formData.title}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                     <span className="text-slate-400 tracking-widest">AI Command</span>
                     <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                        {PERSONAS.find(p => p.id === formData.agentId)?.name || 'Standard OS'}
                     </span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer Interaction */}
        <div className="px-12 py-10 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Step {step}/4</span>
              <div className="flex gap-1.5">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-orange-500' : 'w-2 bg-slate-300 dark:bg-slate-700'}`} />
                 ))}
              </div>
           </div>
           
           <div className="flex items-center gap-4">
             {step > 1 && (
               <button 
                 onClick={() => setStep(step - 1)}
                 className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
               >
                 Zurück
               </button>
             )}
             
             <button 
               onClick={handleNext}
               disabled={step === 1 && !creationType}
               className={`flex items-center gap-3 px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95
                 ${step === 1 && !creationType 
                   ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                   : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-orange-500/30 hover:translate-y-[-2px] hover:shadow-orange-500/50'}`}
             >
               {step === 4 ? 'Mission starten' : 'Weiter'} <ArrowRight size={16} strokeWidth={3} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
