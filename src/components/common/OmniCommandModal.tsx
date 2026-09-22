import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Sparkles,
  Mail,
  Users,
  MessageSquare,
  FileText,
  DollarSign,
  Globe,
  Server,
  ShieldCheck,
  Eye,
  Boxes,
  Truck,
  Landmark,
  Compass,
  ArrowRight,
  Zap,
  X,
  CheckCircle2,
} from "lucide-react";
import { ActiveTab, CurrencyCode } from "../../types";
import { LeadSyncService } from "../../services/leadSync";

interface CommandItem {
  id: string;
  title: string;
  category: "GROWTH" | "SALES & CRM" | "HOSTING & DOMAINS" | "COMMERCE" | "OPERATIONS" | "ACTION";
  subtitle: string;
  icon: React.ElementType;
  badge?: string;
  tab?: ActiveTab;
  action?: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  activeCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
}

export const OmniCommandModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigate,
  activeCurrency,
  onCurrencyChange,
}) => {
  const [query, setQuery] = useState("");
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Quick Sync All Scouted Leads to CRM
  const handleQuickSyncToCrm = () => {
    const stored = LeadSyncService.getStoredProspects();
    if (stored.length === 0) {
      setSyncToast("No prospects in Scout Vault yet. Open Social Scout first!");
      setTimeout(() => setSyncToast(null), 3500);
      return;
    }
    const res = LeadSyncService.syncProspectsToCrm(stored, "NEW");
    setSyncToast(`✓ Synced ${res.addedCount} new scouted prospects into CRM Pipeline!`);
    setTimeout(() => {
      setSyncToast(null);
      onNavigate("crm");
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      // Actions
      {
        id: "act-sync-leads",
        title: "Sync All Scouted Prospects to CRM Pipeline",
        category: "ACTION",
        subtitle: "1-Click injects AI scouted leads into your CRM deals board",
        icon: Zap,
        badge: "1-Click Sync",
        action: handleQuickSyncToCrm,
      },
      // Growth & Marketing
      {
        id: "nav-social-scout",
        title: "Omni-Channel Social Scout (Up to 100,000 Leads)",
        category: "GROWTH",
        subtitle: "Scout leads across LinkedIn, X, Instagram, TikTok, YouTube, Pinterest, etc.",
        icon: Sparkles,
        badge: "100k Leads",
        tab: "prospect-intelligence",
      },
      {
        id: "nav-email-broadcaster",
        title: "Bulk Email Broadcaster",
        category: "GROWTH",
        subtitle: "Send 100,000 emails with Resend / Amazon SES ($0 Cost for Owners)",
        icon: Mail,
        badge: "SES/Resend",
        tab: "email-broadcaster",
      },
      {
        id: "nav-crm",
        title: "CRM Deals Pipeline & Sales Funnel",
        category: "SALES & CRM",
        subtitle: "Manage deal stages: New, Contacted, Qualified, Proposal, Won",
        icon: Users,
        badge: "Kanban",
        tab: "crm",
      },
      {
        id: "nav-whatsapp",
        title: "WhatsApp Command Center & Broadcasts",
        category: "GROWTH",
        subtitle: "Africa's #1 commerce channel - auto replies, click-to-chat & promos",
        icon: MessageSquare,
        badge: "Direct Chat",
        tab: "whatsapp",
      },
      {
        id: "nav-smart-invoicing",
        title: "Smart Invoicing & CBN Escrow Protection",
        category: "COMMERCE",
        subtitle: "Issue professional milestone invoices with Paystack & QR verify",
        icon: FileText,
        badge: "Escrow",
        tab: "smart-invoicing",
      },
      {
        id: "nav-competitor-spy",
        title: "Competitor Price Spy (Jumia, Konga, TikTok)",
        category: "COMMERCE",
        subtitle: "Live price monitoring & margin recommendations",
        icon: Eye,
        badge: "Live Intel",
        tab: "competitor-spy",
      },
      {
        id: "nav-omni-inventory",
        title: "Omni-Inventory & POS Synchronization",
        category: "COMMERCE",
        subtitle: "Multi-location inventory tracking with barcode scanning",
        icon: Boxes,
        tab: "omni-inventory",
      },
      {
        id: "nav-logistics",
        title: "Logistics & Dispatch (GIGL / Topship)",
        category: "COMMERCE",
        subtitle: "Instant booking and real-time rider GPS tracking",
        icon: Truck,
        tab: "logistics",
      },
      {
        id: "nav-domains",
        title: "Domains & Anycast DNS Registrar",
        category: "HOSTING & DOMAINS",
        subtitle: "Register .com, .ng, .com.ng with free DNSSEC & privacy",
        icon: Globe,
        badge: ".ng Registrar",
        tab: "domains",
      },
      {
        id: "nav-hosting",
        title: "Cloud Hosting & cPanel Environment",
        category: "HOSTING & DOMAINS",
        subtitle: "NVMe SSD cloud hosting, auto SSL and 1-click WordPress",
        icon: Server,
        badge: "99.99%",
        tab: "hosting",
      },
      {
        id: "nav-webmail",
        title: "Corporate Webmail Suite",
        category: "HOSTING & DOMAINS",
        subtitle: "Professional inbox @yourdomain with 100/100 deliverability",
        icon: Mail,
        tab: "webmail",
      },
      {
        id: "nav-cac",
        title: "Legal, CAC Registration & CAMA Compliance",
        category: "OPERATIONS",
        subtitle: "CAC business name search, SCUML, Tax ID and legal contracts",
        icon: Landmark,
        badge: "CAC 2020",
        tab: "cac-compliance",
      },
      {
        id: "nav-website",
        title: "AI Website Builder & Storefront",
        category: "OPERATIONS",
        subtitle: "High-converting responsive storefront with instant preview",
        icon: Globe,
        tab: "website-builder",
      },
      {
        id: "nav-launch-wizard",
        title: "5-Step Business Launch Wizard",
        category: "OPERATIONS",
        subtitle: "Go from idea to live domain, storefront & bank in 15 minutes",
        icon: Compass,
        tab: "launch-wizard",
      },
    ],
    []
  );

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.badge && c.badge.toLowerCase().includes(q))
    );
  }, [commands, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, tool name, or action (e.g., '100k', 'email', 'crm', 'sync')..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 rounded">
            ESC
          </kbd>
        </div>

        {/* Sync Toast Notification */}
        {syncToast && (
          <div className="p-3 bg-emerald-500 text-white text-xs font-bold flex items-center justify-between px-4 animate-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {syncToast}
            </span>
          </div>
        )}

        {/* Command Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching modules or actions found for "{query}". Try "scout", "email", or "leads".
            </div>
          ) : (
            filteredCommands.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.tab) {
                      onNavigate(item.tab);
                      onClose();
                    }
                  }}
                  className="w-full text-left p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all flex items-center justify-between group pt-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        item.category === "ACTION"
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                          : item.category === "GROWTH"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">Open</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 px-4">
          <div className="flex items-center gap-2">
            <span>Active Currency:</span>
            <span className="font-bold text-slate-900 dark:text-white">{activeCurrency}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Tip: Press <kbd className="font-mono font-bold bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">⌘K</kbd> anywhere</span>
          </div>
        </div>
      </div>
    </div>
  );
};
