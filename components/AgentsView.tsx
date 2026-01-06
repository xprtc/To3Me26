
import React, { useState, useEffect, useMemo } from 'react';
import { UnitSettings, Persona, Theme, UnitId, AgentsSubPageId, DashletData, PageId, MainModuleId } from '../types';
import * as Icons from 'lucide-react';
import { 
  Copy, Check, Target, Settings, ChevronRight, User, AlertCircle, 
  MousePointer2, Briefcase, LayoutGrid, ArrowLeft, Zap, Info, Shield, 
  Search, Filter, TrendingUp, Users, Activity, LayoutDashboard, Maximize2, Move,
  Plus, Save, ChevronDown, ChevronUp, Trash2, Sliders, Globe, Database, HardDrive, Link2, HelpCircle
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
  const isEditMode = isGlobalEditMode || false;
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
        onSelectPage('profile');
      }
    } else if (activeUnitId) {
      setSelectedUnit(activeUnitId);
      onSelectPage('units');
    }
  }, [activeAgentId, activeUnitId, onSelectPage, personas]);

  const activeAgent = useMemo(() => 
    personas.find(p => p.id === selectedAgentId), 
    [selectedAgentId, personas]
  );

  const generatedPrompt = useMemo(() => {
    if (!activeAgent) return "";
    if (activeAgent.systemPrompt) return activeAgent.systemPrompt;
    
    const s = settings;
    return `ROLLE: ${activeAgent.role.toUpperCase()}
ERFAHRUNG: ${activeAgent.exp}
KONTEXT: ${s.companyName} (${s.industry})
WAEHRUNG: ${s.currency}
MARKENSTIMME: ${s.brandVoice}

LOGIK: ${activeAgent.think}

AUFGABE: Erstellen Sie eine präzise Schweizer Fachanalyse. Berücksichtigen Sie ${s.currency} Kalkulationen und Schweizer Standards.`;
  }, [activeAgent, settings]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleUpdate = (field: keyof Persona, value: any) => {
    if (!activeAgent) return;
    onUpdatePersona({ ...activeAgent, [field]: value });
  };

  const renderUnitsGrid = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {UNITS.map(unit => {
          const UnitIcon = (Icons as any)[unit.icon] || Briefcase;
          const unitAgents = personas.filter(p => p.unitId === unit.id);
          return (
            <button 
              key={unit.id}
              onClick={() => { setSelectedUnit(unit.id); onSelectPage('units'); }}
              className={`p-8 border rounded-[2.5rem] text-left transition-all hover:scale-[1.03] group relative overflow-hidden
                ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/20'}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: unit.color }} />
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <UnitIcon size={24} style={{ color: unit.color }} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-1">{unit.label}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{unitAgents.length} Experten</p>
              
              <div className="mt-8 flex items-center justify-between">
                 <div className="flex -space-x-2">
                    {unitAgents.slice(0, 4).map(a => (
                      <div key={a.id} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold">
                        {a.name[0]}
                      </div>
                    ))}
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderUnitDashboard = () => {
    const unit = UNITS.find(u => u.id === selectedUnit);
    const unitAgents = personas.filter(p => p.unitId === selectedUnit);
    const UnitIcon = unit ? (Icons as any)[unit.icon] : Briefcase;

    const navItems = [
      { label: 'Setup', icon: Settings, onClick: () => { if(onNavigate) onNavigate('setup'); } },
      { label: 'Automation', icon: Zap, onClick: () => { /* Placeholder logic */ } },
      { label: 'Integration', icon: Link2, onClick: () => { if(onNavigate) onNavigate('integrations'); } },
      { label: 'Save and Share', icon: Database, onClick: () => { if(onNavigate) onNavigate('save'); } },
      { label: 'Help', icon: HelpCircle, onClick: () => { if(onNavigate) onNavigate('help'); } },
    ];

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => { setSelectedUnit(null); onSelectPage('units'); }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={14} /> Zurück zur Übersicht
          </button>
          <div className="flex gap-4">
             {/* Home of Unit Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setIsUnitMenuOpen(!isUnitMenuOpen)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                    ${isUnitMenuOpen ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                   Home of {unit?.label || 'Sales'} <ChevronDown size={14} className={`transition-transform ${isUnitMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUnitMenuOpen && (
                  <div className={`absolute top-full right-0 mt-3 w-64 p-3 rounded-[1.8rem] border shadow-2xl z-[500] animate-in fade-in slide-in-from-top-2 duration-300
                    ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                     <div className="flex flex-col gap-1">
                        {navItems.map((item, idx) => (
                          <button 
                            key={idx}
                            onClick={item.onClick}
                            className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group text-left"
                          >
                             <item.icon size={16} className="text-slate-400 group-hover:text-orange-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{item.label}</span>
                          </button>
                        ))}
                     </div>
                  </div>
                )}
             </div>

             <button 
                onClick={() => onAddPersona(selectedUnit!)}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 transition-all"
             >
                <Plus size={14} /> Agent hinzufügen
             </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
           {/* Left Sidebar: Business Area Granular Configuration */}
           <div className="col-span-3 space-y-6">
              <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                 <h4 className="text-[11px] font-black uppercase text-orange-500 tracking-[0.2em] mb-8 flex items-center gap-2">
                    <Sliders size={14}/> {unit?.label} Core
                 </h4>
                 <div className="space-y-4">
                    {[
                      { label: 'Market Context', icon: Globe, desc: 'ICP & Markt-Nische' },
                      { label: 'Strategic Goals', icon: Target, desc: 'Division OKRs' },
                      { label: 'Resource Map', icon: Database, desc: 'Tools & Datenbanken' }
                    ].map((item, i) => (
                      <button key={i} className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-orange-500/30 transition-all text-left group">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-slate-400 group-hover:text-orange-500 transition-colors">
                               <item.icon size={16} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{item.label}</p>
                               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.desc}</p>
                            </div>
                         </div>
                      </button>
                    ))}
                 </div>
                 <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[9px] font-bold text-slate-400 leading-relaxed italic">
                       Definieren Sie hier die granularen Parameter dieser Unit, um die Präzision der Agenten zu maximieren.
                    </p>
                 </div>
              </div>
           </div>

           {/* Right: Agent Dashboard (Compact 8-Column Grid) */}
           <div className="col-span-9 space-y-8">
              <header className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-inner">
                  <UnitIcon size={24} style={{ color: unit?.color }} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{unit?.label} AI Dashboard</h2>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Intelligence Fleet Management</p>
                </div>
              </header>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {unitAgents.map(p => {
                  const AgentIcon = (Icons as any)[p.icon] || User;
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedAgentId(p.id); onSelectPage('profile'); }}
                      className={`p-4 border rounded-[1.8rem] text-center transition-all hover:border-orange-500 hover:shadow-xl group relative overflow-hidden
                        ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/10'}`}
                    >
                      <div className="flex flex-col items-center gap-3">
                         <div className="p-2.5 bg-orange-500/5 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                            <AgentIcon size={20} />
                         </div>
                         <div className="min-w-0 w-full">
                            <h3 className="text-[10px] font-black tracking-tight group-hover:text-orange-600 transition-colors text-slate-950 dark:text-slate-50 truncate">{p.name}</h3>
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5 truncate">{p.role}</p>
                         </div>
                      </div>
                      <div className="absolute top-2 right-2 text-[6px] font-black uppercase text-slate-300">XP:{p.exp}</div>
                    </button>
                  );
                })}
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderAgentProfile = () => {
    if (!activeAgent) return null;
    const AgentIcon = (Icons as any)[activeAgent.icon] || User;

    return (
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
        <button 
          onClick={() => onSelectPage('units')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={14} /> Zurück zur {selectedUnit?.toUpperCase()} Division
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
             <div className={`p-8 border rounded-[2.5rem] relative overflow-hidden
               ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/30'}`}>
                
                <div className="flex flex-col gap-6 mb-8">
                   <div className="flex items-center gap-4">
                      <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-500/20">
                         <AgentIcon size={32} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                         <input 
                           className="w-full bg-transparent border-none text-2xl font-bold tracking-tight leading-none text-slate-950 dark:text-slate-50 focus:ring-0 p-0" 
                           value={activeAgent.name} 
                           onChange={e => handleUpdate('name', e.target.value)}
                           placeholder="Name"
                         />
                         <input 
                           className="w-full bg-transparent border-none text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-2 focus:ring-0 p-0" 
                           value={activeAgent.role} 
                           onChange={e => handleUpdate('role', e.target.value)}
                           placeholder="Rolle"
                         />
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Hintergrund / Bio</h4>
                      <textarea 
                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-xs text-slate-500 leading-relaxed italic border-none focus:ring-1 focus:ring-orange-500/30"
                        value={activeAgent.bio}
                        onChange={e => handleUpdate('bio', e.target.value)}
                        rows={4}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                         <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Erfahrung</p>
                         <input 
                           className="w-full bg-transparent border-none text-xs font-bold text-slate-950 dark:text-slate-50 focus:ring-0 p-0" 
                           value={activeAgent.exp} 
                           onChange={e => handleUpdate('exp', e.target.value)}
                         />
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                         <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Unit</p>
                         <p className="text-xs font-bold uppercase text-slate-950 dark:text-slate-50">{selectedUnit}</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className={`p-8 border rounded-[2.5rem]
               ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/10'}`}>
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2"><Zap size={14} className="text-orange-500" /> Denkprozess (Step-by-Step)</h4>
                <div className="space-y-2">
                   <textarea 
                     className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl p-4 text-[10px] font-mono text-blue-600 focus:ring-1 focus:ring-blue-500/30"
                     value={activeAgent.think}
                     onChange={e => handleUpdate('think', e.target.value)}
                     rows={3}
                   />
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
             <div className={`p-8 border rounded-[2.5rem]
               ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/30'}`}>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                   <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Agent Workspace</h4>
                      <p className="text-xs font-bold mt-1 text-slate-950 dark:text-slate-50">System Prompt & Skript-Logik</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={handleCopy}
                        className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        {isCopied ? <Check size={14}/> : <Copy size={14}/>}
                        {isCopied ? 'Prompt Kopiert' : 'Copy Prompt'}
                      </button>
                   </div>
                </div>

                <div className="relative">
                   <textarea 
                     className="w-full p-8 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-slate-600 dark:text-slate-400 min-h-[400px] outline-none focus:ring-2 focus:ring-orange-500/20"
                     value={activeAgent.systemPrompt || generatedPrompt}
                     onChange={e => handleUpdate('systemPrompt', e.target.value)}
                   />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-lg'}`}>
                   <h5 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center gap-2"><Shield size={14} className="text-green-500" /> Quality Control Checklist</h5>
                   <div className="space-y-4">
                      {activeAgent.checklist.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                           <div className="w-4 h-4 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                              <Check size={10} className="text-green-500" />
                           </div>
                           <input 
                             className="flex-1 bg-transparent border-none text-[10px] font-bold text-slate-500 uppercase tracking-tighter p-0 focus:ring-0" 
                             value={c} 
                             onChange={e => {
                               const newList = [...activeAgent.checklist];
                               newList[i] = e.target.value;
                               handleUpdate('checklist', newList);
                             }}
                           />
                           <button 
                             onClick={() => handleUpdate('checklist', activeAgent.checklist.filter((_, idx) => idx !== i))}
                             className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-rose-500"
                           >
                             <Trash2 size={12}/>
                           </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => handleUpdate('checklist', [...activeAgent.checklist, 'Neuer Checkpunkt'])}
                        className="text-[9px] font-black uppercase text-orange-500 hover:underline pt-2"
                      >
                        + Punkt hinzufügen
                      </button>
                   </div>
                </div>

                <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-lg'}`}>
                   <button 
                     onClick={() => setShowAdvanced(!showAdvanced)}
                     className="w-full flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 hover:text-orange-500 transition-colors"
                   >
                     <span className="flex items-center gap-2"><Settings size={14} /> Advanced Options & Resources</span>
                     {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </button>
                   
                   {showAdvanced && (
                     <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                           {(activeAgent.advancedOptions || []).map((opt, i) => (
                             <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <Plus size={10} className="text-orange-500" />
                                <input 
                                  className="flex-1 bg-transparent border-none text-[9px] font-black uppercase text-slate-400 focus:ring-0 p-0"
                                  value={opt}
                                  onChange={e => {
                                    const opts = [...(activeAgent.advancedOptions || [])];
                                    opts[i] = e.target.value;
                                    handleUpdate('advancedOptions', opts);
                                  }}
                                />
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVisual = (widget: DashletData) => {
    const color = widget.color || '#f97316';
    switch (widget.type) {
      case 'bar':
        return (
          <div className="flex items-end gap-1 h-full w-full pb-1 px-1">
            {[40, 70, 45, 90, 65].map((h, i) => (
              <div key={i} className="flex-1 rounded-[1px]" style={{ height: `${h}%`, backgroundColor: color, opacity: 0.3 + (i * 0.1) }} />
            ))}
          </div>
        );
      case 'gauge':
        return (
          <div className="relative w-full h-full flex items-center justify-center scale-75">
            <div className="w-10 h-10 rounded-full border-[3px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-[3px] border-orange-500 border-t-transparent -rotate-45" style={{ borderColor: color }} />
            </div>
          </div>
        );
      default:
        return <div className="h-full flex items-center justify-center opacity-20"><TrendingUp size={12} /></div>;
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-8 gap-3 auto-rows-[140px] pb-32 animate-in fade-in zoom-in-95 duration-700">
      {(ALL_DASHLETS.agents).map((widget) => {
        const agent = personas.find(p => p.name === widget.agentName);
        return (
          <div 
            key={widget.id}
            className={`relative p-3 rounded-[1.5rem] border transition-all duration-300 overflow-hidden group backdrop-blur-xl
              ${isDark ? 'bg-slate-900/40 border-slate-800 shadow-lg' : 'bg-white/95 border-slate-100 shadow-sm'}
            `}
            style={{ gridColumn: `span ${widget.w || 2}`, gridRow: `span ${widget.h || 1}` }}
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                   <div className={`p-1 rounded shadow-inner ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <LayoutGrid size={10} className="text-slate-400" />
                   </div>
                   <div>
                      <h3 className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-500 mb-0.5 truncate max-w-[80px]">{widget.title}</h3>
                      <div className="flex items-center gap-1">
                         <span className="text-xs font-black tracking-tight text-slate-950 dark:text-slate-50 leading-none">{widget.metric}</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="flex-1 min-h-0 flex items-center justify-center">
                 {renderVisual(widget)}
              </div>
            </div>
          </div>
        );
      })}
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
