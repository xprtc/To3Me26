
import React, { useState, useEffect, useMemo } from 'react';
import { UnitSettings, Persona, Theme, UnitId, AgentsSubPageId, DashletData, PageId, MainModuleId } from '../types';
import * as Icons from 'lucide-react';
import { 
  Copy, Check, Target, Settings, ChevronRight, User, AlertCircle, 
  Briefcase, LayoutGrid, ArrowLeft, Zap, Shield, 
  TrendingUp, Plus, ChevronDown, ChevronUp, Trash2, Sliders, 
  Globe, Database, Link2, HelpCircle, Move
} from 'lucide-react';
import { UNITS, ALL_DASHLETS } from '../constants';

interface AgentsViewProps {
  settings: UnitSettings;
  personas: Persona[];
  activeUnitId: UnitId | null;
  activeAgentId: string | null;
  theme: Theme;
  activePage: AgentsSubPageId;
  onSelectPage: (page: AgentsSubPageId) => void;
  isGlobalEditMode?: boolean;
  onUpdatePersona: (updated: Persona) => void;
  onAddPersona: (unitId: UnitId) => void;
  onNavigate?: (page: PageId) => void;
  onModuleChange?: (mod: MainModuleId) => void;
}

const AgentsView: React.FC<AgentsViewProps> = ({ 
  settings, 
  personas, 
  activeUnitId, 
  activeAgentId, 
  theme, 
  activePage, 
  onSelectPage,
  isGlobalEditMode,
  onUpdatePersona,
  onAddPersona,
  onNavigate,
  onModuleChange
}) => {
  const isDark = theme === 'dark';
  const [selectedUnit, setSelectedUnit] = useState<UnitId | null>(activeUnitId);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(activeAgentId);
  const [isCopied, setIsCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isUnitMenuOpen, setIsUnitMenuOpen] = useState(false);

  useEffect(() => {
    if (activeAgentId) {
      const agent = personas.find(p => p.id === activeAgentId);
      if (agent) {
        setSelectedUnit(agent.unitId);
        setSelectedAgentId(activeAgentId);
        if (activePage !== 'profile') onSelectPage('profile');
      }
    } else if (activeUnitId) {
      setSelectedUnit(activeUnitId);
      if (activePage !== 'units') onSelectPage('units');
    }
  }, [activeAgentId, activeUnitId]);

  const activeAgent = useMemo(() => 
    personas.find(p => p.id === selectedAgentId), 
    [selectedAgentId, personas]
  );

  const generatedPrompt = useMemo(() => {
    if (!activeAgent) return "";
    if (activeAgent.systemPrompt) return activeAgent.systemPrompt;
    const s = settings;
    return `ROLLE: ${activeAgent.role.toUpperCase()}\nERFAHRUNG: ${activeAgent.exp}\nKONTEXT: ${s.companyName}\n...`;
  }, [activeAgent, settings]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAgent?.systemPrompt || generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleUpdate = (field: keyof Persona, value: any) => {
    if (!activeAgent) return;
    onUpdatePersona({ ...activeAgent, [field]: value });
  };

  const renderUnitsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {UNITS.map(unit => {
        const UnitIcon = (Icons as any)[unit.icon] || Briefcase;
        return (
          <button 
            key={unit.id}
            onClick={() => { setSelectedUnit(unit.id); onSelectPage('units'); }}
            className={`p-8 border rounded-[2.5rem] text-left transition-all hover:scale-[1.03] group relative overflow-hidden
              ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl hover:border-orange-500/40 shadow-slate-200/40'}`}
          >
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <UnitIcon size={24} style={{ color: unit.color }} />
            </div>
            <h3 className={`text-sm font-black uppercase tracking-widest mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{unit.label}</h3>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Experten Unit</p>
            <div className="mt-8 flex items-center justify-between">
               <ChevronRight size={16} className={`${isDark ? 'text-slate-600' : 'text-slate-400'} group-hover:text-orange-500 transition-colors group-hover:translate-x-1 duration-300`} />
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderUnitDashboard = () => {
    const unit = UNITS.find(u => u.id === selectedUnit);
    const unitAgents = personas.filter(p => p.unitId === selectedUnit);
    const UnitIcon = unit ? (Icons as any)[unit.icon] : Briefcase;

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <button onClick={() => { setSelectedUnit(null); onSelectPage('units'); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-orange-600 transition-colors">
            <ArrowLeft size={14} /> Zurück zur Übersicht
          </button>
          <button onClick={() => onAddPersona(selectedUnit!)} className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl hover:scale-105 transition-all">
            <Plus size={14} /> Agent hinzufügen
          </button>
        </div>

        <header className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-inner">
            <UnitIcon size={24} style={{ color: unit?.color }} />
          </div>
          <div>
            <h2 className={`text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{unit?.label} Fleet</h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active AI Systems</p>
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {unitAgents.map(p => {
            const AgentIcon = (Icons as any)[p.icon] || User;
            return (
              <button key={p.id} onClick={() => { setSelectedAgentId(p.id); onSelectPage('profile'); }}
                className={`p-5 border rounded-[2rem] text-center transition-all hover:shadow-2xl group relative
                  ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-lg hover:border-orange-500'}`}>
                <div className="flex flex-col items-center gap-3">
                   <div className="p-2.5 bg-orange-500/10 text-orange-600 rounded-xl group-hover:scale-110 transition-transform"><AgentIcon size={20} /></div>
                   <h3 className={`text-[10px] font-black truncate w-full ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{p.name}</h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAgentProfile = () => {
    if (!activeAgent) return null;
    const AgentIcon = (Icons as any)[activeAgent.icon] || User;

    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-500 pb-20">
        <button onClick={() => onSelectPage('units')} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 hover:text-orange-600 transition-colors">
          <ArrowLeft size={14} /> Zurück zur {selectedUnit?.toUpperCase()} Division
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
             <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xl'}`}>
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-500/20"><AgentIcon size={32} /></div>
                   <div className="flex-1 min-w-0">
                      <input className={`w-full bg-transparent border-none text-2xl font-black tracking-tight focus:ring-0 p-0 ${isDark ? 'text-white' : 'text-slate-900'}`} value={activeAgent.name} onChange={e => handleUpdate('name', e.target.value)} />
                      <input className="w-full bg-transparent border-none text-[10px] font-black text-orange-600 uppercase tracking-widest focus:ring-0 p-0 mt-1" value={activeAgent.role} onChange={e => handleUpdate('role', e.target.value)} />
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-500' : 'text-slate-700'}`}>Hintergrund / Bio</h4>
                      <textarea className={`w-full rounded-2xl p-4 text-xs font-bold leading-relaxed border-none focus:ring-2 focus:ring-orange-500/30 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-700'}`} value={activeAgent.bio} onChange={e => handleUpdate('bio', e.target.value)} rows={4} />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                         <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Erfahrung</p>
                         <input className={`w-full bg-transparent border-none text-xs font-black focus:ring-0 p-0 ${isDark ? 'text-white' : 'text-slate-900'}`} value={activeAgent.exp} onChange={e => handleUpdate('exp', e.target.value)} />
                      </div>
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                         <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Unit</p>
                         <p className={`text-xs font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedUnit}</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-700'}`}><Zap size={14} className="text-orange-500" /> Denkprozess</h4>
                <textarea className={`w-full rounded-2xl p-4 text-[10px] font-mono border-none focus:ring-2 focus:ring-blue-500/30 ${isDark ? 'bg-slate-950 text-blue-400' : 'bg-slate-100 text-blue-700'}`} value={activeAgent.think} onChange={e => handleUpdate('think', e.target.value)} rows={3} />
             </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
             <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xl'}`}>
                <div className="flex justify-between items-center mb-8">
                   <div>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-700'}`}>Agent Workspace</h4>
                      <p className={`text-xs font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>System Prompt & Skript-Logik</p>
                   </div>
                   <button onClick={handleCopy} className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                     {isCopied ? <Check size={14}/> : <Icons.Copy size={14}/>} {isCopied ? 'Kopiert' : 'Copy Prompt'}
                   </button>
                </div>
                <textarea className={`w-full p-8 rounded-[2rem] text-[11px] font-mono leading-relaxed border-none focus:ring-2 focus:ring-orange-500/20 min-h-[400px] ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-800'}`} value={activeAgent.systemPrompt || generatedPrompt} onChange={e => handleUpdate('systemPrompt', e.target.value)} />
             </div>

             <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}>
                <button onClick={() => setShowAdvanced(!showAdvanced)} className={`w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest hover:text-orange-600 transition-colors ${isDark ? 'text-slate-500' : 'text-slate-700'}`}>
                  <span className="flex items-center gap-2"><Settings size={14} /> Advanced Options & Resources</span>
                  {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showAdvanced && (
                  <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                     <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2 tracking-widest"><Shield size={14} /> Quality Control Checklist</h5>
                        <div className="space-y-3">
                           {activeAgent.checklist.map((c, i) => (
                             <div key={i} className="flex items-center gap-3 group">
                                <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"><Check size={10} className="text-emerald-600" /></div>
                                <input className={`flex-1 bg-transparent border-none text-[10px] font-black uppercase tracking-tighter p-0 focus:ring-0 ${isDark ? 'text-slate-400' : 'text-slate-700'}`} value={c} onChange={e => {
                                  const newList = [...activeAgent.checklist]; newList[i] = e.target.value; handleUpdate('checklist', newList);
                                }} />
                                <button onClick={() => handleUpdate('checklist', activeAgent.checklist.filter((_, idx) => idx !== i))} className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-500"><Trash2 size={12}/></button>
                             </div>
                           ))}
                           <button onClick={() => handleUpdate('checklist', [...activeAgent.checklist, 'Neuer Punkt'])} className="text-[9px] font-black uppercase text-orange-600 hover:underline">+ Punkt hinzufügen</button>
                        </div>
                     </div>
                     <div className="h-[1px] bg-slate-200 dark:bg-slate-800 w-full" />
                     <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-2 tracking-widest"><TrendingUp size={14} /> Pipeline Helper</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           {['Team/Segment', 'Time Period', 'Focus Areas'].map((label, i) => (
                             <div key={i} className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                                <p className="text-[8px] font-black uppercase text-slate-500 mb-1">{label}</p>
                                <p className={`text-[10px] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{i===0?'Enterprise East':i===1?'Q1 2025':'Growth & Speed'}</p>
                             </div>
                           ))}
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.01] transition-all shadow-xl shadow-orange-500/20">
                          <Icons.Copy size={14} /> Build Pipeline Block Copy
                        </button>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-8 gap-4 auto-rows-[140px] pb-32 animate-in fade-in duration-700">
      {ALL_DASHLETS.agents.map((widget) => (
        <div key={widget.id} className={`p-5 rounded-[2rem] border transition-all duration-300 group backdrop-blur-xl
          ${isDark ? 'bg-slate-900/40 border-slate-800 shadow-lg' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40'}`}
          style={{ gridColumn: `span ${widget.w || 2}`, gridRow: `span ${widget.h || 1}` }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
               <div className={`p-1 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}><LayoutGrid size={10} className="text-slate-500" /></div>
               <h3 className="text-[8px] font-black uppercase tracking-widest text-slate-500 truncate">{widget.title}</h3>
            </div>
            <div className="flex items-baseline gap-1">
               <span className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{widget.metric}</span>
            </div>
            <div className="flex-1 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
               <TrendingUp size={16} style={{ color: widget.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-[1700px] mx-auto pb-20">
      {activePage === 'dashboard' && renderDashboard()}
      {activePage === 'units' && (!selectedUnit ? renderUnitsGrid() : renderUnitDashboard())}
      {activePage === 'profile' && renderAgentProfile()}
    </div>
  );
};

export default AgentsView;
