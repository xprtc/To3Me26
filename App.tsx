
import React, { useState, useEffect } from 'react';
import { UnitSettings, PageId, Persona, Theme, UnitId, MainModuleId, CRMSubPageId, OfficeSubPageId, ProjectsSubPageId, AgentsSubPageId, ProjectRecord } from './types';
import { DEFAULTS, PERSONAS, PROJECTS_DUMMY } from './constants';
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
  
  const [projects, setProjects] = useState<ProjectRecord[]>(() => {
    const saved = localStorage.getItem('expertico_projects_v7.0');
    return saved ? JSON.parse(saved) : PROJECTS_DUMMY;
  });

  const [personas, setPersonas] = useState<Persona[]>(() => {
    const saved = localStorage.getItem('expertico_personas_v7.0');
    return saved ? JSON.parse(saved) : PERSONAS;
  });

  const [settings, setSettings] = useState<UnitSettings>(() => {
    const saved = localStorage.getItem('expertico_settings_v7.0');
    return saved ? JSON.parse(saved) : DEFAULTS;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('expertico_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('expertico_projects_v7.0', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('expertico_personas_v7.0', JSON.stringify(personas));
  }, [personas]);

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

  const handleWizardComplete = (data: any) => {
    if (data.type === 'project') {
      const newProject: ProjectRecord = {
        id: 'p' + (projects.length + 1),
        name: data.title || 'Neues Projekt',
        client: data.newClientName || data.client || 'Unbekannt',
        status: 'planning',
        budget: Number(data.budget) || (data.productId ? 1000 : 0),
        deadline: data.deadline || new Date().toISOString().split('T')[0],
        leadAgent: personas.find(p => p.id === data.agentId)?.name || 'Admin',
        progress: 0
      };
      setProjects([newProject, ...projects]);
      setCurrentPage('projects_page');
      setActiveModule('projects');
      setActiveProjectsPage('projects');
    }
    setIsWizardOpen(false);
  };

  const updatePersona = (updated: Persona) => {
    setPersonas(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const addPersona = (unitId: UnitId) => {
    const newPersona: Persona = {
      id: 'custom_' + Date.now(),
      unitId,
      name: 'Neuer Agent',
      role: 'Spezialist',
      exp: '5J',
      bio: 'Beschreibung hinzufügen...',
      think: 'Input -> Prozess -> Output',
      icon: 'Bot',
      modes: [{ id: 'std', label: 'Standard', help: '' }],
      checklist: ['Check 1'],
      systemPrompt: 'Du bist ein KI-Agent für...',
      advancedOptions: []
    };
    setPersonas([...personas, newPersona]);
    setActiveAgentId(newPersona.id);
    setCurrentPage('agents');
    setActiveAgentsPage('profile');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': 
        return <DashboardView activeUnitId={activeUnitId} onSelectUnit={setActiveUnitId} onSelectAgent={setActiveAgentId} theme={theme} personas={personas} />;
      case 'crm_page':
        return <CRMView activePage={activeCRMPage} theme={theme} onSelectPage={setActiveCRMPage} isGlobalEditMode={isGlobalEditMode} />;
      case 'office_page':
        return <OfficeView activePage={activeOfficePage} onSelectPage={setActiveOfficePage} theme={theme} isGlobalEditMode={isGlobalEditMode} />;
      case 'projects_page':
        return <ProjectsView projects={projects} activePage={activeProjectsPage} onSelectPage={setActiveProjectsPage} theme={theme} isGlobalEditMode={isGlobalEditMode} onOpenWizard={() => setIsWizardOpen(true)} />;
      case 'setup': 
        return <SetupView settings={settings} onUpdate={updateSettings} theme={theme} activeUnitId={activeUnitId} />;
      case 'agents': 
        return <AgentsView 
          settings={settings} 
          personas={personas} 
          activeUnitId={activeUnitId} 
          activeAgentId={activeAgentId} 
          theme={theme} 
          activePage={activeAgentsPage} 
          onSelectPage={setActiveAgentsPage} 
          isGlobalEditMode={isGlobalEditMode} 
          onUpdatePersona={updatePersona} 
          onAddPersona={addPersona}
          onNavigate={setCurrentPage}
          onModuleChange={setActiveModule}
        />;
      case 'integrations': 
        return <IntegrationsView theme={theme} />;
      case 'save': 
        return <SaveShareView settings={settings} onUpdate={updateSettings} theme={theme} />;
      case 'help': 
        return <HelpView theme={theme} />;
      case 'contact_page':
        return <div className="p-32 text-center"><h2 className="text-3xl font-black uppercase opacity-20">Direktkontakt Zentrale</h2><p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">V7.0 Secure Connection</p></div>;
      default: 
        return <DashboardView activeUnitId={null} onSelectUnit={setActiveUnitId} onSelectAgent={setActiveAgentId} theme={theme} personas={personas} />;
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
          onComplete={handleWizardComplete} 
          onSkip={() => setIsWizardOpen(false)} 
        />
      )}

      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-orange-400/10 blur-[150px] rounded-full -z-0 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 blur-[150px] rounded-full -z-0 pointer-events-none" />
    </div>
  );
};

export default App;
