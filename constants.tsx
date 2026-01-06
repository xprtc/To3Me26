
import { Persona, UnitId, ContactRecord, DashletData, InvoiceRecord, ProjectRecord } from './types';

export const UNITS: { id: UnitId; label: string; icon: string; color: string }[] = [
  { id: 'sales', label: 'Sales Ops', icon: 'Briefcase', color: '#f59e0b' },
  { id: 'marketing', label: 'Marketing Ops', icon: 'TrendingUp', color: '#fbbf24' },
  { id: 'support', label: 'Support Ops', icon: 'Headset', color: '#0ea5e9' },
  { id: 'strategic', label: 'Strategic Ops', icon: 'Compass', color: '#6366f1' },
  { id: 'finance', label: 'Finance Ops', icon: 'Wallet', color: '#10b981' },
];

export const OFFICE_INVOICES: InvoiceRecord[] = [
  { id: 'inv1', docId: 'O00001.1', invoiceNum: 'INV-2026-001', clientName: 'Musterfirma AG', clientType: 'B2B', clientUID: 'CHE-123.456.789', clientEmail: 'kunde@example.com', clientPhone: '+41 79 123 45 67', amount: 5400, tax: 437.40, total: 5837.40, date: '2026-01-02', dueDate: '2026-01-16', status: 'open', project: 'Website Redesign' },
  { id: 'inv2', docId: 'O00002.1', invoiceNum: 'INV-2026-002', clientName: 'Swiss Tech GmbH', clientType: 'B2B', clientUID: 'CHE-987.654.321', clientEmail: 'info@swisstech.ch', clientPhone: '+41 44 555 66 77', amount: 12000, tax: 972, total: 12972, date: '2026-01-05', dueDate: '2026-01-19', status: 'paid', project: 'KI Integration' },
  { id: 'inv3', docId: 'O00003.1', invoiceNum: 'INV-2026-003', clientName: 'Privatperson Z', clientType: 'B2C', clientEmail: 'z@mail.ch', clientPhone: '+41 78 000 00 00', amount: 450, tax: 36.45, total: 486.45, date: '2026-01-10', dueDate: '2026-01-24', status: 'draft', project: 'Social Media Consulting' },
  { id: 'inv4', docId: 'O00004.1', invoiceNum: 'INV-2026-004', clientName: 'Bern Digital AG', clientType: 'B2B', clientUID: 'CHE-555.444.333', clientEmail: 'office@berndigital.ch', clientPhone: '+41 31 222 11 00', amount: 8900, tax: 720.90, total: 9620.90, date: '2026-01-12', dueDate: '2026-01-26', status: 'open', project: 'SEO Strategy' },
  { id: 'inv5', docId: 'O00005.1', invoiceNum: 'INV-2026-005', clientName: 'Lucerne Logistics', clientType: 'B2B', clientUID: 'CHE-111.222.333', clientEmail: 'admin@lu-log.ch', clientPhone: '+41 41 888 99 00', amount: 15000, tax: 1215, total: 16215, date: '2026-01-15', dueDate: '2026-01-29', status: 'paid', project: 'Supply Chain AI' },
  { id: 'inv6', docId: 'O00006.1', invoiceNum: 'INV-2026-006', clientName: 'Genf Watch Co.', clientType: 'B2B', clientUID: 'CHE-999.888.777', clientEmail: 'sales@genevewatch.ch', clientPhone: '+41 22 333 44 55', amount: 2500, tax: 202.50, total: 2702.50, date: '2026-01-18', dueDate: '2026-02-01', status: 'overdue', project: 'E-Mail Automation' },
  { id: 'inv7', docId: 'O00007.1', invoiceNum: 'INV-2026-007', clientName: 'Basel BioTech', clientType: 'B2B', clientUID: 'CHE-444.555.666', clientEmail: 'finance@baselbiotech.com', clientPhone: '+41 61 777 88 99', amount: 32000, tax: 2592, total: 34592, date: '2026-01-20', dueDate: '2026-02-03', status: 'open', project: 'Process Optimization' },
  { id: 'inv8', docId: 'O00008.1', invoiceNum: 'INV-2026-008', clientName: 'Zürich AI Labs', clientType: 'B2B', clientUID: 'CHE-222.333.444', clientEmail: 'contact@zh-ailabs.ch', clientPhone: '+41 44 999 00 11', amount: 7500, tax: 607.50, total: 8107.50, date: '2026-01-22', dueDate: '2026-02-05', status: 'paid', project: 'Training Workshops' },
  { id: 'inv9', docId: 'O00009.1', invoiceNum: 'INV-2026-009', clientName: 'St. Gallen Retail', clientType: 'B2B', clientUID: 'CHE-777.666.555', clientEmail: 'orders@stg-retail.ch', clientPhone: '+41 71 444 55 66', amount: 1200, tax: 97.20, total: 1297.20, date: '2026-01-25', dueDate: '2026-02-08', status: 'draft', project: 'Loyalty Program' },
  { id: 'inv10', docId: 'O00010.1', invoiceNum: 'INV-2026-010', clientName: 'Zug Crypto Hub', clientType: 'B2B', clientUID: 'CHE-333.444.555', clientEmail: 'legal@zugcrypto.ch', clientPhone: '+41 41 123 12 12', amount: 18000, tax: 1458, total: 19458, date: '2026-01-28', dueDate: '2026-02-11', status: 'open', project: 'Security Audit' },
  { id: 'inv11', docId: 'O00011.1', invoiceNum: 'INV-2026-011', clientName: 'Biel Watch Co.', clientType: 'B2B', clientEmail: 'info@bielwatch.ch', clientPhone: '+41 32 111 22 33', amount: 4500, tax: 364.50, total: 4864.50, date: '2026-02-01', dueDate: '2026-02-15', status: 'open', project: 'CNC Automation' },
  { id: 'inv12', docId: 'O00012.1', invoiceNum: 'INV-2026-012', clientName: 'Creative Art Basel', clientType: 'B2C', clientEmail: 'art@basel.ch', clientPhone: '+41 61 000 00 00', amount: 1200, tax: 97.20, total: 1297.20, date: '2026-02-02', dueDate: '2026-02-16', status: 'paid', project: 'Digital Art Expo' },
  { id: 'inv13', docId: 'O00013.1', invoiceNum: 'INV-2026-013', clientName: 'Swiss Pharma AG', clientType: 'B2B', clientEmail: 'finance@swisspharma.ch', clientPhone: '+41 61 999 88 77', amount: 45000, tax: 3645, total: 48645, date: '2026-02-03', dueDate: '2026-02-17', status: 'open', project: 'Market Research 2026' },
  { id: 'inv14', docId: 'O00014.1', invoiceNum: 'INV-2026-014', clientName: 'Elena Branding', clientType: 'B2B', clientEmail: 'elena@elena-branding.ch', clientPhone: '+41 43 111 22 33', amount: 3200, tax: 259.20, total: 3459.20, date: '2026-02-04', dueDate: '2026-02-18', status: 'paid', project: 'Logo Design' },
  { id: 'inv15', docId: 'O00015.1', invoiceNum: 'INV-2026-015', clientName: 'Graubünden Touristik', clientType: 'B2B', clientEmail: 'g.capaul@gr-touristik.ch', clientPhone: '+41 81 222 33 44', amount: 8900, tax: 720.90, total: 9620.90, date: '2026-02-05', dueDate: '2026-02-19', status: 'open', project: 'Campaign Management' },
  { id: 'inv16', docId: 'O00016.1', invoiceNum: 'INV-2026-016', clientName: 'Solothurn Solar', clientType: 'B2B', clientEmail: 'andreas.graf@solar-sol.ch', clientPhone: '+41 32 666 77 88', amount: 15600, tax: 1263.60, total: 16863.60, date: '2026-02-06', dueDate: '2026-02-20', status: 'overdue', project: 'Lead Generation' },
  { id: 'inv17', docId: 'O00017.1', invoiceNum: 'INV-2026-017', clientName: 'Vaud Vinum', clientType: 'B2B', clientEmail: 'contact@vaud-vinum.ch', clientPhone: '+41 21 000 00 00', amount: 2800, tax: 226.80, total: 3026.80, date: '2026-02-07', dueDate: '2026-02-21', status: 'paid', project: 'Newsletter Setup' },
  { id: 'inv18', docId: 'O00018.1', invoiceNum: 'INV-2026-018', clientName: 'Ticino Tech', clientType: 'B2B', clientEmail: 'info@ticino-tech.ch', clientPhone: '+41 91 000 00 00', amount: 12400, tax: 1004.40, total: 13404.40, date: '2026-02-08', dueDate: '2026-02-22', status: 'draft', project: 'Security Training' },
  { id: 'inv19', docId: 'O00019.1', invoiceNum: 'INV-2026-019', clientName: 'Geneva Finance', clientType: 'B2B', clientEmail: 'jean@gen-pb.ch', clientPhone: '+41 22 555 66 77', amount: 22000, tax: 1782, total: 23782, date: '2026-02-09', dueDate: '2026-02-23', status: 'open', project: 'AI Forecasting' },
  { id: 'inv20', docId: 'O00020.1', invoiceNum: 'INV-2026-020', clientName: 'Zurich Insurance Group', clientType: 'B2B', clientEmail: 'corporate@zurich.ch', clientPhone: '+41 44 111 22 33', amount: 75000, tax: 6075, total: 81075, date: '2026-02-10', dueDate: '2026-02-24', status: 'paid', project: 'Global Strategy Hub' }
];

