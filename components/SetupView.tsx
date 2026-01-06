
import React from 'react';
import { UnitSettings, Theme, UnitId } from '../types';
import { Settings as SettingsIcon, Landmark, Users, ShieldCheck, PieChart, Info } from 'lucide-react';

interface SetupViewProps {
  settings: UnitSettings;
  onUpdate: (settings: Partial<UnitSettings>) => void;
  theme: Theme;
  activeUnitId: UnitId | null;
}

const SetupView: React.FC<SetupViewProps> = ({ settings, onUpdate, theme, activeUnitId }) => {
  const isDark = theme === 'dark';

  const handleChange = (field: keyof UnitSettings, value: any) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className={`border rounded-[2.5rem] p-8 shadow-2xl transition-all duration-300 ${isDark ? 'bg-[#121629] border-[#202a5b]' : 'bg-white border-slate-200'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shared Basic Info */}
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Unternehmensname</label>
            <input 
              className={`w-full border rounded-2xl px-5 py-3 text-sm font-bold outline-none transition-all focus:border-[#ff7a59] ${isDark ? 'bg-[#0c132f] border-[#28346b] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block ml-1">Währung</label>
                <input 
                  className={`w-full border rounded-2xl px-5 py-3 text-sm font-bold outline-none ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50'}`}
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                />
             </div>
             <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block ml-1">Tonalität</label>
                <select 
                  className={`w-full border rounded-2xl px-4 py-3 text-sm font-bold outline-none ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50'}`}
                  value={settings.tone}
                  onChange={(e) => handleChange('tone', e.target.value)}
                >
                   <option value="professional">Professionell</option>
                   <option value="casual">Freundlich</option>
                </select>
             </div>
          </div>
        </div>

        {/* Dynamic Context Block */}
        <div className={`p-8 rounded-[2rem] border flex flex-col justify-center transition-all ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
          {!activeUnitId ? (
            <div className="text-center opacity-40">
               <Info size={40} className="mx-auto mb-4 text-slate-500" />
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Wählen Sie eine Unit im Sidebar-Dropdown aus.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
               <h4 className="text-xs font-black uppercase text-[#ff7a59] mb-4 flex items-center gap-2">
                 {activeUnitId === 'finance' && <Landmark size={14}/>}
                 {activeUnitId === 'strategic' && <PieChart size={14}/>}
                 {activeUnitId === 'support' && <ShieldCheck size={14}/>}
                 {activeUnitId === 'sales' && <Users size={14}/>}
                 {activeUnitId.toUpperCase()} Parameter
               </h4>
               
               {activeUnitId === 'finance' && (
                 <div className="space-y-4">
                    <label className="text-[9px] font-bold uppercase text-slate-500 block mb-1">Kontenrahmen (COA)</label>
                    <textarea 
                      className="w-full p-3 rounded-xl bg-black/20 text-[11px] font-mono border border-white/5" 
                      rows={5} 
                      value={settings.coa} 
                      onChange={e => handleChange('coa', e.target.value)} 
                    />
                    <div className="grid grid-cols-2 gap-3">
                       <input placeholder="AP Flag" type="number" className="p-2 rounded-lg bg-black/20 text-xs" value={settings.apFlag} onChange={e => handleChange('apFlag', Number(e.target.value))} />
                       <input placeholder="Cushion" type="number" className="p-2 rounded-lg bg-black/20 text-xs" value={settings.minCushion} onChange={e => handleChange('minCushion', Number(e.target.value))} />
                    </div>
                 </div>
               )}

               {activeUnitId === 'strategic' && (
                 <div className="space-y-4">
                    <input placeholder="Branche / Nische" className="w-full p-3 rounded-xl bg-black/20 text-xs" value={settings.industry} onChange={e => handleChange('industry', e.target.value)} />
                    <textarea placeholder="Primäre Ziele..." className="w-full p-3 rounded-xl bg-black/20 text-xs" rows={4} value={settings.goals} onChange={e => handleChange('goals', e.target.value)} />
                 </div>
               )}

               {activeUnitId === 'sales' && (
                 <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Avg. Deal Size" type="number" className="w-full p-3 rounded-xl bg-black/20 text-xs" value={settings.avgDealSize} onChange={e => handleChange('avgDealSize', Number(e.target.value))} />
                    <input placeholder="Cycle Length" type="number" className="w-full p-3 rounded-xl bg-black/20 text-xs" value={settings.salesCycleLength} onChange={e => handleChange('salesCycleLength', Number(e.target.value))} />
                 </div>
               )}

               {activeUnitId === 'support' && (
                 <div className="space-y-4">
                    <input placeholder="Support Stunden" className="w-full p-3 rounded-xl bg-black/20 text-xs" value={settings.supportHours} onChange={e => handleChange('supportHours', e.target.value)} />
                    <input placeholder="FRT Ziel (Minuten)" type="number" className="w-full p-3 rounded-xl bg-black/20 text-xs" value={settings.slaFirstResponseMins} onChange={e => handleChange('slaFirstResponseMins', Number(e.target.value))} />
                 </div>
               )}

               {activeUnitId === 'marketing' && (
                 <div className="space-y-4">
                    <p className="text-[10px] font-bold text-slate-500 italic">Marketing nutzt die globalen Einstellungen.</p>
                    <input placeholder="Branche" className="w-full p-3 rounded-xl bg-black/20 text-xs" value={settings.industry} onChange={e => handleChange('industry', e.target.value)} />
                 </div>
               )}
            </div>
          )}
        </div>

        <div className="col-span-full pt-8 border-t border-slate-700/30">
           <button 
             onClick={() => alert("Einstellungen gespeichert.")}
             className="px-10 py-3.5 rounded-2xl bg-gradient-to-r from-[#ff7a59] to-[#ff9a80] text-[#071224] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
           >
             Save Configuration
           </button>
        </div>
      </div>
    </div>
  );
};

export default SetupView;
