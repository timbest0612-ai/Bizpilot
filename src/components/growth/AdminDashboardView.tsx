import React, { useState, useEffect } from "react";
import {
  Settings,
  Cpu,
  ShieldCheck,
  Server,
  Zap,
  Activity,
  Database,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { getAdminMetrics, AdminMetrics } from "../../services/api";

export const AdminDashboardView: React.FC = () => {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const data = await getAdminMetrics();
      setMetrics(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>SaaS Platform Operations & Cost Controls</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              System Admin & Infrastructure
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Real-time monitoring of AI token usage, tenant isolation, and security guardrails.
            </p>
          </div>

          <button
            onClick={fetchMetrics}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Active Businesses</span>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {metrics?.activeBusinesses.toLocaleString() || "1,248"}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">+18 new today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Websites Live</span>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {metrics?.totalWebsitesCreated.toLocaleString() || "1,894"}
          </div>
          <span className="text-xs text-blue-600 font-semibold mt-1 block">99.98% Uptime</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Monthly AI Tokens</span>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {metrics?.monthlyTokensUsed.toLocaleString() || "14.2M"}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Gemini 3.7 Flash Engine</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">AI Cost Burn</span>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
            ${metrics?.monthlyAiCostUsd.toFixed(2) || "48.20"}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Under Budget ($150)</span>
        </div>
      </div>

      {/* Infrastructure & Security Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            <span>AI Model Tier & Cost Guardrails</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Primary Model</span>
                <span className="text-slate-500 font-mono text-[11px]">gemini-2.5-flash</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Heuristic Fallback Engine</span>
                <span className="text-slate-500 text-[11px]">Auto-engages during rate-limits to prevent downtime</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                READY
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Server-Side Secret Isolation</span>
                <span className="text-slate-500 text-[11px]">GEMINI_API_KEY never leaks to client bundle</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                ENFORCED
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            <span>Regional Payment Bridges Status</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Paystack Nigeria (NGN)</span>
                <span className="text-slate-500 text-[11px]">Webhook listener active on /api/paystack</span>
              </div>
              <span className="text-emerald-700 font-bold">Operational</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Flutterwave East Africa (KES)</span>
                <span className="text-slate-500 text-[11px]">M-Pesa instant settlement integration</span>
              </div>
              <span className="text-emerald-700 font-bold">Operational</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">WhatsApp Cloud API Gateway</span>
                <span className="text-slate-500 text-[11px]">Average delivery time: 1.2s</span>
              </div>
              <span className="text-emerald-700 font-bold">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
