
import React, { useState, useMemo, useRef } from 'react';
import { CRMSubPageId, Theme, ContactRecord, DashletData, ContactStatus, SocialProfile, Message } from '../types';
import { CRM_CONTACTS, ALL_DASHLETS, PERSONAS } from '../constants';
import { 
  Plus, Search, List, LayoutGrid, Filter, MoreHorizontal, Phone, Mail, 
  MessageSquare, X, Smartphone, Globe, ArrowUpDown, ArrowUp, ArrowDown, Database,
  TrendingUp, Maximize2, ChevronLeft, ChevronRight, Trash2, Edit3, 
  Linkedin, Instagram, Star, MapPin, Briefcase, User, Info, Save,
  Eye, Zap, Layers, Trophy, CheckCircle2, ChevronDown, ChevronUp, FileText, Gift, Target,
  Facebook, Send, Bot, ShieldCheck, Link2, Share2, AlertCircle, RefreshCcw, Settings,
  FileCheck, Heart, Users2, DollarSign, Move
} from 'lucide-react';

interface CRMViewProps {
  activePage: CRMSubPageId;
  theme: Theme;
  onSelectPage: (page: CRMSubPageId) => void;
  isGlobalEditMode?: boolean;
}

type CRMSortState = { key: keyof ContactRecord; direction: 'asc' | 'desc' } | null;

const STAGE_CONFIG = {
  identity: { label: 'Identity', color: 'blue', icon: Eye, statusList: ['Neu', 'Qualifiziert', 'Recherche läuft', 'Kontaktversuch', 'Archiviert'] },
  insight: { label: 'Insight', color: 'blue', icon: Target, statusList: ['Analyse offen', 'Persona erstellt', 'Erstgespräch geführt', 'Warm-Up', 'Lost'] },
  solution: { label: 'Solution', color: 'orange', icon: Zap, statusList: ['Bedarfsanalyse', 'Lösungskonzept', 'Offerte gesendet', 'In Verhandlung', 'Closing'] },
  delivery: { label: 'Delivery', color: 'emerald', icon: Layers, statusList: ['Anzahlung offen', 'Onboarding', 'Produktion', 'Feedback-Schleife', 'Projektabschluss'] },
  growth: { label: 'Growth', color: 'fuchsia', icon: Trophy, statusList: ['Review-Anfrage', 'Erfolgs-Story', 'Cross-Selling-Check', 'Full-Service', 'Reaktivierung'] },
  advocacy: { label: 'Advocacy', color: 'indigo', icon: Star, statusList: ['Ambassador-Check', 'Einladung gesendet', 'Aktiver Empfehler', 'Partner-Status', 'VIP-Ambassador'] }
};

