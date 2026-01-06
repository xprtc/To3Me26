
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

const CRMView: React.FC<CRMViewProps> = ({ activePage, theme, onSelectPage, isGlobalEditMode }) => {
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const filteredContacts = useMemo(() => {
    return CRM_CONTACTS.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const selectedContact = useMemo(() => 
    CRM_CONTACTS.find(c => c.id === selectedContactId), 
    [selectedContactId]
  );

  const renderContactsList = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-600 transition-colors" size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Kunden durchsuchen..." 
            className={`w-full pl-12 pr-6 py-4 rounded-2xl text-sm font-black tracking-tight outline-none focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm
            ${isDark ? 'bg-slate-900 border-2 border-slate-800 text-white' : 'bg-white border-2 border-slate-200 text-slate-900'}`} />
        </div>
        <div className="flex items-center gap-3">
           <button className={`px-6 py-4 border-2 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:shadow-md transition-all
             ${isDark ? 'border-slate-800 text-slate-400 bg-slate-900' : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'}`}><Filter size={16}/> Filter</button>
           <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 transition-all">Eintrag hinzufügen</button>
        </div>
      </div>

      <div className={`rounded-[2.5rem] border shadow-2xl overflow-hidden relative ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`${isDark ? 'bg-slate-800/30' : 'bg-slate-100'} border-b border-slate-200 dark:border-slate-800`}>
                {['Firma', 'Name', 'Status', 'Branche', 'Ort', 'E-Mail'].map(head => (
                  <th key={head} className={`px-6 py-6 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredContacts.map(c => (
                <tr key={c.id} className="hover:bg-orange-500/[0.04] transition-all cursor-pointer group" onClick={() => setSelectedContactId(c.id)}>
                  <td className={`px-6 py-5 font-black text-sm tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{c.company}</td>
                  <td className={`px-6 py-5 font-bold text-sm tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{c.firstName} {c.name}</td>
                  <td className="px-6 py-5"><span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase bg-orange-500 text-white shadow-lg shadow-orange-500/10">{c.status}</span></td>
                  <td className={`px-6 py-5 text-[10px] font-bold tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{c.industry}</td>
                  <td className={`px-6 py-5 text-sm font-bold tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{c.city}</td>
                  <td className={`px-6 py-5 text-xs font-bold tracking-tight truncate max-w-[150px] ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedContact && (
        <div className={`fixed top-0 right-0 h-full w-[650px] z-[500] shadow-2xl transition-transform duration-500 border-l animate-in slide-in-from-right-full
          ${isDark ? 'bg-[#0f1117] border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-xl">{selectedContact.name[0]}</div>
              <div>
                <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedContact.company || selectedContact.name}</h3>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{selectedContact.status}</span>
              </div>
            </div>
            <button onClick={() => setSelectedContactId(null)} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-500 transition-colors"><X size={24}/></button>
          </div>
          <div className="p-10 space-y-10 overflow-y-auto h-[calc(100vh-100px)]">
             <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-6 tracking-widest">Base Identity</h4>
                <div className="grid grid-cols-2 gap-6">
                   {[['Firma', selectedContact.company], ['Ansprechpartner', selectedContact.name], ['E-Mail', selectedContact.email], ['Phone', selectedContact.phone]].map(([label, val]) => (
                     <div key={label}>
                        <p className="text-[8px] font-black uppercase text-slate-500 mb-1">{label}</p>
                        <p className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{val || '-'}</p>
                     </div>
                   ))}
                </div>
             </div>
             <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Details bearbeiten</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1700px] mx-auto pb-20">
      {activePage === 'contacts' && renderContactsList()}
      {/* Ostale stranice prate sličan princip vizuelne čistoće */}
    </div>
  );
};

export default CRMView;
