import React, { useState, useEffect } from "react";
import {
  Globe,
  Radio,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Server,
  RefreshCw,
  Clock,
} from "lucide-react";
import { InfrastructureNode, CurrencyCode, BusinessProfile } from "../../types";
import { INITIAL_INFRA_NODES } from "../../data/initialData";
import { fetchInfraNodes } from "../../services/api";

interface Props {
  profile: BusinessProfile;
  currency: CurrencyCode;
}

export const InfraStatusView: React.FC<Props> = ({ profile, currency }) => {
  const [nodes, setNodes] = useState<InfrastructureNode[]>(INITIAL_INFRA_NODES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchInfraNodes();
      if (res.nodes && res.nodes.length > 0) {
        setNodes(res.nodes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div id="infra-status-container" className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              GLOBAL ANYCAST EDGE NETWORK & SLA STATUS
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-white">
              Edge PoP Network & Infrastructure Telemetry
            </h1>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Real-time latency metrics from our African core nodes (Lagos MDXi, Johannesburg Teraco, Nairobi EADC) and global low-latency interconnects.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition flex items-center gap-2 text-sm shadow-md border border-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Latencies
          </button>
        </div>

        {/* Global SLA Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400 font-medium">Platform Uptime (365 Days)</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">99.998%</div>
            <div className="text-[11px] text-slate-400">Exceeding Tier-IV SLA</div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400 font-medium">Average West African Latency</div>
            <div className="text-2xl font-bold text-blue-400 font-mono mt-1">14 ms</div>
            <div className="text-[11px] text-slate-400">Direct IXPN & MainOne peering</div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
            <div className="text-xs text-slate-400 font-medium">Global DNS Anycast Speed</div>
            <div className="text-2xl font-bold text-purple-400 font-mono mt-1">4.2 ms</div>
            <div className="text-[11px] text-slate-400">Sub-second global propagation</div>
          </div>
        </div>
      </div>

      {/* Edge PoPs Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Active Anycast PoPs & Live Latency Matrix ({nodes.length} Core Nodes)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-blue-500 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-600 animate-ping" />
                    <h4 className="font-bold text-slate-900 text-base">{node.city}</h4>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {node.country} • {node.region}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {node.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Data Center:</span>
                  <span className="font-bold text-slate-900">{node.datacenter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Live Ping:</span>
                  <span className="font-bold text-emerald-600">{node.pingMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Load Factor:</span>
                  <span className="font-bold text-blue-600">{node.loadPercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