export const PROJECTS_DUMMY: ProjectRecord[] = [
  { id: 'p1', name: 'KI Strategie 2026', client: 'Swiss Tech GmbH', status: 'ongoing', budget: 45000, deadline: '2026-06-15', leadAgent: 'Silvan Koch', progress: 65 },
  { id: 'p2', name: 'Web-Automation Hub', client: 'Musterfirma AG', status: 'planning', budget: 12500, deadline: '2026-04-01', leadAgent: 'Oleksandr Shevchenko', progress: 10 },
  { id: 'p3', name: 'E-Mail Nurture Sequence', client: 'CreativeFlow Studio', status: 'completed', budget: 8200, deadline: '2026-01-20', leadAgent: 'Oleksandr Shevchenko', progress: 100 },
  { id: 'p4', name: 'Market Analysis Europe', client: 'Global Dynamics', status: 'ongoing', budget: 32000, deadline: '2026-08-30', leadAgent: 'David Chen', progress: 40 },
  { id: 'p5', name: 'CFO Forecast Model', client: 'Expertico Internal', status: 'review', budget: 15000, deadline: '2026-02-28', leadAgent: 'Murat Yilmaz', progress: 90 },
  { id: 'p6', name: 'Brand Voice Architekt', client: 'Luxury Retail Ltd', status: 'ongoing', budget: 22000, deadline: '2026-05-12', leadAgent: 'Emre Kaya', progress: 55 },
  { id: 'p7', name: 'Lead-Gen Pipeline V2', client: 'SaaS StartUp X', status: 'on-hold', budget: 18500, deadline: '2026-03-15', leadAgent: 'Silvan Koch', progress: 25 },
  { id: 'p8', name: 'Social Media Scaling', client: 'Elena Zimmermann', status: 'ongoing', budget: 5000, deadline: '2026-04-10', leadAgent: 'Heidi Zbinden', progress: 70 },
  { id: 'p9', name: 'API Bridge Twilio', client: 'TechSolutions AG', status: 'review', budget: 9800, deadline: '2026-02-15', leadAgent: 'Thomas Frei', progress: 85 },
  { id: 'p10', name: 'Strategic Roadmap KI', client: 'Swiss Gov Entity', status: 'planning', budget: 120000, deadline: '2027-01-01', leadAgent: 'Elena Martinez', progress: 5 },
  { id: 'p11', name: 'Brand Identity Basel', client: 'Pharma X', status: 'ongoing', budget: 30000, deadline: '2026-07-01', leadAgent: 'Ursula Widmer', progress: 20 },
  { id: 'p12', name: 'Sales Automator Pro', client: 'B2B Sales Co.', status: 'ongoing', budget: 15000, deadline: '2026-05-20', leadAgent: 'Kai Sommer', progress: 45 },
  { id: 'p13', name: 'SEO Overhaul 2026', client: 'Digital Agency Y', status: 'completed', budget: 5000, deadline: '2026-01-15', leadAgent: 'Carlos García', progress: 100 },
  { id: 'p14', name: 'Finanz-Audit Hub', client: 'Investment Z', status: 'review', budget: 12000, deadline: '2026-03-10', leadAgent: 'Beatrice Müller', progress: 85 },
  { id: 'p15', name: 'Support Bot Unit', client: 'Service Hub Basel', status: 'ongoing', budget: 25000, deadline: '2026-06-30', leadAgent: 'Samuel Martinez', progress: 15 },
  { id: 'p16', name: 'LinkedIn Mastery', client: 'Coaching GmbH', status: 'ongoing', budget: 4500, deadline: '2026-04-15', leadAgent: 'Kai Sommer', progress: 60 },
  { id: 'p17', name: 'Supply Chain Opt.', client: 'Logistic Co.', status: 'planning', budget: 40000, deadline: '2026-09-01', leadAgent: 'Julian Kim', progress: 10 },
  { id: 'p18', name: 'Global PR Blast', client: 'Brand Giant', status: 'on-hold', budget: 18000, deadline: '2026-03-01', leadAgent: 'Emre Kaya', progress: 30 },
  { id: 'p19', name: 'App Development UI', client: 'Startup Alpha', status: 'ongoing', budget: 22000, deadline: '2026-08-15', leadAgent: 'Ananya Mehta', progress: 40 },
  { id: 'p20', name: 'Sustainability Audit', client: 'Green Corp.', status: 'completed', budget: 10000, deadline: '2026-01-30', leadAgent: 'Alessandra Rossi', progress: 100 }
];

