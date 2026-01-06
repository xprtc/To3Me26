
import React, { useState, useEffect } from 'react';
import { Theme } from '../types';
import { INTEGRATIONS } from '../constants';
import { 
  Search, CheckCircle2, AlertCircle, ExternalLink, Filter, Plus, X, 
  Calendar, RefreshCw, Shield, Globe, Lock, Check
} from 'lucide-react';

interface IntegrationsViewProps {
  theme: Theme;
}

declare global {
  interface Window {
    google: any;
  }
}

const IntegrationsView: React.FC<IntegrationsViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [configuringId, setConfiguringId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);

  // Initialisierung des Google OAuth Clients
  useEffect(() => {
    const initClient = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: '716273468512-placeholder.apps.googleusercontent.com', // Hier wird im Deployment die echte ID genutzt
          scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email',
          callback: (response: any) => {
            if (response.access_token) {
              setIsConnected(true);
              setIsConnecting(false);
            }
          },
        });
        setTokenClient(client);
      }
    };

    if (window.google) {
      initClient();
    } else {
      const script = document.querySelector('script[src*="gsi/client"]');
      script?.addEventListener('load', initClient);
    }
  }, []);

  const filtered = INTEGRATIONS.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleConnect = () => {
    if (tokenClient) {
      setIsConnecting(true);
      tokenClient.requestAccessToken();
    } else {
      alert("Google SDK lädt noch. Bitte versuchen Sie es in wenigen Sekunden erneut.");
    }
  };

  const renderGoogleCalendarConfig = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setConfiguringId(null)} />
      <div className={`relative w-full max-w-2xl overflow-hidden rounded-[3rem] border shadow-2xl animate-in zoom-in-95 duration-300
        ${isDark ? 'bg-[#0f1117] border-slate-800' : 'bg-white border-slate-200'}`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-8 bg-slate-50/50 dark:bg-slate-900/50">
           <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-slate-100 dark:ring-slate-800">
                 <span className="text-3xl">📆</span>
              </div>
              <div>
                 <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 dark:text-slate-50">Google Calendar Setup</h3>
                 <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em]">Expertico Sync Protocol v7.0</p>
              </div>
           </div>
           <button onClick={() => setConfiguringId(null)} className="rounded-full p-3 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <X size={24} className="text-slate-400" />
           </button>
        </div>

        {/* Modal Content */}
        <div className="p-10 space-y-10">
           {!isConnected ? (
             <div className="space-y-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                   <Shield size={32} />
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-bold text-slate-950 dark:text-slate-50">Sichere Verbindung herstellen</h4>
                   <p className="mx-auto max-w-md text-sm text-slate-500 leading-relaxed">
                      Klicken Sie unten, um sich mit Ihrem **echten Google-Konto** anzumelden. Expertico wird dann Ihre Termine und Fristen synchronisieren.
                   </p>
                </div>
                <button 
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className={`group relative mx-auto flex items-center justify-center gap-4 rounded-2xl px-10 py-5 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl
                    ${isConnecting ? 'bg-slate-100 text-slate-400' : 'bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-blue-500/50 hover:shadow-blue-500/10'}`}
                >
                   {isConnecting ? (
                     <RefreshCw size={20} className="animate-spin" />
                   ) : (
                     <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z" fill="#EA4335"/>
                     </svg>
                   )}
                   {isConnecting ? 'Warte auf Google...' : 'Echten Google Account verbinden'}
                </button>
             </div>
           ) : (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                   <div className="h-12 w-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={24} />
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase text-emerald-600 tracking-widest">Konto erfolgreich verbunden</p>
                      <p className="text-sm font-bold text-slate-950 dark:text-slate-100">Synchronisierung aktiv</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Kalender wählen</label>
                      <select className={`w-full rounded-2xl border-2 px-4 py-4 text-xs font-bold outline-none transition-all focus:border-orange-500
                        ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                         <option>Primärer Kalender (Live)</option>
                         <option>Projektplaner</option>
                         <option>Client Meetings</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Sync-Intervall</label>
                      <select className={`w-full rounded-2xl border-2 px-4 py-4 text-xs font-bold outline-none transition-all focus:border-orange-500
                        ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                         <option>Echtzeit (Push)</option>
                         <option>Alle 15 Minuten</option>
                         <option>Stündlich</option>
                      </select>
                   </div>
                </div>

                <div className="p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl space-y-4">
                   <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Lock size={12}/> Security Policies</h5>
                   <div className="space-y-2">
                      {['Nur Lesezugriff für Agenten', 'Private Termine maskieren', 'Anhänge synchronisieren'].map((policy, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{policy}</span>
                           <div className="w-8 h-4 bg-emerald-500/20 rounded-full flex items-center px-1">
                              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={() => setConfiguringId(null)}
                  className="w-full py-5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                   Live-Synchronisation Starten
                </button>
             </div>
           )}
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 text-center border-t border-slate-100 dark:border-slate-800">
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Letzter Sync: {isConnected ? 'Vor wenigen Sekunden' : 'Noch nie'} • Status: {isConnected ? 'Online' : 'Idle'}
           </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-20">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between border-b border-slate-100 dark:border-slate-800 pb-10">
        <div className="space-y-2">
           <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 dark:text-slate-50">Integration Hub</h2>
           <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.4em]">Expertico Connectivity Engine V7.0</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Integrationen durchsuchen..." 
                className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-slate-950 dark:text-slate-50"
              />
           </div>
           <button className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-orange-500 transition-all"><Filter size={20}/></button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filtered.map(integration => (
          <div key={integration.id} className={`p-8 border rounded-[2.5rem] transition-all flex flex-col justify-between group h-[340px]
            ${isDark ? 'bg-slate-900/60 border-slate-800 hover:border-orange-500/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl'}`}>
            
            <div className="space-y-6">
               <div className="flex justify-between items-start">
                  <div className="text-4xl bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                     {integration.emoji}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.1em] shadow-sm
                    ${(integration.status === 'connected' || (integration.id === 'gcal' && isConnected)) ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    {(integration.status === 'connected' || (integration.id === 'gcal' && isConnected)) ? <><CheckCircle2 size={10}/> Verbunden</> : <><AlertCircle size={10}/> Nicht konfiguriert</>}
                  </div>
               </div>

               <div>
                  <h3 className="text-base font-black uppercase tracking-widest text-slate-950 dark:text-slate-50">{integration.name}</h3>
                  <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mt-1 opacity-70">{integration.provider}</p>
               </div>

               <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed min-h-[44px]">
                  {integration.description}
               </p>
            </div>

            <div className="mt-8">
               <button 
                onClick={() => integration.id === 'gcal' ? setConfiguringId('gcal') : null}
                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                 ${(integration.status === 'connected' || (integration.id === 'gcal' && isConnected))
                   ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-orange-500 hover:text-white shadow-sm' 
                   : 'bg-orange-500/5 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white'}`}>
                 {integration.type === 'Tool öffnen' ? <><ExternalLink size={14}/> Tool öffnen</> : 'Konfigurieren'}
               </button>
            </div>
          </div>
        ))}

        {/* Empty State / Custom Add */}
        <div className="p-8 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-orange-500/20 transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:text-orange-500 transition-all">
              <Plus size={32} />
           </div>
           <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Custom Webhook</h4>
           <p className="text-[10px] font-bold text-slate-500 mt-2">API Endpoint hinzufügen</p>
        </div>
      </div>

      {/* Google Calendar Config Modal */}
      {configuringId === 'gcal' && renderGoogleCalendarConfig()}
    </div>
  );
};

export default IntegrationsView;
