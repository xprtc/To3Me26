
import React, { useState } from 'react';
import { OfficeSubPageId, Theme, DashletData, InvoiceRecord } from '../types';
import { ALL_DASHLETS, OFFICE_INVOICES, PERSONAS, UNITS } from '../constants';
import { 
  ArrowUpRight, MoreHorizontal, TrendingUp, Search, 
  Filter, Plus, LayoutGrid, FileText, ChevronRight, X, Mail, 
  MessageSquare, Phone, QrCode, CreditCard, ExternalLink, RefreshCcw, 
  History, ShieldCheck, Maximize2, Move, CornerRightDown, Wallet
} from 'lucide-react';

interface OfficeViewProps {
  activePage: OfficeSubPageId;
  onSelectPage: (page: OfficeSubPageId) => void;
  theme: Theme;
  isGlobalEditMode?: boolean;
}

const OfficeView: React.FC<OfficeViewProps> = ({ activePage, theme, isGlobalEditMode }) => {
  const isDark = theme === 'dark';
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [search, setSearch] = useState('');
  const [dashlets, setDashlets] = useState<DashletData[]>(ALL_DASHLETS.finance);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const renderVisual = (widget: DashletData) => {
    const color = widget.color || '#f97316';
    switch (widget.type) {
      case 'sankey':
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full opacity-80 drop-shadow-2xl">
            <path d="M10,20 C100,20 100,80 190,80" stroke={color} fill="none" strokeWidth="18" strokeOpacity="0.3" />
            <rect x="0" y="10" width="10" height="80" fill={color} rx="3" />
            <rect x="190" y="10" width="10" height="80" fill="#3b82f6" rx="3" />
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
                <div className="w-[1px] bg-slate-400 h-2 mb-[-1px] opacity-30" />
                <div className="w-full rounded-[1px] shadow-sm" style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? color : '#3b82f6', opacity: 0.6 }} />
                <div className="w-[1px] bg-slate-400 h-1 mt-[-1px] opacity-30" />
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
    <div className="relative">
      <div className="grid grid-cols-8 gap-3 auto-rows-[140px] pb-32 animate-in fade-in zoom-in-95 duration-700">
        {dashlets.map((widget, index) => {
          const agent = PERSONAS.find(p => p.name === widget.agentName);
          return (
            <div 
              key={widget.id}
              draggable={isEditMode}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              className={`relative p-3.5 rounded-[1.8rem] border transition-all duration-300 overflow-hidden
                ${isEditMode ? 'ring-2 ring-orange-500/40 cursor-grab active:cursor-grabbing shadow-orange-500/10' : 'hover:shadow-xl hover:-translate-y-0.5'}
                ${isDark ? 'bg-slate-900/40 border-slate-800 shadow-lg' : 'bg-white/95 border-slate-100 shadow-sm'}
                group backdrop-blur-xl
              `}
              style={{ 
                gridColumn: `span ${widget.w || 2}`, 
                gridRow: `span ${widget.h || 1}`,
              }}
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
                           <span className={`text-[7.5px] font-black px-1 py-0.5 rounded-full ${widget.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                              {widget.trend}
                           </span>
                        </div>
                     </div>
                  </div>
                  
                  {agent && !isEditMode && (
                    <div className="flex flex-col items-end">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white flex items-center justify-center text-[9px] font-bold shadow-md group-hover:rotate-3 transition-transform">
                        {agent.name[0]}
                      </div>
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
    </div>
  );

  const renderRevenues = () => {
    const invoices = OFFICE_INVOICES.filter(inv => 
      inv.clientName.toLowerCase().includes(search.toLowerCase()) || 
      inv.invoiceNum.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechnungen, Kunden oder IDs durchsuchen..." 
              className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-bold tracking-tight outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm text-slate-950 dark:text-slate-50"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="px-5 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-white/50 hover:bg-white transition-all text-slate-600"><Filter size={14}/> Filter</button>
             <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-orange-500/30 transition-all active:scale-95">
                Neue Rechnung
             </button>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
           <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Nummer</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Kunde</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Datum</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Betrag (CHF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {invoices.map(inv => (
                  <tr 
                    key={inv.id} 
                    onClick={() => setSelectedInvoice(inv)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-8 py-5 text-xs font-bold text-slate-950 dark:text-slate-50 tracking-tight">{inv.invoiceNum}</td>
                    <td className="px-8 py-5">
                       <div className="text-xs font-bold text-slate-950 dark:text-slate-50 tracking-tight">{inv.clientName}</div>
                       <div className="text-[9px] font-bold text-slate-500 tracking-widest">{inv.project}</div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">{new Date(inv.date).toLocaleDateString('de-CH')}</td>
                    <td className="px-8 py-5">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-black/5
                         ${inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                           inv.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                         {inv.status}
                       </span>
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-sm text-slate-950 dark:text-slate-50 tracking-tight">CHF {inv.total.toLocaleString('de-CH', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        {selectedInvoice && (
          <div className={`fixed top-0 right-0 h-full w-[550px] z-[200] shadow-2xl transition-transform duration-500 border-l
            ${isDark ? 'bg-[#0f1117] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="h-full flex flex-col">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500 text-white rounded-2xl shadow-lg">
                       <FileText size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50">{selectedInvoice.invoiceNum}</h3>
                       <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">Detail-Zentrale v7.0</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedInvoice(null)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                    <X size={20} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                 <section className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest border-b pb-2">Client Matrix</h4>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Kundentyp</p>
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase shadow-lg shadow-blue-500/10">{selectedInvoice.clientType}</span>
                       </div>
                       {selectedInvoice.clientUID && (
                          <div>
                             <p className="text-[9px] font-black uppercase text-slate-500 mb-1">UID Nummer</p>
                             <p className="text-xs font-bold text-slate-950 dark:text-slate-50 tracking-tight">{selectedInvoice.clientUID}</p>
                          </div>
                       )}
                       <div className="col-span-2 space-y-3">
                          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                             <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-sm text-slate-950 dark:text-slate-50">M</div>
                             <div>
                                <p className="text-xs font-bold text-slate-950 dark:text-slate-50 tracking-tight">{selectedInvoice.clientName}</p>
                                <p className="text-[10px] font-bold text-slate-500 truncate">{selectedInvoice.clientEmail}</p>
                                <p className="text-[10px] font-bold text-slate-500">{selectedInvoice.clientPhone}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </section>

                 <section className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-8 text-center">Dokument-Vorschau</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between text-[11px] font-bold border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-950 dark:text-slate-50">
                          <span className="text-slate-500 tracking-widest uppercase">Dokument-ID</span>
                          <span>{selectedInvoice.docId}</span>
                       </div>
                       <div className="flex justify-between text-[11px] font-bold border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-950 dark:text-slate-50">
                          <span className="text-slate-500 tracking-widest uppercase">Rechnungsnummer</span>
                          <span>{selectedInvoice.invoiceNum}</span>
                       </div>
                       <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-orange-500 text-slate-950 dark:text-slate-50">
                          <span className="text-orange-600 uppercase">Total</span>
                          <span>CHF {selectedInvoice.total.toLocaleString('de-CH')}</span>
                       </div>
                    </div>
                    <button className="w-full mt-8 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300">
                       <ExternalLink size={14}/> PDF-Vorschau öffnen
                    </button>
                 </section>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPlaceholder = (title: string) => (
    <div className="p-32 text-center opacity-20 space-y-4">
       <h2 className="text-3xl font-black uppercase tracking-widest text-slate-950 dark:text-slate-50">{title}</h2>
       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Modul wird im nächsten Schritt implementiert</p>
    </div>
  );

  return (
    <div className="max-w-[1700px] mx-auto min-h-screen">
      {activePage === 'dashboard' && renderDashboard()}
      {activePage === 'revenues' && renderRevenues()}
      {activePage === 'expenses' && renderPlaceholder('Ausgaben')}
      {activePage === 'accounting' && renderPlaceholder('Buchhaltung')}
      {activePage === 'drive' && renderPlaceholder('Expertico Drive')}
      {activePage === 'email' && renderPlaceholder('Business Mail')}
    </div>
  );
};

export default OfficeView;
