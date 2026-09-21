import React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Lock,
  Mail,
  CreditCard,
  Layers,
} from "lucide-react";
import { REGISTRAR_COMPARISON_DATA } from "../../data/initialData";

interface Props {
  onNavigateToSearch: () => void;
  onNavigateToHosting: () => void;
}

export const RegistrarComparisonView: React.FC<Props> = ({
  onNavigateToSearch,
  onNavigateToHosting,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>The Registrar & Hosting Paradigm Shift</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Filling the Massive Gaps That Legacy Registrars Ignore
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Traditional domain registrars (GoDaddy, Namecheap, Bluehost, Whogohost) operate on 20-year-old business models: selling you raw infrastructure, hiding renewal price hikes, charging extra for basic security, and leaving you stranded with an empty DNS control panel.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onNavigateToSearch}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Search Domains with Zero Hidden Fees</span>
            </button>
            <button
              onClick={onNavigateToHosting}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
            >
              <span>Explore Autonomous Hosting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* The 4 Big Gaps We Solved */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">The "Empty Room" Problem</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Legacy registrars give you a blank domain and tell you to figure out hosting, CMS, databases, SSL, and DNS. <strong>HostPilot automatically deploys your AI website, email, and payments in 60s.</strong>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Hidden Renewal Gouging</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Luring you in with $0.99 initial pricing then charging 400% renewal spikes and $15/yr for WHOIS privacy. <strong>HostPilot has transparent flat-rate pricing with privacy free forever.</strong>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">African Payment Roadblocks</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Global registrars constantly decline local Naira/Cedi cards and lack USSD or bank transfer checkout. <strong>HostPilot natively integrates Paystack, Flutterwave, Naira Card, and USSD (*737#).</strong>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Zero Built-In Commerce</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Other hosts don't understand modern social commerce in emerging markets. <strong>HostPilot builds WhatsApp ordering, Paystack checkout links, and CRM pipelines directly into your domain.</strong>
          </p>
        </div>
      </div>

      {/* Direct Feature-by-Feature Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Direct Comparison Matrix: Legacy vs. HostPilot AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            See how HostPilot gives you an entire revenue-ready business stack for the price of a standard domain registration.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="grid grid-cols-12 bg-slate-50 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4 sm:col-span-3">Capability / Feature</div>
            <div className="col-span-4 sm:col-span-4 text-rose-600">Traditional Registrars & Hosts</div>
            <div className="col-span-4 sm:col-span-5 text-emerald-700">HostPilot AI Autonomous OS</div>
          </div>

          {REGISTRAR_COMPARISON_DATA.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center hover:bg-slate-50/80 transition-colors ${
                row.highlight ? "bg-emerald-50/20" : ""
              }`}
            >
              <div className="col-span-4 sm:col-span-3 font-extrabold text-slate-900 pr-2">
                {row.feature}
              </div>
              <div className="col-span-4 sm:col-span-4 text-slate-500 pr-3 flex items-start gap-1.5 text-xs">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{row.traditional}</span>
              </div>
              <div className="col-span-4 sm:col-span-5 text-slate-900 font-semibold flex items-start gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-emerald-950">{row.hostpilot}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
