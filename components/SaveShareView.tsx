
import React from 'react';
// Fix: Use UnitSettings instead of MarketingSettings
import { UnitSettings, Theme } from '../types';
import { Save, Download, Upload, Trash2, Bot } from 'lucide-react';

interface SaveShareViewProps {
  // Fix: Use UnitSettings
  settings: UnitSettings;
  onUpdate: (settings: Partial<UnitSettings>) => void;
  theme: Theme;
}

const SaveShareView: React.FC<SaveShareViewProps> = ({ settings, onUpdate, theme }) => {
  const isDark = theme === 'dark';

  const exportSettings = () => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing_ops_settings_${settings.companyName || 'brand'}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const importSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          onUpdate(data);
          alert('Settings imported successfully!');
        } catch (err) {
          alert('Error importing settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset everything? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className={`border rounded-2xl p-6 shadow-xl transition-all duration-300 ${isDark ? 'bg-gradient-to-b from-[#121629] to-[#0e1533] border-[#202a5b]' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border rounded-xl p-6 ${isDark ? 'bg-[#0c132f] border-[#2a356f]' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Download size={20} className="text-[#ff7a59]" /> Export Settings
            </h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>Download your current configuration as a JSON file to backup or share with your team.</p>
            <button 
              onClick={exportSettings}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff7a59] to-[#ff9a80] text-[#071224] font-bold text-sm shadow-lg shadow-[#ff7a59]/20"
            >
              Download JSON
            </button>
          </div>

          <div className={`border rounded-xl p-6 ${isDark ? 'bg-[#0c132f] border-[#2a356f]' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Upload size={20} className="text-[#ff7a59]" /> Import Settings
            </h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>Restore a previous configuration file from your computer.</p>
            <div className="relative">
              <input 
                type="file" 
                accept=".json"
                onChange={importSettings}
                className="w-full h-12 opacity-0 absolute inset-0 cursor-pointer z-10"
              />
              <div className={`w-full py-3 rounded-xl border text-center font-bold text-sm flex items-center justify-center gap-2 ${isDark ? 'bg-[#1a2560] border-[#2b3a86] text-[#e7ecff]' : 'bg-white border-slate-200 text-slate-700'}`}>
                <Upload size={16} /> Select File
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-8 border rounded-xl p-6 ${isDark ? 'bg-[#0c132f] border-[#2a356f]' : 'bg-slate-50 border-slate-200'}`}>
          <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Bot size={20} className="text-[#ff7a59]" /> Universal AI Context
          </h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>
            Pro Tip: You can copy your JSON settings and paste them as "Instructions" or "Knowledge" in Custom GPTs or Claude Projects to give the AI permanent context of your business.
          </p>
          <div className={`p-4 rounded-lg font-mono text-[10px] overflow-auto max-h-[150px] ${isDark ? 'bg-black/20 text-[#98a3c7]' : 'bg-slate-100 text-slate-600'}`}>
            {JSON.stringify(settings, null, 2)}
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t flex justify-end ${isDark ? 'border-[#2a356f]' : 'border-slate-200'}`}>
          <button 
            onClick={resetAll}
            className={`px-6 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all ${isDark ? 'bg-[#3a0f1a] border-[#823347] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-600 hover:text-white'}`}
          >
            <Trash2 size={16} /> Reset All Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default SaveShareView;