export const PERSONAS: Persona[] = [
  // --- 1. SALES OPS AI ---
  { id: 's1', unitId: 'sales', icon: 'Target', name: 'Silvan Koch', role: 'Pipeline-Genauigkeit & Prospecting', exp: '12J', bio: 'Experte für hocheffiziente Lead-Qualifizierung und Outbound-Logik.', think: 'Intent -> Budget -> Fit', modes: [{id:'prio', label:'Pipeline Audit', help:''}], checklist: ['Check Lead Source', 'Verify Intent'] },
  { id: 's2', unitId: 'sales', icon: 'Map', name: 'Giulio Bianchi', role: 'Gebietsplanung & Quotenverteilung', exp: '10J', bio: 'Optimierung von Sales-Territories für maximale Marktabdeckung.', think: 'Region -> Potential -> Allocation', modes: [{id:'map', label:'Territory Plan', help:''}], checklist: ['Quota Balance', 'Market Density'] },
  { id: 's3', unitId: 'sales', icon: 'GraduationCap', name: 'Ananya Mehta', role: 'Sales Enablement & Coaching', exp: '15J', bio: 'Trainingsarchitektin für High-Performance Sales Teams.', think: 'Skill Gap -> Training -> Performance', modes: [{id:'coach', label:'Coaching Script', help:''}], checklist: ['Objection Handling', 'Value Prop'] },
  { 
    id: 's4', 
    unitId: 'sales', 
    icon: 'Gavel', 
    name: 'Reto Baumgartner', 
    role: 'Deal Desk & Pricing Specialist', 
    exp: '9J', 
    bio: 'Agent Reto Baumgartner 9 years structuring complex deals, managing approvals, and optimizing pricing strategy.', 
    think: 'intake→structure review→pricing analysis→discount approval→legal review→execute→track', 
    modes: [{id:'deal', label:'Deal Structuring', help:''}], 
    checklist: [
      'Quality Control Checklist',
      'Clear discount authority levels defined',
      'Standard terms documented and verified',
      'Approval SLAs defined and tracked',
      'Non-standard term escalation path established',
      'Deal metrics tracked (cycle time, win rate by structure)'
    ],
    advancedOptions: [
      'Quality Control Checklist',
      'Clear discount authority levels',
      'Standard terms documented',
      'Approval SLAs defined',
      'Non-standard term escalation path',
      'Deal metrics tracked (cycle time, win rate by structure)'
    ],
    systemPrompt: `You are Alex Rodriguez, a Deal Desk & Pricing Specialist with 9 years of experience in B2B sales operations.

COMPANY CONTEXT:
- Company: your company
- Product/Service: (not provided)
- Industry: B2B SaaS
- Target Market: Mid-market & Enterprise B2B
- ICP: Ideal customer profile: [industry], [size], [pain points], [budget]
- Sales Model: Direct Sales, Inside Sales, Channel/Partner
- Avg Deal Size: $50.000
- Sales Cycle: 90 days
- Win Rate Target: 25%
- Pipeline Coverage: 3x
- Forecast Accuracy Target: 90%
- Quota Attainment Target: 100%
- Methodology: MEDDIC, Challenger, Solution Selling
- CRM: Salesforce
- Tech Stack: Outreach; Gong; LinkedIn Sales Navigator
- OKRs: Q Goals: Pipeline 3x coverage; Win rate ≥ 25%; Forecast accuracy ≥ 90%; Quota attainment 100%


TASK: Create a professional-grade structure deliverable for your company.

As an expert, you understand:
- Industry best practices and frameworks
- How to balance data-driven insights with practical execution
- The importance of clear documentation and change management
- That sales ops exists to make the sales team more effective

APPROACH:
1. Start with the business context and goals
2. Apply relevant frameworks and methodologies
3. Provide specific, actionable recommendations
4. Include templates, examples, and implementation steps
5. Define success metrics and how to track them

Work step-by-step to produce a comprehensive deliverable that includes:
✓ Executive summary
✓ Detailed methodology/framework
✓ Specific recommendations for your company
✓ Implementation plan with timeline
✓ Templates and tools needed
✓ Success metrics and tracking approach
✓ Common pitfalls to avoid`
  },
  { id: 's5', unitId: 'sales', icon: 'Database', name: 'Edin Hodzic', role: 'CRM-Datenintegrität & Validierung', exp: '8J', bio: 'Sicherstellung höchster Datenqualität im Salesforce/Expertico Stack.', think: 'Source -> Validation -> Sync', modes: [{id:'data', label:'Data Health Report', help:''}], checklist: ['Duplicate Check', 'Field Completion'] },
  { id: 's6', unitId: 'sales', icon: 'Coins', name: 'Eliane Moser', role: 'Provisionsmodelle & SPIF', exp: '11J', bio: 'Entwicklung von Anreizsystemen zur Motivationssteigerung.', think: 'KPI -> Incentive -> Payout', modes: [{id:'bonus', label:'SPIF Config', help:''}], checklist: ['Tax Rules', 'Budget Cap'] },
  { id: 's7', unitId: 'sales', icon: 'BarChart3', name: 'Olena Boyko', role: 'Performance-Visualisierung & Dashboards', exp: '9J', bio: 'Expertin für Echtzeit-Sales-Monitoring und BI-Schnittstellen.', think: 'Data -> Metric -> Visualization', modes: [{id:'viz', label:'Executive Dash', help:''}], checklist: ['Drill-down capability', 'Real-time check'] },
  { id: 's8', unitId: 'sales', icon: 'Shuffle', name: 'Christian Studer', role: 'Prozess-Mapping & Sales Cycle', exp: '13J', bio: 'Analyse und Verkürzung von Verkaufszyklen durch Prozess-KI.', think: 'Stage -> Friction -> Automation', modes: [{id:'proc', label:'Cycle Map', help:''}], checklist: ['Bottleneck Analysis', 'Drop-off Points'] },
  { id: 's9', unitId: 'sales', icon: 'Cpu', name: 'Thomas Frei', role: 'Systemarchitektur & API-Integrationen', exp: '12J', bio: 'Technischer Architekt für das gesamte Tech-Ökosystem.', think: 'Stack -> API -> Flow', modes: [{id:'arch', label:'Integrations Blueprint', help:''}], checklist: ['Latency check', 'Security layer'] },
  { id: 's10', unitId: 'sales', icon: 'Zap', name: 'Kai Sommer', role: 'Digitale Outbound-Terminierung & Erstansprache', exp: '6J', bio: 'Spezialist für automatisierte, hyper-personalisierte Terminierung.', think: 'Relevance -> Personalization -> Meeting', modes: [{id:'out', label:'Cold Outreach', help:''}], checklist: ['Spam Guard', 'First Line Magic'] },

  // --- 2. MARKETING OPS AI ---
  { id: 'm1', unitId: 'marketing', icon: 'Calendar', name: 'Ursula Widmer', role: 'Strategische Quartalsplanung', exp: '20J', bio: 'Architektin für langfristige Marketing-Roadmaps und OKRs.', think: 'Goal -> Strategy -> Campaign', modes: [{id:'plan', label:'Quarterly Roadmap', help:''}], checklist: ['Goal alignment', 'Budget split'] },
  { id: 'm2', unitId: 'marketing', icon: 'PenTool', name: 'Oleksandr Shevchenko', role: 'Content-Erstellung & Repurposing', exp: '12J', bio: 'Meister der narrativen Demand-Gen und Multi-Channel Content-Logik.', think: 'Hook -> Value -> CTA', modes: [{id:'copy', label:'Campaign Copy', help:''}], checklist: ['Brand Voice', 'AIDA Check'] },
  { id: 'm3', unitId: 'marketing', icon: 'MousePointer2', name: 'Heidi Zbinden', role: 'Paid Media & Werbeplattformen', exp: '10J', bio: 'Spezialistin für Performance Marketing und Media-Buying-Logik.', think: 'Audience -> Ad -> Conversion', modes: [{id:'ads', label:'Ad Creative Brief', help:''}], checklist: ['ROAS check', 'Tracking pixels'] },
  { id: 'm4', unitId: 'marketing', icon: 'Search', name: 'Carlos García', role: 'SEO & Search Everywhere Optimization', exp: '11J', bio: 'Expertise für organische Sichtbarkeit in Suchmaschinen und KI-Bots.', think: 'Intent -> Keyword -> Authority', modes: [{id:'seo', label:'Audit Report', help:''}], checklist: ['Core Web Vitals', 'Backlink profile'] },
  { id: 'm5', unitId: 'marketing', icon: 'Activity', name: 'Lea Gerber', role: 'Marketing Analytics & ROI-Tracking', exp: '8J', bio: 'Analysiert die Effektivität jeder Marketing-Aktion mit Fokus auf ROI.', think: 'Action -> Attribution -> Profit', modes: [{id:'roi', label:'Performance Audit', help:''}], checklist: ['Conversion track', 'CAC analysis'] },
  { id: 'm6', unitId: 'marketing', icon: 'Shield', name: 'Emre Kaya', role: 'Markenführung & Positionierung', exp: '14J', bio: 'Wächter der Corporate Identity und strategischer Marktpositionierung.', think: 'Value -> Brand -> Perception', modes: [{id:'brand', label:'Brand Guide', help:''}], checklist: ['Style consistency', 'USP Check'] },

  // --- 3. SUPPORT OPS AI ---
  { id: 'u1', unitId: 'support', icon: 'ListOrdered', name: 'Amara Songo', role: 'Warteschlangen-Strategie & Triage', exp: '12J', bio: 'Optimiert Ticket-Flüsse und Priorisierungen für minimale Wartezeiten.', think: 'Queue -> Priority -> Agent', modes: [{id:'tri', label:'Triage Logic', help:''}], checklist: ['SLA check', 'Urgency tags'] },
  { id: 'u2', unitId: 'support', icon: 'BookOpen', name: 'Matteo Müller', role: 'Wissensmanagement & Hilfeartikel', exp: '9J', bio: 'Erstellt die Knowledge Base zur Erhöhung der Self-Service Quote.', think: 'Pain -> Solution -> Article', modes: [{id:'kb', label:'Knowledge Base', help:''}], checklist: ['Readability', 'Step-by-step'] },
  { id: 'u3', unitId: 'support', icon: 'CheckSquare', name: 'Lin Tan', role: 'Qualitätssicherung & QA-Scorecards', exp: '10J', bio: 'Überwacht Support-Interaktionen für höchste Service-Standards.', think: 'Ticket -> Rating -> Feedback', modes: [{id:'qa', label:'QA Review', help:''}], checklist: ['Tone of voice', 'Solution accuracy'] },
  { id: 'u4', unitId: 'support', icon: 'Users', name: 'Corinne Oberli', role: 'Personalplanung & Kapazitätsmodelle', exp: '15J', bio: 'Forecastet den Personalbedarf basierend auf Saisonalität und Trends.', think: 'Vol -> FTE -> Coverage', modes: [{id:'hr', label:'Capacity Plan', help:''}], checklist: ['Shift patterns', 'Peak handling'] },
  { id: 'u5', unitId: 'support', icon: 'FileText', name: 'Hanna Parker', role: 'Support-Insights & Reporting', exp: '8J', bio: 'Analysiert CSAT, NPS und Ticket-Trends für das Management.', think: 'Sentiment -> Insight -> Report', modes: [{id:'rep', label:'Trend Report', help:''}], checklist: ['NPS tracking', 'Resolved vs New'] },
  { id: 'u6', unitId: 'support', icon: 'Heart', name: 'Max DeSantis', role: 'Voice of Customer & Feedback-Loops', exp: '11J', bio: 'Leitet Kundenfeedback direkt in die Produktentwicklung zurück.', think: 'Voice -> Feature -> Retention', modes: [{id:'voc', label:'VoC Strategy', help:''}], checklist: ['Feature requests', 'Bug loop'] },
  { id: 'u7', unitId: 'support', icon: 'Activity', name: 'Chloe Trummer', role: 'Customer Success & Health Scoring', exp: '12J', bio: 'Proaktives Monitoring der Kundengesundheit zur Churn-Prävention.', think: 'Usage -> Score -> Action', modes: [{id:'health', label:'Health Scoring', help:''}], checklist: ['Login frequency', 'Unresolved issues'] },
  { id: 'u8', unitId: 'support', icon: 'AlertTriangle', name: 'Samuel Martinez', role: 'Technischer Support & Eskalation', exp: '14J', bio: 'Löst hochkomplexe technische Probleme an der Schnittstelle zur Dev.', think: 'Bug -> Root Cause -> Fix', modes: [{id:'esc', label:'Level 3 Audit', help:''}], checklist: ['Reproduce path', 'Dev handover'] },
  { id: 'u9', unitId: 'support', icon: 'Globe', name: 'Jasmine Cohen', role: 'Community-Management & Self-Service', exp: '7J', bio: 'Fördert den Austausch in User-Communities für Skaleneffekte.', think: 'Member -> Value -> Scale', modes: [{id:'com', label:'Community Brief', help:''}], checklist: ['Moderation rules', 'Engagement rate'] },
  { id: 'u10', unitId: 'support', icon: 'UserCheck', name: 'Lena Lauper', role: 'Rezeptionistin (Anruf-Triage & Terminierung)', exp: '5J', bio: 'Die erste Stimme des Unternehmens – Filtert und leitet Anfragen.', think: 'Call -> Need -> Route', modes: [{id:'rec', label:'Reception Script', help:''}], checklist: ['Greeting', 'Prio routing'] },
  { id: 'u11', unitId: 'support', icon: 'Mail', name: 'Ivonne Parker', role: 'Frontoffice (E-Mail-Management & Erstkontakt)', exp: '6J', bio: 'Zentrale Verwaltung aller eingehenden schriftlichen Anfragen.', think: 'Inbox -> Category -> Action', modes: [{id:'front', label:'Inbox Logic', help:''}], checklist: ['Wait time', 'Spam filter'] },

  // --- 4. STRATEGIC OPS AI ---
  { id: 'st1', unitId: 'strategic', icon: 'Brain', name: 'David Chen', role: 'Market Intelligence & Wettbewerbsanalyse', exp: '13J', bio: 'Analysiert Marktbewegungen und Wettbewerbsstrategien in Echtzeit.', think: 'Competitor -> Strategy -> Move', modes: [{id:'intel', label:'Intel Report', help:''}], checklist: ['Pricing audit', 'Feature gap'] },
  { id: 'st2', unitId: 'strategic', icon: 'TrendingUp', name: 'Elena Martinez', role: 'Growth Strategy & Markteintritt', exp: '15J', bio: 'Spezialistin für Skalierung und Expansion in neue Segmente.', think: 'Market -> Entry -> Growth', modes: [{id:'go', label:'GTM Strategy', help:''}], checklist: ['Risk audit', 'Partner network'] },
  { id: 'st3', unitId: 'strategic', icon: 'Users', name: 'Alexander Rivera', role: 'Customer Intelligence & Persona-Entwicklung', exp: '12J', bio: 'Tiefgehende psychografische Analysen der Zielgruppen.', think: 'Data -> Persona -> Journey', modes: [{id:'pers', label:'Persona Mapping', help:''}], checklist: ['Psychographics', 'Pain point map'] },
  { id: 'st4', unitId: 'strategic', icon: 'Settings', name: 'Julian Kim', role: 'Operations-Optimierung & Prozess-Audits', exp: '14J', bio: 'Eliminiert Ineffizienzen in den operativen Abläufen.', think: 'Process -> Friction -> ROI', modes: [{id:'audit', label:'Op Audit', help:''}], checklist: ['Lean check', 'Automation potential'] },
  { id: 'st5', unitId: 'strategic', icon: 'PlusSquare', name: 'Adnan Kramer', role: 'Leads-Datenanreicherung', exp: '10J', bio: 'Maximiert die Informationstiefe pro CRM-Datensatz.', think: 'Contact -> Scrape -> Insight', modes: [{id:'rich', label:'Enrichment Plan', help:''}], checklist: ['Source validation', 'Field mapping'] },
  { id: 'st6', unitId: 'strategic', icon: 'Layers', name: 'Senem Kaya', role: 'Segmentierung (Cluster-Analyse)', exp: '11J', bio: 'Teilt den Markt in mathematisch valide Segmente auf.', think: 'Base -> Feature -> Cluster', modes: [{id:'seg', label:'Cluster Map', help:''}], checklist: ['Segment size', 'Actionability'] },
  { id: 'st7', unitId: 'strategic', icon: 'Clock', name: 'Sandro Wicki', role: 'Lifetime Value Agent (LTV-Prognosen)', exp: '12J', bio: 'Berechnet den langfristigen Wert jedes Kundensegments.', think: 'Cost -> Retention -> LTV', modes: [{id:'ltv', label:'LTV Forecast', help:''}], checklist: ['Churn rate', 'Upsell potential'] },

  // --- 5. FINANCE OPS AI ---
  { id: 'f1', unitId: 'finance', icon: 'ShieldCheck', name: 'Beatrice Müller', role: 'Finance Ops & Revisionssicherheit', exp: '20J', bio: 'Sicherstellung der Compliance und ordnungsgemäßer Buchhaltung.', think: 'Record -> Law -> Audit', modes: [{id:'fin', label:'Compliance Audit', help:''}], checklist: ['VAT check', 'Doc trail'] },
  { id: 'f2', unitId: 'finance', icon: 'Wallet', name: 'Murat Yilmaz', role: 'CFO-Strategie & Cashflow-Prognosen', exp: '18J', bio: 'Strategische Finanzplanung und Liquiditätsmanagement.', think: 'Burn -> Runway -> Capital', modes: [{id:'cfo', label:'Cashflow Plan', help:''}], checklist: ['Runway calc', 'Budget reserve'] },
  { id: 'f3', unitId: 'finance', icon: 'Calculator', name: 'Alessandra Rossi', role: 'Compliance & Kostenrechnung', exp: '14J', bio: 'Detailgenaue Analyse der Kostentreiber und Compliance-Risiken.', think: 'Expense -> Category -> ROI', modes: [{id:'cost', label:'Cost Control', help:''}], checklist: ['Supplier audit', 'Cost center allocation'] }
];

