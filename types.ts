
export type UnitId = 'marketing' | 'finance' | 'strategic' | 'support' | 'sales';
export type MainModuleId = 'crm' | 'office' | 'projects' | 'agents' | 'contact_direct' | 'settings' | 'global';
export type CRMSubPageId = 'dashboard' | 'contacts' | 'identity' | 'insight' | 'solution' | 'delivery' | 'growth' | 'advocacy' | 'dialog_hub';
export type OfficeSubPageId = 'dashboard' | 'revenues' | 'expenses' | 'accounting' | 'drive' | 'email';
export type ProjectsSubPageId = 'dashboard' | 'projects' | 'calendar' | 'time';
export type AgentsSubPageId = 'dashboard' | 'units' | 'profile';

export interface UnitSettings {
  companyName: string;
  tone: string;
  currency: string;
  brandVoice: string;
  industry: string;
  productService?: string;
  monthlyBudget?: number;
  cacTarget?: number;
  salesCycleLength?: number;
  marketingStack?: string;
  icp?: string;
  coa?: string;
  apFlag?: number;
  minCushion?: number;
  goals?: string;
  avgDealSize?: number;
  supportHours?: string;
  slaFirstResponseMins?: number;
}

export type PageId = 'dashboard' | 'setup' | 'integrations' | 'save' | 'help' | 'crm_page' | 'agent_detail' | 'agents' | 'contact_page' | 'office_page' | 'projects_page';

export type ContactStatus = 
  | 'Neu' | 'Qualifiziert' | 'Recherche läuft' | 'Kontaktversuch' | 'Archiviert'
  | 'Analyse offen' | 'Persona erstellt' | 'Erstgespräch geführt' | 'Warm-Up' | 'Lost'
  | 'Bedarfsanalyse' | 'Lösungskonzept' | 'Offerte gesendet' | 'In Verhandlung' | 'Closing'
  | 'Anzahlung offen' | 'Onboarding' | 'Produktion' | 'Feedback-Schleife' | 'Projektabschluss'
  | 'Review-Anfrage' | 'Erfolgs-Story' | 'Cross-Selling-Check' | 'Full-Service' | 'Reaktivierung'
  | 'Ambassador-Check' | 'Einladung gesendet' | 'Aktiver Empfehler' | 'Partner-Status' | 'VIP-Ambassador';

export interface SocialProfile {
  platform: 'linkedin' | 'instagram' | 'facebook' | 'whatsapp' | 'tiktok' | 'telegram';
  url: string;
  username: string;
  isVerified: boolean;
  type: 'private' | 'business';
  avatar?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'agent' | 'client';
  platform: SocialProfile['platform'];
  text: string;
  timestamp: string;
}

export interface ContactRecord {
  id: string;
  type: 'business' | 'private';
  company?: string;
  name: string;
  firstName?: string;
  phone: string;
  email: string;
  website?: string;
  address?: string;
  zip?: string;
  city?: string;
  country?: string;
  industry?: string;
  googleStars?: number;
  webRating?: number;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
  };
  socialDiscovery?: SocialProfile[];
  segmentation?: string;
  milieu?: string; 
  source: string;
  status: ContactStatus;
  lastInteraction?: string;
  preferredChannel: SocialProfile['platform'] | 'email' | 'phone' | 'sms';
  kiPersona?: string;
  personalTouch?: string;
  checklistW5?: {
    istZustand: string;
    painPoints: string;
    goals: string;
    budget: string;
    decisionMaker: string;
  };
  testimonial?: string;
  referralLog?: string[];
  messages?: Message[];
}

export interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'ongoing' | 'review' | 'completed' | 'on-hold';
  budget: number;
  deadline: string;
  leadAgent: string;
  progress: number;
}

export interface InvoiceRecord {
  id: string;
  docId: string;
  invoiceNum: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientType: 'B2B' | 'B2C';
  clientUID?: string;
  amount: number;
  tax: number;
  total: number;
  date: string;
  dueDate: string;
  status: 'draft' | 'open' | 'paid' | 'overdue';
  project: string;
}

export interface Persona {
  id: string;
  unitId: UnitId;
  name: string;
  role: string;
  exp: string;
  think: string;
  icon: string;
  bio: string;
  modes: { id: string; label: string; help: string }[];
  checklist: string[];
}

export interface DashletData {
  id: string;
  unitId: UnitId;
  title: string;
  metric: string;
  trend: string;
  type: 'bar' | 'line' | 'pie' | 'radar' | 'funnel' | 'area' | 'gauge' | 'heatmap' | 'sankey' | 'sunburst' | 'candlestick' | 'treemap' | 'bubble' | 'dots' | 'wave' | 'hex' | 'pyramid' | 'ring' | 'spiral' | 'flow';
  color: string;
  agentName?: string;
  w?: number; 
  h?: number; 
}

export interface AutomationTask {
  id: string;
  unitId: UnitId;
  title: string;
  schedule: string;
  vevent: string;
  prompt: string;
}

export type Theme = 'light' | 'dark';
