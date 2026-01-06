
import React, { useState, useEffect, useMemo } from 'react';
import { UnitSettings, Persona, Theme, UnitId, AgentsSubPageId, DashletData } from '../types';
import * as Icons from 'lucide-react';
import { 
  Copy, Check, Target, Settings, ChevronRight, User, AlertCircle, 
  MousePointer2, Briefcase, LayoutGrid, ArrowLeft, Zap, Info, Shield, 
  Search, Filter, TrendingUp, Users, Activity, LayoutDashboard, Maximize2, Move
} from 'lucide-react';
import { UNITS, PERSONAS, ALL_DASHLETS } from '../constants';

interface AgentsViewProps {
  settings: UnitSettings;
  personas: Persona[];
  activeUnitId: UnitId | null;
  activeAgentId: string | null;
  theme: Theme;
  activePage: AgentsSubPageId;
  onSelectPage: (page: AgentsSubPageId) => void;
  isGlobalEditMode?: boolean;
}

const AgentsView: React.FC<AgentsViewProps> = ({ 
  settings, 
  personas, 
  activeUnitId, 
  activeAgentId, 
  theme, 
  activePage, 
  onSelectPage,
  isGlobalEditMode 
}) => {
  const isDark = theme === 'dark';
  const isEditMode = isGlobalEditMode || false;
  const [selectedUnit, setSelectedUnit] = useState<UnitId | null>(activeUnitId);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(activeAgentId);
  const [selectedMode, setSelectedMode] = useState('std');
  const [isCopied, setIsCopied] = useState(false);
  const [dashlets, setDashlets] = useState<DashletData[]>(ALL_DASHLETS.agents);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeAgentId) {
      const agent = PERSONAS.find(p => p.id === activeAgentId);
      if (agent) {
        setSelectedUnit(agent.unitId);
        setSelectedAgentId(activeAgentId);
        onSelectPage('profile');
      }
    } else if (activeUnitId) {
      setSelectedUnit(activeUnitId);
      onSelectPage('units');
    }
  }, [activeAgentId, activeUnitId, onSelectPage]);

  const activeAgent = useMemo(() => 
    PERSONAS.find(p => p.id === selectedAgentId), 
    [selectedAgentId]
  );

  const generatedPrompt = useMemo(() => {
    if (!activeAgent) return "";
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

  const handleDragStart = (index: number) => {
    if (!isEditMode) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newItems = [...dashlets];
    const draggedItem = newItems.splice(draggedIndex, 1)[0];
    newItems.splice(index, 0, draggedItem);
    setDashlets(newItems);
    setDraggedIndex(index);
  };

  const toggleResize = (id: string, dim: 'w' | 'h') => {
    setDashlets(prev => prev.map(d => {
      if (d.id === id) {
        if (dim === 'w') {
          const nextW = d.w === 1 ? 2 : d.w === 2 ? 3 : d.w === 3 ? 4 : 1;
          return { ...d, w: nextW };
        } else {
          const nextH = d.h === 1 ? 2 : 1;
          return { ...d, h: nextH };
        }
      }
      return d;
    }));
  };

  const renderVisual = (widget: DashletData) => {
    const color = widget.color || '#f97316';
    switch (widget.type) {
      case 'sankey':
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full opacity-80 drop-shadow-2xl">
            <path d="M10,20 C100,20 100,80 190,80" stroke={color} fill="none" strokeWidth="18" strokeOpacity="0.3" />
            <rect x="0" y="10" width="10" height="80" fill={color} rx="3" />
          </svg>
        );
      case 'bar':
        return (
          <div className="flex items-end gap-1 h-full w-full pb-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: color, opacity: 0.3 + (i * 0.08) }} />
            ))}
          </div>
        );
      case 'line':
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full px-2" preserveAspectRatio="none">
            <path d="M0,80 Q40,20 80,60 T160,20 T200,40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'heatmap':
        return (
          <div className="grid grid-cols-10 gap-0.5 w-full h-full p-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="rounded-[1px]" style={{ backgroundColor: color, opacity: 0.05 + Math.random() * 0.95 }} />
            ))}
          </div>
        );
      case 'gauge':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-[5px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-[5px] border-orange-500 border-t-transparent -rotate-45" style={{ borderColor: color }} />
               <span className="text-[10px] font-black text-slate-950 dark:text-slate-50">{widget.metric}</span>
            </div>
          </div>
        );
      case 'sunburst':
        return (
          <div className="relative w-full h-full flex items-center justify-center scale-90">
             <div className="w-16 h-16 rounded-full border-[6px] border-fuchsia-500/10 flex items-center justify-center animate-spin-slow">
                <div className="w-11 h-11 rounded-full border-[4px] border-blue-500/20 flex items-center justify-center">
                   <div className="w-6 h-6 rounded-full border-[3px]" style={{ borderColor: color, opacity: 0.4 }} />
                </div>
             </div>
          </div>
        );
      case 'candlestick':
        return (
          <div className="flex items-end gap-1.5 h-full w-full pb-2 px-1">
            {[60, 85, 40, 95, 55].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full rounded-[1px] shadow-sm" style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? color : '#3b82f6', opacity: 0.6 }} />
              </div>
            ))}
          </div>
        );
      case 'radar':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-60">
            <polygon points="50,5 95,35 80,90 20,90 5,35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300" />
            <polygon points="50,20 80,40 70,80 30,80 20,40" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
          </svg>
        );
      case 'treemap':
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 h-full w-full p-1">
            <div className="col-span-2 row-span-2 rounded-md shadow-sm" style={{ backgroundColor: color, opacity: 0.6 }} />
            <div className="col-span-1 row-span-1 rounded-md bg-blue-500/40" />
            <div className="col-span-1 row-span-2 rounded-md bg-emerald-500/40" />
            <div className="col-span-1 row-span-1 rounded-md bg-slate-500/20" />
          </div>
        );
      case 'bubble':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="absolute rounded-full border border-white/10" style={{ 
                 width: `${i * 12}px`, height: `${i * 12}px`, 
                 backgroundColor: color, 
                 opacity: 0.1,
                 left: `${15 + (i * 12)}%`,
                 top: `${20 + (Math.sin(i) * 25)}%` 
               }} />
             ))}
          </div>
        );
      case 'dots':
        return (
          <div className="grid grid-cols-5 gap-2 w-full h-full p-2 place-items-center">
             {Array.from({ length: 15 }).map((_, i) => (
               <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, opacity: 0.2 + Math.random() * 0.8 }} />
             ))}
          </div>
        );
      case 'wave':
        return (
          <svg viewBox="0 0 100 40" className="w-full h-full opacity-50">
            <path d="M0,20 Q25,5 50,20 T100,20 V40 H0 Z" fill={color} />
          </svg>
        );
      case 'hex':
        return (
          <div className="flex flex-wrap gap-1 justify-center items-center h-full w-full opacity-40">
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="w-3 h-3 bg-slate-400 rotate-45" style={{ backgroundColor: i % 3 === 0 ? color : '' }} />
             ))}
          </div>
        );
      case 'pyramid':
        return (
          <div className="flex flex-col items-center justify-center gap-0.5 h-full w-full px-4">
             {[20, 50, 80, 100].map((w, i) => (
               <div key={i} className="h-2 rounded-sm" style={{ width: `${w}%`, backgroundColor: color, opacity: 0.2 + (i * 0.2) }} />
             ))}
          </div>
        );
      case 'ring':
        return (
          <div className="flex items-center justify-center relative">
             <div className="w-12 h-12 rounded-full border-[4px] border-slate-100 dark:border-slate-800" />
             <div className="absolute w-12 h-12 rounded-full border-[4px] border-transparent border-t-orange-500 -rotate-45" style={{ borderTopColor: color }} />
          </div>
        );
      case 'spiral':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
             <path d="M50,50 Q60,40 70,50 T50,70 T30,50 T50,30 T80,50" fill="none" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'flow':
        return (
          <div className="relative w-full h-full flex items-center justify-center opacity-30">
             <div className="w-2 h-2 rounded-full bg-slate-400 absolute left-4 top-4" />
             <div className="w-2 h-2 rounded-full bg-slate-400 absolute right-4 bottom-4" />
             <div className="w-4 h-4 rounded-full border-2 border-slate-400" />
             <svg className="absolute inset-0 w-full h-full"><line x1="16" y1="16" x2="50" y2="50" stroke="currentColor" strokeWidth="1" /></svg>
          </div>
        );
      case 'area':
        return (
          <svg viewBox="0 0 100 40" className="w-full h-full px-1" preserveAspectRatio="none">
             <path d="M0,40 L0,20 Q30,10 50,25 T100,10 L100,40 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
          </svg>
        );
      case 'pie':
        return (
          <div className="w-12 h-12 rounded-full border-[10px] border-slate-100 dark:border-slate-800 relative">
             <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-l-orange-500" style={{ borderLeftColor: color }} />
          </div>
        );
      case 'funnel':
        return (
          <div className="flex flex-col items-center justify-center gap-1 h-full w-full px-4">
             {[100, 80, 60, 40].map((w, i) => (
               <div key={i} className="h-2 rounded-sm" style={{ width: `${w}%`, backgroundColor: color, opacity: 0.8 - (i * 0.2) }} />
             ))}
          </div>
        );
      default:
        return <div className="h-full flex items-center justify-center opacity-20"><TrendingUp size={20} /></div>;
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-8 gap-3 auto-rows-[140px] pb-32 animate-in fade-in zoom-in-95 duration-700">
      {dashlets.map((widget, index) => {
        const agent = PERSONAS.find(p => p.name === widget.agentName);
        return (
          <div 
            key={widget.id}
            draggable={isEditMode}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            className={`relative p-3.5 rounded-[1.8rem] border transition-all duration-300 overflow-hidden group backdrop-blur-xl
              ${isEditMode ? 'ring-2 ring-orange-500/40 cursor-grab active:cursor-grabbing shadow-orange-500/10' : 'hover:shadow-xl hover:-translate-y-0.5'}
              ${isDark ? 'bg-slate-900/40 border-slate-800 shadow-lg' : 'bg-white/95 border-slate-100 shadow-sm'}
            `}
            style={{ gridColumn: `span ${widget.w || 2}`, gridRow: `span ${widget.h || 1}` }}
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex items-center gap-2">
                   {isEditMode ? (
                     <div className="p-1 bg-orange-500 text-white rounded animate-pulse">
                        <Move size={10} />
                     </div>
                   ) : (
                     <div className={`p-1 rounded shadow-inner ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <LayoutGrid size={10} className="text-slate-400" />
                     </div>
                   )}
                   <div>
                      <h3 className="text-[7.5px] font-black uppercase tracking-[0.1em] text-slate-500 mb-0.5 truncate max-w-[80px]">{widget.title}</h3>
                      <div className="flex items-center gap-1.5">
                         <span className="text-sm font-black tracking-tight text-slate-950 dark:text-slate-50 leading-none">{widget.metric}</span>
                         <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">{widget.trend}</span>
                      </div>
                   </div>
                </div>
                {agent && !isEditMode && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-[9px] font-bold shadow-md group-hover:rotate-3 transition-transform">
                    {agent.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-h-0 flex items-center justify-center">
                 {renderVisual(widget)}
              </div>

              {isEditMode && (
                <div className="absolute bottom-1.5 right-1.5 flex gap-1">
                   <button onClick={(e) => { e.stopPropagation(); toggleResize(widget.id, 'w'); }} className="p-1 bg-slate-950 text-white rounded hover:bg-orange-500 transition-colors" title="Breite"><Maximize2 size={9} className="rotate-90" /></button>
                   <button onClick={(e) => { e.stopPropagation(); toggleResize(widget.id, 'h'); }} className="p-1 bg-slate-950 text-white rounded hover:bg-orange-500 transition-colors" title="Höhe"><Maximize2 size={9} /></button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderUnitsGrid = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {UNITS.map(unit => {
          const UnitIcon = (Icons as any)[unit.icon] || Briefcase;
          const unitAgents = PERSONAS.filter(p => p.unitId === unit.id);
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
    const unitAgents = PERSONAS.filter(p => p.unitId === selectedUnit);
    const UnitIcon = unit ? (Icons as any)[unit.icon] : Briefcase;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <button 
          onClick={() => { setSelectedUnit(null); onSelectPage('units'); }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={14} /> Zurück zur Übersicht
        </button>

        <header className="flex items-center gap-4">
           <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-inner">
             <UnitIcon size={32} style={{ color: unit?.color }} />
           </div>
           <div>
             <h2 className="text-3xl font-black uppercase tracking-tight">{unit?.label} Division</h2>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Spezialisierte Agenten-Flotte • {unitAgents.length} Experten aktiv</p>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {unitAgents.map(p => {
            const AgentIcon = (Icons as any)[p.icon] || User;
            return (
              <button
                key={p.id}
                onClick={() => { setSelectedAgentId(p.id); onSelectPage('profile'); }}
                className={`p-6 border rounded-[2rem] text-left transition-all hover:border-orange-500 group
                  ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/10'}`}
              >
                <div className="flex justify-between items-start mb-6">
                   <div className="p-2 bg-orange-500/5 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                      <AgentIcon size={20} />
                   </div>
                   <div className="text-[9px] font-black uppercase text-slate-300">Exp: {p.exp}</div>
                </div>
                <h3 className="text-sm font-bold tracking-tight mb-1 group-hover:text-orange-600 transition-colors text-slate-950 dark:text-slate-50">{p.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest mb-4">{p.role}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-6">{p.bio}</p>
                
                <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[9px] font-black uppercase text-orange-500 tracking-widest">Profil öffnen</span>
                   <ChevronRight size={12} className="text-orange-500" />
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
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 -mr-16 -mt-16 rounded-full" />
                
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-500/20">
                      <AgentIcon size={32} strokeWidth={2.5} />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold tracking-tight leading-none text-slate-950 dark:text-slate-50">{activeAgent.name}</h2>
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-2">{activeAgent.role}</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Hintergrund</h4>
                      <p className="text-xs text-slate-500 leading-relaxed italic">"{activeAgent.bio}"</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                         <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Erfahrung</p>
                         <p className="text-xs font-bold text-slate-950 dark:text-slate-50">{activeAgent.exp}</p>
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
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2"><Zap size={14} className="text-orange-500" /> Denkprozess (Logic)</h4>
                <div className="font-mono text-[10px] font-bold text-blue-600 space-y-4">
                   {activeAgent.think.split('->').map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[8px]">{i+1}</div>
                       <span className="uppercase">{step.trim()}</span>
                    </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
             <div className={`p-8 border rounded-[2.5rem]
               ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/30'}`}>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                   <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Agent Workspace</h4>
                      <p className="text-xs font-bold mt-1 text-slate-950 dark:text-slate-50">Prompt-Engineering & Skript-Generierung</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <select 
                        value={selectedMode}
                        onChange={e => setSelectedMode(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none"
                      >
                        {activeAgent.modes.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                      </select>
                      <button 
                        onClick={handleCopy}
                        className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        {isCopied ? <Check size={14}/> : <Copy size={14}/>}
                        {isCopied ? 'Kopiert' : 'Skript'}
                      </button>
                   </div>
                </div>

                <div className="relative">
                   <pre className="w-full p-8 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-slate-600 dark:text-slate-400 min-h-[300px] overflow-y-auto">
                     {generatedPrompt}
                   </pre>
                   <div className="absolute top-4 right-4 animate-pulse">
                      <Activity size={16} className="text-orange-500/30" />
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 border rounded-[2rem] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-lg'}`}>
                   <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex items-center gap-2"><Shield size={14} className="text-green-500" /> Quality Checklist</h5>
                   <ul className="space-y-3">
                      {activeAgent.checklist.map((c, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <div className="mt-1 w-3 h-3 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                              <Check size={8} className="text-green-500" />
                           </div>
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{c}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className={`p-6 border rounded-[2rem] flex flex-col items-center justify-center text-center opacity-30
                   ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-lg'}`}>
                   <Settings size={24} className="text-slate-400 mb-2" />
                   <p className="text-[9px] font-black uppercase tracking-widest">Automation Tools coming soon</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1700px] mx-auto pb-20">
      {activePage === 'dashboard' && renderDashboard()}
      {activePage === 'units' && (!selectedUnit ? renderUnitsGrid() : renderUnitDashboard())}
      {activePage === 'profile' && renderAgentProfile()}
    </div>
  );
};

export default AgentsView;
