
import React from 'react';
import { PageId, Persona, Theme, DashletData, UnitId } from '../types';
// Fixed: Switched from non-existent UNIT_DASHLETS to ALL_DASHLETS
import { ALL_DASHLETS, UNITS } from '../constants';
import { 
  ArrowUpRight, Target, Users, Zap, LayoutGrid, Info, ChevronRight, BarChart2
} from 'lucide-react';

interface HomeViewProps {
  activeUnitId: UnitId | null;
  onSelectUnit: (id: UnitId) => void;
  onSelectAgent: (id: string) => void;
  onNavigate: (page: PageId) => void;
  theme: Theme;
  personas: Persona[];
}

const HomeView: React.FC<HomeViewProps> = ({ activeUnitId, onSelectUnit, onSelectAgent, onNavigate, theme, personas }) => {
  const isDark = theme === 'dark';
  const activeUnit = UNITS.find(u => u.id === activeUnitId);

  // Fixed: Switched from non-existent UNIT_DASHLETS to ALL_DASHLETS
  const displayWidgets = activeUnitId 
    ? ALL_DASHLETS[activeUnitId] 
    : UNITS.flatMap(u => ALL_DASHLETS[u.id].slice(0, 1)); // Global: Eine Kachel pro Unit

  const renderChart = (widget: DashletData) => {
    const color = widget.color;
    switch (widget.type) {
      case 'funnel':
        return (
          <div className="flex flex-col gap-1.5 items-center h-full w-full px-2 justify-center">
            {[100, 75, 45].map((w, i) => (
              <div key={i} className="h-4 rounded-lg opacity-80" style={{ width: `${w}%`, backgroundColor: color }} />
            ))}
          </div>
        );
      case 'line':
        return (
          <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,50 Q40,10 80,45 T160,15 T200,30" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'bar':
        return (
          <div className="flex items-end gap-1.5 h-full w-full px-2">
            {[30, 65, 40, 85, 55].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg opacity-80" style={{ height: `${h}%`, backgroundColor: color }} />
            ))}
          </div>
        );
      case 'gauge':
        return (
          <div className="w-full h-5 rounded-full bg-slate-500/10 overflow-hidden relative self-center">
            <div className="h-full rounded-full shadow-lg" style={{ width: '82%', backgroundColor: color }} />
          </div>
        );
      default:
        return <div className="h-full w-full flex items-center justify-center opacity-20"><Info size={20} /></div>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <div className="flex items-center gap-4 mb-2">
          {activeUnitId ? (
            <span className="text-4xl">{activeUnit?.icon}</span>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-[#ff7a59] grid place-items-center text-white shadow-xl">
              <LayoutGrid size={24} />
            </div>
          )}
          <div>
            <h1 className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {activeUnit ? activeUnit.label + ' Command Center' : 'Global Business Intelligence'}
            </h1>
            <p className={`text-sm mt-1 font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {activeUnit ? `Performance tracking for ${activeUnit.label} AI Agents` : 'Cross-unit operational performance dashboard'}
            </p>
          </div>
        </div>
      </header>

      {/* Global Unit Grid (nur sichtbar auf Master Home) */}
      {!activeUnitId && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {UNITS.map(unit => (
            <button 
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className={`p-6 rounded-[2.5rem] border text-left transition-all group hover:scale-[1.03] active:scale-95
                ${isDark ? 'bg-[#121629] border-white/5 shadow-2xl hover:border-[#ff7a59]/50' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40 hover:border-[#ff7a59]/50'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 grid place-items-center text-3xl shadow-inner group-hover:bg-[#ff7a59]/10 transition-colors">
                  {unit.icon}
                </div>
                <ArrowUpRight size={20} className="text-slate-300 group-hover:text-[#ff7a59] transition-all" />
              </div>
              <h3 className={`text-xs font-black uppercase tracking-widest mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{unit.label}</h3>
              <p className="text-[10px] font-black text-slate-400">Manage {personas.filter(p => p.unitId === unit.id).length} Agents</p>
            </button>
          ))}
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayWidgets.map((widget) => (
          <div
            key={widget.id}
            className={`border rounded-[3rem] p-8 transition-all flex flex-col justify-between h-[300px] group relative
              ${isDark ? 'bg-[#121629] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl'}`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{UNITS.find(u => u.id === widget.unitId)?.icon}</span>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {widget.title}
                  </h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{widget.metric}</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${widget.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {widget.trend}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 opacity-50 group-hover:opacity-100 transition-opacity">
                 <BarChart2 size={20} className="text-slate-400" />
              </div>
            </div>

            <div className="flex-1 my-4 flex items-center justify-center">
              {renderChart(widget)}
            </div>

            <div className="mt-4 pt-6 border-t border-slate-500/10">
                <button 
                  onClick={() => {
                    const agent = personas.find(p => p.name === widget.agentName);
                    if (agent) onSelectAgent(agent.id);
                  }}
                  className="w-full flex items-center justify-between group/btn"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff7a59] text-white flex items-center justify-center text-[10px] font-black">
                      {widget.agentName?.charAt(0)}
                    </div>
                    <div className="text-left">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#ff7a59]">Managed by</p>
                       <p className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{widget.agentName || 'Ops Manager'}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        ))}

        {/* Action Tile */}
        <div className={`border-4 border-dashed rounded-[3rem] p-8 flex flex-col items-center justify-center text-center group transition-all
          ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-slate-100 hover:bg-slate-50'}`}>
           <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#ff7a59] mb-4 group-hover:scale-110 transition-transform">
             <Zap size={32} />
           </div>
           <h4 className={`text-lg font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>New Strategy Required?</h4>
           <p className="text-xs font-bold text-slate-400 mb-6 max-w-[200px]">Provision an additional AI expert for your current stack.</p>
           <button className="px-8 py-3 rounded-2xl bg-[#ff7a59] text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#ff7a59]/30">
             Add AI Agent
           </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
