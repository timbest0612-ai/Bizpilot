import React, { useState } from "react";
import {
  Users,
  Plus,
  MessageSquare,
  DollarSign,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Lead, LeadStage, CurrencyCode, BusinessProfile } from "../../types";
import { CURRENCIES } from "../../data/initialData";

interface Props {
  leads: Lead[];
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  onUpdateLeadStage: (id: string, stage: LeadStage) => void;
  onAddLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => void;
  onDeleteLead: (id: string) => void;
}

const STAGES: LeadStage[] = [
  "NEW",
  "CONTACTED",
  "PROPOSAL SENT",
  "NEGOTIATING",
  "CUSTOMER",
  "REPEAT CUSTOMER",
  "LOST",
];

export const CrmPipelineView: React.FC<Props> = ({
  leads,
  profile,
  activeCurrency,
  onUpdateLeadStage,
  onAddLead,
  onDeleteLead,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [dealValue, setDealValue] = useState("150000");
  const [stage, setStage] = useState<LeadStage>("NEW");
  const [source, setSource] = useState("WhatsApp Direct");
  const [notes, setNotes] = useState("");

  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  const formatMoney = (amount: number) => {
    if (activeCurrency === "NGN") return `₦${amount.toLocaleString()}`;
    const converted = amount / 1550;
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, "")}@example.com`,
      phone,
      company: company || undefined,
      dealValue: Number(dealValue) || 0,
      currency: activeCurrency,
      stage,
      source,
      notes: notes || "Direct lead entry via CRM",
      lastInteraction: "Just now",
    });

    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDealValue("150000");
    setNotes("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Deal Tracking & CRM Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              CRM & Customer Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Move deals from initial WhatsApp contact to repeat client retainers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Lead</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, phone, or company..."
            className="w-full bg-transparent text-xs text-slate-900 focus:outline-none placeholder-slate-400 font-medium"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-900">{filteredLeads.length}</strong> total pipeline leads
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {STAGES.map((st) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === st);
          const stageTotalValue = stageLeads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

          return (
            <div
              key={st}
              className="w-72 shrink-0 bg-slate-100/70 border border-slate-200 rounded-2xl p-3 flex flex-col max-h-[700px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 text-xs tracking-tight">{st}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  {formatMoney(stageTotalValue)}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:border-slate-300 space-y-2 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{lead.name}</h4>
                        {lead.company && (
                          <span className="text-[11px] text-slate-500 font-medium block">
                            {lead.company}
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-xs text-emerald-700">
                        {formatMoney(lead.dealValue)}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {lead.notes}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400">{lead.source}</span>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                          lead.name
                        )}!%20Following%20up%20from%20${encodeURIComponent(profile.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>

                    {/* Move Stage Selector */}
                    <div className="pt-1">
                      <select
                        value={lead.stage}
                        onChange={(e) => onUpdateLeadStage(lead.id, e.target.value as LeadStage)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-700 font-semibold p-1"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            Move to: {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="p-6 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Add Lead to CRM</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tunde Balogun"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+2348000000000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deal Value (₦ / $)</label>
                  <input
                    type="text"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    placeholder="150000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Zenith Bank HQ"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Requirement</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquired about weekly catering subscription for 30 executives..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
