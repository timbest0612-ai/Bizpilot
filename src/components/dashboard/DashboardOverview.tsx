import React from "react";
import {
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Globe,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Bot,
  Compass,
  Search,
  Megaphone,
  FileText,
  ShoppingBag,
  Palette,
  ExternalLink,
  Landmark,
  Boxes,
  Truck,
  FileCheck2,
  Eye,
  Lock,
} from "lucide-react";
import {
  BusinessProfile,
  Lead,
  DailyPriority,
  WebsiteData,
  ActiveTab,
  CurrencyCode,
} from "../../types";
import { CURRENCIES } from "../../data/initialData";

interface Props {
  profile: BusinessProfile;
  leads: Lead[];
  priorities: DailyPriority[];
  website: WebsiteData;
  activeCurrency: CurrencyCode;
  onNavigate: (tab: ActiveTab) => void;
  onTogglePriority: (id: string) => void;
  onAskAi: (prompt: string, agentName?: string) => void;
  onStartDemoTutorial?: () => void;
}

export const DashboardOverview: React.FC<Props> = ({
  profile,
  leads,
  priorities,
  website,
  activeCurrency,
  onNavigate,
  onTogglePriority,
  onAskAi,
  onStartDemoTutorial,
}) => {
  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  // Calculate live dynamic metrics from leads
  const totalRevenue = leads
    .filter((l) => l.stage === "CUSTOMER" || l.stage === "REPEAT CUSTOMER")
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const convertedLeads = leads.filter(
    (l) => l.stage === "CUSTOMER" || l.stage === "REPEAT CUSTOMER"
  ).length;
  const totalLeadsCount = leads.length;
  const conversionRate = totalLeadsCount > 0 ? Math.round((convertedLeads / totalLeadsCount) * 100) : 18;

  // Currency formatter
  const formatMoney = (amount: number) => {
    if (activeCurrency === "NGN") {
      return `₦${amount.toLocaleString()}`;
    }
    const converted = amount / 1550;
    return `${curr.symbol}${converted < 10 ? converted.toFixed(2) : Math.round(converted).toLocaleString()}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Intelligence Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Business OS Active • {profile.country} Edition</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {profile.name || "My Business"} Operating Cockpit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Targeting <strong className="text-white">{profile.targetCustomer}</strong> in{" "}
              <strong className="text-white">{profile.city}</strong> with primary goal:{" "}
              <span className="text-emerald-400 font-semibold">{profile.mainGoal}</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onStartDemoTutorial && (
              <button
                onClick={onStartDemoTutorial}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>▶ Start Demo Tutorial</span>
              </button>
            )}
            <button
              onClick={() => onNavigate("business-manager")}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Co-Founder</span>
            </button>
            <button
              onClick={() => onNavigate("launch-wizard")}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Launch Wizard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guided Walkthrough Quick Launcher Banner */}
      {onStartDemoTutorial && (
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  Interactive System Tour
                </span>
                <span className="text-xs text-slate-400">8 Synced Steps</span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-0.5">
                New to BizPilot OS? Take the 8-Step Synchronized Walkthrough
              </h3>
              <p className="text-xs text-slate-300 max-w-xl mt-0.5">
                Learn how AI Strategy, Domains, Cloud Hosting, Multi-Page Websites, SEO, WhatsApp Commerce, CRM, and Paystack work seamlessly together.
              </p>
            </div>
          </div>

          <button
            onClick={onStartDemoTutorial}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition shrink-0 shadow-md"
          >
            <span>Start Interactive Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              {curr.symbol}
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatMoney(totalRevenue > 0 ? totalRevenue : 4580000)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.8% this month</span>
          </div>
        </div>

        {/* Metric 2: Leads & Conversion */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              CRM Leads / Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {totalLeadsCount} Leads
            </span>
            <span className="text-xs font-bold text-slate-500">
              ({conversionRate}% conv.)
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>{convertedLeads} Paying Customers</span>
          </div>
        </div>

        {/* Metric 3: Website Traffic */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Website Visitors
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              3,840
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>68% Mobile Traffic</span>
            <button
              onClick={() => onNavigate("website-builder")}
              className="text-emerald-600 font-bold hover:underline"
            >
              View Site →
            </button>
          </div>
        </div>

        {/* Metric 4: SEO Health Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              SEO Health Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              88
            </span>
            <span className="text-xs font-bold text-slate-400">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>Local Schema & Sitemap OK</span>
          </div>
        </div>
      </div>

      {/* AI Weekly Diagnostic & Recommendations Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 rounded-3xl p-6 sm:p-7 relative shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                  AI Weekly Diagnostic Report
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-semibold">
                  Fresh Analysis
                </span>
              </div>
              <span className="text-xs text-slate-500">Updated today</span>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              "Your business generated <strong className="text-slate-950">1,240 visitors</strong> this week, but your pricing page has a <strong className="text-rose-700">14% exit rate drop-off</strong>. For clients in <span className="text-emerald-900 font-semibold">{profile.city}</span>, adding an instant <strong>'Order via WhatsApp'</strong> button and showcasing client testimonials will recover an estimated 8-12 corporate deals this week."
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  onAskAi(
                    `Implement the recommended high-conversion WhatsApp CTA and social proof for our website pricing page to reduce drop-off.`,
                    "Website Agent"
                  )
                }
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>Execute Recommendation (1-Click)</span>
              </button>

              <button
                onClick={() => onNavigate("analytics")}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                View Full Diagnostic Metrics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Operational Gap Engines Grid (CAC, Omni-Inventory, Logistics, Invoicing, Spy) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Connected Commerce & Operations Matrix
            </h2>
          </div>
          <span className="text-xs text-slate-500">5 Automated Gap Engines Active</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Engine 1: CAC Compliance */}
          <div
            onClick={() => onNavigate("cac-compliance")}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Legal & CAC Hub
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">RC-7491024 • TIN & SCUML</div>
            </div>
          </div>

          {/* Engine 2: Omni-Inventory & POS */}
          <div
            onClick={() => onNavigate("omni-inventory")}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Boxes className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                4 CHANNELS
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Omni-Inventory & POS
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Physical Barcode & Web Sync</div>
            </div>
          </div>

          {/* Engine 3: Multi-Carrier Logistics */}
          <div
            onClick={() => onNavigate("logistics")}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Truck className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                2 DISPATCHES
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Logistics & Dispatch
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">GIGL • Topship • Kwik GPS</div>
            </div>
          </div>

          {/* Engine 4: Smart Invoicing & Escrow */}
          <div
            onClick={() => onNavigate("smart-invoicing")}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                ESCROW SAFE
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Smart Invoicing
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Milestone Trust & Chasers</div>
            </div>
          </div>

          {/* Engine 5: Competitor Price Spy */}
          <div
            onClick={() => onNavigate("competitor-spy")}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                LIVE SPY
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                Competitor Price Spy
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Jumia, Konga & TikTok Hooks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Priorities + 9 Sub-Agents */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Priorities & Action Engine */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Today's Priorities</h2>
                  <p className="text-xs text-slate-500">
                    Highest-revenue actions prioritized by your AI Business Manager
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate("daily-coach")}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {priorities.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    p.completed
                      ? "bg-slate-50 border-slate-200 opacity-60"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={p.completed}
                        onChange={() => onTogglePriority(p.id)}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-xs sm:text-sm font-bold ${
                              p.completed ? "line-through text-slate-500" : "text-slate-900"
                            }`}
                          >
                            {p.title}
                          </h3>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                              p.impact === "Critical"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : p.impact === "High Revenue"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            {p.impact}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    {!p.completed && (
                      <button
                        onClick={() => onAskAi(p.actionPrompt, p.agent)}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200 transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Execute with AI</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CRM Quick Pipeline Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-700" />
                <h2 className="font-bold text-slate-900 text-base">Recent Active Deals & Leads</h2>
              </div>
              <button
                onClick={() => onNavigate("crm")}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                Open CRM Kanban →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 uppercase font-semibold">
                    <th className="pb-2">Lead Name</th>
                    <th className="pb-2">Deal Value</th>
                    <th className="pb-2">Source</th>
                    <th className="pb-2">Stage</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.slice(0, 4).map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-bold text-slate-900">
                        {l.name}
                        <span className="block font-normal text-slate-500 text-[11px]">
                          {l.phone}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono font-semibold text-slate-800">
                        {formatMoney(l.dealValue)}
                      </td>
                      <td className="py-2.5 text-slate-600">{l.source}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {l.stage}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                            l.name
                          )}!%20Following%20up%20from%20${encodeURIComponent(profile.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2 py-1 rounded"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: AI Sub-Agent Quick Dispatch Grid */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h2 className="font-bold text-white text-base">Specialized AI Agents</h2>
                <p className="text-xs text-slate-400">Click any agent to launch</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Gemini 3.7
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: "Website Agent", icon: Globe, tab: "website-builder" as ActiveTab, color: "text-emerald-400" },
                { name: "SEO Agent", icon: Search, tab: "seo" as ActiveTab, color: "text-amber-400" },
                { name: "Marketing Agent", icon: Megaphone, tab: "marketing" as ActiveTab, color: "text-rose-400" },
                { name: "Content Factory", icon: FileText, tab: "content-factory" as ActiveTab, color: "text-purple-400" },
                { name: "Sales Agent", icon: ShoppingBag, tab: "sales" as ActiveTab, color: "text-blue-400" },
                { name: "WhatsApp Command", icon: MessageSquare, tab: "whatsapp" as ActiveTab, color: "text-green-400" },
                { name: "Brand Agent", icon: Palette, tab: "branding" as ActiveTab, color: "text-yellow-400" },
                { name: "Analytics Agent", icon: BarChart3, tab: "analytics" as ActiveTab, color: "text-cyan-400" },
              ].map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <button
                    key={i}
                    onClick={() => onNavigate(agent.tab)}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-left transition-all hover:bg-slate-800/80 group"
                  >
                    <Icon className={`w-4 h-4 ${agent.color} mb-1.5 group-hover:scale-110 transition-transform`} />
                    <span className="block text-xs font-bold text-slate-200 group-hover:text-white truncate">
                      {agent.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => onNavigate("business-manager")}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span>Talk to Business Manager</span>
              </button>
            </div>
          </div>

          {/* Business Profile Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">
              Business Intelligence Overview
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Industry:</span>
                <span className="font-semibold text-slate-900">{profile.businessModel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Country / City:</span>
                <span className="font-semibold text-slate-900">
                  {profile.country} ({profile.city})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Currency:</span>
                <span className="font-semibold text-slate-900">
                  {curr.symbol} ({profile.currency})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">WhatsApp Channel:</span>
                <span className="font-semibold text-emerald-700 font-mono">
                  {profile.whatsappNumber}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate("branding")}
              className="w-full mt-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Edit Brand Identity & Colors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
