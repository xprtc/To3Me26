
import React, { useState } from 'react';
import { MainModuleId, CRMSubPageId, OfficeSubPageId, ProjectsSubPageId, AgentsSubPageId, UnitId, Theme, PageId } from '../types';
import { 
  ChevronDown, Hexagon, Database, Layers, Briefcase, Users, 
  Settings, Sun, Moon, Target, Award, Star, MessageSquare,
  LayoutDashboard, TrendingUp, Compass, Headset, Wallet, HelpCircle, Link2,
  Sparkles, FileText, HardDrive, Mail, RefreshCcw, Plus, Edit3, Calendar, Clock,
  Eye, Zap, ShieldCheck, Trophy, Crown
} from 'lucide-react';
import { UNITS } from '../constants';

interface NavbarProps {
  activeModule: MainModuleId;
  activeCRMPage: CRMSubPageId;
  activeOfficePage: OfficeSubPageId;
  activeProjectsPage: ProjectsSubPageId;
  activeAgentsPage: AgentsSubPageId;
  activeUnitId: UnitId | null;
  activePage: PageId;
  onModuleChange: (mod: MainModuleId) => void;
  onCRMPageChange: (page: CRMSubPageId) => void;
  onOfficePageChange: (page: OfficeSubPageId) => void;
  onProjectsPageChange: (page: ProjectsSubPageId) => void;
  onAgentsPageChange: (page: AgentsSubPageId) => void;
  onUnitChange: (unit: UnitId) => void;
  onPageChange: (page: PageId) => void;
  theme: Theme;
  onToggleTheme: () => void;
  isEditMode: boolean;
  onToggleEdit: () => void;
  onGlobalAdd: () => void;
  onGlobalRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeModule, activeCRMPage, activeOfficePage, activeProjectsPage, activeAgentsPage, activeUnitId, activePage,
  onModuleChange, onCRMPageChange, onOfficePageChange, onProjectsPageChange, onAgentsPageChange, onUnitChange, onPageChange,
  theme, onToggleTheme, isEditMode, onToggleEdit, onGlobalAdd, onGlobalRefresh
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const closeDropdowns = () => setOpenDropdown(null);

  const MegaMenuItem = ({ label, icon: Icon, active, onClick, description }: any) => (
    <button
      onClick={() => { onClick(); closeDropdowns(); }}
      className={`flex items-start gap-4 p-4 rounded-[1.5rem] transition-all text-left group
        ${active 
          ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' 
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'}`}
    >
      <div className={`p-2.5 rounded-xl ${active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-orange-500'} transition-colors`}>
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div>
        <div className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-slate-900 dark:text-slate-200'}`}>{label}</div>
        {description && <div className={`text-[9px] mt-1 opacity-60 leading-tight ${active ? 'text-white' : 'text-slate-400'}`}>{description}</div>}
      </div>
    </button>
  );

  const GlobalActionButton = ({ icon: Icon, label, sublabel, onClick, active, colorClass }: any) => (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 w-full
        ${isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-100'}
        ${active ? 'ring-2 ring-orange-500/50 border-orange-500/30' : ''}`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform ${active ? 'scale-110' : ''} ${colorClass}`}>
        <Icon size={16} strokeWidth={2.5} className={active ? 'animate-pulse' : ''} />
      </div>
      <div className="flex flex-col text-left">
        <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</span>
        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{sublabel}</span>
      </div>
    </button>
  );

