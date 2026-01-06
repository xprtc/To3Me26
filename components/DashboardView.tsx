
import React from 'react';
import { PageId, Persona, Theme, DashletData, UnitId } from '../types';
import { ALL_DASHLETS, UNITS } from '../constants';
import * as Icons from 'lucide-react';
import { 
  ArrowUpRight, TrendingUp, MoreHorizontal, ArrowDownRight, LayoutGrid, ChevronRight
} from 'lucide-react';

interface DashboardViewProps {
  activeUnitId: UnitId | null;
  onSelectUnit: (id: UnitId) => void;
  onSelectAgent: (id: string) => void;
  theme: Theme;
  personas: Persona[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ activeUnitId, onSelectUnit, onSelectAgent, theme, personas }) => {
  const isDark = theme === 'dark';
  const activeUnit = UNITS.find(u => u.id === activeUnitId);

  const displayWidgets = activeUnitId 
    ? ALL_DASHLETS[activeUnitId] 
    : UNITS.flatMap(u => ALL_DASHLETS[u.id].slice(0, 4));

  const renderChart = (widget: DashletData) => {
    const color = widget.color;
    switch (widget.type) {
      case 'bar':
        return (
          <div className="flex items-end gap-1 h-12 w-full mt-4">
            {[20, 50, 30, 80, 45, 90, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm transition-all hover:opacity-100 opacity-60" style={{ height: `${h}%`, backgroundColor: color }} />
            ))}
          </div>
        );
      case 'line':
        return (
          <div className="w-full h-12 mt-4 flex items-center">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path d="M0,25 L15,10 L30,20 L45,5 L60,15 L80,2 L100,10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'gauge':
        return (
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-6 relative">
            <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: color }} />
          </div>
        );
      default:
        return <div className="h-12 mt-4 bg-slate-50 dark:bg-slate-800 rounded flex items-center justify-center opacity-30"><TrendingUp size={16} /></div>;
    }
  };

  return (
    <div className="space-y-10">
      {/* Redundanter Header wurde entfernt, um nur das Hauptmenü als Navigationsquelle zu haben */}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {displayWidgets.map((widget) => {
          const isPositive = widget.trend.startsWith('+');

          return (
            <div
              key={widget.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: widget.color }} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{widget.title}</span>
                </div>
                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-black">{widget.metric}</span>
                <span className={`text-[10px] font-black flex items-center gap-0.5 px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                   {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                   {widget.trend.replace('+', '')}
                </span>
              </div>

              {renderChart(widget)}

              <div className="mt-6 pt-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Unit: {widget.unitId}</span>
                <button className="text-[9px] font-black uppercase text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Details <ChevronRight size={10}/></button>
              </div>
            </div>
          );
        })}
      </div>

      {!activeUnitId && (
        <section className="pt-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Architektur Übersicht</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {UNITS.map(unit => {
               const UnitIcon = (Icons as any)[unit.icon] || LayoutGrid;
               return (
                <button 
                  key={unit.id}
                  onClick={() => onSelectUnit(unit.id)}
                  className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-left hover:border-blue-500 hover:shadow-xl transition-all flex flex-col gap-6 group"
                >
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit group-hover:scale-110 transition-transform">
                    <UnitIcon size={24} style={{ color: unit.color }} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">{unit.label}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Managed AI Agents: {personas.filter(p => p.unitId === unit.id).length}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardView;
