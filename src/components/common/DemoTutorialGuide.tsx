import React, { useState } from "react";
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
  Clock,
  RefreshCw,
  Terminal,
  Copy,
  GitBranch,
  ExternalLink,
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
  codeSnippet?: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: "AI Executive Brain & Business Intelligence",
    subtitle: "Step 1 of 15 • Core Strategy",
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
      "💰 Monetization Formula: Clarify your high-margin irresistible offer. If you are selling a product or guide at ₦15,000 ($25) or consulting at ₦250,000 ($400), the AI Brain identifies exactly which audience pain points trigger immediate buying decisions.",
    actionHint: "Ask the AI Brain for a customized growth strategy or click 'Next' to view your Domain Registrar.",
  },
  {
    id: 2,
    title: "Domain Registrar & Anycast DNS",
    subtitle: "Step 2 of 15 • Identity & Trust",
    tab: "domains",
    badge: "Registrar",
    icon: Globe,
    description:
      "Search, check availability, and register official .ng, .com.ng, .africa, and global .com domains with sub-50ms Anycast DNS propagation.",
    keyFeatures: [
      "Live NiRA & ICANN availability lookup across 20+ TLDs",
      "👑 Platform Owner 1-Click Free Registration Bypass (₦0 / $0)",
      "Instant DNS management (A, CNAME, MX, TXT, SPF, DKIM)",
      "1-Click 'Set as Primary Domain' binding across Webmail, Hosting, and Email Broadcaster",
    ],
    syncExplanation:
      "🔄 Synced: Registered domains immediately bind to your Cloud Hosting virtual hosts, SSL certificates, custom professional webmail, and outbound email sender.",
    profitStrategy:
      "💰 Monetization Formula: Having your own branded domain builds 10x more trust than a generic link. You can also register and flip high-value local domains or bundle custom domain setups for client retainer fees.",
    actionHint: "Search for a domain name or test the '👑 Owner Free' button, then proceed to Cloud Hosting.",
  },
  {
    id: 3,
    title: "Edge Cloud Hosting & High-Frequency VPS",
    subtitle: "Step 3 of 15 • Infrastructure",
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
    subtitle: "Step 4 of 15 • Online Storefront",
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
    subtitle: "Step 5 of 15 • Organic Traffic",
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
      "💰 Monetization Formula: Generate free recurring inbound organic buyers from Google search without spending millions on PPC ads. High-intent queries bring pre-qualified buyers directly to your offer.",
    actionHint: "Review your Google Snippet preview and SEO score, then move to Omni-Channel Social Scout.",
  },
  {
    id: 6,
    title: "Omni-Channel Social Scout (Pain-Point Extraction)",
    subtitle: "Step 6 of 15 • Lead Acquisition",
    tab: "prospect-intelligence",
    badge: "100k Leads",
    icon: Target,
    description:
      "Scrape and scout pre-qualified business leads, corporate decision-makers, and active buyers across LinkedIn, X (Twitter), Instagram, TikTok, YouTube, and Google Maps with automatic pain-point extraction.",
    keyFeatures: [
      "Omni-Channel filters: Platform, Country, Profession, Buying Power, Intent",
      "Automatic Pain-Point Extraction: Identifies burnout, high acquisition cost, pipeline inconsistency, or operational bottlenecks per lead",
      "Real-time contact extraction: Verified email addresses, phones, and social handles",
      "1-Click Vault Ingestion and instant sync to CRM and WhatsApp queues",
    ],
    syncExplanation:
      "🔄 Synced: Every scouted batch automatically creates dynamic segments and feeds directly into your Bulk Email Broadcaster, CRM Pipeline, and 7-Day Follow-Up Engine.",
    profitStrategy:
      "💰 Monetization Formula: Stop waiting for customers to find you. Scrape 10,000 verified leads in your target demographic (e.g. stressed executives, startup founders, or corporate HR directors) in minutes for $0 in ad spend.",
    actionHint: "Filter by Profession (e.g. Tech Founders, Doctors, Brokers), scrape a batch of leads, and click 'Bulk Email Broadcast'.",
  },
  {
    id: 7,
    title: "AI Prospect Intelligence & Persona Segmentation",
    subtitle: "Step 7 of 15 • Smart Targeting",
    tab: "prospect-intelligence",
    badge: "AI Personas",
    icon: Sparkles,
    description:
      "Segment audiences across both Profession (Founders, C-Suite, Healthcare, Real Estate, Importers) and Psychological Persona (Skeptical Pragmatist, Urgent Problem Solver, Analytical ROI, High Achiever).",
    keyFeatures: [
      "Psychological Persona Detection: Identifies whether buyer needs proof/escrow, rapid 72-hr relief, ROI statistics, or VIP status",
      "Purchasing power tiering (Tier-1 Enterprise, SMB, Mid-Market)",
      "Dynamic segment generator for precision targeted messaging",
    ],
    syncExplanation:
      "🔄 Synced: Matched prospect segments ensure that when you launch a campaign, the pitch addresses the exact problem that prospect is experiencing.",
    profitStrategy:
      "💰 Monetization Formula: Cold outreach response rates jump from 1% to 15%+ when the prospect feels you read their mind. Pitching specifically to leaders classified under 'Chronic Burnout' or 'High Acquisition Costs' yields maximum conversions.",
    actionHint: "View the AI Product Matcher to see how prospects are mapped to specific offers.",
  },
  {
    id: 8,
    title: "White-Label Bulk Email Broadcaster (Up to 100k)",
    subtitle: "Step 8 of 15 • Scale Outreach",
    tab: "email-broadcaster",
    badge: "100k Inboxes",
    icon: Mail,
    description:
      "High-throughput dispatch engine capable of sending up to 100,000 emails per campaign with 100% White-Label custom sender identity (e.g. from your own brand domain, zero BizPilot branding).",
    keyFeatures: [
      "100% White-Label Custom Sender Name & Email (e.g., hello@yourbrand.com)",
      "Direct integration with Amazon SES, Resend API, or your private Webmail SMTP",
      "👑 Platform Owner 100% Free Dispatch Bypass ($0 / ₦0 provider fee waived)",
      "High-concurrency parallel worker queues with RFC 8058 spam compliance",
    ],
    syncExplanation:
      "🔄 Synced: Direct integration with your Scraped Social Leads, dynamic AI segments, and CRM lead databases.",
    profitStrategy:
      "💰 Monetization Formula: Send 10,000 customized cold emails directly promoting your ebook or services. At a modest 1.5% conversion on a ₦15,000 ($25) guide, 150 buyers generate ₦2,250,000 ($3,750) in pure, immediate profit with $0 outbound delivery costs.",
    actionHint: "Select 'My Own Business / Product Brand', apply your product preset, and test an instant preview.",
  },
  {
    id: 9,
    title: "7-Day Autonomous Non-Buyer Follow-Up Sequence",
    subtitle: "Step 9 of 15 • Drip Automation",
    tab: "email-broadcaster",
    badge: "7-Day Drip",
    icon: Clock,
    description:
      "Automatically nurture prospects who receive an email or visit your page but do not buy within 24 hours. A 5-milestone drip over 168 hours tailored to their career and psychological persona.",
    keyFeatures: [
      "Day 1 (24h): Empathy & Deep Pain-Point Hook without hard selling",
      "Day 2 (48h): Case Study, Social Proof, and peer transformation",
      "Day 4 (96h): Skepticism & Objection Crusher with 1-click WhatsApp concierge chat",
      "Day 6 (144h): Urgent 24-hour Fast-Action Bonus & Scarcity incentive",
      "Day 7 (168h): Final Opportunity & polite closure notice",
      "🛡️ Smart Reputational Protection: Stops automatically the second a prospect pays on Paystack or in CRM",
    ],
    syncExplanation:
      "🔄 Synced: Directly monitored by Paystack checkout webhooks, CRM deal stages, and smart invoicing statuses.",
    profitStrategy:
      "💰 Monetization Formula: 80% of sales happen after the first email. An automated 7-day follow-up recovers 3x to 5x more abandoned carts and non-buyers on autopilot.",
    actionHint: "Click the '7-Day Nurture & Non-Buyer Sequences' tab in Email Broadcaster and toggle 'Sequence: RUNNING'.",
  },
  {
    id: 10,
    title: "WhatsApp Commerce & Outreach Queue",
    subtitle: "Step 10 of 15 • Instant Closing",
    tab: "whatsapp",
    badge: "98% Open Rate",
    icon: MessageSquare,
    description:
      "Turn conversations into immediate cash with automated WhatsApp reply flows, interactive product catalog cards, and 1-click Paystack payment links inside chats.",
    keyFeatures: [
      "Lead Outreach Queue with 1-click personalized WhatsApp opening hooks (wa.me/phone?text=...)",
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
    id: 11,
    title: "CRM Pipeline & Deal Flow Automation",
    subtitle: "Step 11 of 15 • Sales Pipeline",
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
      "💰 Monetization Formula: A systematic CRM prevents lost leads, allowing you to consistently close ₦500,000 to ₦5,000,000+ corporate retainers and bulk orders.",
    actionHint: "Drag and drop lead cards across stages to see pipeline value update automatically.",
  },
  {
    id: 12,
    title: "Smart Invoicing & 100% Escrow Protection",
    subtitle: "Step 12 of 15 • Corporate Billing",
    tab: "smart-invoicing",
    badge: "Escrow & VAT",
    icon: FileText,
    description:
      "Issue formal corporate PDF invoices with automated 7.5% VAT calculations, milestone billing schedules, and 100% Escrow buyer protection that builds instant trust.",
    keyFeatures: [
      "1-Click CRM Lead Auto-Fill (select any lead to populate name, email, phone, and deal value)",
      "Automatic CRM Sync: Invoicing a lead advances them to 'Proposal' in your sales pipeline",
      "Escrow release controls (funds held safely until milestones are approved)",
      "1-Click PDF invoice download and instant WhatsApp share link",
    ],
    syncExplanation:
      "🔄 Synced: Invoices can be dispatched directly to your scouted CRM leads, updating deal values and payment statuses in real time.",
    profitStrategy:
      "💰 Monetization Formula: Corporate B2B clients and high-net-worth customers will not pay into random personal accounts. Formal VAT invoices with escrow protection enable you to charge premium rates without hesitation.",
    actionHint: "Click '+ New Invoice', select a CRM lead from the dropdown, and click 'Create & Sync CRM'.",
  },
  {
    id: 13,
    title: "Paystack Payments & Business Analytics",
    subtitle: "Step 13 of 15 • Revenue & Profit",
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
      "💰 Monetization Formula: The complete flywheel: Scrape leads -> Broadcast white-label email -> Run 7-day follow-up -> Close on WhatsApp / Landing Page -> Collect via Paystack -> Reinvest profits.",
    actionHint: "Inspect your revenue metrics and checkout links in the Sales Studio.",
  },
  {
    id: 14,
    title: "Universal Ecosystem Data Bus & 1-Click Master Sync",
    subtitle: "Step 14 of 15 • Data Hub",
    tab: "dashboard",
    badge: "Universal Sync",
    icon: RefreshCw,
    description:
      "The central nervous system of BizPilot OS. The Universal Data Bus connects all 8 subsystem engines so changes in one module instantly propagate to all others.",
    keyFeatures: [
      "Live 'Data Bus Synced' pulse indicator in the top navigation header",
      "1-Click '⚡ Sync Everything Now' master orchestrator (Cmd+K shortcut)",
      "Cross-module event listeners: LeadSync, DomainSync, InvoiceSync, and SystemSync",
      "Reconciles CRM pipeline value, invoice numbers, domain bindings, and scouted vaults simultaneously",
    ],
    syncExplanation:
      "🔄 Synced: When you set a primary domain, create an invoice, or scout new leads, the Data Bus ensures zero stale data across all views.",
    profitStrategy:
      "💰 Monetization Formula: Saves 15+ hours per week of manual data entry, prevents lost sales, and ensures your team always sees accurate pipeline numbers.",
    actionHint: "Click the green 'Data Bus Synced' button in the top bar to inspect your system's live health.",
  },
  {
    id: 15,
    title: "Production Deployment: GitHub & Vercel Guide",
    subtitle: "Step 15 of 15 • Going Live",
    tab: "integrations",
    badge: "Deploy Guide",
    icon: Terminal,
    description:
      "Complete step-by-step code and instructions to initialize Git, push this repository to GitHub, and deploy live to Vercel in under 2 minutes.",
    keyFeatures: [
      "Vite SPA pre-configured with vercel.json rewrite rules",
      "Ready for custom domain binding (e.g., yourname.com) on Vercel",
      "Environment variable setup for live Paystack & Resend API keys",
    ],
    syncExplanation:
      "🔄 Synced: Once deployed to Vercel, your live URL works seamlessly on desktop and mobile with instant HTTPS SSL certificates.",
    profitStrategy:
      "💰 Monetization Formula: Deploy your live app, attach your custom domain, connect Paystack keys, and start onboarding paying clients immediately.",
    actionHint: "Copy the terminal commands below to push to GitHub and deploy to Vercel!",
    codeSnippet: `# ========================================================
# 1. INITIALIZE LOCAL GIT REPOSITORY
# ========================================================
git init
git add .
git commit -m "feat: complete BizPilot OS with Universal Data Bus & 7-Day Follow-Up Engine"

# ========================================================
# 2. CREATE A REPO ON GITHUB AND PUSH
# ========================================================
# Create a repository on https://github.com/new (e.g., "bizpilot-os")
# Then run:
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/bizpilot-os.git
git push -u origin main

# ========================================================
# 3. DEPLOY TO VERCEL (EASIEST METHOD: DASHBOARD)
# ========================================================
# 1. Go to https://vercel.com/new
# 2. Click "Import" next to your "bizpilot-os" repository
# 3. Framework Preset: Vite
# 4. Build Command: vite build
# 5. Output Directory: dist
# 6. Click "Deploy" (Your app will be live in ~45 seconds!)

# ========================================================
# OR DEPLOY DIRECTLY VIA VERCEL CLI:
# ========================================================
npm i -g vercel
vercel login
vercel --prod`,
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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

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

  const handleCopyCode = () => {
    if (currentStep.codeSnippet) {
      navigator.clipboard.writeText(currentStep.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 3000);
    }
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
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-1.5 overflow-x-auto scrollbar-none">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleJumpToStep(idx)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition whitespace-nowrap shrink-0 ${
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

          {/* Code Snippet (When Available) */}
          {currentStep.codeSnippet && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-md">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Deploy Commands</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSnippet ? "✓ Copied!" : "Copy Commands"}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre">
                {currentStep.codeSnippet}
              </pre>
            </div>
          )}

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
