
import React, { useState } from 'react';
import { Theme } from '../types';
import { INTEGRATIONS } from '../constants';
// Added Plus to the imports from lucide-react
import { 
  Search, CheckCircle2, AlertCircle, ExternalLink, Filter, Plus
} from 'lucide-react';

interface IntegrationsViewProps {
  theme: Theme;
}

const IntegrationsView: React.FC<IntegrationsViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');

  const filtered = INTEGRATIONS.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-20">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-10">
        <div className="space-y-2">
           <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 dark:text-slate-50">Integration Hub</h2>
           <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.4em]">Expertico Connectivity Engine V7.0</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Integrationen durchsuchen..." 
                className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-slate-950 dark:text-slate-50"
              />
           </div>
           <button className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-orange-500 transition-all"><Filter size={20}/></button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filtered.map(integration => (
          <div key={integration.id} className={`p-8 border rounded-[2.5rem] transition-all flex flex-col justify-between group h-[340px]
            ${isDark ? 'bg-slate-900/60 border-slate-800 hover:border-orange-500/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl'}`}>
            
            <div className="space-y-6">
               <div className="flex justify-between items-start">
                  <div className="text-4xl bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                     {integration.emoji}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.1em] shadow-sm
                    ${integration.status === 'connected' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    {integration.status === 'connected' ? <><CheckCircle2 size={10}/> Verbunden</> : <><AlertCircle size={10}/> Nicht konfiguriert</>}
                  </div>
               </div>

               <div>
                  <h3 className="text-base font-black uppercase tracking-widest text-slate-950 dark:text-slate-50">{integration.name}</h3>
                  <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mt-1 opacity-70">{integration.provider}</p>
               </div>

               <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed min-h-[44px]">
                  {integration.description}
               </p>
            </div>

            <div className="mt-8">
               <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                 ${integration.status === 'connected' 
                   ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-orange-500 hover:text-white shadow-sm' 
                   : 'bg-orange-500/5 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white'}`}>
                 {integration.type === 'Tool öffnen' ? <><ExternalLink size={14}/> Tool öffnen</> : 'Konfigurieren'}
               </button>
            </div>
          </div>
        ))}

        {/* Empty State / Custom Add */}
        <div className="p-8 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-orange-500/20 transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:text-orange-500 transition-all">
              <Plus size={32} />
           </div>
           <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Custom Webhook</h4>
           <p className="text-[10px] font-bold text-slate-500 mt-2">API Endpoint hinzufügen</p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
