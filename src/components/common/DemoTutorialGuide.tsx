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
  Mail,
  FileText,
  Target,
  Coins,
  ShieldCheck,
  TrendingUp,
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
  profitStrategy: string;
  actionHint: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: "AI Executive Brain & Business Intelligence",
    subtitle: "Step 1 of 12 • Core Strategy",
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
    profitStrategy:
      "💰 Monetization Formula: Clarify your high-margin irresistible offer. If you are selling an ebook like 'The Rest You Deserve' at ₦15,000 ($25) or consulting at ₦250,000 ($400), the AI Brain identifies exactly which audience pain points trigger immediate buying decisions.",
    actionHint: "Ask the AI Brain for a customized growth strategy or click 'Next' to view your Domain Registrar.",
  },
  {
    id: 2,
    title: "Domain Registrar & Anycast DNS",
    subtitle: "Step 2 of 12 • Identity & Trust",
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
      "🔄 Synced: Registered domains immediately bind to your Cloud Hosting virtual hosts, SSL certificates, and custom professional webmail.",
    profitStrategy:
      "💰 Monetization Formula: Having your own branded domain (e.g. therestyoudeserve.com) builds 10x more trust than a generic link. You can also register and flip high-value local domains or bundle custom domain setups for client retainer fees.",
    actionHint: "Search for a domain name or test the '👑 Owner Free' button, then proceed to Cloud Hosting.",
  },
  {
    id: 3,
    title: "Edge Cloud Hosting & High-Frequency VPS",
    subtitle: "Step 3 of 12 • Infrastructure",
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
      "🔄 Synced: Your website files, custom webmail inboxes, and SSL certificates are hosted right here with zero third-party monthly hosting fees.",
    profitStrategy:
      "💰 Monetization Formula: Eliminate expensive $30–$100/month hosting subscriptions on third-party servers. Host unlimited client landing pages, ebooks, and digital products on high-speed NVMe edge storage.",
    actionHint: "Explore the live server gauges and file manager, then proceed to the AI Website Builder.",
  },
  {
    id: 4,
    title: "Multi-Page AI Website & Funnel Engine",
    subtitle: "Step 4 of 12 • Online Storefront",
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
      "🔄 Synced: Leads who submit the contact form or click WhatsApp orders are instantly dispatched to your CRM Pipeline and WhatsApp queue.",
    profitStrategy:
      "💰 Monetization Formula: Launch a high-converting sales landing page for your ebook, digital course, or agency in under 60 seconds. Direct cold visitors into automated WhatsApp checkouts or Paystack payment links.",
    actionHint: "Switch between the Home, About, Catalog, and Blog pages in the preview, then check your SEO Studio.",
  },
  {
    id: 5,
    title: "SEO Studio & Google Search Dominance",
    subtitle: "Step 5 of 12 • Organic Traffic",
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
    profitStrategy:
      "💰 Monetization Formula: Generate free recurring inbound organic buyers from Google search without spending millions on PPC ads. High-intent queries (e.g. 'how to cure burnout in executives') bring pre-qualified buyers directly to your offer.",
    actionHint: "Review your Google Snippet preview and SEO score, then move to Omni-Channel Social Scout.",
  },
  {
    id: 6,
    title: "Omni-Channel Social Scout (100k Scraping)",
    subtitle: "Step 6 of 12 • Lead Acquisition",
    tab: "prospect-intelligence",
    badge: "100k Leads",
    icon: Target,
    description:
      "Scrape and scout up to 100,000 pre-qualified business leads, corporate decision-makers, and active buyers across TikTok, Instagram, LinkedIn, YouTube, X, Facebook, and niche forums.",
    keyFeatures: [
      "Omni-Channel filters: Platform, Country, Job Title, Buying Power, Intent",
      "Real-time contact extraction: Verified email addresses, phones, and social handles",
      "1-Click Vault Ingestion and instant sync to CRM and WhatsApp queues",
    ],
    syncExplanation:
      "🔄 Synced: Every scouted batch automatically creates dynamic segments and feeds directly into your Bulk Email Broadcaster and CRM Pipeline.",
    profitStrategy:
      "💰 Monetization Formula: Stop waiting for customers to find you. Scrape 10,000 verified leads in your target demographic (e.g. stressed executives, startup founders, or corporate HR directors) in minutes for $0 in ad spend.",
    actionHint: "Filter by Country or Job Title, scrape a batch of leads, and click 'Bulk Email Broadcast'.",
  },
  {
    id: 7,
    title: "AI Prospect Intelligence & Persona Matching",
    subtitle: "Step 7 of 12 • Smart Targeting",
    tab: "prospect-intelligence",
    badge: "AI Scoring",
    icon: Sparkles,
    description:
      "Autonomous AI classification engine that analyzes each prospect's primary pain points, estimated budget, urgency score, and matches them to your optimal product.",
    keyFeatures: [
      "Automated Persona detection (Executive Burnout, Cost Optimization, Scaling)",
      "Purchasing power tiering (Tier-1 Enterprise, SMB, Mid-Market)",
      "Dynamic segment generator for precision targeted messaging",
    ],
    syncExplanation:
      "🔄 Synced: Matched prospect segments ensure that when you launch a campaign, the pitch addresses the exact problem that prospect is experiencing.",
    profitStrategy:
      "💰 Monetization Formula: Cold outreach response rates jump from 1% to 15%+ when the prospect feels you read their mind. Pitching 'The Rest You Deserve' specifically to leaders classified under 'Chronic Burnout' yields maximum conversions.",
    actionHint: "View the AI Product Matcher to see how prospects are mapped to specific offers.",
  },
  {
    id: 8,
    title: "White-Label Bulk Email Broadcaster",
    subtitle: "Step 8 of 12 • Scale Outreach",
    tab: "email-broadcaster",
    badge: "100k Inboxes",
    icon: Mail,
    description:
      "High-throughput dispatch engine capable of sending up to 100,000 emails per campaign with 100% White-Label custom sender identity (e.g. from your own brand, not BizPilot).",
    keyFeatures: [
      "100% White-Label Custom Sender Name & Email (zero BizPilot branding)",
      "1-Click Presets for your Ebook, Catering, Agency, or Consulting products",
      "👑 Platform Owner 100% Free Dispatch Bypass ($0 / ₦0 provider fee waived)",
      "High-concurrency parallel worker queues with RFC 8058 spam compliance",
    ],
    syncExplanation:
      "🔄 Synced: Direct integration with your Scraped Social Leads, dynamic AI segments, and CRM lead databases.",
    profitStrategy:
      "💰 Monetization Formula: Send 10,000 customized cold emails directly promoting your ebook or services. At a modest 1.5% conversion on a ₦15,000 ($25) guide, 150 buyers generate ₦2,250,000 ($3,750) in pure, immediate profit with $0 outbound delivery costs.",
    actionHint: "Select 'My Own Business / Product Brand', apply 'The Rest You Deserve' preset, and test an instant preview.",
  },
  {
    id: 9,
    title: "WhatsApp Commerce & Outreach Queue",
    subtitle: "Step 9 of 12 • Instant Closing",
    tab: "whatsapp",
    badge: "98% Open Rate",
    icon: MessageSquare,
    description:
      "Turn conversations into immediate cash with automated WhatsApp reply flows, interactive product catalog cards, and 1-click Paystack payment links inside chats.",
    keyFeatures: [
      "Lead Outreach Queue with 1-click personalized WhatsApp opening hooks",
      "Interactive chat simulator with automated keyword triggers & product cards",
      "Instant Paystack payment link generation inside WhatsApp conversations",
    ],
    syncExplanation:
      "🔄 Synced: Prospects scouted in the Intelligence Suite or captured on your website flow straight into your WhatsApp outreach queue.",
    profitStrategy:
      "💰 Monetization Formula: WhatsApp boasts 98% open rates and 45%+ response rates in Nigeria and Africa. Reaching out directly to pre-scouted warm leads with a tailored hook closes deals 5x faster than email alone.",
    actionHint: "Open the WhatsApp Outreach Queue and click 'Send WhatsApp' on any prospect.",
  },
  {
    id: 10,
    title: "CRM Pipeline & Deal Flow Automation",
    subtitle: "Step 10 of 12 • Sales Pipeline",
    tab: "crm",
    badge: "Pipeline",
    icon: Users,
    description:
      "Track every prospective client from initial lead contact to paid customer across visual Kanban stages with automated revenue and deal size tracking.",
    keyFeatures: [
      "Kanban board (New Lead, Contacted, Qualified, Proposal, Customer)",
      "Universal synchronization with Social Scout, Website Forms, and Invoices",
      "Direct action buttons to call, email, or WhatsApp prospects",
    ],
    syncExplanation:
      "🔄 Synced: When a deal is moved to 'Customer', revenue is automatically added to your Business Analytics and Paystack sales ledger.",
    profitStrategy:
      "💰 Monetization Formula: 80% of sales are made between the 5th and 12th contact. A systematic CRM prevents lost leads, allowing you to consistently close ₦500,000 to ₦5,000,000+ corporate retainers.",
    actionHint: "Drag and drop lead cards across stages to see pipeline value update automatically.",
  },
  {
    id: 11,
    title: "Smart Invoicing & 100% Escrow Protection",
    subtitle: "Step 11 of 12 • Corporate Billing",
    tab: "smart-invoicing",
    badge: "Escrow & VAT",
    icon: FileText,
    description:
      "Issue formal corporate PDF invoices with automated 7.5% VAT calculations, milestone billing schedules, and 100% Escrow buyer protection that builds instant trust.",
    keyFeatures: [
      "1-Click PDF invoice generation and instant download",
      "Escrow release controls (Funds held safely until milestones are approved)",
      "Automatic CRM sync: Invoiced leads automatically advance to 'Proposal Sent'",
    ],
    syncExplanation:
      "🔄 Synced: Invoices can be dispatched directly to your scouted CRM leads, updating deal values and payment statuses in real time.",
    profitStrategy:
      "💰 Monetization Formula: Corporate B2B clients and high-net-worth customers will not pay into random personal accounts. Formal VAT invoices with escrow protection enable you to charge premium rates without hesitation.",
    actionHint: "Generate a corporate invoice for a client or inspect the Escrow security badges.",
  },
  {
    id: 12,
    title: "Paystack Payments & Business Analytics",
    subtitle: "Step 12 of 12 • Revenue & Profit",
    tab: "sales",
    badge: "Revenue Engine",
    icon: ShoppingBag,
    description:
      "Collect customer payments in Naira (₦) or USD via Paystack & Flutterwave, generate receipts, and monitor profit margins and recurring MRR.",
    keyFeatures: [
      "Paystack & Flutterwave checkout link generator with instant verification",
      "Real-time revenue, customer acquisition cost, and margin analytics",
      "Exportable transaction receipts and formal PDF corporate receipts",
    ],
    syncExplanation:
      "🔄 Synced: Completed payments update customer records, refresh revenue charts, and trigger automated digital downloads.",
    profitStrategy:
      "💰 Monetization Formula: The complete fly-wheel: Scrape leads -> Broadcast white-label email -> Close on WhatsApp / Landing Page -> Collect via Paystack -> Reinvest profits. You now have an autonomous profit machine.",
    actionHint: "You've completed the complete tutorial! You now hold the master blueprint to build and scale profitably.",
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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-6 relative overflow-hidden flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {currentStep.subtitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                  {currentStep.badge}
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
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-1.5 overflow-x-auto">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleJumpToStep(idx)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${
                idx === currentStepIndex
                  ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xs"
                  : idx < currentStepIndex
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <span>{s.id}. {s.badge}</span>
              {idx < currentStepIndex && <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
            </button>
          ))}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-800 dark:text-slate-200">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>

          {/* Key Features */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Core Capabilities in this Module
            </h4>
            <div className="space-y-1.5">
              {currentStep.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Make Money & Profit With this Feature */}
          {currentStep.profitStrategy && (
            <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
                <Coins className="w-4 h-4 text-amber-500 shrink-0" />
                <span>How to Make Money & Profit with this Feature</span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                {currentStep.profitStrategy}
              </p>
            </div>
          )}

          {/* Real-time System Synchronization */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-3.5 text-xs font-medium text-emerald-900 dark:text-emerald-200">
            {currentStep.syncExplanation}
          </div>

          {/* User Action Suggestion */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-3.5 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span><strong>Action Step:</strong> {currentStep.actionHint}</span>
          </div>
        </div>

        {/* Modal Footer with Navigation Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Step {currentStepIndex + 1} of {DEMO_STEPS.length}
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
          >
            <span>{isLast ? "Complete Tutorial & Start" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