export const CRM_CONTACTS: ContactRecord[] = [
  // --- STAGE 1: IDENTITY (10 Kontakte) ---
  { id: 'c1', type: 'business', company: 'TechSolutions AG', name: 'Müller', firstName: 'Hans', phone: '+41 44 123 45 67', email: 'h.mueller@techsolutions.ch', source: 'LinkedIn', milieu: 'Performer', status: 'Neu', preferredChannel: 'email', address: 'Bahnhofstrasse 10', zip: '8001', city: 'Zürich', country: 'Schweiz', industry: 'IT & Software', googleStars: 4.8, webRating: 92, socialLinks: { linkedin: 'linkedin.com/company/techsolutions' }, segmentation: 'A-Kunde', website: 'techsolutions.ch' },
  { id: 'c2', type: 'business', company: 'Solothurn Solar', name: 'Graf', firstName: 'Andreas', phone: '+41 32 666 77 88', email: 'andreas.graf@solar-sol.ch', source: 'Google', milieu: 'Postmaterielle', status: 'Qualifiziert', preferredChannel: 'phone', address: 'Sonnenplatz 1', zip: '4500', city: 'Solothurn', country: 'Schweiz', industry: 'Energy', googleStars: 4.5, webRating: 88, segmentation: 'B-Kunde', website: 'solar-sol.ch' },
  { id: 'c3', type: 'business', company: 'Biel Watch Co.', name: 'Etienne', firstName: 'Claude', phone: '+41 32 111 22 33', email: 'c.etienne@bielwatch.ch', source: 'Event', milieu: 'Performer', status: 'Recherche läuft', preferredChannel: 'email', address: 'Uhrenweg 5', zip: '2500', city: 'Biel', country: 'Schweiz', industry: 'Manufacturing', googleStars: 4.9, webRating: 94, segmentation: 'A-Kunde', website: 'bielwatch.ch' },
  { id: 'c4', type: 'business', company: 'Digital Agency X', name: 'Kurz', firstName: 'Manuela', phone: '+41 44 999 00 11', email: 'm.kurz@agency-x.ch', source: 'Referral', milieu: 'Expeditive', status: 'Kontaktversuch', preferredChannel: 'whatsapp', address: 'Limmatweg 12', zip: '8005', city: 'Zürich', country: 'Schweiz', industry: 'Marketing', googleStars: 4.2, webRating: 81, segmentation: 'C-Kunde', website: 'agency-x.ch' },
  { id: 'c5', type: 'private', name: 'Moser', firstName: 'Daniel', phone: '+41 79 444 55 66', email: 'd.moser@privat.ch', source: 'Web', milieu: 'Bürgerliche Mitte', status: 'Archiviert', preferredChannel: 'sms', address: 'Bergweg 3', zip: '6000', city: 'Luzern', country: 'Schweiz', industry: 'Real Estate', googleStars: 3.8, webRating: 70, segmentation: 'Standard', website: 'moser-immobilien.ch' },
  { id: 'c6', type: 'business', company: 'Consulting Basel', name: 'Voser', firstName: 'Jan', phone: '+41 61 777 88 99', email: 'j.voser@consult-bs.ch', source: 'LinkedIn', milieu: 'Performer', status: 'Neu', preferredChannel: 'email', address: 'Rheinstrasse 10', zip: '4000', city: 'Basel', country: 'Schweiz', industry: 'Consulting', googleStars: 4.7, webRating: 90, segmentation: 'B-Kunde', website: 'consult-bs.ch' },
  { id: 'c7', type: 'business', company: 'Logistics Ticino', name: 'Bianchi', firstName: 'Paolo', phone: '+41 91 222 33 44', email: 'p.bianchi@log-ti.ch', source: 'Direct', milieu: 'Traditionelle', status: 'Neu', preferredChannel: 'phone', address: 'Via Lugano 5', zip: '6900', city: 'Lugano', country: 'Schweiz', industry: 'Logistics', googleStars: 4.3, webRating: 85, segmentation: 'A-Kunde', website: 'log-ti.ch' },
  { id: 'c8', type: 'business', company: 'Startup Alpha', name: 'Zollinger', firstName: 'Nina', phone: '+41 44 888 77 66', email: 'nina@startup-alpha.ch', source: 'Google', milieu: 'Expeditive', status: 'Qualifiziert', preferredChannel: 'email', address: 'Technoparkstrasse 1', zip: '8005', city: 'Zürich', country: 'Schweiz', industry: 'SaaS', googleStars: 4.0, webRating: 82, segmentation: 'B-Kunde', website: 'startup-alpha.ch' },
  { id: 'c9', type: 'business', company: 'Gourmet Group', name: 'Vogt', firstName: 'Stefan', phone: '+41 31 111 22 22', email: 's.vogt@gourmet-ch.ch', source: 'Referral', milieu: 'Postmaterielle', status: 'Neu', preferredChannel: 'email', address: 'Gerechtigkeitsgasse 5', zip: '3011', city: 'Bern', country: 'Schweiz', industry: 'Gastronomy', googleStars: 4.6, webRating: 93, segmentation: 'Premium', website: 'gourmet-ch.ch' },
  { id: 'c10', type: 'private', name: 'Schuler', firstName: 'Regula', phone: '+41 78 555 44 33', email: 'regula@schuler-design.ch', source: 'Instagram', milieu: 'Postmaterielle', status: 'Qualifiziert', preferredChannel: 'whatsapp', address: 'Seestrasse 100', zip: '8002', city: 'Zürich', country: 'Schweiz', industry: 'Design', googleStars: 5.0, webRating: 97, segmentation: 'Premium', website: 'schuler-design.ch' },

  // --- STAGE 2: INSIGHT (10 Kontakte) ---
  { id: 'c11', type: 'business', company: 'Innovation Hub', name: 'Weber', firstName: 'Stefan', phone: '+41 41 444 55 66', email: 's.weber@innohub.ch', source: 'Google', milieu: 'Performer', status: 'Analyse offen', preferredChannel: 'email', address: 'Grienbachstrasse 11', zip: '6300', city: 'Zug', country: 'Schweiz', industry: 'Tech', googleStars: 4.2, webRating: 85, segmentation: 'B-Kunde', website: 'innohub.ch' },
  { id: 'c12', type: 'business', company: 'Swiss BioCare', name: 'Baumann', firstName: 'Sarah', phone: '+41 61 222 33 44', email: 'sarah.baumann@biocare.ch', source: 'LinkedIn', milieu: 'Expeditive', status: 'Persona erstellt', preferredChannel: 'email', address: 'Clarastrasse 15', zip: '4058', city: 'Basel', country: 'Schweiz', industry: 'Healthcare', googleStars: 4.7, webRating: 94, segmentation: 'Key Account', website: 'biocare.ch' },
  { id: 'c13', type: 'business', company: 'Alpine Retail', name: 'Keller', firstName: 'Thomas', phone: '+41 33 444 55 66', email: 'keller@alpineretail.ch', source: 'Web', milieu: 'Bürgerliche Mitte', status: 'Erstgespräch geführt', preferredChannel: 'email', address: 'Höheweg 37', zip: '3800', city: 'Interlaken', country: 'Schweiz', industry: 'Retail', googleStars: 4.0, webRating: 75, segmentation: 'C-Kunde', website: 'alpineretail.ch' },
  { id: 'c14', type: 'business', company: 'Global Dynamics', name: 'Schmidt', firstName: 'Laura', phone: '+49 89 555 666', email: 'l.schmidt@globaldyn.de', source: 'Referral', milieu: 'Expeditive', status: 'Warm-Up', preferredChannel: 'phone', address: 'Maximilianstraße 42', zip: '80333', city: 'München', country: 'Deutschland', industry: 'Consulting', googleStars: 4.5, webRating: 88, segmentation: 'Key Account', website: 'globaldyn.de' },
  { id: 'c15', type: 'business', company: 'Eco Ventures', name: 'Durrer', firstName: 'Nico', phone: '+41 41 777 00 00', email: 'nico@eco-v.ch', source: 'Event', milieu: 'Postmaterielle', status: 'Lost', preferredChannel: 'email', address: 'Zugerstrasse 50', zip: '6330', city: 'Cham', country: 'Schweiz', industry: 'Environment', googleStars: 4.1, webRating: 78, segmentation: 'B-Kunde', website: 'eco-v.ch' },
  { id: 'c16', type: 'business', company: 'Genf Watch Co.', name: 'Dubois', firstName: 'Pierre', phone: '+41 22 333 44 55', email: 'p.dubois@genevawatch.ch', source: 'Direct', milieu: 'Traditionelle', status: 'Analyse offen', preferredChannel: 'phone', address: 'Quai du Mont-Blanc 1', zip: '1201', city: 'Genf', country: 'Schweiz', industry: 'Luxury', googleStars: 4.9, webRating: 96, segmentation: 'Key Account', website: 'genevawatch.ch' },
  { id: 'c17', type: 'business', company: 'Zürich AI Labs', name: 'Frisch', firstName: 'Ursula', phone: '+41 44 999 00 22', email: 'u.frisch@zh-ai.ch', source: 'LinkedIn', milieu: 'Performer', status: 'Analyse offen', preferredChannel: 'email', address: 'Oerlikonerstrasse 5', zip: '8050', city: 'Zürich', country: 'Schweiz', industry: 'AI', googleStars: 4.6, webRating: 91, segmentation: 'A-Kunde', website: 'zh-ai.ch' },
  { id: 'c18', type: 'business', company: 'Fribourg Food', name: 'Piller', firstName: 'Marc', phone: '+41 26 555 66 77', email: 'm.piller@f-food.ch', source: 'Web', milieu: 'Bürgerliche Mitte', status: 'Persona erstellt', preferredChannel: 'email', address: 'Grand-Rue 10', zip: '1700', city: 'Freiburg', country: 'Schweiz', industry: 'Food', googleStars: 4.3, webRating: 84, segmentation: 'B-Kunde', website: 'f-food.ch' },
  { id: 'c19', type: 'private', name: 'Hug', firstName: 'Beat', phone: '+41 76 111 22 33', email: 'beat@hug-media.ch', source: 'Instagram', milieu: 'Expeditive', status: 'Warm-Up', preferredChannel: 'whatsapp', address: 'Dorfplatz 1', zip: '6000', city: 'Luzern', country: 'Schweiz', industry: 'Media', googleStars: 4.5, webRating: 89, segmentation: 'Premium', website: 'hug-media.ch' },
  { id: 'c20', type: 'business', company: 'Smart Home Zug', name: 'Lusti', firstName: 'Rolf', phone: '+41 41 888 11 11', email: 'r.lusti@smarthome-zug.ch', source: 'Google', milieu: 'Performer', status: 'Erstgespräch geführt', preferredChannel: 'email', address: 'Baarerstrasse 20', zip: '6300', city: 'Zug', country: 'Schweiz', industry: 'IoT', googleStars: 4.4, webRating: 87, segmentation: 'B-Kunde', website: 'smarthome-zug.ch' },

  // --- STAGE 3: SOLUTION (10 Kontakte) ---
  { id: 'c21', type: 'business', company: 'Green Energy Ltd', name: 'Huber', firstName: 'Monika', phone: '+41 52 777 88 99', email: 'm.huber@greenenergy.ch', source: 'Partner', milieu: 'Postmaterielle', status: 'Offerte gesendet', preferredChannel: 'phone', address: 'Schaffhauserstrasse 1', zip: '8400', city: 'Winterthur', country: 'Schweiz', industry: 'Energy', googleStars: 4.9, webRating: 90, segmentation: 'Key Account', website: 'greenenergy.ch' },
  { id: 'c22', type: 'business', company: 'Future FinTech', name: 'Meier', firstName: 'Lukas', phone: '+41 44 888 99 00', email: 'l.meier@futurefin.ch', source: 'Event', milieu: 'Performer', status: 'Bedarfsanalyse', preferredChannel: 'phone', address: 'Pelikanstrasse 5', zip: '8001', city: 'Zürich', country: 'Schweiz', industry: 'Finance', googleStars: 4.4, webRating: 82, segmentation: 'A-Kunde', website: 'futurefin.ch' },
  { id: 'c23', type: 'business', company: 'Swiss Pharma AG', name: 'Kaiser', firstName: 'Peter', phone: '+41 61 999 88 77', email: 'p.kaiser@swisspharma.ch', source: 'LinkedIn', milieu: 'Traditionelle', status: 'Lösungskonzept', preferredChannel: 'email', address: 'Industriestrasse 10', zip: '4000', city: 'Basel', country: 'Schweiz', industry: 'Pharma', googleStars: 4.8, webRating: 95, segmentation: 'Key Account', website: 'swisspharma.ch' },
  { id: 'c24', type: 'business', company: 'Travel Experts', name: 'Odermatt', firstName: 'Janine', phone: '+41 41 222 55 44', email: 'j.odermatt@travel-ex.ch', source: 'Referral', milieu: 'Expeditive', status: 'In Verhandlung', preferredChannel: 'whatsapp', address: 'Pilatusstrasse 1', zip: '6000', city: 'Luzern', country: 'Schweiz', industry: 'Travel', googleStars: 4.2, webRating: 80, segmentation: 'B-Kunde', website: 'travel-ex.ch' },
  { id: 'c25', type: 'business', company: 'Media Pro Switzerland', name: 'Suter', firstName: 'Marc', phone: '+41 44 111 99 00', email: 'm.suter@mediapro.ch', source: 'Web', milieu: 'Performer', status: 'Closing', preferredChannel: 'email', address: 'Uetlibergstrasse 50', zip: '8045', city: 'Zürich', country: 'Schweiz', industry: 'Media', googleStars: 4.6, webRating: 91, segmentation: 'A-Kunde', website: 'mediapro.ch' },
  { id: 'c26', type: 'business', company: 'Zurich Legal Hub', name: 'Brunner', firstName: 'Andrea', phone: '+41 44 777 66 55', email: 'a.brunner@zh-legal.ch', source: 'LinkedIn', milieu: 'Traditionelle', status: 'Offerte gesendet', preferredChannel: 'email', address: 'Fraumünsterstrasse 2', zip: '8001', city: 'Zürich', country: 'Schweiz', industry: 'Legal', googleStars: 4.8, webRating: 93, segmentation: 'Key Account', website: 'zh-legal.ch' },
  { id: 'c27', type: 'business', company: 'Bern IT Services', name: 'Leuenberger', firstName: 'Klaus', phone: '+41 31 444 33 22', email: 'k.leuen@bern-it.ch', source: 'Referral', milieu: 'Bürgerliche Mitte', status: 'In Verhandlung', preferredChannel: 'phone', address: 'Bärenplatz 1', zip: '3011', city: 'Bern', country: 'Schweiz', industry: 'IT', googleStars: 4.1, webRating: 79, segmentation: 'C-Kunde', website: 'bern-it.ch' },
  { id: 'c28', type: 'business', company: 'Digital Alpha AG', name: 'Rutz', firstName: 'Elena', phone: '+41 44 333 22 11', email: 'elena@digital-alpha.ch', source: 'Google', milieu: 'Expeditive', status: 'Bedarfsanalyse', preferredChannel: 'email', address: 'Seestrasse 20', zip: '8800', city: 'Thalwil', country: 'Schweiz', industry: 'E-Commerce', googleStars: 4.5, webRating: 87, segmentation: 'B-Kunde', website: 'digital-alpha.ch' },
  { id: 'c29', type: 'business', company: 'Swiss Real Estate', name: 'Gisler', firstName: 'Urs', phone: '+41 41 888 77 66', email: 'u.gisler@swiss-re.ch', source: 'Direct', milieu: 'Performer', status: 'Offerte gesendet', preferredChannel: 'email', address: 'Seehofstrasse 5', zip: '6000', city: 'Luzern', country: 'Schweiz', industry: 'Real Estate', googleStars: 4.4, webRating: 86, segmentation: 'A-Kunde', website: 'swiss-re.ch' },
  { id: 'c30', type: 'business', company: 'Global Fashion Ltd', name: 'Rossi', firstName: 'Giulia', phone: '+41 91 666 55 44', email: 'g.rossi@g-fashion.ch', source: 'Web', milieu: 'Postmaterielle', status: 'In Verhandlung', preferredChannel: 'instagram', address: 'Via Nassa 10', zip: '6900', city: 'Lugano', country: 'Schweiz', industry: 'Fashion', googleStars: 4.7, webRating: 92, segmentation: 'Premium', website: 'g-fashion.ch' },

  // --- STAGE 4: DELIVERY (10 Kontakte) ---
  { id: 'c31', type: 'private', name: 'Zimmermann', firstName: 'Elena', phone: '+41 43 222 33 44', email: 'elena@creativeflow.ch', source: 'Instagram', milieu: 'Postmaterielle', status: 'Produktion', preferredChannel: 'whatsapp', address: 'Limmatquai 5', zip: '8001', city: 'Zürich', country: 'Schweiz', industry: 'Design & Branding', googleStars: 5.0, webRating: 95, socialLinks: { instagram: 'instagram.com/creativeflow' }, segmentation: 'Premium', website: 'creativeflow.ch' },
  { id: 'c32', type: 'business', company: 'Lucerne Logistics', name: 'Zeder', firstName: 'Ursula', phone: '+41 41 888 99 00', email: 'admin@lu-log.ch', source: 'Partner', milieu: 'Traditionelle', status: 'Onboarding', preferredChannel: 'phone', address: 'Güterstrasse 1', zip: '6000', city: 'Luzern', country: 'Schweiz', industry: 'Logistics', googleStars: 4.4, webRating: 83, segmentation: 'B-Kunde', website: 'lu-log.ch' },
  { id: 'c33', type: 'business', company: 'Graubünden Touristik', name: 'Capaul', firstName: 'Gian', phone: '+41 81 222 33 44', email: 'g.capaul@gr-touristik.ch', source: 'Direct', milieu: 'Performer', status: 'Anzahlung offen', preferredChannel: 'email', address: 'Bahnhofplatz 1', zip: '7000', city: 'Chur', country: 'Schweiz', industry: 'Tourism', googleStars: 4.6, webRating: 90, segmentation: 'A-Kunde', website: 'gr-touristik.ch' },
  { id: 'c34', type: 'business', company: 'Swiss Gov Entity', name: 'Frei', firstName: 'Peter', phone: '+41 31 999 00 11', email: 'p.frei@gov-ch.ch', source: 'Direct', milieu: 'Traditionelle', status: 'Feedback-Schleife', preferredChannel: 'email', address: 'Bundesplatz 1', zip: '3000', city: 'Bern', country: 'Schweiz', industry: 'Government', googleStars: 4.1, webRating: 82, segmentation: 'Key Account', website: 'gov-ch.ch' },
  { id: 'c35', type: 'business', company: 'St. Gallen Retail', name: 'Mayer', firstName: 'Sonia', phone: '+41 71 444 55 66', email: 's.mayer@stg-retail.ch', source: 'Web', milieu: 'Bürgerliche Mitte', status: 'Projektabschluss', preferredChannel: 'email', address: 'Marktplatz 10', zip: '9000', city: 'St. Gallen', country: 'Schweiz', industry: 'Retail', googleStars: 4.2, webRating: 80, segmentation: 'C-Kunde', website: 'stg-retail.ch' },
  { id: 'c36', type: 'business', company: 'Bieler Industrie', name: 'Huber', firstName: 'Marcel', phone: '+41 32 888 99 00', email: 'huber@biel-ind.ch', source: 'Referral', milieu: 'Traditionelle', status: 'Produktion', preferredChannel: 'phone', address: 'Länggasse 5', zip: '2504', city: 'Biel', country: 'Schweiz', industry: 'Manufacturing', googleStars: 4.3, webRating: 84, segmentation: 'B-Kunde', website: 'biel-ind.ch' },
  { id: 'c37', type: 'business', company: 'Thurgau Tech', name: 'Stadler', firstName: 'Jan', phone: '+41 52 111 22 33', email: 'stadler@tg-tech.ch', source: 'Event', milieu: 'Performer', status: 'Produktion', preferredChannel: 'email', address: 'Technopark 1', zip: '8500', city: 'Frauenfeld', country: 'Schweiz', industry: 'Tech', googleStars: 4.5, webRating: 87, segmentation: 'A-Kunde', website: 'tg-tech.ch' },
  { id: 'c38', type: 'business', company: 'Zürich Creative', name: 'Sutter', firstName: 'Maja', phone: '+41 44 222 11 00', email: 'maja@zh-creative.ch', source: 'Instagram', milieu: 'Expeditive', status: 'Onboarding', preferredChannel: 'whatsapp', address: 'Langstrasse 1', zip: '8004', city: 'Zürich', country: 'Schweiz', industry: 'Creative', googleStars: 4.9, webRating: 94, segmentation: 'Premium', website: 'zh-creative.ch' },
  { id: 'c39', type: 'business', company: 'Appenzeller Käse AG', name: 'Koch', firstName: 'Ueli', phone: '+41 71 333 44 55', email: 'u.koch@kaese-ai.ch', source: 'Google', milieu: 'Traditionelle', status: 'Produktion', preferredChannel: 'email', address: 'Dorfstrasse 1', zip: '9050', city: 'Appenzell', country: 'Schweiz', industry: 'Food', googleStars: 4.7, webRating: 89, segmentation: 'B-Kunde', website: 'kaese-ai.ch' },
  { id: 'c40', type: 'business', company: 'Geneva Private Bank', name: 'Lefebvre', firstName: 'Jean', phone: '+41 22 555 66 77', email: 'jean@gen-pb.ch', source: 'Direct', milieu: 'Performer', status: 'Onboarding', preferredChannel: 'phone', address: 'Rue du Rhône 10', zip: '1204', city: 'Genf', country: 'Schweiz', industry: 'Finance', googleStars: 4.8, webRating: 95, segmentation: 'Key Account', website: 'gen-pb.ch' },

  // --- STAGE 5: GROWTH (10 Kontakte) ---
  { id: 'c41', type: 'business', company: 'Luxury Hotels Group', name: 'Rossi', firstName: 'Marco', phone: '+41 91 666 77 88', email: 'm.rossi@luxuryhotels.ch', source: 'Direct', milieu: 'Traditionelle', status: 'Cross-Selling-Check', preferredChannel: 'email', address: 'Via Nassa 1', zip: '6900', city: 'Lugano', country: 'Schweiz', industry: 'Hospitality', googleStars: 4.6, webRating: 89, segmentation: 'Key Account', website: 'luxuryhotels.ch' },
  { id: 'c42', type: 'business', company: 'TechSolutions AG', name: 'Zollinger', firstName: 'Hans-Peter', phone: '+41 44 123 45 00', email: 'hp.z@techsolutions.ch', source: 'LinkedIn', milieu: 'Performer', status: 'Review-Anfrage', preferredChannel: 'email', address: 'Bahnhofstrasse 10', zip: '8001', city: 'Zürich', country: 'Schweiz', industry: 'IT', googleStars: 4.8, webRating: 93, segmentation: 'A-Kunde', website: 'techsolutions.ch' },
  { id: 'c43', type: 'business', company: 'Swiss Med Tech', name: 'Huber', firstName: 'Monika', phone: '+41 41 555 66 77', email: 'm.huber@med-tech.ch', source: 'Referral', milieu: 'Performer', status: 'Erfolgs-Story', preferredChannel: 'email', address: 'Pilatusstrasse 10', zip: '6000', city: 'Luzern', country: 'Schweiz', industry: 'Medical', googleStars: 4.7, webRating: 91, segmentation: 'A-Kunde', website: 'med-tech.ch' },
  { id: 'c44', type: 'business', company: 'Basel Pharma Giant', name: 'Lehmann', firstName: 'Sabine', phone: '+41 61 888 77 66', email: 's.lehmann@pharma-giant.ch', source: 'Direct', milieu: 'Performer', status: 'Full-Service', preferredChannel: 'email', address: 'Rheinweg 5', zip: '4002', city: 'Basel', country: 'Schweiz', industry: 'Pharma', googleStars: 4.9, webRating: 96, segmentation: 'Key Account', website: 'pharma-giant.ch' },
  { id: 'c45', type: 'business', company: 'SaaS StartUp X', name: 'Meier', firstName: 'Fabian', phone: '+41 44 333 44 55', email: 'f.meier@saas-x.ch', source: 'Google', milieu: 'Expeditive', status: 'Reaktivierung', preferredChannel: 'email', address: 'Limmatweg 5', zip: '8005', city: 'Zürich', country: 'Schweiz', industry: 'SaaS', googleStars: 4.3, webRating: 82, segmentation: 'B-Kunde', website: 'saas-x.ch' },
  { id: 'c46', type: 'business', company: 'Aargau Automation', name: 'Widmer', firstName: 'Thomas', phone: '+41 56 111 22 33', email: 't.widmer@argau-auto.ch', source: 'Referral', milieu: 'Traditionelle', status: 'Review-Anfrage', preferredChannel: 'phone', address: 'Industriepark 1', zip: '5000', city: 'Aarau', country: 'Schweiz', industry: 'Automation', googleStars: 4.4, webRating: 85, segmentation: 'B-Kunde', website: 'argau-auto.ch' },
  { id: 'c47', type: 'business', company: 'Creative Swiss Design', name: 'Gfeller', firstName: 'Nina', phone: '+41 31 777 66 55', email: 'nina@creative-swiss.ch', source: 'Instagram', milieu: 'Expeditive', status: 'Full-Service', preferredChannel: 'whatsapp', address: 'Kirchenfeld 1', zip: '3000', city: 'Bern', country: 'Schweiz', industry: 'Design', googleStars: 4.9, webRating: 95, segmentation: 'Premium', website: 'creative-swiss.ch' },
  { id: 'c48', type: 'business', company: 'St. Moritz Elite', name: 'Pavin', firstName: 'Marco', phone: '+41 81 555 44 33', email: 'm.pavin@st-moritz-elite.ch', source: 'Referral', milieu: 'Performer', status: 'Erfolgs-Story', preferredChannel: 'email', address: 'Via Serlas 1', zip: '7500', city: 'St. Moritz', country: 'Schweiz', industry: 'Luxury', googleStars: 5.0, webRating: 98, segmentation: 'Key Account', website: 'st-moritz-elite.ch' },
  { id: 'c49', type: 'business', company: 'Geneva Trading', name: 'Muller', firstName: 'Luc', phone: '+41 22 888 77 66', email: 'luc@gen-trading.ch', source: 'Direct', milieu: 'Performer', status: 'Cross-Selling-Check', preferredChannel: 'phone', address: 'Rue du Stand 5', zip: '1204', city: 'Genf', country: 'Schweiz', industry: 'Finance', googleStars: 4.5, webRating: 88, segmentation: 'A-Kunde', website: 'gen-trading.ch' },
  { id: 'c50', type: 'business', company: 'Zug Crypto Hub', name: 'Vogt', firstName: 'Stefan', phone: '+41 41 123 12 12', email: 'stefan@crypto-zug.ch', source: 'LinkedIn', milieu: 'Expeditive', status: 'Review-Anfrage', preferredChannel: 'email', address: 'Dammstrasse 1', zip: '6300', city: 'Zug', country: 'Schweiz', industry: 'Fintech', googleStars: 4.6, webRating: 90, segmentation: 'A-Kunde', website: 'crypto-zug.ch' },

  // --- STAGE 6: ADVOCACY (10 Kontakte) ---
  { id: 'c51', type: 'business', company: 'Swiss Tech GmbH', name: 'Zeder', firstName: 'Manuela', phone: '+41 44 555 66 77', email: 'm.zeder@swisstech.ch', source: 'Referral', milieu: 'Performer', status: 'VIP-Ambassador', preferredChannel: 'phone', address: 'Hohlstrasse 10', zip: '8004', city: 'Zürich', country: 'Schweiz', industry: 'IT', googleStars: 4.8, webRating: 93, segmentation: 'Key Account', website: 'swisstech.ch' },
  { id: 'c52', type: 'private', name: 'Graf', firstName: 'Patrick', phone: '+41 79 111 22 33', email: 'patrick.graf@graf-design.ch', source: 'Referral', milieu: 'Postmaterielle', status: 'Aktiver Empfehler', preferredChannel: 'whatsapp', address: 'Seestrasse 200', zip: '8002', city: 'Zürich', country: 'Schweiz', industry: 'Art', googleStars: 5.0, webRating: 98, segmentation: 'Premium', website: 'graf-design.ch' },
  { id: 'c53', type: 'business', company: 'Elena Branding', name: 'Zimmermann', firstName: 'Elena', phone: '+41 43 111 22 33', email: 'elena@elena-branding.ch', source: 'LinkedIn', milieu: 'Postmaterielle', status: 'Partner-Status', preferredChannel: 'email', address: 'Limmatweg 1', zip: '8001', city: 'Zürich', country: 'Schweiz', industry: 'Marketing', googleStars: 4.9, webRating: 96, segmentation: 'Key Account', website: 'elena-branding.ch' },
  { id: 'c54', type: 'business', company: 'Müller Solar AG', name: 'Müller', firstName: 'Jürgen', phone: '+41 32 444 55 66', email: 'j.mueller@mueller-solar.ch', source: 'Google', milieu: 'Performer', status: 'Aktiver Empfehler', preferredChannel: 'email', address: 'Bahnhofplatz 1', zip: '4500', city: 'Solothurn', country: 'Schweiz', industry: 'Energy', googleStars: 4.6, webRating: 89, segmentation: 'A-Kunde', website: 'mueller-solar.ch' },
  { id: 'c55', type: 'business', company: 'Local Doc Center', name: 'Bühler', firstName: 'Hans', phone: '+41 44 888 99 00', email: 'h.buehler@localdoc.ch', source: 'Direct', milieu: 'Bürgerliche Mitte', status: 'Einladung gesendet', preferredChannel: 'phone', address: 'Spitalstrasse 5', zip: '8006', city: 'Zürich', country: 'Schweiz', industry: 'Healthcare', googleStars: 4.4, webRating: 85, segmentation: 'B-Kunde', website: 'localdoc.ch' },
  { id: 'c56', type: 'business', company: 'Pharma Basel Hub', name: 'Kraus', firstName: 'Lukas', phone: '+41 61 777 66 55', email: 'l.kraus@pharma-bs.ch', source: 'Referral', milieu: 'Performer', status: 'Ambassador-Check', preferredChannel: 'email', address: 'Grenzacherstr. 5', zip: '4000', city: 'Basel', country: 'Schweiz', industry: 'Pharma', googleStars: 4.9, webRating: 97, segmentation: 'Key Account', website: 'pharma-bs.ch' },
  { id: 'c57', type: 'business', company: 'Luxury Swiss Travel', name: 'Keller', firstName: 'Maja', phone: '+41 33 222 11 00', email: 'maja@swiss-lux-travel.ch', source: 'Referral', milieu: 'Performer', status: 'VIP-Ambassador', preferredChannel: 'whatsapp', address: 'Höheweg 10', zip: '3800', city: 'Interlaken', country: 'Schweiz', industry: 'Tourism', googleStars: 5.0, webRating: 99, segmentation: 'Premium', website: 'swiss-lux-travel.ch' },
  { id: 'c58', type: 'business', company: 'Bio Farm Switzerland', name: 'Hofer', firstName: 'Ueli', phone: '+41 31 555 66 77', email: 'u.hofer@biofarm-ch.ch', source: 'Direct', milieu: 'Postmaterielle', status: 'Partner-Status', preferredChannel: 'phone', address: 'Dorfplatz 1', zip: '311', city: 'Bern', country: 'Schweiz', industry: 'Food', googleStars: 4.7, webRating: 92, segmentation: 'A-Kunde', website: 'biofarm-ch.ch' },
  { id: 'c59', type: 'business', company: 'Zurich Tech Partners', name: 'Sutter', firstName: 'Marc', phone: '+41 44 888 77 66', email: 'm.sutter@zh-tech.ch', source: 'LinkedIn', milieu: 'Performer', status: 'Aktiver Empfehler', preferredChannel: 'email', address: 'Prime Tower', zip: '8005', city: 'Zürich', country: 'Schweiz', industry: 'Tech', googleStars: 4.8, webRating: 94, segmentation: 'Key Account', website: 'zh-tech.ch' },
  { id: 'c60', type: 'private', name: 'Baumann', firstName: 'Reto', phone: '+41 76 444 33 22', email: 'reto@baumann-media.ch', source: 'Referral', milieu: 'Expeditive', status: 'Ambassador-Check', preferredChannel: 'whatsapp', address: 'Uetlibergstr. 10', zip: '8045', city: 'Zürich', country: 'Schweiz', industry: 'Media', googleStars: 4.5, webRating: 88, segmentation: 'Premium', website: 'baumann-media.ch' }
];

