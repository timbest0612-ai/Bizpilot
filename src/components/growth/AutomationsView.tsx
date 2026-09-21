import React, { useState } from "react";
import {
  Workflow,
  Sparkles,
  Plus,
  Play,
  CheckCircle2,
  Zap,
  ArrowRight,
  MessageSquare,
  Mail,
  Users,
  Clock,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { AutomationWorkflow, BusinessProfile } from "../../types";
import { DEFAULT_AUTOMATIONS } from "../../data/initialData";

interface Props {
  profile: BusinessProfile;
}

export const AutomationsView: React.FC<Props> = ({ profile }) => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(DEFAULT_AUTOMATIONS);
  const [activeWorkflow, setActiveWorkflow] = useState<AutomationWorkflow>(DEFAULT_AUTOMATIONS[0]);

  const toggleWorkflowActive = (id: string) => {
    setWorkflows(
      workflows.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Workflow className="w-3.5 h-3.5" />
              <span>Autonomous Growth Loops</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Workflow Automations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Event-driven automation engine connecting website leads, WhatsApp followups, and CRM deals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
              3 Active Pipelines
            </span>
          </div>
        </div>
      </div>

      {/* Workflows Grid & Canvas */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Col: Workflows List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Installed Automations
            </span>
          </div>

          {workflows.map((wf) => {
            const isSelected = activeWorkflow.id === wf.id;
            return (
              <div
                key={wf.id}
                onClick={() => setActiveWorkflow(wf)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50/60 border-emerald-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{wf.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{wf.description}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWorkflowActive(wf.id);
                    }}
                    className="text-slate-600 hover:text-emerald-600 p-1 shrink-0"
                  >
                    {wf.isActive ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                        PAUSED
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span className="font-mono">Trigger: {wf.trigger?.label || "Event"}</span>
                  <span className="text-emerald-700 font-semibold">{wf.actions?.length || 0} Steps</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Visual Flow Canvas */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider font-mono">
                Visual Flow Designer
              </span>
              <h2 className="font-extrabold text-slate-900 text-base">{activeWorkflow.name}</h2>
            </div>

            <button
              onClick={() => toggleWorkflowActive(activeWorkflow.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeWorkflow.isActive
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {activeWorkflow.isActive ? "Pause Workflow" : "Enable Workflow"}
            </button>
          </div>

          {/* Flow Steps Nodes */}
          <div className="space-y-4 relative py-2">
            {/* Trigger Node */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">1. Trigger Event</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <p className="font-bold text-sm text-white">{activeWorkflow.trigger?.label || "Lead Trigger"}</p>
              <p className="text-xs text-slate-400 mt-1 font-mono">{activeWorkflow.trigger?.details}</p>
            </div>

            <div className="flex justify-center">
              <div className="w-0.5 h-6 bg-slate-300" />
            </div>

            {/* Actions Nodes */}
            {activeWorkflow.actions?.map((act, i) => (
              <React.Fragment key={act.id}>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase font-mono text-[10px]">
                      Step {i + 2}: {act.type}
                    </span>
                    {act.type.includes("whatsapp") && <MessageSquare className="w-4 h-4 text-emerald-600" />}
                    {act.type.includes("crm") && <Users className="w-4 h-4 text-blue-600" />}
                    {act.type.includes("email") && <Mail className="w-4 h-4 text-purple-600" />}
                    {act.type.includes("wait") && <Clock className="w-4 h-4 text-amber-600" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{act.label}</h4>
                </div>

                {i < activeWorkflow.actions.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-slate-300" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
