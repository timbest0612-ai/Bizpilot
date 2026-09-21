import React from "react";
import {
  LayoutDashboard,
  Bot,
  Compass,
  Globe,
  Palette,
  FileText,
  Megaphone,
  Search,
  Users,
  Target,
  ShoppingBag,
  MessageSquare,
  Workflow,
  BarChart3,
  CalendarCheck,
  Cpu,
  CreditCard,
  Settings,
  Sparkles,
  Zap,
  X,
  Server,
  ShieldCheck,
  Mail,
  Lock,
  Radio,
  Landmark,
  Boxes,
  Truck,
  FileCheck2,
  Eye,
} from "lucide-react";
import { ActiveTab } from "../../types";

interface Props {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
}) => {
  const navGroups = [
    {
      group: "CORE OS",
      items: [
        { id: "dashboard" as ActiveTab, label: "Executive Dashboard", icon: LayoutDashboard },
        { id: "business-manager" as ActiveTab, label: "AI Business Manager", icon: Bot, badge: "AI Brain" },
        { id: "daily-coach" as ActiveTab, label: "Today's Priorities", icon: CalendarCheck, badge: "Daily" },
      ],
    },
    {
      group: "DOMAINS & CLOUD HOSTING",
      items: [
        { id: "domains" as ActiveTab, label: "Domains & Anycast DNS", icon: Globe, badge: "Registrar" },
        { id: "hosting" as ActiveTab, label: "Cloud Hosting (cPanel)", icon: Server, badge: "99.99%" },
        { id: "webmail" as ActiveTab, label: "Business Webmail", icon: Mail, badge: "100/100" },
        { id: "ssl-security" as ActiveTab, label: "SSL & Firewall WAF", icon: Lock, badge: "TLS 1.3" },
        { id: "infra-status" as ActiveTab, label: "Edge PoP Status", icon: Radio, badge: "14ms" },
        { id: "domain-comparison" as ActiveTab, label: "Why We're Different", icon: ShieldCheck, badge: "Gaps Solved" },
      ],
    },
    {
      group: "LAUNCH, LEGAL & BRAND",
      items: [
        { id: "launch-wizard" as ActiveTab, label: "Launch Wizard", icon: Compass, badge: "5 Steps" },
        { id: "cac-compliance" as ActiveTab, label: "Legal, CAC & Compliance", icon: Landmark, badge: "CAMA 2020" },
        { id: "website-builder" as ActiveTab, label: "AI Website Builder", icon: Globe },
        { id: "branding" as ActiveTab, label: "Brand Identity Kit", icon: Palette },
      ],
    },
    {
      group: "COMMERCE & FULFILLMENT",
      items: [
        { id: "omni-inventory" as ActiveTab, label: "Omni-Inventory & POS", icon: Boxes, badge: "Multi-Sync" },
        { id: "logistics" as ActiveTab, label: "Logistics & Dispatch", icon: Truck, badge: "GIGL/Topship" },
        { id: "smart-invoicing" as ActiveTab, label: "Smart Invoicing & Escrow", icon: FileCheck2, badge: "CBN Escrow" },
        { id: "competitor-spy" as ActiveTab, label: "Competitor Price Spy", icon: Eye, badge: "Jumia/TikTok" },
        { id: "sales" as ActiveTab, label: "Sales & Paystack", icon: ShoppingBag },
      ],
    },
    {
      group: "GROWTH & MARKETING",
      items: [
        { id: "email-broadcaster" as ActiveTab, label: "Bulk Email Broadcaster", icon: Mail, badge: "Resend/Google" },
        { id: "content-factory" as ActiveTab, label: "Content Factory", icon: FileText },
        { id: "marketing" as ActiveTab, label: "Marketing & Ads", icon: Megaphone },
        { id: "seo" as ActiveTab, label: "SEO Agent & Audit", icon: Search },
        { id: "leads" as ActiveTab, label: "Lead Gen & Funnels", icon: Target },
        { id: "crm" as ActiveTab, label: "CRM Pipeline", icon: Users },
      ],
    },
    {
      group: "AUTOMATION & DATA",
      items: [
        { id: "whatsapp" as ActiveTab, label: "WhatsApp Command", icon: MessageSquare, badge: "Africa #1" },
        { id: "automations" as ActiveTab, label: "Workflow Automations", icon: Workflow },
        { id: "analytics" as ActiveTab, label: "Business Analytics", icon: BarChart3 },
      ],
    },
    {
      group: "SETTINGS & ADMIN",
      items: [
        { id: "integrations" as ActiveTab, label: "Integrations & APIs", icon: Cpu },
        { id: "billing" as ActiveTab, label: "Plans & Credits", icon: CreditCard },
        { id: "admin" as ActiveTab, label: "Admin & Cost Controls", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
              ⚡
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-base">BizPilot OS</span>
              <span className="text-[10px] text-emerald-400 font-mono block -mt-0.5">
                AI Business OS
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {navGroups.map((grp) => (
            <div key={grp.group}>
              <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                {grp.group}
              </div>
              <div className="space-y-1">
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-white" : "text-slate-400"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                            isActive
                              ? "bg-emerald-700 text-emerald-100"
                              : item.badge === "Africa #1"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & quick prompt helper */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-slate-200 font-semibold leading-tight">
                Autonomous Co-pilot
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                Gemini 3.7 Flash engine orchestrating your full business stack.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
