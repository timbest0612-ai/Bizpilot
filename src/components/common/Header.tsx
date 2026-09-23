import React from "react";
import {
  Sparkles,
  Globe,
  Bell,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Menu,
  Search,
  MessageSquare,
} from "lucide-react";
import { BusinessProfile, CurrencyCode, UserSubscription } from "../../types";
import { CURRENCIES } from "../../data/initialData";

interface Props {
  profile: BusinessProfile;
  subscription: UserSubscription;
  activeCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onNavigate: (tab: string) => void;
  onToggleSidebar: () => void;
  onViewLanding: () => void;
  onStartDemoTutorial?: () => void;
  onOpenSupportChat?: () => void;
  onOpenOmniCommand?: () => void;
  onOpenSyncCenter?: () => void;
}

export const Header: React.FC<Props> = ({
  profile,
  subscription,
  activeCurrency,
  onCurrencyChange,
  onNavigate,
  onToggleSidebar,
  onViewLanding,
  onStartDemoTutorial,
  onOpenSupportChat,
  onOpenOmniCommand,
  onOpenSyncCenter,
}) => {
  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-base shadow-sm">
            BP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-sm md:text-base">
                {profile.name || "My Business OS"}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                {profile.country || "Global"} Market
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block truncate max-w-xs">
              {profile.offering || "AI Business Operating System"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 md:gap-4">
        {/* Universal Ecosystem Sync Center */}
        {onOpenSyncCenter && (
          <button
            onClick={onOpenSyncCenter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/80 transition-all shadow-2xs"
            title="Open Universal Ecosystem Sync Center (All 8 Engines Connected)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Data Bus Synced</span>
          </button>
        )}

        {/* Quick Command & Omni-Search */}
        {onOpenOmniCommand && (
          <button
            onClick={onOpenOmniCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all shadow-2xs"
            title="Search tools or execute quick action (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden xl:inline text-slate-500 font-medium">Quick search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-500">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Currency Switcher */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
          <select
            value={activeCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
            className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1"
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
        </div>

        {/* Subscription or Platform Owner Master Control Badge */}
        {subscription.tier === "OWNER_MASTER" || subscription.isOwner ? (
          <button
            onClick={() => onNavigate("billing")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/90 via-indigo-900 to-slate-900 border border-purple-500/40 text-amber-300 hover:border-amber-400/80 transition-all text-xs shadow-xs"
            title="Platform Owner: 6 Verified Accounts (100% Free 100k Bulk Email & Infinite Credits)"
          >
            <span className="text-sm">👑</span>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[11px] text-amber-300 leading-tight">
                Platform Owner (6 Verified)
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">
                100k Email Free • $0 Cost
              </span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => onNavigate("billing")}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 hover:bg-amber-100/80 transition-colors text-xs"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium">
              Trial: <strong>{subscription.trialDaysLeft}d left</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 font-mono text-[11px]">
              {subscription.creditsRemaining} credits
            </span>
          </button>
        )}

        {/* Interactive Demo Tutorial Walkthrough */}
        {onStartDemoTutorial && (
          <button
            onClick={onStartDemoTutorial}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 text-xs font-bold transition-all shadow-xs"
            title="Launch Step-by-Step Guided Tutorial"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Demo Tutorial</span>
          </button>
        )}

        {/* Live Expert Support Desk */}
        {onOpenSupportChat && (
          <button
            onClick={onOpenSupportChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
            title="Chat with Tier-3 Cloud Architect & Webmaster Specialist"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">24/7 Expert Support</span>
          </button>
        )}

        {/* Google 1-Click Sign-In & Captured Account Badge */}
        <button
          onClick={() => onNavigate("email-broadcaster")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-semibold hover:bg-indigo-100 transition-all shadow-xs"
          title="Google Sign-In Captured Owner: ayobamitim0612@gmail.com (Click to view Email Broadcaster & 100k Free Dispatch)"
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] shadow-xs border border-indigo-200">
            <span className="font-bold text-indigo-600">G</span>
          </div>
          <span className="hidden md:inline font-mono text-[11px]">ayobamitim0612@gmail.com</span>
          <span className="text-[10px] px-1 rounded bg-amber-400/20 text-amber-600 dark:text-amber-300 font-black">👑 Owner</span>
        </button>

        {/* Live Website Preview Link */}
        <button
          onClick={() => onNavigate("website-builder")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          title="Preview generated website"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Site</span>
        </button>

        {/* AI Launch Coach Quick Action */}
        <button
          onClick={() => onNavigate("business-manager")}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-sm transition-all hover:shadow"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
          <span>Ask AI Manager</span>
        </button>

        {/* View Public Landing Page */}
        <button
          onClick={onViewLanding}
          className="text-xs text-slate-500 hover:text-slate-900 font-medium hidden xl:block"
        >
          Landing Page
        </button>
      </div>
    </header>
  );
};
