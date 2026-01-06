
import React, { useState } from 'react';
// Fix: Use correct type imports
import { UnitSettings, AutomationTask, Theme, UnitId } from '../types';
import { Copy, Clock, Zap, Plus, Trash2, Edit3, X } from 'lucide-react';

interface AutomationViewProps {
  // Fix: Use UnitSettings
  settings: UnitSettings;
  automations: AutomationTask[];
  onUpdateAutomations: (autos: AutomationTask[]) => void;
  theme: Theme;
  activeUnitId: UnitId | null;
}

const AutomationView: React.FC<AutomationViewProps> = ({ settings, automations, onUpdateAutomations, theme, activeUnitId }) => {
  const isDark = theme === 'dark';
  const [editingAuto, setEditingAuto] = useState<AutomationTask | null>(null);

  const saveAuto = (auto: AutomationTask) => {
    const exists = automations.find(a => a.id === auto.id);
    if (exists) {
      onUpdateAutomations(automations.map(a => a.id === auto.id ? auto : a));
    } else {
      onUpdateAutomations([...automations, auto]);
    }
    setEditingAuto(null);
  };

  const deleteAuto = (id: string) => {
    if (confirm("Delete task?")) {
      onUpdateAutomations(automations.filter(a => a.id !== id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className={`border rounded-2xl p-6 shadow-xl ${isDark ? 'bg-gradient-to-b from-[#121629] to-[#0e1533] border-[#202a5b]' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Zap className="text-[#ff7a59]" /> Automation & Tasks
          </h2>
          <button 
            onClick={() => setEditingAuto({ id: Date.now().toString(), unitId: activeUnitId || 'marketing', title: '', schedule: '', vevent: '', prompt: '' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff7a59] text-[#071224] font-bold text-sm shadow-md"
          >
            <Plus size={16} /> New Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automations.map((auto) => (
            <div key={auto.id} className={`border rounded-2xl p-5 transition-all ${isDark ? 'bg-[#0c132f] border-[#2a356f] hover:border-[#ff7a59]/50' : 'bg-slate-50 border-slate-200 hover:border-[#ff7a59]'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{auto.title}</h3>
                  <p className="text-xs text-[#ff7a59] mt-1 font-bold">{auto.schedule}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingAuto(auto)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={14} /></button>
                  <button onClick={() => deleteAuto(auto.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                  <button onClick={() => copyToClipboard(auto.prompt)} className="p-2 rounded-lg bg-[#1a2560] text-[#ff7a59] hover:bg-[#ff7a59] hover:text-[#071224] transition-all"><Copy size={14} /></button>
                </div>
              </div>
              <p className={`text-xs italic mb-4 line-clamp-2 ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>{auto.prompt}</p>
              <div className={`rounded-lg p-2 border text-[10px] font-mono ${isDark ? 'bg-black/40 border-white/10 text-emerald-400' : 'bg-slate-200 border-slate-300 text-slate-700'}`}>
                {auto.vevent.split('\n')[1]}
              </div>
            </div>
          ))}
        </div>

        {editingAuto && (
          <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl border ${isDark ? 'bg-[#121629] border-[#ff7a59]' : 'bg-white border-slate-300'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Task</h3>
                <button onClick={() => setEditingAuto(null)}><X /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase block mb-1">Title</label>
                  <input className={`w-full p-2 rounded-lg border ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50'}`} value={editingAuto.title} onChange={e => setEditingAuto({...editingAuto, title: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase block mb-1">Schedule Text (e.g. Daily 8 AM)</label>
                  <input className={`w-full p-2 rounded-lg border ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50'}`} value={editingAuto.schedule} onChange={e => setEditingAuto({...editingAuto, schedule: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase block mb-1">Prompt</label>
                  <textarea rows={3} className={`w-full p-2 rounded-lg border text-xs ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50'}`} value={editingAuto.prompt} onChange={e => setEditingAuto({...editingAuto, prompt: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase block mb-1">VEVENT Logic</label>
                  <textarea rows={2} className={`w-full p-2 rounded-lg border text-[10px] font-mono ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50'}`} value={editingAuto.vevent} onChange={e => setEditingAuto({...editingAuto, vevent: e.target.value})} />
                </div>
                <button onClick={() => saveAuto(editingAuto)} className="w-full py-3 rounded-xl bg-[#ff7a59] text-white font-bold">Save Task</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AutomationView;
