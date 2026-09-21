import React, { useState } from "react";
import {
  CalendarCheck,
  Sparkles,
  CheckCircle2,
  Zap,
  Bot,
  ArrowRight,
  Plus,
  Trash2,
  Clock,
  Loader2,
} from "lucide-react";
import { BusinessProfile, DailyPriority } from "../../types";
import { generateAiContent } from "../../services/api";

interface Props {
  profile: BusinessProfile;
  priorities: DailyPriority[];
  onTogglePriority: (id: string) => void;
  onAddPriority: (priority: Omit<DailyPriority, "id">) => void;
  onAskAi: (prompt: string, agentName?: string) => void;
}

export const DailyCoachView: React.FC<Props> = ({
  profile,
  priorities,
  onTogglePriority,
  onAddPriority,
  onAskAi,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImpact, setNewImpact] = useState<"Critical" | "High Revenue" | "Quick Win">("High Revenue");

  const handleGenerateAiPriorities = async () => {
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "Business Manager",
        task: "Generate Daily High-Revenue Action Plan",
        prompt: `Generate 4 actionable daily priorities for ${profile.name} today to hit its goal: "${profile.mainGoal}".
Offering: ${profile.offering}
Market: ${profile.country} (${profile.city})
Business Model: ${profile.businessModel}`,
        businessProfile: profile,
      });

      // Add a fresh priority based on prompt
      onAddPriority({
        title: `Run 48-Hour Promo for ${profile.targetCustomer.split(" ")[0]}`,
        impact: "Critical",
        category: "Marketing",
        description: `Broadcast a 15% discount for first-time orders in ${profile.city}.`,
        agent: "Marketing Agent",
        actionPrompt: `Draft an urgent 48-hour promotional broadcast for ${profile.name}`,
        completed: false,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateCustomPriority = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddPriority({
      title: newTitle,
      impact: newImpact,
      category: "Sales",
      description: newDesc || "Custom prioritized task for today.",
      agent: "Business Manager",
      actionPrompt: `Help me execute this task: ${newTitle}`,
      completed: false,
    });

    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Daily AI Business Coaching</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Today's High-Revenue Priorities
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Your AI COO curates exactly what actions move the revenue needle today.
            </p>
          </div>

          <button
            onClick={handleGenerateAiPriorities}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Re-Calibrate Daily Priorities</span>
          </button>
        </div>
      </div>

      {/* Priorities List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Active Action Checklist</h3>
          <span className="text-xs text-slate-500 font-mono">
            {priorities.filter((p) => p.completed).length} / {priorities.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {priorities.map((p) => (
            <div
              key={p.id}
              className={`p-4 rounded-2xl border transition-all ${
                p.completed
                  ? "bg-slate-50 border-slate-200 opacity-60"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1">
                  <input
                    type="checkbox"
                    checked={p.completed}
                    onChange={() => onTogglePriority(p.id)}
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          p.completed ? "line-through text-slate-500" : "text-slate-900"
                        }`}
                      >
                        {p.title}
                      </h4>
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
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                </div>

                {!p.completed && (
                  <button
                    onClick={() => onAskAi(p.actionPrompt, p.agent)}
                    className="shrink-0 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Execute with AI</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Priority Card */}
      <form
        onSubmit={handleCreateCustomPriority}
        className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs"
      >
        <h3 className="font-bold text-slate-900 text-sm">Add Custom Business Priority</h3>

        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-slate-600 font-semibold mb-1">Priority Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Call 5 Corporate HR leads in Victoria Island"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Impact Level</label>
            <select
              value={newImpact}
              onChange={(e) => setNewImpact(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
            >
              <option value="Critical">Critical</option>
              <option value="High Revenue">High Revenue</option>
              <option value="Quick Win">Quick Win</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Priority</span>
          </button>
        </div>
      </form>
    </div>
  );
};
