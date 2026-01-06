
import React from 'react';
import { Theme } from '../types';
import { INTEGRATIONS } from '../constants';
import { 
  Link2, CheckCircle2, AlertCircle, Settings2, Globe, Cpu, MessageSquare, Volume2
} from 'lucide-react';

interface IntegrationsViewProps {
  theme: Theme;
}

const IntegrationsView: React.FC<IntegrationsViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {INTEGRATIONS.map(integration => (
          <div key={integration.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-sm hover:border-blue-500 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  {integration.type === 'LLM' && <Cpu size={20} className="text-blue-600"/>}
                  {integration.type === 'Comms' && <MessageSquare size={20} className="text-orange-600"/>}
                  {integration.type === 'Voice' && <Volume2 size={20} className="text-emerald-600"/>}
                  {integration.type === 'WhatsApp' && <Globe size={20} className="text-green-600"/>}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{integration.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{integration.provider}</p>
                </div>
              </div>
              <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase">Active</div>
            </div>

            <div className="space-y-3 mb-6">
               <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Latency</span>
                  <span className="text-slate-900 dark:text-white">124ms</span>
               </div>
               <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>API Status</span>
                  <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={10}/> Operational</span>
               </div>
            </div>

            <button className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
              Configure Settings
            </button>
          </div>
        ))}

        <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-colors cursor-pointer">
           <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Settings2 size={24} className="text-slate-400" />
           </div>
           <h4 className="text-sm font-bold">Custom Webhook</h4>
           <p className="text-[10px] text-slate-500 max-w-[150px] mt-2 font-medium">Verbinde eigene Services über WAPI oder REST-APIs.</p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
