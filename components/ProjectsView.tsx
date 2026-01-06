
import React, { useState, useMemo } from 'react';
import { ProjectsSubPageId, Theme, DashletData, ProjectRecord } from '../types';
import { ALL_DASHLETS, PROJECTS_DUMMY, PERSONAS, UNITS } from '../constants';
import { 
  TrendingUp, Search, Filter, Plus, LayoutGrid, ChevronRight, X, 
  RefreshCcw, Move, CornerRightDown, Maximize2, Briefcase, List, 
  ArrowUpDown, ArrowUp, ArrowDown, Calendar, Clock, MoreHorizontal
} from 'lucide-react';

interface ProjectsViewProps {
  activePage: ProjectsSubPageId;
  onSelectPage: (page: ProjectsSubPageId) => void;
  theme: Theme;
  isGlobalEditMode?: boolean;
  onOpenWizard?: () => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ activePage, theme, isGlobalEditMode, onOpenWizard }) => {
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [dashlets, setDashlets] = useState<DashletData[]>(ALL_DASHLETS.projects);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ProjectRecord; direction: 'asc' | 'desc' } | null>(null);

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
    let data = [...PROJECTS_DUMMY].filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.client.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig) {
      data.sort((a, b) => {
        const valA = a[sortConfig.key].toString().toLowerCase();
        const valB = b[sortConfig.key].toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [search, sortConfig]);

  const handleSort = (key: keyof ProjectRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
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
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
           <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th onClick={() => handleSort('name')} className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 cursor-pointer group tracking-widest">Name <ArrowUpDown size={10} className="inline ml-1 opacity-20 group-hover:opacity-100"/></th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Kunde</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Agent</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Fortschritt</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredProjects.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group">
                    <td className="px-8 py-5 text-xs font-bold text-slate-950 dark:text-slate-50 tracking-tight">{p.name}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">{p.client}</td>
                    <td className="px-8 py-5">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm
                         ${p.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : p.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                         {p.status}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">{p.leadAgent[0]}</div>
                          <span className="text-[10px] font-bold text-slate-950 dark:text-slate-50 tracking-tight">{p.leadAgent}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-orange-500" style={{ width: `${p.progress}%` }} />
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-sm text-slate-950 dark:text-slate-50 tracking-tight">CHF {p.budget.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {filteredProjects.map(p => (
             <div key={p.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all group">
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