export const ALL_DASHLETS: Record<UnitId | 'projects' | 'crm' | 'agents', DashletData[]> = {
  sales: [
    { id: 's1', unitId: 'sales', title: 'Pipeline Value', metric: 'CHF 1,245,000.42', trend: '+12.4%', type: 'bar', color: '#f59e0b', w: 2, h: 1, agentName: 'Silvan Koch' }
  ],
  marketing: [
    { id: 'm1', unitId: 'marketing', title: 'MQL Conversion', metric: '4.281%', trend: '+0.82%', type: 'bar', color: '#fbbf24', w: 2, h: 1, agentName: 'Ursula Widmer' }
  ],
  support: [
    { id: 'u1', unitId: 'support', title: 'CSAT Score', metric: '4.92/5.00', trend: '+0.12', type: 'gauge', color: '#0ea5e9', w: 2, h: 1, agentName: 'Hanna Parker' }
  ],
  strategic: [
    { id: 'st1', unitId: 'strategic', title: 'Market Share', metric: '18.42%', trend: '+2.54%', type: 'line', color: '#6366f1', w: 2, h: 1, agentName: 'David Chen' }
  ],
  finance: [
    { id: 'f1', unitId: 'finance', title: 'Revenues MTD', metric: 'CHF 84,204.10', trend: '+14.2%', type: 'sankey', color: '#10b981', w: 2, h: 2, agentName: 'Murat Yilmaz' },
    { id: 'f2', unitId: 'finance', title: 'Expenses MTD', metric: 'CHF 22,108.55', trend: '-2.4%', type: 'heatmap', color: '#ef4444', w: 2, h: 1, agentName: 'Beatrice Müller' },
    { id: 'f3', unitId: 'finance', title: 'Profit Margin', metric: '74.20%', trend: '+4.1%', type: 'gauge', color: '#8b5cf6', w: 2, h: 1, agentName: 'Murat Yilmaz' },
    { id: 'f4', unitId: 'finance', title: 'Cashflow Sunburst', metric: 'Liquid (Opt)', trend: '+1.22%', type: 'sunburst', color: '#ec4899', w: 2, h: 2, agentName: 'Murat Yilmaz' },
    { id: 'f5', unitId: 'finance', title: 'Volatility', metric: '0.041 (Low)', trend: 'Stable', type: 'candlestick', color: '#06b6d4', w: 3, h: 1, agentName: 'Beatrice Müller' },
    { id: 'f6', unitId: 'finance', title: 'Resource Tree', metric: '92.4%', trend: '+5.0%', type: 'treemap', color: '#f59e0b', w: 1, h: 2, agentName: 'Alessandra Rossi' },
    { id: 'f7', unitId: 'finance', title: 'Unit Balance', metric: 'Balanced', trend: 'OK', type: 'radar', color: '#3b82f6', w: 2, h: 1, agentName: 'Murat Yilmaz' },
    { id: 'f8', unitId: 'finance', title: 'Tax Provision', metric: 'CHF 12,400', trend: '+0.5%', type: 'area', color: '#10b981', w: 2, h: 1 },
    { id: 'f9', unitId: 'finance', title: 'Accounts Receivable', metric: 'CHF 42,100', trend: '-10%', type: 'bar', color: '#10b981', w: 2, h: 1 },
    { id: 'f10', unitId: 'finance', title: 'Burn Rate', metric: 'CHF 18,200', trend: '-5%', type: 'line', color: '#ef4444', w: 2, h: 1 },
    { id: 'f11', unitId: 'finance', title: 'Runway', metric: '14.2 Mo', trend: '+1.5', type: 'ring', color: '#10b981', w: 1, h: 1 },
    { id: 'f12', unitId: 'finance', title: 'Equity Growth', metric: '+CHF 120k', trend: '+15%', type: 'wave', color: '#8b5cf6', w: 2, h: 1 },
    { id: 'f13', unitId: 'finance', title: 'EBITDA Proxy', metric: 'CHF 28,400', trend: '+8%', type: 'bubble', color: '#10b981', w: 2, h: 1 },
    { id: 'f14', unitId: 'finance', title: 'Interest Coverage', metric: '12.4x', trend: 'Optimal', type: 'dots', color: '#3b82f6', w: 2, h: 1 },
    { id: 'f15', unitId: 'finance', title: 'Op Leverage', metric: '2.4', trend: 'High', type: 'pyramid', color: '#f59e0b', w: 2, h: 1 },
    { id: 'f16', unitId: 'finance', title: 'Debt/Equity', metric: '0.12', trend: 'Minimal', type: 'funnel', color: '#ec4899', w: 2, h: 1 },
    { id: 'f17', unitId: 'finance', title: 'Cash Velocity', metric: '1.4x', trend: '+0.1', type: 'spiral', color: '#06b6d4', w: 1, h: 1 },
    { id: 'f18', unitId: 'finance', title: 'Budget Var.', metric: '2.14%', trend: 'Minimal', type: 'hex', color: '#3b82f6', w: 2, h: 1 },
    { id: 'f19', unitId: 'finance', title: 'CAPEX Load', metric: 'CHF 5,400', trend: '-15%', type: 'flow', color: '#f59e0b', w: 3, h: 1 },
    { id: 'f20', unitId: 'finance', title: 'Asset Turnover', metric: '0.84', trend: '+0.05', type: 'pie', color: '#8b5cf6', w: 2, h: 1 }
  ],
  projects: [
    { id: 'p1', unitId: 'strategic', title: 'Project Velocity', metric: '88.42%', trend: '+5.1%', type: 'gauge', color: '#6366f1', w: 2, h: 2, agentName: 'Elena Martinez' },
    { id: 'p2', unitId: 'marketing', title: 'Resource Load', metric: '94.10%', trend: '+10.2%', type: 'heatmap', color: '#fbbf24', w: 2, h: 1, agentName: 'Oleksandr Shevchenko' },
    { id: 'p3', unitId: 'sales', title: 'Billable Flow', metric: 'CHF 142,400', trend: '+22.1%', type: 'sankey', color: '#f59e0b', w: 2, h: 2, agentName: 'Silvan Koch' },
    { id: 'p4', unitId: 'strategic', title: 'Deadline Health', metric: '99.8%', trend: 'OK', type: 'candlestick', color: '#8b5cf6', w: 3, h: 1, agentName: 'Julian Kim' },
    { id: 'p5', unitId: 'marketing', title: 'Asset Tree', metric: '420 Units', trend: '+42', type: 'treemap', color: '#ec4899', w: 2, h: 2, agentName: 'Emre Kaya' },
    { id: 'p6', unitId: 'strategic', title: 'Overdue Tasks', metric: '2', trend: '-50%', type: 'bar', color: '#ef4444', w: 1, h: 1 },
    { id: 'p7', unitId: 'support', title: 'Team Util.', metric: '82.4%', trend: 'Stable', type: 'area', color: '#0ea5e9', w: 2, h: 1 },
    { id: 'p8', unitId: 'strategic', title: 'Quality Score', metric: '9.4/10', trend: '+0.2', type: 'ring', color: '#10b981', w: 1, h: 1 },
    { id: 'p9', unitId: 'finance', title: 'Scope Creep', metric: 'Low (2%)', trend: 'Safe', type: 'funnel', color: '#f59e0b', w: 2, h: 1 },
    { id: 'p10', unitId: 'strategic', title: 'Bug Resolve', metric: '98.1%', trend: '+2%', type: 'wave', color: '#6366f1', w: 2, h: 1 },
    { id: 'p11', unitId: 'strategic', title: 'Milestone Acc.', metric: '94%', trend: '+1%', type: 'radar', color: '#3b82f6', w: 2, h: 1 },
    { id: 'p12', unitId: 'marketing', title: 'Client Pulse', metric: 'High', trend: 'Happy', type: 'dots', color: '#fbbf24', w: 2, h: 1 },
    { id: 'p13', unitId: 'strategic', title: 'Iteration Spd', metric: '4.2d', trend: '-0.5d', type: 'line', color: '#8b5cf6', w: 2, h: 1 },
    { id: 'p14', unitId: 'support', title: 'Doc Depth', metric: '84%', trend: '+5%', type: 'pyramid', color: '#0ea5e9', w: 2, h: 1 },
    { id: 'p15', unitId: 'marketing', title: 'Cloud Overhead', metric: 'CHF 420', trend: 'Flat', type: 'bubble', color: '#ec4899', w: 2, h: 1 },
    { id: 'p16', unitId: 'strategic', title: 'Burndown', metric: 'On Track', trend: 'Linear', type: 'flow', color: '#6366f1', w: 3, h: 1 },
    { id: 'p17', unitId: 'sales', title: 'Rel. Frequency', metric: '2.1/wk', trend: '+0.2', type: 'spiral', color: '#f59e0b', w: 1, h: 1 },
    { id: 'p18', unitId: 'strategic', title: 'Tech Debt', metric: 'Minimal', trend: 'Safe', type: 'hex', color: '#3b82f6', w: 2, h: 1 },
    { id: 'p19', unitId: 'marketing', title: 'Meeting Load', metric: '14.2h/wk', trend: '-2h', type: 'pie', color: '#fbbf24', w: 2, h: 1 },
    { id: 'p20', unitId: 'strategic', title: 'Appr. Latency', metric: '4.1h', trend: '-1.2h', type: 'ring', color: '#10b981', w: 1, h: 1 }
  ],
  crm: [
    { id: 'c1', unitId: 'sales', title: 'Total Leads', metric: '1,240.0', trend: '+15.2%', type: 'bar', color: '#f59e0b', w: 2, h: 1, agentName: 'Silvan Koch' },
    { id: 'c2', unitId: 'marketing', title: 'Contact Growth', metric: '42.14%', trend: '+5.1%', type: 'line', color: '#fbbf24', w: 2, h: 1, agentName: 'Ursula Widmer' },
    { id: 'c3', unitId: 'sales', title: 'Conversion Rate', metric: '3.824%', trend: '+0.21%', type: 'gauge', color: '#10b981', w: 2, h: 1, agentName: 'Kai Sommer' },
    { id: 'c4', unitId: 'support', title: 'Satisfaction Index', metric: '4.82/5.00', trend: '+0.12', type: 'heatmap', color: '#0ea5e9', w: 3, h: 1, agentName: 'Hanna Parker' },
    { id: 'c5', unitId: 'strategic', title: 'LTV Heatmap', metric: 'CHF 12.5k', trend: '+8.2%', type: 'sankey', color: '#6366f1', w: 2, h: 2, agentName: 'David Chen' },
    { id: 'c6', unitId: 'sales', title: 'Email Open Rate', metric: '62.4%', trend: '+4%', type: 'wave', color: '#f59e0b', w: 2, h: 1 },
    { id: 'c7', unitId: 'support', title: 'Response Time', metric: '14.2m', trend: '-2.1m', type: 'radar', color: '#0ea5e9', w: 2, h: 1 },
    { id: 'c8', unitId: 'sales', title: 'Lost Reason', metric: 'Budget (42%)', trend: 'Shift', type: 'treemap', color: '#ef4444', w: 2, h: 2 },
    { id: 'c9', unitId: 'marketing', title: 'Social Strength', metric: '94.2', trend: '+12', type: 'dots', color: '#fbbf24', w: 2, h: 1 },
    { id: 'c10', unitId: 'sales', title: 'Ref. Velocity', metric: '4.2/mo', trend: '+1.2', type: 'ring', color: '#10b981', w: 1, h: 1 },
    { id: 'c11', unitId: 'strategic', title: 'Pipe Leakage', metric: '2.14%', trend: '-0.5%', type: 'funnel', color: '#6366f1', w: 2, h: 1 },
    { id: 'c12', unitId: 'support', title: 'Sentiment Score', metric: 'Positive', trend: 'Stable', type: 'bubble', color: '#0ea5e9', w: 2, h: 1 },
    { id: 'c13', unitId: 'strategic', title: 'Reg. Density', metric: 'ZH (42%)', trend: '+2%', type: 'hex', color: '#3b82f6', w: 2, h: 1 },
    { id: 'c14', unitId: 'sales', title: 'Milestone Spd', metric: '4.2d/stg', trend: '-0.2d', type: 'spiral', color: '#f59e0b', w: 1, h: 1 },
    { id: 'c15', unitId: 'strategic', title: 'Churn Risk', metric: 'Minimal', trend: 'Safe', type: 'pyramid', color: '#6366f1', w: 2, h: 1 },
    { id: 'c16', unitId: 'support', title: 'Onboard Spd', metric: '12.4d', trend: '-1.4d', type: 'area', color: '#0ea5e9', w: 2, h: 1 },
    { id: 'c17', unitId: 'sales', title: 'Upsell Pot.', metric: 'CHF 420k', trend: '+15k', type: 'sunburst', color: '#f59e0b', w: 2, h: 2 },
    { id: 'c18', unitId: 'marketing', title: 'Inter. Freq.', metric: '1.2/wk', trend: 'Optimal', type: 'dots', color: '#fbbf24', w: 2, h: 1 },
    { id: 'c19', unitId: 'marketing', title: 'Source ROI', metric: '4.2x', trend: '+0.2', type: 'candlestick', color: '#fbbf24', w: 3, h: 1 },
    { id: 'c20', unitId: 'strategic', title: 'Profile Comp.', metric: '94.2%', trend: '+2%', type: 'ring', color: '#10b981', w: 1, h: 1 }
  ],
  agents: [
    { id: 'ag1', unitId: 'marketing', title: 'Token Velocity', metric: '1,204,100/h', trend: '+42.1%', type: 'bar', color: '#fbbf24', w: 2, h: 1, agentName: 'Oleksandr Shevchenko' },
    { id: 'ag2', unitId: 'strategic', title: 'Response Fidelity', metric: '98.428%', trend: '+1.21%', type: 'gauge', color: '#6366f1', w: 2, h: 1, agentName: 'Alexander Rivera' },
    { id: 'ag3', unitId: 'sales', title: 'Autonomous Pushes', metric: '420.42', trend: '+80.1', type: 'heatmap', color: '#f59e0b', w: 2, h: 1, agentName: 'Kai Sommer' },
    { id: 'ag4', unitId: 'finance', title: 'Financial Logic', metric: 'Verified 1.0', trend: 'OK', type: 'radar', color: '#10b981', w: 2, h: 2, agentName: 'Murat Yilmaz' },
    { id: 'ag5', unitId: 'support', title: 'Ticket Resolution', metric: '92.14%', trend: '+4.2%', type: 'sankey', color: '#0ea5e9', w: 3, h: 1, agentName: 'Amara Songo' },
    { id: 'ag6', unitId: 'marketing', title: 'Persona Cons.', metric: '99.4%', trend: '+0.1%', type: 'line', color: '#fbbf24', w: 2, h: 1 },
    { id: 'ag7', unitId: 'strategic', title: 'Hallucination Floor', metric: '0.0012%', trend: '-10%', type: 'area', color: '#6366f1', w: 2, h: 1 },
    { id: 'ag8', unitId: 'sales', title: 'Context Recall', metric: '100%', trend: 'Perfect', type: 'ring', color: '#10b981', w: 1, h: 1 },
    { id: 'ag9', unitId: 'finance', title: 'Reasoning Depth', metric: '8.4/10', trend: '+0.4', type: 'pyramid', color: '#10b981', w: 2, h: 1 },
    { id: 'ag10', unitId: 'support', title: 'Latency (ms)', metric: '412ms', trend: '-24ms', type: 'wave', color: '#0ea5e9', w: 2, h: 1 },
    { id: 'ag11', unitId: 'strategic', title: 'Training Parity', metric: 'Sync', trend: 'OK', type: 'hex', color: '#3b82f6', w: 2, h: 1 },
    { id: 'ag12', unitId: 'marketing', title: 'Prompt Comp.', metric: '8.2/10', trend: 'Optimal', type: 'sunburst', color: '#fbbf24', w: 2, h: 2 },
    { id: 'ag13', unitId: 'sales', title: 'Cross-Agent Sync', metric: '94.2%', trend: '+5%', type: 'flow', color: '#f59e0b', w: 3, h: 1 },
    { id: 'ag14', unitId: 'finance', title: 'Sec. Posture', metric: 'Military', trend: 'Lock', type: 'radar', color: '#10b981', w: 2, h: 1 },
    { id: 'ag15', unitId: 'support', title: 'API Optim.', metric: '4.2x', trend: '+0.8', type: 'spiral', color: '#0ea5e9', w: 1, h: 1 },
    { id: 'ag16', unitId: 'marketing', title: 'Lang. Support', metric: '24 IDs', trend: '+2', type: 'dots', color: '#fbbf24', w: 2, h: 1 },
    { id: 'ag17', unitId: 'strategic', title: 'User Sat.', metric: '9.8/10', trend: '+0.1', type: 'pie', color: '#6366f1', w: 2, h: 1 },
    { id: 'ag18', unitId: 'sales', title: 'Autonomy Level', metric: 'Level 4', trend: 'Stable', type: 'funnel', color: '#f59e0b', w: 2, h: 1 },
    { id: 'ag19', unitId: 'finance', title: 'Memory Density', metric: '4.2GB/p', trend: '+0.5GB', type: 'treemap', color: '#10b981', w: 2, h: 2 },
    { id: 'ag20', unitId: 'strategic', title: 'Model Drift', metric: '0.002%', trend: 'Minimal', type: 'ring', color: '#3b82f6', w: 1, h: 1 }
  ]
};

