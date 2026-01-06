
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ProjectsSubPageId, Theme, DashletData, ProjectRecord } from '../types';
import { ALL_DASHLETS, PERSONAS, UNITS } from '../constants';
import { 
  TrendingUp, Search, Filter, Plus, LayoutGrid, ChevronRight, X, 
  RefreshCcw, Move, CornerRightDown, Maximize2, Briefcase, List, 
  ArrowUpDown, ArrowUp, ArrowDown, Calendar, Clock, MoreHorizontal,
  ChevronLeft, Save, Trash2, Rocket, Target, Zap, Layers, CheckCircle2,
  AlertCircle, DollarSign, FileText, FileCheck, Star, Users2, ShieldCheck,
  Check, Wallet
} from 'lucide-react';

interface ProjectsViewProps {
  projects: ProjectRecord[];
  activePage: ProjectsSubPageId;
  onSelectPage: (page: ProjectsSubPageId) => void;
  theme: Theme;
  isGlobalEditMode?: boolean;
  onOpenWizard?: () => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, activePage, theme, isGlobalEditMode, onOpenWizard }) => {
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [dashlets, setDashlets] = useState<DashletData[]>(ALL_DASHLETS.projects);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ProjectRecord; direction: 'asc' | 'desc' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Column Resizing Logic
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    selection: 60,
    name: 220,
    client: 180,
    status: 140,
    agent: 160,
    deadline: 120,
    progress: 140,
    budget: 120
  });

  const resizerRef = useRef<{ col: string; startX: number; startWidth: number } | null>(null);

  const onResizeStart = (e: React.MouseEvent, col: string) => {
    resizerRef.current = { col, startX: e.clientX, startWidth: columnWidths[col] };
    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeEnd);
  };

  const onResizeMove = (e: MouseEvent) => {
    const current = resizerRef.current;
    if (!current) return;
    const diff = e.clientX - current.startX;
    const newWidth = Math.max(60, current.startWidth + diff);
    setColumnWidths(prev => ({ ...prev, [current.col]: newWidth }));
  };

  const onResizeEnd = () => {
    resizerRef.current = null;
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  const isEditMode = isGlobalEditMode || false;

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

  const filteredProjects = useMemo(() => {
    let data = [...projects].filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.client.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig) {
      data.sort((a, b) => {
        const valA = (a[sortConfig.key] || '').toString().toLowerCase();
        const valB = (b[sortConfig.key] || '').toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [projects, search, sortConfig]);

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId), 
    [projects, selectedProjectId]
  );

  const handleSort = (key: keyof ProjectRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) setSelectedIds([]);
    else setSelectedIds(filteredProjects.map(p => p.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const renderVisual = (widget: DashletData) => {
    const color = widget.color || '#3b82f6';
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
      case 'gauge':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-[5px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-[5px] border-orange-500 border-t-transparent -rotate-45" style={{ borderColor: color }} />
               <span className="text-[10px] font-black text-slate-950 dark:text-slate-50">{widget.metric}</span>
            </div>
          </div>
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
      case 'ring':
        return (
          <div className="flex items-center justify-center relative">
             <div className="w-12 h-12 rounded-full border-[4px] border-slate-100 dark:border-slate-800" />
             <div className="absolute w-12 h-12 rounded-full border-[4px] border-transparent border-t-orange-500 -rotate-45" style={{ borderTopColor: color }} />
          </div>
        );
      case 'area':
        return (
          <svg viewBox="0 0 100 40" className="w-full h-full px-1" preserveAspectRatio="none">
             <path d="M0,40 L0,20 Q30,10 50,25 T100,10 L100,40 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
          </svg>
        );
      default:
        return <div className="h-full flex items-center justify-center opacity-20"><TrendingUp size={20} /></div>;
    }
  };

  const renderSidePanel = () => {
    if (!selectedProject) return null;

    const timeline = [
      { d: 1, t: 'Intelligence', a: 'Saby (40%)', status: 'completed' },
      { d: 2, t: 'Design', a: 'Leyla (60%)', status: 'active' },
      { d: 3, t: 'Content', a: 'Leyla (60%)', status: 'pending' },
      { d: 4, t: 'Tech', a: 'Leyla (60%)', status: 'pending' },
      { d: 5, t: 'QA & Delivery', a: 'Saby (40%)', status: 'pending' }
    ];

    const financials = [
      { step: 'Offerte', amount: selectedProject.budget, date: '10.02.2026', done: true },
      { step: 'Vertrag', amount: selectedProject.budget, date: '12.02.2026', done: true },
      { step: 'Anzahlung', amount: selectedProject.budget * 0.5, date: '13.02.2026', done: true },
      { step: 'Restzahlung', amount: selectedProject.budget * 0.5, date: '-', done: false }
    ];

    return (
      <div className={`fixed top-0 right-0 h-full w-[700px] z-[400] shadow-2xl transition-transform duration-500 ease-in-out border-l flex flex-col animate-in slide-in-from-right-full
        ${isDark ? 'bg-[#0f1117] border-slate-800' : 'bg-white border-slate-200'}`}>
        
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
           <div className="flex items-center gap-6">
             <div className="flex gap-2">
                <button onClick={() => setSelectedProjectId(null)} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl shadow-sm transition-all border border-slate-200 dark:border-slate-700 active:scale-90"><ChevronLeft size={20}/></button>
             </div>
             <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700" />
             <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-orange-500/20">
                 {selectedProject.client[0]}
               </div>
               <div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50">{selectedProject.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                       {selectedProject.status}
                     </span>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{selectedProject.client}</span>
                  </div>
               </div>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"><Save size={14}/> Speichern</button>
             <button onClick={() => setSelectedProjectId(null)} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
               <X size={24} />
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-12">
           {/* Timeline Monitor */}
           <section className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                 <h4 className="text-[11px] font-black uppercase text-orange-500 flex items-center gap-2 tracking-[0.2em]"><Rocket size={14}/> Mission Timeline (5-Day Hyper-Speed)</h4>
                 <span className="text-[9px] font-black text-rose-500 uppercase flex items-center gap-1 animate-pulse"><AlertCircle size={10}/> Out of Time is Out of Money!</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                 {timeline.map((day, i) => (
                   <div key={i} className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${day.status === 'completed' ? 'bg-emerald-500/5 border-emerald-500/30' : day.status === 'active' ? 'bg-orange-500/10 border-orange-500 shadow-xl' : 'bg-slate-50 dark:bg-slate-800 border-transparent'}`}>
                      <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center font-black text-[10px] ${day.status === 'completed' ? 'bg-emerald-500 text-white' : day.status === 'active' ? 'bg-orange-500 text-white animate-bounce' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                         {day.status === 'completed' ? <Check size={14} strokeWidth={3}/> : `D${day.d}`}
                      </div>
                      <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white leading-tight mb-1">{day.t}</h5>
                      <p className="text-[7px] font-bold text-slate-400 uppercase">{day.a}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Financial Lifecycle */}
           <section className="space-y-6">
              <h4 className="text-[11px] font-black uppercase text-blue-500 flex items-center gap-2 tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2"><DollarSign size={14}/> Financial Mapping (A-Z)</h4>
              <div className="grid grid-cols-1 gap-3">
                 {financials.map((f, i) => (
                   <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between group transition-all hover:scale-[1.01] ${f.done ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800' : 'bg-orange-500/5 border-dashed border-orange-500/30'}`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.done ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                            {i === 0 ? <FileText size={20}/> : i === 1 ? <FileCheck size={20}/> : i === 2 ? <Wallet size={20}/> : <Plus size={20}/>}
                         </div>
                         <div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{f.step}</p>
                            <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">{f.date}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black text-slate-900 dark:text-white">CHF {f.amount.toLocaleString()}</p>
                         {f.done ? (
                           <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 justify-end"><CheckCircle2 size={10}/> Validiert</span>
                         ) : (
                           <button className="text-[9px] font-black text-orange-500 uppercase tracking-widest hover:underline">Zahlung einfordern</button>
                         )}
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Project Assets */}
           <section className="space-y-6">
              <h4 className="text-[11px] font-black uppercase text-fuchsia-500 flex items-center gap-2 tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2"><Layers size={14}/> Asset Management</h4>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Shared Drive</h5>
                    <div className="space-y-2">
                       {['Strategy_V1.pdf', 'Design_Proto.fig', 'Market_Data.xls'].map(f => (
                         <div key={f} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 group cursor-pointer hover:border-blue-500">
                            <span className="text-[10px] font-bold truncate text-slate-600 dark:text-slate-300">{f}</span>
                            <ChevronRight size={12} className="text-slate-300 group-hover:text-blue-500" />
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Team Chat Logs</h5>
                    <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                       <p className="text-[9px] font-bold text-slate-500 leading-relaxed italic">"Leyla hat Design-Sprint für morgen 09:00 Uhr eingeplant. Saby prüft Intelligence Report bis 17:00 Uhr."</p>
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    );
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
                      <div className="flex items-center gap-1">
                         <span className="text-sm font-black tracking-tight text-slate-950 dark:text-slate-50 leading-none">{widget.metric}</span>
                         <span className="text-[7.5px] font-black text-emerald-500">{widget.trend}</span>
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

  const renderProjects = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Projekte, Kunden oder Agenten durchsuchen..." 
            className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-bold tracking-tight outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-950 dark:text-slate-50"
          />
        </div>
        <div className="flex items-center gap-2">
           <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-2xl">
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500' : 'text-slate-400'}`}><List size={18}/></button>
             <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-xl transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500' : 'text-slate-400'}`}><LayoutGrid size={18}/></button>
           </div>
           <button className="px-5 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-white/50 hover:bg-white transition-all text-slate-600"><Filter size={14}/> Filter</button>
           <button onClick={onOpenWizard} className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-2xl transition-all flex items-center gap-2">
              <Plus size={16} /> Neues Projekt
           </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                    <th style={{ width: columnWidths.selection }} className="px-6 py-6 relative">
                      <input type="checkbox" checked={selectedIds.length === filteredProjects.length && filteredProjects.length > 0} onChange={toggleSelectAll} className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 accent-orange-500 cursor-pointer" />
                    </th>
                    <th style={{ width: columnWidths.name }} onClick={() => handleSort('name')} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 cursor-pointer group tracking-widest relative">
                      Name <ArrowUpDown size={10} className="inline ml-1 opacity-20 group-hover:opacity-100"/>
                      <div onMouseDown={(e) => onResizeStart(e, 'name')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                    <th style={{ width: columnWidths.client }} onClick={() => handleSort('client')} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 cursor-pointer group tracking-widest relative">
                      Kunde <ArrowUpDown size={10} className="inline ml-1 opacity-20 group-hover:opacity-100"/>
                      <div onMouseDown={(e) => onResizeStart(e, 'client')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                    <th style={{ width: columnWidths.status }} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest relative">
                      Status
                      <div onMouseDown={(e) => onResizeStart(e, 'status')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                    <th style={{ width: columnWidths.agent }} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest relative">
                      Agent
                      <div onMouseDown={(e) => onResizeStart(e, 'agent')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                    <th style={{ width: columnWidths.deadline }} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest relative">
                      Deadline
                      <div onMouseDown={(e) => onResizeStart(e, 'deadline')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                    <th style={{ width: columnWidths.progress }} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest relative">
                      Fortschritt
                      <div onMouseDown={(e) => onResizeStart(e, 'progress')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                    <th style={{ width: columnWidths.budget }} className="px-6 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right relative">
                      Budget
                      <div onMouseDown={(e) => onResizeStart(e, 'budget')} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-orange-500/30 transition-colors" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredProjects.map(p => (
                    <tr key={p.id} onClick={() => setSelectedProjectId(p.id)} className="hover:bg-orange-500/[0.03] cursor-pointer group transition-all">
                      <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 accent-orange-500" />
                      </td>
                      <td className="px-6 py-5 text-xs font-bold text-slate-950 dark:text-slate-50 tracking-tight truncate">{p.name}</td>
                      <td className="px-6 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight truncate">{p.client}</td>
                      <td className="px-6 py-5">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm
                           ${p.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                           {p.status}
                         </span>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md shrink-0">{p.leadAgent[0]}</div>
                            <span className="text-[10px] font-bold text-slate-950 dark:text-slate-50 tracking-tight truncate">{p.leadAgent}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-[10px] font-bold text-slate-500 tracking-tight">{p.deadline}</td>
                      <td className="px-6 py-5">
                         <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-orange-500" style={{ width: `${p.progress}%` }} />
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-sm text-slate-950 dark:text-slate-50 tracking-tight">CHF {p.budget.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {filteredProjects.map(p => (
             <div key={p.id} onClick={() => setSelectedProjectId(p.id)} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                   <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded text-[9px] font-black uppercase shadow-sm">{p.status}</div>
                   <MoreHorizontal size={14} className="text-slate-400" />
                </div>
                <h3 className="text-sm font-bold mb-1 group-hover:text-orange-600 text-slate-950 dark:text-slate-50 tracking-tight">{p.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 mb-6 tracking-widest">{p.client}</p>
                <div className="w-full h-1 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 shadow-inner">
                   <div className="h-full bg-orange-500" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold border-2 border-white dark:border-slate-900 shadow-md">{p.leadAgent[0]}</div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-950 dark:text-slate-50 tracking-tight">CHF {p.budget.toLocaleString()}</span>
                </div>
             </div>
           ))}
        </div>
      )}
      {renderSidePanel()}
    </div>
  );

  return (
    <div className="max-w-[1700px] mx-auto min-h-screen">
      {activePage === 'dashboard' && renderDashboard()}
      {activePage === 'projects' && renderProjects()}
      {activePage === 'calendar' && <div className="p-32 text-center opacity-20"><Calendar size={64} className="mx-auto mb-4 text-slate-500" /><h2 className="text-3xl font-black uppercase tracking-widest text-slate-950 dark:text-slate-50">Projekt Kalender</h2></div>}
      {activePage === 'time' && <div className="p-32 text-center opacity-20"><Clock size={64} className="mx-auto mb-4 text-slate-500" /><h2 className="text-3xl font-black uppercase tracking-widest text-slate-950 dark:text-slate-50">Zeiterfassung</h2></div>}
    </div>
  );
};

export default ProjectsView;
