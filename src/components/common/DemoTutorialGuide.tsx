import React from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Globe,
  Server,
  Bot,
  Search,
  MessageSquare,
  Users,
  ShoppingBag,
  Layers,
  Zap,
  Play,
  RotateCcw,
} from "lucide-react";
import { ActiveTab } from "../../types";

export interface DemoStep {
  id: number;
  title: string;
  subtitle: string;
  tab: ActiveTab;
  badge: string;
  icon: any;
  description: string;
  keyFeatures: string[];
  syncExplanation: string;
  actionHint: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: "AI Executive Brain & Business Intelligence",
    subtitle: "Step 1 of 8 • Core Engine",
    tab: "business-manager",
    badge: "AI Brain",
    icon: Bot,
    description:
      "Your autonomous AI Business Manager analyzes your market niche, target customers, and competitive advantage to direct all downstream marketing, websites, and campaigns.",
    keyFeatures: [
      "Auto-generated SWOT and growth levers tailored to your city & country",
      "Multi-agent delegation (Copywriting, SEO, Ads, WhatsApp)",
      "Continuous business strategy adjustments based on live performance",
    ],
    syncExplanation:
      "🔄 Synced: The business intelligence defined here auto-populates your domain suggestions, website copy, ad campaigns, and SEO keywords.",
    actionHint: "Ask the AI Brain for a customized growth strategy or click 'Next' to view your Domain Registrar.",
  },
  {
    id: 2,
    title: "Domain Registrar & Anycast DNS",
    subtitle: "Step 2 of 8 • Identity & Branding",
    tab: "domains",
    badge: "Registrar",
    icon: Globe,
    description:
      "Search, check availability, and register official .ng, .com.ng, .africa, and global .com domains with sub-50ms Anycast DNS propagation.",
    keyFeatures: [
      "Live NiRA & ICANN availability lookup across 20+ TLDs",
      "👑 Platform Owner 1-Click Free Registration Bypass (₦0 / $0)",
      "Instant DNS management (A, CNAME, MX, TXT, SPF, DKIM)",
    ],
    syncExplanation:
      "🔄 Synced: Registered domains immediately bind to your Cloud Hosting virtual hosts and SSL certificates.",
    actionHint: "Search for a domain name or test the '👑 Owner Free' button, then proceed to Cloud Hosting.",
  },
  {
    id: 3,
    title: "Edge Cloud Hosting & High-Frequency VPS",
    subtitle: "Step 3 of 8 • Infrastructure",
    tab: "hosting",
    badge: "99.99% Uptime",
    icon: Server,
    description:
      "Deploy full-stack websites, high-speed NVMe storage, MariaDB/PostgreSQL databases, and automated daily backup snapshots with 12 Tbps DDoS scrubbing.",
    keyFeatures: [
      "cPanel-style File Manager, SQL database manager, and Cron scheduler",
      "Free Let's Encrypt Wildcard SSL & HTTP/3 QUIC acceleration",
      "1-Click WordPress & staging environment deployments",
    ],
    syncExplanation:
      "🔄 Synced: Your website files, custom webmail inboxes, and SSL certificates are hosted right here with zero third-party lock-in.",
    actionHint: "Explore the live server gauges and file manager, then proceed to the AI Website Builder.",
  },
  {
    id: 4,
    title: "Multi-Page AI Website & Rich Blog Engine",
    subtitle: "Step 4 of 8 • Online Presence",
    tab: "website-builder",
    badge: "Multi-Page & Blog",
    icon: Layers,
    description:
      "Generate complete, responsive websites featuring Home, About Us, Services Catalog, Rich SEO Blog, Contact Us with Maps, and legal compliance pages.",
    keyFeatures: [
      "Multi-Page Navigation (Home, About, Services, SEO Blog, Contact, Terms)",
      "Interactive WhatsApp 1-click order buttons with pre-filled message quotes",
      "Desktop, Tablet, and Mobile live preview stages with 1-click HTML export",
    ],
    syncExplanation:
      "🔄 Synced: Leads who submit the contact form or click WhatsApp orders are instantly dispatched to your CRM Pipeline.",
    actionHint: "Switch between the Home, About, Catalog, and Blog pages in the preview, then check your SEO Studio.",
  },
  {
    id: 5,
    title: "SEO Studio & Google Search Dominance",
    subtitle: "Step 5 of 8 • Organic Traffic",
    tab: "seo",
    badge: "Google #1",
    icon: Search,
    description:
      "Dominate local Google search results with automated Schema.org JSON-LD structured data, meta titles, LSI keyword clusters, and sitemap.xml generators.",
    keyFeatures: [
      "Live Google Search Result Card preview (Desktop & Mobile)",
      "Schema.org LocalBusiness, Organization, and FAQPage structured markup",
      "Local keyword density matrix tailored to your city and target audience",
    ],
    syncExplanation:
      "🔄 Synced: SEO keywords and schema markup are embedded directly into your website's HTML headers for instant Google indexing.",
    actionHint: "Review your Google Snippet preview and SEO score, then move to WhatsApp Commerce.",
  },
  {
    id: 6,
    title: "WhatsApp Commerce Command Center",
    subtitle: "Step 6 of 8 • Conversions",
    tab: "whatsapp",
    badge: "Direct Sales",
    icon: MessageSquare,
    description:
      "Turn casual conversations into paid orders with automated WhatsApp reply flows, interactive product catalog cards, and broadcast campaigns.",
    keyFeatures: [
      "Interactive WhatsApp simulation with automated instant replies",
      "Broadcast templates for promotional offers and flash discounts",
      "1-Click Paystack payment link generation inside WhatsApp chats",
    ],
    syncExplanation:
      "🔄 Synced: WhatsApp inquiries create real-time lead records in the CRM and trigger automated follow-up sequences.",
    actionHint: "Test the interactive WhatsApp chat simulator, then proceed to the CRM Pipeline.",
  },
  {
    id: 7,
    title: "CRM Pipeline & Deal Flow",
    subtitle: "Step 7 of 8 • Customer Management",
    tab: "crm",
    badge: "Deal Flow",
    icon: Users,
    description:
      "Track every prospective client from initial website inquiry to paid customer across visual Kanban stages with deal value tracking.",
    keyFeatures: [
      "Kanban board (New Lead, Contacted, Qualified, Proposal, Customer)",
      "Automated lead capture from website forms and WhatsApp chats",
      "Direct action buttons to call, email, or chat with prospects",
    ],
    syncExplanation:
      "🔄 Synced: When deals move to 'Customer', revenue is automatically added to your Business Analytics and Paystack sales ledger.",
    actionHint: "Drag and drop lead cards across stages, then proceed to the Sales & Paystack billing studio.",
  },
  {
    id: 8,
    title: "Paystack Payments & Business Analytics",
    subtitle: "Step 8 of 8 • Revenue & Scaling",
    tab: "sales",
    badge: "Revenue",
    icon: ShoppingBag,
    description:
      "Collect customer payments in Naira (₦) or USD via Paystack & Flutterwave, generate VAT invoices, and monitor profit margins and recurring revenue.",
    keyFeatures: [
      "Paystack & Flutterwave checkout link generator with instant verification",
      "Real-time revenue, customer acquisition cost, and margin analytics",
      "Exportable transaction receipts and formal PDF corporate invoices",
    ],
    syncExplanation:
      "🔄 Synced: Completed payments update customer records, refresh revenue charts, and trigger thank-you WhatsApp notifications.",
    actionHint: "You've completed the tour! You now understand how all 8 systems work together in harmony.",
  },
];

