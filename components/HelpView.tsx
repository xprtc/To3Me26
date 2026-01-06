
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Theme } from '../types';

interface HelpViewProps {
  theme: Theme;
}

const HelpView: React.FC<HelpViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const faqs = [
    { q: "What is the Professional Edition?", a: "The Professional Edition features 6 specialized AI agents, deep strategic frameworks, and built-in automation recipes designed for production marketing environments." },
    { q: "How do I use the agents?", a: "Go to 'My Agents', select a persona like Maya or Leo, choose a mode (e.g., Campaign Brief), and copy the generated prompt into ChatGPT or Claude." },
    { q: "What about data privacy?", a: "This application runs entirely in your browser. All data is stored in your browser's Local Storage. No data is sent to our servers." },
    { q: "How does the scheduling work?", a: "We provide prompts containing iCalendar VEVENT snippets. ChatGPT's automation features can detect these and set up recurring tasks automatically." },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section className={`border rounded-2xl p-6 shadow-xl transition-all duration-300 ${isDark ? 'bg-gradient-to-b from-[#121629] to-[#0e1533] border-[#202a5b]' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#ff7a59]">Frequently Asked Questions</h3>
            {faqs.map((faq, i) => (
              <div key={i} className={`border rounded-xl p-4 ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className={`font-bold text-sm mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{faq.q}</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#ff7a59]">Expert Tips</h3>
            <div className={`border rounded-xl p-5 ${isDark ? 'bg-[#0c132f] border-[#28346b]' : 'bg-slate-50 border-slate-200'}`}>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff7a59]/10 border border-[#ff7a59]/30 text-[#ff7a59] text-xs font-bold grid place-items-center shrink-0">1</div>
                  <div>
                    <h5 className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Set Up Thoroughly</h5>
                    <p className={`text-[11px] ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>The agents perform 5x better when you fill in the ICP, OKRs, and Budget in the Setup tab.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff7a59]/10 border border-[#ff7a59]/30 text-[#ff7a59] text-xs font-bold grid place-items-center shrink-0">2</div>
                  <div>
                    <h5 className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Use Custom GPTs</h5>
                    <p className={`text-[11px] ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>Create a Custom GPT for each agent and upload your settings JSON as a 'Knowledge' file.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff7a59]/10 border border-[#ff7a59]/30 text-[#ff7a59] text-xs font-bold grid place-items-center shrink-0">3</div>
                  <div>
                    <h5 className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Chain Prompts</h5>
                    <p className={`text-[11px] ${isDark ? 'text-[#98a3c7]' : 'text-slate-500'}`}>Start with Maya (Strategy), then take her output to Leo (Content) to build out the tactical assets.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className={`p-4 border-l-4 rounded-r-xl ${isDark ? 'bg-amber-500/5 border-amber-500' : 'bg-amber-50 border-amber-400'}`}>
              <h5 className="text-amber-500 font-bold text-xs mb-2 uppercase">Legal Disclaimer</h5>
              <p className={`text-[10px] leading-relaxed ${isDark ? 'text-[#98a3c7]' : 'text-slate-600'}`}>
                This tool provides marketing frameworks and AI guidance. It does not constitute legal, financial, or professional advice. Always verify compliance with regional laws (GDPR, CAN-SPAM) and platform policies before launching campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpView;
