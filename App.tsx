
import React, { useState, useEffect } from 'react';
import { UnitSettings, PageId, Persona, Theme, UnitId, MainModuleId, CRMSubPageId, OfficeSubPageId, ProjectsSubPageId, AgentsSubPageId } from './types';
import { DEFAULTS, PERSONAS } from './constants';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import CRMView from './components/CRMView';
import SetupView from './components/SetupView';
import AgentsView from './components/AgentsView';
import IntegrationsView from './components/IntegrationsView';
import SaveShareView from './components/SaveShareView';
import HelpView from './components/HelpView';
import OfficeView from './components/OfficeView';
import ProjectsView from './components/ProjectsView';
import Wizard from './components/Wizard';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<MainModuleId>('office');
  const [activeUnitId, setActiveUnitId] = useState<UnitId | null>(null);
  const [activeCRMPage, setActiveCRMPage] = useState<CRMSubPageId>('dashboard');
  const [activeOfficePage, setActiveOfficePage] = useState<OfficeSubPageId>('dashboard');
  const [activeProjectsPage, setActiveProjectsPage] = useState<ProjectsSubPageId>('dashboard');
  const [activeAgentsPage, setActiveAgentsPage] = useState<AgentsSubPageId>('dashboard');
  const [currentPage, setCurrentPage] = useState<PageId>('office_page');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('expertico_theme') as Theme) || 'light');
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [isGlobalEditMode, setIsGlobalEditMode] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  const [settings, setSettings] = useState<UnitSettings>(() => {
    const saved = localStorage.getItem('expertico_settings_v7.0');
    return saved ? JSON.parse(saved) : DEFAULTS;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('expertico_theme', theme);
  }, [theme]);

  const updateSettings = (newSettings: Partial<UnitSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleAgentSelect = (unitId: UnitId) => {
    setActiveUnitId(unitId);
    setCurrentPage('agents');
    setActiveModule('agents');
    setActiveAgentsPage('units');
  };

  const handleGlobalRefresh = () => {
    console.log("Global Refresh Triggered");
  };

  const handleGlobalAdd = () => {
    setIsWizardOpen(true);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': 
        return <DashboardView activeUnitId={activeUnitId} onSelectUnit={setActiveUnitId} onSelectAgent={setActiveAgentId} theme={theme} personas={PERSONAS} />;
      case 'crm_page':
        return <CRMView activePage={activeCRMPage} theme={theme} onSelectPage={setActiveCRMPage} isGlobalEditMode={isGlobalEditMode} />;
      case 'office_page':
        return <OfficeView activePage={activeOfficePage} onSelectPage={setActiveOfficePage} theme={theme} isGlobalEditMode={isGlobalEditMode} />;
      case 'projects_page':
        return <ProjectsView activePage={activeProjectsPage} onSelectPage={setActiveProjectsPage} theme={theme} isGlobalEditMode={isGlobalEditMode} onOpenWizard={() => setIsWizardOpen(true)} />;
      case 'setup': 
        return <SetupView settings={settings} onUpdate={updateSettings} theme={theme} activeUnitId={activeUnitId} />;
      case 'agents': 
        return <AgentsView settings={settings} personas={PERSONAS} activeUnitId={activeUnitId} activeAgentId={activeAgentId} theme={theme} activePage={activeAgentsPage} onSelectPage={setActiveAgentsPage} isGlobalEditMode={isGlobalEditMode} />;
      case 'integrations': 
        return <IntegrationsView theme={theme} />;
      case 'save': 
        return <SaveShareView settings={settings} onUpdate={updateSettings} theme={theme} />;
      case 'help': 
        return <HelpView theme={theme} />;
      case 'contact_page':
        return <div className="p-32 text-center"><h2 className="text-3xl font-black uppercase opacity-20">Direktkontakt Zentrale</h2><p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">V7.0 Secure Connection</p></div>;
      default: 
        return <DashboardView activeUnitId={null} onSelectUnit={setActiveUnitId} onSelectAgent={setActiveAgentId} theme={theme} personas={PERSONAS} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 overflow-x-hidden relative flex flex-col
      ${theme === 'dark' 
        ? 'bg-[#0f1117] bg-gradient-to-br from-[#0f1117] via-[#161b26] to-[#0f1117] text-slate-200' 
        : 'bg-[#f8fafc] bg-gradient-to-br from-orange-50/40 via-white to-blue-50/40 text-slate-900'}`}>
      
      <Navbar 
        activeModule={activeModule}
        activeCRMPage={activeCRMPage}
        activeOfficePage={activeOfficePage}
        activeProjectsPage={activeProjectsPage}
        activeAgentsPage={activeAgentsPage}
        activeUnitId={activeUnitId}
        activePage={currentPage}
        onModuleChange={setActiveModule}
        onCRMPageChange={setActiveCRMPage}
        onOfficePageChange={setActiveOfficePage}
        onProjectsPageChange={setActiveProjectsPage}
        onAgentsPageChange={setActiveAgentsPage}
        onUnitChange={handleAgentSelect}
        onPageChange={setCurrentPage}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        isEditMode={isGlobalEditMode}
        onToggleEdit={() => setIsGlobalEditMode(!isGlobalEditMode)}
        onGlobalAdd={handleGlobalAdd}
        onGlobalRefresh={handleGlobalRefresh}
      />

      <main className="flex-1 p-6 lg:p-10 max-w-[1700px] mx-auto w-full relative z-10">
        <div className="animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
          {renderContent()}
        </div>
      </main>

      {isWizardOpen && (
        <Wizard 
          onComplete={(data) => {
            console.log("Creation Completed:", data);
            setIsWizardOpen(false);
          }} 
          onSkip={() => setIsWizardOpen(false)} 
        />
      )}

      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-orange-400/10 blur-[150px] rounded-full -z-0 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 blur-[150px] rounded-full -z-0 pointer-events-none" />
    </div>
  );
};

export default App;