interface Props {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DemoTutorialGuide: React.FC<Props> = ({
  activeTab,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];
  const Icon = currentStep.icon;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === DEMO_STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onNavigate(DEMO_STEPS[nextIndex].tab);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      onNavigate(DEMO_STEPS[prevIndex].tab);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    onNavigate(DEMO_STEPS[index].tab);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-6 relative overflow-hidden flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {currentStep.subtitle}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {currentStep.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between gap-1 overflow-x-auto">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleJumpToStep(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition whitespace-nowrap ${
                idx === currentStepIndex
                  ? "bg-slate-900 text-white shadow-xs"
                  : idx < currentStepIndex
                  ? "bg-emerald-100 text-emerald-800"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Step {s.id}</span>
              {idx < currentStepIndex && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
            </button>
          ))}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
          <p className="text-sm text-slate-600 leading-relaxed">
            {currentStep.description}
          </p>

          {/* Key Features */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Capabilities in this Module
            </h4>
            <div className="space-y-1.5">
              {currentStep.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time System Synchronization */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs font-semibold text-emerald-900">
            {currentStep.syncExplanation}
          </div>

          {/* User Action Suggestion */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600 shrink-0" />
            <span><strong>Try it out:</strong> {currentStep.actionHint}</span>
          </div>
        </div>

        {/* Modal Footer with Navigation Buttons */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-xs font-bold text-slate-500">
            {currentStepIndex + 1} / {DEMO_STEPS.length}
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
          >
            <span>{isLast ? "Complete Tutorial & Start" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