export const DEFAULTS = {
  companyName: "Expertico OS AG",
  tone: "professional",
  currency: "CHF",
  brandVoice: "Architektonisch, Präzise, Schweizerisch",
  industry: "Digital & AI Agency"
};

export const INTEGRATIONS = [
  { id: 'cal', name: 'Cal.ai', provider: 'Cal.com', status: 'connected', description: 'KI-gestützte Terminplanung und Meeting-Management', emoji: '📅', type: 'Konfigurieren' },
  { id: '11labs', name: 'ElevenLabs', provider: 'ElevenLabs', status: 'not_configured', description: 'Text-to-Speech und Voice-Cloning', emoji: '🎙️', type: 'Konfigurieren' },
  { id: 'vapi', name: 'Vapi', provider: 'Vapi AI', status: 'connected', description: 'Voice AI für Telefongespräche', emoji: '☎️', type: 'Konfigurieren' },
  { id: 'n8n', name: 'N8N', provider: 'n8n.io', status: 'not_configured', description: 'Workflow-Automatisierung und Integration', emoji: '⚡', type: 'Konfigurieren' },
  { id: 'twilio', name: 'Twilio', provider: 'Twilio Inc.', status: 'connected', description: 'SMS, Voice und WhatsApp Business API', emoji: '💬', type: 'Konfigurieren' },
  { id: 'resend', name: 'Resend', provider: 'Resend Labs', status: 'connected', description: 'Moderner E-Mail-Versand für Entwickler', emoji: '📧', type: 'Konfigurieren' },
  { id: 'gmail', name: 'Gmail', provider: 'Google', status: 'connected', description: 'Google Mail Integration', emoji: '📮', type: 'Konfigurieren' },
  { id: 'gcal', name: 'Google Calendar', provider: 'Google', status: 'connected', description: 'Kalender-Synchronisation', emoji: '📆', type: 'Konfigurieren' },
  { id: 'msmail', name: 'Microsoft Mail', provider: 'Microsoft', status: 'not_configured', description: 'Outlook & Office 365 E-Mail Anbindung', emoji: '📧', type: 'Konfigurieren' },
  { id: 'mscal', name: 'Microsoft Calendar', provider: 'Microsoft', status: 'not_configured', description: 'Outlook Kalender Synchronisation', emoji: '📅', type: 'Konfigurieren' },
  { id: 'gcon', name: 'Google Console', provider: 'Google', status: 'not_configured', description: 'API & Entwickler-Konsole', emoji: '⚙️', type: 'Tool öffnen' },
  { id: 'gana', name: 'Google Analytics', provider: 'Google', status: 'not_configured', description: 'Website-Analyse und Tracking', emoji: '📊', type: 'Konfigurieren' }
];

export const INDUSTRY_TEMPLATES: Record<string, { label: string; channels: string }> = {
  b2b_saas: { label: 'B2B SaaS', channels: 'LinkedIn\nGoogle Ads\nEmail Marketing' },
  professional_services: { label: 'Pro Services', channels: 'LinkedIn\nContent\nReferrals' },
  real_estate: { label: 'Real Estate', channels: 'Google Search\nMeta Ads\nZillow' },
  healthcare: { label: 'Healthcare', channels: 'Local SEO\nPatient Referrals\nFacebook' }
};
