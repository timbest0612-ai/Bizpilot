import React, { useState, useEffect } from "react";
import {
  Zap,
  RefreshCw,
  CheckCircle2,
  X,
  Globe,
  Server,
  Layers,
  Target,
  Users,
  Mail,
  MessageSquare,
  FileText,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Link2,
} from "lucide-react";
import { ActiveTab, BusinessProfile, CurrencyCode, Lead } from "../../types";
import { LeadSyncService, UniversalSyncAudit } from "../../services/leadSync";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  leadsCount: number;
}

export const UniversalSyncCenterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigate,
  profile,
  activeCurrency,
  leadsCount,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastAudit, setLastAudit] = useState<UniversalSyncAudit | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Load initial audit
  useEffect(() => {
    if (isOpen) {
      const storedProspects = LeadSyncService.getStoredProspects();
      const currentLeads = LeadSyncService.getCrmLeads();
      const invoices = LeadSyncService.getStoredInvoices();
      const pipelineVal = currentLeads.reduce((s, l) => s + (l.dealValue || 0), 0);
      const invoicedVal = invoices.reduce((s, inv) => s + (inv.paidAmount || 0), 0);

      setLastAudit({
        scoutedTotal: storedProspects.length,
        crmTotal: currentLeads.length,
        pipelineValueNgn: pipelineVal,
        invoicesCount: invoices.length,
        invoicedRevenueNgn: invoicedVal,
        primaryDomain: profile.domain || "naijaflavors.ng",
        webmailInboxesCount: 4,
        syncedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        status: "OPTIMAL",
      });
    }
  }, [isOpen, profile.domain]);

  if (!isOpen) return null;

  const handleRunMasterSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const audit = LeadSyncService.runMasterUniversalSync();
      setLastAudit(audit);
      setIsSyncing(false);
      setSuccessToast(
        `✓ All 8 Subsystems Synchronized! ${audit.crmTotal} CRM leads active, ₦${(audit.pipelineValueNgn / 1000000).toFixed(2)}M in pipeline value reconciled.`
      );
      setTimeout(() => setSuccessToast(null), 4000);
    }, 800);
  };

  const subsystems = [
    {
      id: "domains",
      title: "Domain & Anycast DNS",
      tab: "domains" as ActiveTab,
      icon: Globe,
      status: "SYNCED",
      badge: "Bound to Cloud Node",
      detail: profile.domain || "naijaflavors.ng",
      extra: "SSL Active • Sub-50ms DNS",
    },
    {
      id: "hosting",
      title: "Edge Cloud Hosting & Webmail",
      tab: "hosting" as ActiveTab,
      icon: Server,
      status: "SYNCED",
      badge: "99.99% Uptime",
      detail: "Lagos Enterprise Node (MDXi)",
      extra: `admin@${profile.domain || "naijaflavors.ng"} Live`,
    },
    {
      id: "website-builder",
      title: "Multi-Page Funnel & Website",
      tab: "website-builder" as ActiveTab,
      icon: Layers,
      status: "SYNCED",
      badge: "Live Storefront",
      detail: "6 Dynamic Pages + Lead Form",
      extra: "WhatsApp 1-Click Checkout Ready",
    },
    {
      id: "prospect-intelligence",
      title: "Social Scout & 100k Vault",
      tab: "prospect-intelligence" as ActiveTab,
      icon: Target,
      status: "SYNCED",
      badge: `${lastAudit?.scoutedTotal || 0} Vault Leads`,
      detail: "Omni-Channel Scraped Pool",
      extra: "LinkedIn, TikTok, X, IG Verified",
    },
    {
      id: "crm",
      title: "CRM Pipeline & Deal Flow",
      tab: "crm" as ActiveTab,
      icon: Users,
      status: "SYNCED",
      badge: `${lastAudit?.crmTotal || leadsCount} Deals Active`,
      detail: `₦${((lastAudit?.pipelineValueNgn || 0) / 1000000).toFixed(2)}M Value`,
      extra: "Auto-synced from Scout & Invoices",
    },
    {
      id: "email-broadcaster",
      title: "White-Label Bulk Broadcaster",
      tab: "email-broadcaster" as ActiveTab,
      icon: Mail,
      status: "SYNCED",
      badge: "100k Free Dispatch",
      detail: "Custom Brand Identity Isolated",
      extra: "0% BizPilot Branding in Outbound",
    },
    {
      id: "whatsapp",
      title: "WhatsApp Outreach Queue",
      tab: "whatsapp" as ActiveTab,
      icon: MessageSquare,
      status: "SYNCED",
      badge: "98% Open Rate",
      detail: "Personalized Direct Closing Hooks",
      extra: "Instant Paystack Link Generation",
    },
    {
      id: "smart-invoicing",
      title: "Smart Invoicing & 100% Escrow",
      tab: "smart-invoicing" as ActiveTab,
      icon: FileText,
      status: "SYNCED",
      badge: `${lastAudit?.invoicesCount || 0} Invoices Issued`,
      detail: `₦${((lastAudit?.invoicedRevenueNgn || 0) / 1000).toFixed(0)}k Paid`,
      extra: "Milestone CBN-Regulated Escrow",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Universal Data Bus
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Live Cross-Module Sync
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Ecosystem Health & Universal Sync Center
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

        {/* Master Action Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              One-Click End-to-End Orchestration
            </div>
            <div className="text-sm sm:text-base font-bold text-white">
              Sync All 8 Subsystems Across Your Business Operating System
            </div>
            <div className="text-xs text-emerald-100">
              Cross-reconciles Social Scout leads, CRM deals, Invoices, Webmail, and custom domain bindings.
            </div>
          </div>

          <button
            onClick={handleRunMasterSync}
            disabled={isSyncing}
            className="px-6 py-3 rounded-2xl bg-white text-slate-900 hover:bg-emerald-50 font-black text-sm flex items-center gap-2.5 shadow-lg transition transform active:scale-95 shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-600 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Synchronizing All Data..." : "⚡ Sync Everything Now"}</span>
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/70 border-b border-emerald-200 dark:border-emerald-800 p-3 text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Subsystems Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Real-time Subsystem Status (8 Connected Engines)
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Last Synced: {lastAudit?.syncedAt || "Just now"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {subsystems.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    onNavigate(sub.tab);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {sub.status}
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {sub.title}
                      </div>
                      <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {sub.badge}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                    <div className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {sub.detail}
                    </div>
                    <div className="text-slate-400 truncate">{sub.extra}</div>
                    <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold pt-1 opacity-0 group-hover:opacity-100 transition">
                      <span>Open Engine</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seamless Cross-Sync Architecture Diagram */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
              <Link2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>How Your Data Flows Automatically in BizPilot OS</span>
            </div>
            <p className="text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
              When you scrape leads in <strong>Social Scout</strong>, they flow directly into your <strong>CRM Pipeline</strong> and <strong>WhatsApp Outreach Queue</strong>. When you register a <strong>custom domain</strong>, it automatically binds to your <strong>Cloud Hosting virtual host</strong>, provisions your <strong>Webmail accounts</strong>, and sets your <strong>White-Label Bulk Email sender address</strong>. When you issue an <strong>Invoice</strong>, the CRM deal stage automatically updates to &quot;Proposal&quot; or &quot;Customer&quot; without manual data entry.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Universal Data Bus Active • Zero Silos</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-bold transition shadow-xs"
          >
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