const CRMView: React.FC<CRMViewProps> = ({ activePage, theme, onSelectPage, isGlobalEditMode }) => {
  const isDark = theme === 'dark';
  const isEditMode = isGlobalEditMode || false;
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<CRMSortState>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [dashlets, setDashlets] = useState<DashletData[]>(ALL_DASHLETS.crm);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [expandedStages, setExpandedStages] = useState<string[]>(['identity']);
  const [activeDialogId, setActiveDialogId] = useState<string | null>(CRM_CONTACTS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [agentAssisted, setAgentAssisted] = useState(true);
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    selection: 60,
    company: 200,
    name: 160,
    status: 160,
    industry: 140,
    city: 110,
    milieu: 120,
    email: 220,
    phone: 160,
    actions: 80
  });

  const resizerRef = useRef<{ col: string; startX: number; startWidth: number } | null>(null);

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

  const getStageFromStatus = (status: string): string => {
    for (const [stage, config] of Object.entries(STAGE_CONFIG)) {
      if (config.statusList.includes(status)) return stage;
    }
    return 'identity';
  };

  const filteredContacts = useMemo(() => {
    let data = CRM_CONTACTS.filter(c => {
      if (activePage === 'dashboard' || activePage === 'contacts') return true;
      if (activePage === 'dialog_hub') return true;
      return getStageFromStatus(c.status) === activePage;
    }).filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
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
  }, [activePage, search, sortConfig]);

  const currentContactIndex = filteredContacts.findIndex(c => c.id === selectedContactId);
  const selectedContact = currentContactIndex !== -1 ? filteredContacts[currentContactIndex] : (selectedContactId ? CRM_CONTACTS.find(c => c.id === selectedContactId) : null);

  const handleSort = (key: keyof ContactRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) setSelectedIds([]);
    else setSelectedIds(filteredContacts.map(c => c.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const onResizeStart = (e: React.MouseEvent, col: string) => {
    resizerRef.current = { col, startX: e.clientX, startWidth: columnWidths[col] };
    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeEnd);
  };

  const onResizeMove = (e: MouseEvent) => {
    const current = resizerRef.current;
    if (!current) return;
    const diff = e.clientX - current.startX;
    const newWidth = Math.max(80, current.startWidth + diff);
    const colName = current.col;
    setColumnWidths(prev => ({ ...prev, [colName]: newWidth }));
  };

  const onResizeEnd = () => {
    resizerRef.current = null;
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  const navigateContacts = (dir: 'next' | 'prev') => {
    const nextIdx = dir === 'next' ? currentContactIndex + 1 : currentContactIndex - 1;
    if (nextIdx >= 0 && nextIdx < filteredContacts.length) {
      setSelectedContactId(filteredContacts[nextIdx].id);
    }
  };

  const toggleStageExpand = (stage: string) => {
    setExpandedStages(prev => prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]);
  };

  const BulkActionBar = () => {
    if (selectedIds.length === 0) return null;
    return (
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-8 px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500
        ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
            {selectedIds.length} ausgewählt
          </div>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-4">
             <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-orange-500 transition-colors text-slate-950 dark:text-slate-50">
                <Edit3 size={14}/> Bearbeiten
             </button>
             <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-rose-500 transition-colors text-rose-400">
                <Trash2 size={14}/> Löschen
             </button>
          </div>
        </div>
        <button onClick={() => setSelectedIds([])} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
          <X size={16} />
        </button>
      </div>
    );
  };

  const JourneySection = ({ stage, title, icon: Icon, color, children, isReached }: any) => {
    const isExpanded = expandedStages.includes(stage);
    const colorClass = color === 'blue' ? 'text-blue-500' : 
                      color === 'orange' ? 'text-orange-500' : 
                      color === 'emerald' ? 'text-emerald-500' : 
                      color === 'fuchsia' ? 'text-fuchsia-500' : 'text-indigo-500';

    return (
      <div className={`border rounded-[2rem] overflow-hidden transition-all duration-500 ${!isReached ? 'opacity-40 grayscale-[0.5] hover:opacity-100 hover:grayscale-0' : ''} ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <button 
          onClick={() => toggleStageExpand(stage)}
          className="w-full px-8 py-5 flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors ${isExpanded ? colorClass : 'text-slate-400'}`}>
              <Icon size={18} />
            </div>
            <h4 className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isExpanded ? colorClass : 'text-slate-500'}`}>{title}</h4>
          </div>
          <div className="flex items-center gap-4">
             {isReached && <CheckCircle2 size={16} className="text-emerald-500" />}
             {!isReached && <Edit3 size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
             {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1500px] border-t border-slate-100 dark:border-slate-800 p-8 pt-6' : 'max-h-0'}`}>
           {children}
        </div>
      </div>
    );
  };

  const EditableField = ({ label, value, type = 'text', options }: any) => (
    <div className="space-y-1 group">
       <div className="flex items-center justify-between">
          <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider ml-1">{label}</label>
          <Edit3 size={10} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
       </div>
       {options ? (
         <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-orange-500/30 rounded-xl px-4 py-2.5 text-[11px] font-bold tracking-tight outline-none transition-all text-slate-950 dark:text-slate-50">
           {options.map((opt: string) => <option key={opt}>{opt}</option>)}
         </select>
       ) : (
         <input 
           type={type} 
           defaultValue={value} 
           className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-orange-500/30 rounded-xl px-4 py-2.5 text-[11px] font-bold tracking-tight outline-none transition-all text-slate-950 dark:text-slate-50" 
         />
       )}
    </div>
  );

  const SocialMatchCard = ({ profile, uncertain = false }: { profile: any, uncertain?: boolean }) => {
    const PlatformIcon = profile.platform === 'linkedin' ? Linkedin : profile.platform === 'instagram' ? Instagram : Facebook;
    return (
      <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer group relative
        ${uncertain ? 'border-orange-500/30 bg-orange-500/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'}`}>
         {uncertain && <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">Verify</div>}
         <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${profile.platform === 'linkedin' ? 'bg-[#0077b5] text-white' : 'bg-fuchsia-600 text-white'}`}>
               <PlatformIcon size={18} />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[10px] font-bold truncate text-slate-950 dark:text-slate-50">{profile.username}</p>
               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{profile.type} • {uncertain ? 'Match 78%' : 'Connected'}</p>
            </div>
            {uncertain && <button className="p-1.5 bg-emerald-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><CheckCircle2 size={12}/></button>}
         </div>
      </div>
    );
  };

  const renderSidePanel = () => {
    if (!selectedContact) return null;
    const currentStage = getStageFromStatus(selectedContact.status);
    const stages = Object.keys(STAGE_CONFIG);
    const currentStageIndex = stages.indexOf(currentStage);

    return (
      <div className={`fixed top-0 right-0 h-full w-[750px] z-[400] shadow-2xl transition-transform duration-500 ease-in-out border-l flex flex-col
        ${selectedContactId ? 'translate-x-0' : 'translate-x-full'}
        ${isDark ? 'bg-[#0f1117] border-slate-800' : 'bg-white border-slate-200'}`}>
        
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
           <div className="flex items-center gap-6">
             <div className="flex gap-2">
                <button onClick={() => navigateContacts('prev')} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl shadow-sm transition-all border border-slate-200 dark:border-slate-700 active:scale-90"><ChevronLeft size={20}/></button>
                <button onClick={() => navigateContacts('next')} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl shadow-sm transition-all border border-slate-200 dark:border-slate-700 active:scale-90"><ChevronRight size={20}/></button>
             </div>
             <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700" />
             <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-orange-500/20">
                 {selectedContact.company?.[0] || selectedContact.name[0]}
               </div>
               <div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50">{selectedContact.company || selectedContact.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white`}>
                       {selectedContact.status}
                     </span>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stage: {STAGE_CONFIG[currentStage as keyof typeof STAGE_CONFIG].label}</span>
                  </div>
               </div>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"><Save size={14}/> Speichern</button>
             <button onClick={() => setSelectedContactId(null)} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
               <X size={24} />
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-6">
           <JourneySection 
             stage="identity" 
             title="Stage 1: Identity (Basis & Social Discovery)" 
             icon={Eye} 
             color="blue" 
             isReached={currentStageIndex >= 0}
           >
              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner">
                   <div className="col-span-2 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-2"><Info size={12}/> Listen-Synchronität</div>
                   <EditableField label="Firma / Organisation" value={selectedContact.company} />
                   <EditableField label="Kontaktperson (Vorname Nachname)" value={`${selectedContact.firstName} ${selectedContact.name}`} />
                   <EditableField label="Branchen-Zuweisung" value={selectedContact.industry} />
                   <EditableField label="Customer Journey Stage" value={selectedContact.status} options={Object.values(STAGE_CONFIG).flatMap(s => s.statusList)} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <h5 className="text-[10px] font-black uppercase text-blue-500 flex items-center gap-2 tracking-widest"><MapPin size={14}/> Adresse</h5>
                      <EditableField label="Straße / Hausnummer" value={selectedContact.address} />
                      <div className="grid grid-cols-2 gap-4">
                         <EditableField label="PLZ" value={selectedContact.zip} />
                         <EditableField label="Ort" value={selectedContact.city} />
                      </div>
                      <EditableField label="E-Mail (Direkt-Link)" value={selectedContact.email} />
                   </div>
                   <div className="space-y-4">
                      <h5 className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-2 tracking-widest"><Smartphone size={14}/> Connectivity</h5>
                      <EditableField label="Mobilnummer" value={selectedContact.phone} />
                      <EditableField label="Website" value={selectedContact.website} />
                      <EditableField label="Präferenz" value={selectedContact.preferredChannel} options={['whatsapp', 'email', 'phone', 'sms', 'telegram']} />
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <h5 className="text-[11px] font-black uppercase text-blue-500 flex items-center gap-2 tracking-[0.2em]"><Globe size={14}/> Social Media Discovery</h5>
                      <button className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1 hover:text-blue-500 transition-colors"><RefreshCcw size={10}/> Rescan Hub</button>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <SocialMatchCard profile={{platform: 'linkedin', username: 'hans-mueller-ch', type: 'private'}} />
                      <SocialMatchCard profile={{platform: 'linkedin', username: 'techsolutions-ag', type: 'business'}} />
                   </div>

                   <div className="p-5 bg-orange-500/5 rounded-3xl border border-orange-500/10 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-500"><AlertCircle size={14}/> Uncertain Matches (Verification Required)</div>
                      <div className="grid grid-cols-2 gap-4">
                         <SocialMatchCard profile={{platform: 'instagram', username: 'hansi_m_official', type: 'private'}} uncertain />
                         <SocialMatchCard profile={{platform: 'instagram', username: 'mueller_tech_beratung', type: 'business'}} uncertain />
                      </div>
                   </div>
                </div>
              </div>
           </JourneySection>

           <JourneySection stage="insight" title="Stage 2: Insight (Psychologie)" icon={Target} color="blue" isReached={currentStageIndex >= 1}>
              <div className="space-y-6">
                 <div>
                    <label className="text-[9px] font-black uppercase text-slate-500 mb-1 block">Deep Research Feed</label>
                    <textarea className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-[11px] font-bold tracking-tight h-24 outline-none border border-transparent focus:border-blue-500/20 text-slate-950 dark:text-slate-50" placeholder="Google Funde, News, Social Signals..." />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <EditableField label="Sinus-Milieu" value={selectedContact.milieu} options={['Performer', 'Expeditive', 'Postmaterielle', 'Traditionelle', 'Bürgerliche Mitte']} />
                    <EditableField label="Kundenwert-Score" value="8.5 / 10" />
                    <EditableField label="KI-Persona Profil" value="Visionärer Entscheider" />
                    <EditableField label="Personal Touch" value="Segelt gerne, 2 Kinder" />
                 </div>
              </div>
           </JourneySection>

           <JourneySection stage="solution" title="Stage 3: Solution (Consulting)" icon={Zap} color="orange" isReached={currentStageIndex >= 2}>
              <div className="space-y-6">
                 <h5 className="text-[10px] font-black uppercase text-orange-500 tracking-widest border-b border-orange-500/10 pb-2">The 5-W-Checklist</h5>
                 <div className="grid grid-cols-2 gap-6">
                    <EditableField label="Ist-Zustand" value="Veraltetes CRM" />
                    <EditableField label="Pain Points" value="Hoher Zeitverlust" />
                    <EditableField label="Goals (Ziele)" value="Automatisierung" />
                    <EditableField label="Budget" value="CHF 15k - 25k" />
                 </div>
                 <button className="w-full py-3 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl shadow-orange-500/20">Projekt-Draft erstellen</button>
              </div>
           </JourneySection>

           <JourneySection stage="delivery" title="Stage 4: Delivery (Kunden-Projekt)" icon={Layers} color="emerald" isReached={currentStageIndex >= 3}>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                         <h5 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><DollarSign size={14}/> Finanz-Status</h5>
                         <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      </div>
                      <p className="text-[11px] font-bold tracking-tight text-slate-950 dark:text-slate-50">Anzahlung (50%) erhalten</p>
                      <p className="text-[9px] font-black uppercase text-emerald-600/60 mt-1">CHF 7,500.00 am 12.02.2026</p>
                   </div>
                   <div className="space-y-3">
                      <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2"><TrendingUp size={14}/> Milestones</h5>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-emerald-500" style={{ width: '60%' }} />
                      </div>
                      <div className="flex justify-between text-[8px] font-black uppercase text-slate-500">
                         <span>Phase 3 von 5</span>
                         <span>Produktion läuft</span>
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                   <h5 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2"><FileCheck size={14}/> Asset Management</h5>
                   <div className="grid grid-cols-3 gap-3">
                      {['Vertrag.pdf', 'Proto.log', 'Design_v2'].map(file => (
                        <div key={file} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-center group cursor-pointer hover:border-emerald-500 transition-all">
                           <FileText size={16} className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-500" />
                           <span className="text-[8px] font-bold block truncate text-slate-950 dark:text-slate-50">{file}</span>
                        </div>
                      ))}
                      <button className="p-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-500/5 hover:border-emerald-500 group transition-all">
                         <Plus size={16} className="text-slate-300 group-hover:text-emerald-500" />
                      </button>
                   </div>
                </div>
              </div>
           </JourneySection>

           <JourneySection stage="growth" title="Stage 5: Growth (Hero-Status)" icon={Trophy} color="fuchsia" isReached={currentStageIndex >= 4}>
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-fuchsia-500 tracking-widest flex items-center gap-2"><MessageSquare size={14}/> Testimonial & Review</label>
                    <textarea className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 text-[11px] font-bold tracking-tight h-20 outline-none border border-transparent focus:border-fuchsia-500/20 text-slate-950 dark:text-slate-50" placeholder="Kunden-Stimme hier erfassen..." />
                    <div className="flex items-center gap-2 p-3 bg-fuchsia-500/5 rounded-xl border border-fuchsia-500/10">
                       <Link2 size={12} className="text-fuchsia-500"/>
                       <span className="text-[9px] font-black uppercase text-fuchsia-600 truncate">google.ch/maps/review/expertico-os-12345</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2"><Layers size={14}/> Product-Matrix</h5>
                       <div className="space-y-2">
                          {['Core CRM', 'AI Ops', 'Support Hub'].map(prod => (
                            <div key={prod} className="flex items-center gap-3">
                               <div className={`w-4 h-4 rounded border flex items-center justify-center ${prod === 'Core CRM' ? 'bg-fuchsia-500 border-fuchsia-500 text-white' : 'border-slate-300'}`}>
                                  {prod === 'Core CRM' && <CheckCircle2 size={10} />}
                               </div>
                               <span className="text-[10px] font-bold tracking-tight text-slate-600 dark:text-slate-400">{prod}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-3xl text-white shadow-xl shadow-fuchsia-500/20">
                       <h5 className="text-[9px] font-black uppercase opacity-60 flex items-center gap-2"><Zap size={10}/> Next Best Offer</h5>
                       <p className="text-[12px] font-bold mt-3 leading-tight tracking-tight">Advanced Lead-Gen Automation Hub</p>
                       <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Angebot senden</button>
                    </div>
                 </div>
              </div>
           </JourneySection>

           <JourneySection stage="advocacy" title="Stage 6: Advocacy (Ambassador)" icon={Star} color="indigo" isReached={currentStageIndex >= 5}>
              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                       <p className="text-[9px] font-black uppercase text-indigo-400 mb-1">Prämien-Konto</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-indigo-600">CHF 420.00</span>
                          <Gift size={14} className="text-indigo-500 animate-bounce" />
                       </div>
                    </div>
                    <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                       <p className="text-[9px] font-black uppercase text-indigo-400 mb-1">Netzwerk-Wert</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-indigo-600">CHF 12.4k</span>
                          <Users2 size={14} className="text-indigo-500" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center justify-between">
                       <span>Empfehlungs-Log</span>
                       <span className="text-indigo-500">4 Leads geworben</span>
                    </h5>
                    <div className="space-y-2">
                       {['Müller Solar AG', 'Elena Branding', 'Startup X', 'Local Doc'].map((lead, i) => (
                         <div key={lead} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                               <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-black text-[10px]">{lead[0]}</div>
                               <span className="text-[11px] font-bold tracking-tight text-slate-950 dark:text-slate-50">{lead}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${i === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                               {i === 0 ? 'Closed' : 'Pipeline'}
                            </span>
                         </div>
                       ))}
                    </div>
                    <button className="w-full py-3 border-2 border-dashed border-indigo-500/30 text-indigo-500 rounded-2xl text-[9px] font-black uppercase hover:bg-indigo-500/5 transition-all">Referral manuell hinzufügen</button>
                 </div>
              </div>
           </JourneySection>
        </div>
      </div>
    );
  };

  const renderDialogHub = () => (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-180px)] animate-in fade-in duration-700">
      <div className={`col-span-3 border rounded-[2.5rem] flex flex-col overflow-hidden
        ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
         <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Active Dialogs</h3>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500"><Plus size={16}/></button>
         </div>
         <div className="flex-1 overflow-y-auto">
            {CRM_CONTACTS.slice(0, 15).map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveDialogId(c.id)}
                className={`w-full p-5 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 transition-all
                  ${activeDialogId === c.id ? 'bg-orange-500/10 border-l-4 border-l-orange-500' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-orange-500 relative">
                  {c.company?.[0] || c.name[0]}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#25D366] text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-lg">
                    <Smartphone size={10} />
                  </div>
                </div>
                <div className="flex-1 text-left min-w-0">
                   <p className="text-[11px] font-bold truncate text-slate-950 dark:text-slate-50 tracking-tight">{c.company || c.name}</p>
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest truncate">Letzte Nachricht um 14:20</p>
                </div>
              </button>
            ))}
         </div>
      </div>

      <div className={`col-span-6 border rounded-[2.5rem] flex flex-col overflow-hidden relative
        ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
         <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900"><Linkedin size={14}/></div>
                  <div className={`w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900`}><Smartphone size={14}/></div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900 border border-slate-700 text-[8px] font-black">+4</div>
               </div>
               <div>
                  <h4 className="text-[11px] font-bold text-slate-950 dark:text-slate-50 tracking-tight">One Omnichannel Stream</h4>
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Session Active • 6 Channels Syncing</p>
               </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest"><Share2 size={12}/> Link Context</button>
         </div>

         <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
            <div className="flex flex-col gap-8">
               <div className="flex flex-col gap-2 max-w-[80%]">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-500">Client via WhatsApp <span className="w-1 h-1 bg-slate-300 rounded-full"/> 12:45</div>
                  <div className="p-5 bg-slate-100 dark:bg-slate-800/50 rounded-t-3xl rounded-br-3xl text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-relaxed">Guten Tag Expertico Team, wir brauchen Hilfe bei der Integration der TikTok Kampagne.</div>
               </div>

               <div className="flex flex-col gap-2 max-w-[80%] self-end">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-orange-600 self-end">Expertico AI Agent (Maya) <Bot size={12}/> <span className="w-1 h-1 bg-orange-300 rounded-full"/> 12:46</div>
                  <div className="p-5 bg-orange-500 text-white rounded-t-3xl rounded-bl-3xl text-sm font-bold tracking-tight shadow-xl shadow-orange-500/20 leading-relaxed">
                     Guten Tag! Ich habe Ihren Account-Status geprüft. Ich schlage vor, wir verknüpfen erst das TikTok Ads Manager Konto. Soll ich den Link senden?
                  </div>
               </div>

               <div className="flex flex-col gap-2 max-w-[80%]">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-500">Client via LinkedIn <span className="w-1 h-1 bg-slate-300 rounded-full"/> 13:10</div>
                  <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-t-3xl rounded-br-3xl text-sm font-bold tracking-tight italic text-slate-600 leading-relaxed">
                     (Nachricht von LinkedIn synchronisiert) Ja, bitte senden Sie den Link.
                  </div>
               </div>
            </div>
         </div>

         <div className="p-8 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-700 shadow-inner flex items-end gap-4 group focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
               <div className="flex flex-col gap-2 mb-1">
                  <button onClick={() => setAgentAssisted(!agentAssisted)} className={`p-3 rounded-2xl transition-all ${agentAssisted ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`} title="AI Assistant Toggle">
                     <Bot size={20}/>
                  </button>
                  <button className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-400 rounded-2xl hover:text-blue-500 transition-colors">
                     <Share2 size={20}/>
                  </button>
               </div>
               <textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50 resize-none py-2 max-h-32 placeholder:text-slate-400"
                  placeholder={agentAssisted ? "Maya schreibt eine Antwort vor..." : "Schreiben Sie eine Nachricht..."}
                  rows={2}
               />
               <button className="p-4 bg-orange-500 text-white rounded-[1.5rem] shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all">
                  <Send size={24}/>
               </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 opacity-30">
               <Linkedin size={14}/> <Smartphone size={14}/> <Instagram size={14}/> <Facebook size={14}/> <MessageSquare size={14}/> <Globe size={14}/>
            </div>
         </div>
      </div>

      <div className="col-span-3 space-y-6">
         <div className={`p-8 border rounded-[2.5rem]
           ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.2em] mb-6 flex items-center gap-2"><Settings size={14}/> Account Connector</h4>
            <div className="space-y-3">
               {[
                  { platform: 'WhatsApp', icon: Smartphone, color: 'text-emerald-500', active: true },
                  { platform: 'LinkedIn (Biz)', icon: Linkedin, color: 'text-blue-600', active: true },
                  { platform: 'LinkedIn (Priv)', icon: Linkedin, color: 'text-blue-400', active: false },
                  { platform: 'Instagram', icon: Instagram, color: 'text-fuchsia-600', active: true },
                  { platform: 'TikTok', icon: Share2, color: 'text-black', active: false },
                  { platform: 'Telegram X', icon: Send, color: 'text-sky-500', active: false }
               ].map(account => (
                 <div key={account.platform} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 group">
                    <div className="flex items-center gap-3">
                       <account.icon size={16} className={account.color} />
                       <span className="text-[10px] font-bold text-slate-950 dark:text-slate-50">{account.platform}</span>
                    </div>
                    {account.active ? (
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                    ) : (
                      <button className="text-[8px] font-black uppercase text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Connect</button>
                    )}
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-[9px] font-black uppercase text-slate-500 hover:border-orange-500 hover:text-orange-500 transition-all">Add more Platforms</button>
         </div>

         <div className={`p-8 border rounded-[2.5rem]
           ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
            <h4 className="text-[11px] font-black uppercase text-orange-600 tracking-[0.2em] mb-6 flex items-center gap-2"><Target size={14}/> Context Insight</h4>
            <div className="space-y-4">
               <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                  <p className="text-[8px] font-black uppercase text-orange-600 mb-1">KI Recommendation</p>
                  <p className="text-[10px] font-bold tracking-tight text-slate-600 dark:text-slate-400 leading-relaxed italic">"Kunde ist ungeduldig, TikTok-Sync priorisieren. Lösung für Fehler #402 anbieten."</p>
               </div>
               <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-950 dark:text-slate-50">
                  <span className="text-slate-500">Active Stage</span>
                  <span className="text-blue-600">Identity (Stage 1)</span>
               </div>
               <button onClick={() => setSelectedContactId(activeDialogId)} className="w-full py-3 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20">Open Detail Panel</button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderVisual = (widget: DashletData) => {
    const color = widget.color || '#f97316';
    switch (widget.type) {
      case 'sankey':
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full opacity-80 drop-shadow-2xl">
            <path d="M10,20 C100,20 100,80 190,80" stroke={color} fill="none" strokeWidth="18" strokeOpacity="0.3" />
            <path d="M10,80 C100,80 100,20 190,20" stroke="#3b82f6" fill="none" strokeWidth="14" strokeOpacity="0.2" />
            <rect x="0" y="10" width="10" height="80" fill={color} rx="3" />
            <rect x="190" y="10" width="10" height="80" fill="#3b82f6" rx="3" />
          </svg>
        );
      case 'bar':
        return (
          <div className="flex items-end gap-1 h-full w-full pb-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 60, 30, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: color, opacity: 0.3 + (i * 0.06) }} />
            ))}
          </div>
        );
      case 'line':
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full px-2" preserveAspectRatio="none">
            <path d="M0,80 Q40,20 80,60 T160,20 T200,40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M0,80 Q40,20 80,60 T160,20 T200,40 V100 H0 Z" fill={color} fillOpacity="0.05" />
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
                 width: `${i * 15}px`, height: `${i * 15}px`, 
                 backgroundColor: color, 
                 opacity: 0.1,
                 left: `${20 + (i * 10)}%`,
                 top: `${30 + (Math.sin(i) * 20)}%` 
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
          <svg viewBox="0 0 100 40" className="w-full h-full opacity-60">
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
          <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-60">
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
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center text-[9px] font-bold shadow-md group-hover:rotate-3 transition-transform">
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

  const renderContactsList = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Kunden, Firmen oder Branche durchsuchen..." className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold tracking-tight outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all shadow-sm text-slate-950 dark:text-slate-50" />
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl backdrop-blur-md border border-slate-200 dark:border-700">
             <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-xl text-orange-500' : 'text-slate-500 hover:text-slate-300'}`}><List size={20}/></button>
             <button onClick={() => setViewMode('kanban')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-700 shadow-xl text-orange-500' : 'text-slate-500 hover:text-slate-300'}`}><LayoutGrid size={20}/></button>
           </div>
           <button className="px-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-300"><Filter size={16}/> Filter</button>
           <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-orange-500/30 transition-all active:scale-95 whitespace-nowrap">Eintrag hinzufügen</button>
        </div>
      </div>

      <div className={`rounded-[2.5rem] border shadow-2xl transition-all overflow-hidden relative ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b-2 border-slate-100 dark:border-slate-800">
                <th style={{ width: columnWidths.selection }} className="px-6 py-6 relative"><input type="checkbox" checked={selectedIds.length === filteredContacts.length} onChange={toggleSelectAll} className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 accent-orange-500 cursor-pointer" /></th>
                {['company', 'name', 'status', 'industry', 'city', 'milieu', 'email', 'phone'].map(key => (
                  <th key={key} style={{ width: columnWidths[key] }} className="px-6 py-6 text-[11px] font-black uppercase text-slate-700 dark:text-slate-200 tracking-widest cursor-pointer group relative overflow-visible" onClick={() => handleSort(key as any)}>
                    {key} <ArrowUpDown size={10} className="inline ml-1 opacity-20"/>
                    <div onMouseDown={(e) => onResizeStart(e, key)} className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-orange-500/30 cursor-col-resize z-10 transition-colors" />
                  </th>
                ))}
                <th style={{ width: columnWidths.actions }} className="px-6 py-6 text-[11px] font-black uppercase text-slate-700 dark:text-slate-200 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredContacts.map(c => (
                <tr key={c.id} className="hover:bg-orange-500/[0.03] transition-all cursor-pointer group" onClick={() => setSelectedContactId(c.id)}>
                  <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => toggleSelect(c.id)} className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 accent-orange-500" /></td>
                  <td className="px-6 py-5 font-bold text-sm text-slate-950 dark:text-slate-50 tracking-tight truncate">{c.company}</td>
                  <td className="px-6 py-5 font-bold text-sm text-slate-950 dark:text-slate-50 tracking-tight">{c.firstName} {c.name}</td>
                  <td className="px-6 py-5"><span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase bg-orange-500 text-white shadow-lg shadow-orange-500/10">{c.status}</span></td>
                  <td className="px-6 py-5 text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-tight truncate">{c.industry}</td>
                  <td className="px-6 py-5 text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">{c.city}</td>
                  <td className="px-6 py-5"><span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase text-slate-950 dark:text-slate-50">{c.milieu}</span></td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-700 dark:text-slate-300 tracking-tight truncate">{c.email}</td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-700 dark:text-slate-300 tracking-tight truncate">{c.phone}</td>
                  <td className="px-6 py-5 text-right"><Maximize2 size={16} className="text-slate-400 group-hover:text-orange-500 transition-colors"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BulkActionBar />
    </div>
  );

  return (
    <div className="max-w-[1700px] mx-auto min-h-screen">
      {activePage === 'dashboard' && renderDashboard()}
      {activePage === 'contacts' && renderContactsList()}
      {activePage === 'dialog_hub' && renderDialogHub()}
      {(Object.keys(STAGE_CONFIG).includes(activePage)) && renderContactsList()}
      {renderSidePanel()}
    </div>
  );
};

export default CRMView;
