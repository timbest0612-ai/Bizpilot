import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Bot,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingUp,
  Target,
  BarChart3,
  Layers,
  ChevronRight,
  Code2,
  Users,
  Compass,
  CreditCard,
  Building2,
  Search,
  Megaphone,
  FileText,
  ShoppingBag,
  Palette,
} from "lucide-react";
import { CurrencyCode } from "../../types";
import { CURRENCIES } from "../../data/initialData";

interface Props {
  onStartFree: () => void;
  onSelectNicheDemo: (nichePrompt: string) => void;
  activeCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
}

export const LandingPage: React.FC<Props> = ({
  onStartFree,
  onSelectNicheDemo,
  activeCurrency,
  onCurrencyChange,
}) => {
  const [demoInput, setDemoInput] = useState("Corporate catering and gourmet meal boxes in Lagos");
  const [activeTabDemo, setActiveTabDemo] = useState<"website" | "marketing" | "whatsapp" | "leads">("website");
  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  const demoPresets = [
    { label: "🍲 Lagos Gourmet Catering", prompt: "Premium corporate catering and executive lunch boxes in Lagos & Abuja" },
    { label: "👗 Nairobi Fashion Brand", prompt: "Afro-modern luxury clothing and handmade apparel in Nairobi" },
    { label: "💻 Accra B2B SaaS Startup", prompt: "Automated payroll and compliance software for West African businesses" },
    { label: "🏡 Cape Town Real Estate", prompt: "High-yield luxury villa rentals and property management in Cape Town" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-emerald-100 px-4 py-2 text-xs text-center border-b border-emerald-800/50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          <strong>New:</strong> Autonomous AI Business Operating System with built-in Paystack, Flutterwave & WhatsApp automation.
        </span>
        <button
          onClick={onStartFree}
          className="ml-2 font-bold underline hover:text-white inline-flex items-center gap-1"
        >
          Try 14-Day Free Trial <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20">
            ⚡
          </div>
          <div>
            <span className="font-extrabold text-white text-xl tracking-tight">BizPilot OS</span>
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest block font-mono">
              AI Business Operating System
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#agents" className="hover:text-white transition-colors">AI Agents</a>
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <a href="#african-advantage" className="hover:text-white transition-colors">African Advantage</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency picker */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs">
            <Globe className="w-3 h-3 text-slate-400 mr-1" />
            <select
              value={activeCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onStartFree}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Launch Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Not just a website builder. A complete AI Business OS.</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Your AI Team for <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Building & Growing Your Business.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          From business idea to brand, domain, website, marketing campaigns, WhatsApp automation, leads, and sales — your autonomous AI business team handles the digital execution.
        </p>

        {/* Interactive Prompt Launcher */}
        <div className="mt-10 max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-2xl shadow-emerald-950/50 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="e.g., Nigerian catering business in Lagos, or B2B SaaS startup..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button
              onClick={() => {
                onSelectNicheDemo(demoInput);
                onStartFree();
              }}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all shrink-0"
            >
              <span>Build My Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-500 font-medium">Try instant presets:</span>
            {demoPresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setDemoInput(p.prompt)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>14-Day Full Access Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Paystack & Flutterwave Native</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp-First Commerce</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Coding or Design Skills Needed</span>
          </div>
        </div>
      </section>

      {/* The Core Shift: Why Traditional Builders Fail */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">
              The Fundamental Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Why Traditional Website Builders Leave You Stuck
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              A static website without an engine is like an empty shop. BizPilot OS combines your website with an autonomous AI team that actively drives growth.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-red-500/20 text-slate-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                  ✕
                </div>
                <h3 className="font-bold text-white text-lg">Traditional Builders (Wix, WordPress, Hostinger)</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0 font-bold">•</span>
                  <span>Give you an empty blank template with "Lorem Ipsum" and leave you alone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0 font-bold">•</span>
                  <span>Require 12 separate expensive SaaS tools (Mailchimp, Zapier, Canva, CRM, Buffer).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0 font-bold">•</span>
                  <span>Zero understanding of African payment friction (Paystack, MPesa, WhatsApp orders).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0 font-bold">•</span>
                  <span>No daily guidance on what to do today to generate revenue.</span>
                </li>
              </ul>
            </div>

            {/* The BizPilot OS Way */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-950 border border-emerald-500/40 text-slate-300 relative shadow-xl shadow-emerald-950/30">
              <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                The AI Business OS
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="font-bold text-white text-lg">BizPilot Autonomous OS</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Understands Your Business:</strong> Builds complete copy, brand positioning, and pricing tailored to your niche.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Full Digital Execution:</strong> Generates websites, SEO articles, social ads, and automated WhatsApp funnels in one place.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>African & Global Payments:</strong> Seamless Paystack, Flutterwave, Stripe & WhatsApp click-to-order built-in.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>AI Daily Business Coach:</strong> Prioritizes top daily tasks that actually make money today.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Specialized AI Agents */}
      <section id="agents" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">
            Autonomous Digital Workforce
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Meet Your 9 Specialized AI Business Agents
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            The AI Business Manager acts as your COO, coordinating these specialized agents automatically without requiring manual configuration.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Business Strategy Agent",
              icon: Compass,
              color: "from-blue-500 to-indigo-600",
              desc: "Analyzes markets, target customer pain points, competitor gaps, and formulates high-margin pricing.",
            },
            {
              title: "AI Website Builder Agent",
              icon: Globe,
              color: "from-emerald-500 to-teal-600",
              desc: "Generates modern responsive websites with persuasive copy, mobile-optimized layouts, and live lead forms.",
            },
            {
              title: "SEO Growth Agent",
              icon: Search,
              color: "from-amber-500 to-orange-600",
              desc: "Conducts full technical audits, high-intent local keyword research, Schema markup, and sitemaps.",
            },
            {
              title: "Multi-Channel Marketing Agent",
              icon: Megaphone,
              color: "from-rose-500 to-pink-600",
              desc: "Plans 30-day content calendars, Meta/Instagram carousel ads, and LinkedIn thought-leadership posts.",
            },
            {
              title: "AI Content Factory Agent",
              icon: FileText,
              color: "from-purple-500 to-violet-600",
              desc: "Drafts high-converting blog posts, YouTube scripts, eBooks, email newsletters, and exportable PDFs.",
            },
            {
              title: "Sales & Offer Agent",
              icon: ShoppingBag,
              color: "from-emerald-600 to-green-700",
              desc: "Crafts irresistible value stacks, abandoned cart recovery sequences, and Paystack payment links.",
            },
            {
              title: "Lead Generation Agent",
              icon: Target,
              color: "from-cyan-500 to-blue-600",
              desc: "Creates high-converting landing pages, lead magnets, interactive quizzes, and tracks visitor conversion.",
            },
            {
              title: "Brand Identity Agent",
              icon: Palette,
              color: "from-yellow-500 to-amber-600",
              desc: "Generates custom SVG logos, cohesive color palettes, typography rules, brand voices, and social bios.",
            },
            {
              title: "Business Analytics Agent",
              icon: BarChart3,
              color: "from-teal-500 to-emerald-600",
              desc: "Produces weekly narrative diagnostics explaining *why* traffic/revenue moved and actionable next steps.",
            },
          ].map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white shadow-md mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {agent.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* African Market Advantage Section */}
      <section id="african-advantage" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase font-mono">
                Engineered for High-Growth Emerging Markets
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
                Built For African Entrepreneurs & SMEs From Day One.
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Western SaaS platforms ignore local African realities like WhatsApp-first commerce, mobile-money (Paystack, Flutterwave, MPesa), bank transfers, and local trust signals. BizPilot OS bridges this natively.
              </p>

              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">WhatsApp-First Commerce</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Over 80% of business in Africa happens on WhatsApp. Generate automated WhatsApp catalog links, order notifications, and broadcast campaigns that convert directly in chat.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 font-bold shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Native Paystack & Flutterwave Integration</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Accept Nigerian Naira (₦), Kenyan Shillings (KSh), South African Rand (R), Ghanaian Cedis (GH₵), and USD via bank transfer, USSD, debit cards, and mobile money without writing a line of code.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Local Trust Signals & Local SEO</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Auto-generate CAC registration badges, local city schema markup (Lagos, Abuja, Nairobi, Accra, Johannesburg), and localized customer objection handlers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">bizpilot.os / live-lead-flow</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Simulator
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-emerald-400">1. Website Visitor Fills Form</span>
                    <span>Just now</span>
                  </div>
                  <p className="text-xs text-white mt-1 font-semibold">
                    "Dr. Chioma requested 50 VIP Lunch Boxes in Victoria Island"
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-medium text-blue-400">2. Automated WhatsApp Sent</span>
                    <p className="text-white mt-0.5 font-mono text-[11px]">
                      "Hello Dr. Chioma! Here is your instant PDF Menu + Paystack link"
                    </p>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">Delivered ✓✓</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-medium text-amber-400">3. Paystack Payment Confirmed</span>
                    <p className="text-white mt-0.5 font-semibold">
                      ₦350,000 recorded in CRM & Kitchen Ticket Triggered
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                    PAID
                  </span>
                </div>
              </div>

              <button
                onClick={onStartFree}
                className="w-full mt-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
              >
                Experience This Flow in Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Invest in Your AI Operating System
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every plan includes a 14-day full feature trial. No credit card required to start.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-4 gap-6">
          {[
            {
              tier: "FREE",
              badge: "Beginner",
              priceUsd: 0,
              priceNgn: "₦0",
              desc: "For exploring ideas & basic AI generations",
              features: [
                "100 AI Generation Credits",
                "Basic Business Profile",
                "1 Responsive Website",
                "Standard SEO Checklist",
                "Community Support",
              ],
              cta: "Start Free",
              popular: false,
            },
            {
              tier: "STARTER",
              badge: "Solopreneurs",
              priceUsd: 19,
              priceNgn: "₦18,500",
              desc: "Everything to launch your brand & website",
              features: [
                "1,500 AI Generation Credits",
                "Custom Domain Connection",
                "AI Website Builder & Visual Editor",
                "Brand Identity Kit & Logo SVG",
                "Paystack / Flutterwave Bridge",
                "Basic Lead Capture",
              ],
              cta: "Launch Starter",
              popular: false,
            },
            {
              tier: "PRO",
              badge: "Most Popular",
              priceUsd: 49,
              priceNgn: "₦47,500",
              desc: "Autonomous growth engine for active businesses",
              features: [
                "5,000 AI Generation Credits",
                "All 9 Specialized AI Agents",
                "WhatsApp-First Commerce Center",
                "Visual Automation Workflows",
                "Full CRM & Pipeline Tracker",
                "AI Weekly Business Diagnostic",
                "Priority Gemini 3.7 Engine",
              ],
              cta: "Start 14-Day Pro Trial",
              popular: true,
            },
            {
              tier: "AGENCY",
              badge: "Agencies & Teams",
              priceUsd: 129,
              priceNgn: "₦125,000",
              desc: "Manage multiple client businesses & brands",
              features: [
                "15,000 AI Generation Credits",
                "Unlimited Client Workspaces",
                "White-label Client Exports",
                "Custom API Model Key Integration",
                "Dedicated Account Manager",
                "1-on-1 Growth Strategy Call",
              ],
              cta: "Scale with Agency",
              popular: false,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? "bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/50 scale-105"
                  : "bg-slate-900/60 border border-slate-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-lg text-white">{plan.tier}</h3>
                  {!plan.popular && (
                    <span className="text-[11px] text-slate-400 font-mono">{plan.badge}</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 min-h-[36px]">{plan.desc}</p>

                <div className="mt-4 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      {activeCurrency === "NGN" ? plan.priceNgn : `$${plan.priceUsd}`}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                  {plan.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onStartFree}
                className={`w-full mt-8 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  plan.popular
                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-900/60 border-t border-slate-800 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Everything you need to know about BizPilot OS</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How is BizPilot OS different from WordPress or Squarespace?",
              a: "WordPress and Squarespace are traditional web hosting tools that only give you a blank website. BizPilot OS is an AI Business Operating System. It generates your brand identity, writes persuasive copy, plans your social media, connects WhatsApp automation, tracks leads in a built-in CRM, and provides a daily AI coach recommending high-revenue actions.",
            },
            {
              q: "Do I need coding, design, or technical experience?",
              a: "None at all. You describe what you want to sell, and BizPilot OS configures your website, marketing content, payment checkout, and SEO metadata automatically.",
            },
            {
              q: "Can I use Paystack and Flutterwave for payments?",
              a: "Yes! BizPilot OS natively supports Paystack and Flutterwave for Nigerian Naira (₦), Ghanaian Cedis (GH₵), Kenyan Shillings (KSh), and South African Rand (R), in addition to Stripe for international USD card processing.",
            },
            {
              q: "How does the 14-day free trial work?",
              a: "When you sign up, you receive immediate 14-day access to all Pro features with 5,000 AI generation credits. You can test your website, generate marketing campaigns, and connect WhatsApp workflows without upfront payment.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="font-bold text-white text-sm">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center max-w-5xl mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Launch & Grow Your Business with AI?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-4">
              Join thousands of creators, African SMEs, and founders who build with an autonomous AI team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartFree}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
              >
                Launch Your Business OS Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <p>© 2026 BizPilot OS. Autonomous AI Business Launch & Growth Platform. Built with Gemini AI.</p>
      </footer>
    </div>
  );
};