  return (
    <nav className={`relative w-full h-24 border-b z-[150] flex items-center px-10 transition-all duration-300
      ${isDark ? 'bg-[#0f1117] border-slate-800 shadow-2xl shadow-black/40' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/30'}`}>
      
      <div className="flex items-center gap-4 shrink-0 cursor-pointer group" onClick={() => { onPageChange('dashboard'); onModuleChange('global' as any); closeDropdowns(); }}>
        <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-[1.2rem] shadow-xl shadow-orange-500/30 group-hover:scale-110 transition-transform">
          <Hexagon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg uppercase tracking-tighter leading-none">Expertico OS</span>
          <span className="text-[9px] font-black uppercase text-orange-500 tracking-[0.4em] mt-2">V7.0 Enterprise Edition</span>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center gap-4 h-full">
        {/* CRM */}
        <div className="relative group/nav h-full flex items-center" onMouseEnter={() => setOpenDropdown('crm')} onMouseLeave={closeDropdowns}>
          <button className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all
            ${activeModule === 'crm' ? 'text-orange-500 bg-orange-500/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            CRM <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'crm' ? 'rotate-180 text-orange-500' : ''}`} />
          </button>
          
          {openDropdown === 'crm' && (
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[1100px] p-8 rounded-b-[2.5rem] border border-t-0 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300
              ${isDark ? 'bg-[#161b26] border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="grid grid-cols-4 gap-8">
                {/* Column 1: Identity & Insight */}
                <div className="border-r border-slate-100 dark:border-slate-800 pr-8">
                  <h4 className="text-[11px] font-black uppercase text-blue-500 mb-6 flex items-center gap-2 tracking-widest"><Users size={14}/> Identity & Insight</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Dashboard" icon={LayoutDashboard} active={activeCRMPage === 'dashboard'} onClick={() => { onCRMPageChange('dashboard'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Lead-Pipeline Monitor" />
                    <MegaMenuItem label="Identity" icon={Eye} active={activeCRMPage === 'identity'} onClick={() => { onCRMPageChange('identity'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Basis & Research Stage" />
                    <MegaMenuItem label="Insight" icon={Target} active={activeCRMPage === 'insight'} onClick={() => { onCRMPageChange('insight'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Psychologie & Persona" />
                  </div>
                </div>
                {/* Column 2: Solution & Delivery */}
                <div className="border-r border-slate-100 dark:border-slate-800 pr-8">
                  <h4 className="text-[11px] font-black uppercase text-orange-500 mb-6 flex items-center gap-2 tracking-widest"><Briefcase size={14}/> Solution & Delivery</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Solution" icon={Zap} active={activeCRMPage === 'solution'} onClick={() => { onCRMPageChange('solution'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Konzept & Verhandlung" />
                    <MegaMenuItem label="Delivery" icon={Layers} active={activeCRMPage === 'delivery'} onClick={() => { onCRMPageChange('delivery'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Produktion & Onboarding" />
                  </div>
                </div>
                {/* Column 3: Growth & Advocacy */}
                <div className="border-r border-slate-100 dark:border-slate-800 pr-8">
                  <h4 className="text-[11px] font-black uppercase text-fuchsia-500 mb-6 flex items-center gap-2 tracking-widest"><Trophy size={14}/> Growth & Advocacy</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Growth" icon={TrendingUp} active={activeCRMPage === 'growth'} onClick={() => { onCRMPageChange('growth'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Hero-Status & Upselling" />
                    <MegaMenuItem label="Advocacy" icon={Star} active={activeCRMPage === 'advocacy'} onClick={() => { onCRMPageChange('advocacy'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Ambassador Programm" />
                  </div>
                </div>
                {/* Column 4: Communication */}
                <div>
                  <h4 className="text-[11px] font-black uppercase text-emerald-500 mb-6 flex items-center gap-2 tracking-widest"><MessageSquare size={14}/> Operations</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Dialog Hub" icon={MessageSquare} active={activeCRMPage === 'dialog_hub'} onClick={() => { onCRMPageChange('dialog_hub'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Zentrale Kommunikation" />
                    <MegaMenuItem label="Alle Kontakte" icon={Users} active={activeCRMPage === 'contacts'} onClick={() => { onCRMPageChange('contacts'); onPageChange('crm_page'); onModuleChange('crm'); }} description="Gesamte Datenbank" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROJECTS */}
        <div className="relative group/nav h-full flex items-center" onMouseEnter={() => setOpenDropdown('projects')} onMouseLeave={closeDropdowns}>
          <button className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all
            ${activeModule === 'projects' ? 'text-orange-500 bg-orange-500/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            Projects <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'projects' ? 'rotate-180 text-orange-500' : ''}`} />
          </button>
          
          {openDropdown === 'projects' && (
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[800px] p-8 rounded-b-[2.5rem] border border-t-0 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300
              ${isDark ? 'bg-[#161b26] border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1 border-r border-slate-100 dark:border-slate-800 pr-8">
                  <h4 className="text-[11px] font-black uppercase text-orange-500 mb-6 flex items-center gap-2 tracking-widest"><LayoutDashboard size={14}/> Project Intelligence</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Dashboard" icon={LayoutDashboard} active={activeProjectsPage === 'dashboard'} onClick={() => { onProjectsPageChange('dashboard'); onPageChange('projects_page'); onModuleChange('projects'); }} description="Status Quo & KPI Monitoring" />
                    <MegaMenuItem label="Projekte" icon={Briefcase} active={activeProjectsPage === 'projects'} onClick={() => { onProjectsPageChange('projects'); onPageChange('projects_page'); onModuleChange('projects'); }} description="Operative Projektliste & Kanban" />
                  </div>
                </div>
                <div className="col-span-2">
                  <h4 className="text-[11px] font-black uppercase text-blue-500 mb-6 flex items-center gap-2 tracking-widest"><Layers size={14}/> Execution Hub</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <MegaMenuItem label="Kalender" icon={Calendar} active={activeProjectsPage === 'calendar'} onClick={() => { onProjectsPageChange('calendar'); onPageChange('projects_page'); onModuleChange('projects'); }} description="Fristen & Milestone Tracking" />
                    <MegaMenuItem label="Zeiterfassung" icon={Clock} active={activeProjectsPage === 'time'} onClick={() => { onProjectsPageChange('time'); onPageChange('projects_page'); onModuleChange('projects'); }} description="Performance & Billable Hours" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI AGENTS */}
        <div className="relative group/nav h-full flex items-center" onMouseEnter={() => setOpenDropdown('agents')} onMouseLeave={closeDropdowns}>
          <button className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all
            ${activeModule === 'agents' ? 'text-orange-500 bg-orange-500/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            AI Agents <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'agents' ? 'rotate-180 text-orange-500' : ''}`} />
          </button>
          
          {openDropdown === 'agents' && (
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[850px] p-8 rounded-b-[2.5rem] border border-t-0 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300
              ${isDark ? 'bg-[#161b26] border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="grid grid-cols-3 gap-8">
                {/* Column 1: Intelligence */}
                <div className="border-r border-slate-100 dark:border-slate-800 pr-8">
                  <h4 className="text-[11px] font-black uppercase text-orange-500 mb-6 flex items-center gap-2 tracking-widest"><Sparkles size={14}/> Agent Intelligence</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Dashboard" icon={LayoutDashboard} active={activeAgentsPage === 'dashboard'} onClick={() => { onAgentsPageChange('dashboard'); onPageChange('agents'); onModuleChange('agents'); }} description="Fleet Performance & Token Stats" />
                  </div>
                </div>
                {/* Column 2: Units */}
                <div className="col-span-2">
                  <h4 className="text-[11px] font-black uppercase text-blue-500 mb-6 flex items-center gap-2 tracking-widest"><Layers size={14}/> Unit Specialization</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {UNITS.map(unit => (
                      <MegaMenuItem 
                        key={unit.id} 
                        label={unit.label} 
                        icon={unit.id === 'sales' ? Briefcase : unit.id === 'marketing' ? TrendingUp : unit.id === 'support' ? Headset : unit.id === 'strategic' ? Compass : Wallet} 
                        active={activeUnitId === unit.id && activePage === 'agents' && activeAgentsPage === 'units'} 
                        onClick={() => { onUnitChange(unit.id); onAgentsPageChange('units'); onPageChange('agents'); onModuleChange('agents'); }} 
                        description={`${unit.label} AI Fleet`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* OFFICE (NOW BETWEEN AI AGENTS AND SETTINGS) */}
        <div className="relative group/nav h-full flex items-center" onMouseEnter={() => setOpenDropdown('office')} onMouseLeave={closeDropdowns}>
          <button className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all
            ${activeModule === 'office' ? 'text-orange-500 bg-orange-500/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            Office <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'office' ? 'rotate-180 text-orange-500' : ''}`} />
          </button>
          
          {openDropdown === 'office' && (
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[800px] p-8 rounded-b-[2.5rem] border border-t-0 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300
              ${isDark ? 'bg-[#161b26] border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1 border-r border-slate-100 dark:border-slate-800 pr-8">
                  <h4 className="text-[11px] font-black uppercase text-orange-500 mb-6 flex items-center gap-2 tracking-widest"><Wallet size={14}/> Finanzcockpit</h4>
                  <div className="flex flex-col gap-2">
                    <MegaMenuItem label="Dashboard" icon={LayoutDashboard} active={activeOfficePage === 'dashboard'} onClick={() => { onOfficePageChange('dashboard'); onPageChange('office_page'); onModuleChange('office'); }} description="Einnahmen & Ausgaben Übersicht" />
                    <MegaMenuItem label="Einnahmen" icon={TrendingUp} active={activeOfficePage === 'revenues'} onClick={() => { onOfficePageChange('revenues'); onPageChange('office_page'); onModuleChange('office'); }} description="Rechnungszentrale & Mahnwesen" />
                    <MegaMenuItem label="Ausgaben" icon={Briefcase} active={activeOfficePage === 'expenses'} onClick={() => { onOfficePageChange('expenses'); onPageChange('office_page'); onModuleChange('office'); }} description="Kostenkontrolle & Kreditoren" />
                  </div>
                </div>
                <div className="col-span-2">
                  <h4 className="text-[11px] font-black uppercase text-blue-500 mb-6 flex items-center gap-2 tracking-widest"><Layers size={14}/> Operational Business</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <MegaMenuItem label="Buchhaltung" icon={FileText} active={activeOfficePage === 'accounting'} onClick={() => { onOfficePageChange('accounting'); onPageChange('office_page'); onModuleChange('office'); }} description="DATEV & Belegmanagement" />
                    <MegaMenuItem label="Drive" icon={HardDrive} active={activeOfficePage === 'drive'} onClick={() => { onOfficePageChange('drive'); onPageChange('office_page'); onModuleChange('office'); }} description="Eigener Datei-Speicher" />
                    <MegaMenuItem label="E-Mail" icon={Mail} active={activeOfficePage === 'email'} onClick={() => { onOfficePageChange('email'); onPageChange('office_page'); onModuleChange('office'); }} description="Business Mail Zentrale" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SETTINGS */}
        <div className="relative group/nav h-full flex items-center" onMouseEnter={() => setOpenDropdown('settings')} onMouseLeave={closeDropdowns}>
          <button className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all
            ${activeModule === 'settings' ? 'text-orange-500 bg-orange-500/5' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            Settings <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown === 'settings' ? 'rotate-180 text-orange-500' : ''}`} />
          </button>
          
          {openDropdown === 'settings' && (
            <div className={`absolute top-full right-0 w-[400px] p-6 rounded-b-[2rem] border border-t-0 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300
              ${isDark ? 'bg-[#161b26] border-slate-800' : 'bg-white border-slate-100'}`}>
              <h4 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-[0.2em] flex items-center gap-2"><Settings size={14}/> Configuration</h4>
              
              <div className="grid gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                <GlobalActionButton icon={RefreshCcw} label="Refresh" sublabel="Sync Data" onClick={onGlobalRefresh} colorClass="bg-blue-500" />
                <GlobalActionButton icon={Plus} label="Add" sublabel="Create New" onClick={onGlobalAdd} colorClass="bg-orange-500" />
                <GlobalActionButton icon={Edit3} label="Edit" sublabel={isEditMode ? "Saving..." : "Configure"} onClick={onToggleEdit} active={isEditMode} colorClass={isEditMode ? "bg-fuchsia-600 shadow-fuchsia-500/50" : "bg-slate-700"} />
              </div>

              <div className="grid gap-2">
                <MegaMenuItem label="Setup Wizard" icon={Settings} active={activePage === 'setup'} onClick={() => onPageChange('setup')} description="Globale Firmen-Konfiguration" />
                <MegaMenuItem label="Integrationen" icon={Link2} active={activePage === 'integrations'} onClick={() => onPageChange('integrations')} description="API Provider Anbindung" />
                <MegaMenuItem label="Backup & Data" icon={Database} active={activePage === 'save'} onClick={() => onPageChange('save')} description="JSON Export/Import" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile & Controls */}
      <div className="flex items-center gap-4 shrink-0 border-l border-slate-100 dark:border-slate-800 pl-8">
        <button onClick={() => { onPageChange('help'); closeDropdowns(); }} className={`p-3 rounded-2xl transition-all group ${activePage === 'help' ? 'bg-orange-500/10 text-orange-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'}`} title="Hilfe & Dokumentation">
          <HelpCircle size={20} />
        </button>
        <button onClick={onToggleTheme} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group" title="Design wechseln">
          {isDark ? <Sun size={20} className="text-amber-400 group-hover:rotate-45 transition-transform" /> : <Moon size={20} className="text-slate-400" />}
        </button>
        
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-800">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 text-white flex items-center justify-center text-[10px] font-black shadow-lg">EX</div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Admin</span>
              <span className="text-[8px] font-bold text-orange-500 uppercase tracking-widest">Enterprise</span>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
