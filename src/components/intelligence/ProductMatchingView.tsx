import React, { useState } from "react";
import {
  Package,
  Plus,
  Sparkles,
  CheckCircle2,
  Award,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Tag,
  DollarSign,
  ArrowRight,
  User,
  Sliders,
  X,
} from "lucide-react";
import { ProductRecord, ProspectRecord } from "../../types/intelligence";

interface Props {
  products: ProductRecord[];
  prospects: ProspectRecord[];
  onAddProduct: (newProduct: ProductRecord) => void;
  onUpdateProduct: (product: ProductRecord) => void;
}

export const ProductMatchingView: React.FC<Props> = ({
  products,
  prospects,
  onAddProduct,
  onUpdateProduct,
}) => {
  const [selectedProspectId, setSelectedProspectId] = useState<string>(prospects[0]?.id || "");
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProdName, setNewProdName] = useState("");
  const [newProdTagline, setNewProdTagline] = useState("");
  const [newProdDescription, setNewProdDescription] = useState("");
  const [newProdAudience, setNewProdAudience] = useState("");
  const [newProdPrice, setNewProdPrice] = useState(47);
  const [newProdCurrency, setNewProdCurrency] = useState("USD");
  const [newProdPains, setNewProdPains] = useState("Burnout & Exhaustion, Workload & Stress");
  const [newProdProfessions, setNewProdProfessions] = useState("Entrepreneurs, Founders, Executives");

  const selectedProspect = prospects.find((p) => p.id === selectedProspectId) || prospects[0];

  // Simulator Fit Score calculation for a given product
  const calculateSimulatedFit = (prod: ProductRecord, prosp: ProspectRecord) => {
    let score = 30; // base score
    let reasons: string[] = [];

    // Check pain match
    const hasPainMatch = prod.targetPainCategories.some(
      (pc) => pc.toLowerCase() === prosp.painCategory.toLowerCase()
    );
    if (hasPainMatch) {
      score += 30;
      reasons.push(`Direct Pain Alignment (+30 pts): Addresses ${prosp.painCategory}`);
    } else {
      reasons.push(`Partial Pain Alignment (+10 pts): Secondary symptom overlap`);
      score += 10;
    }

    // Check profession match
    const hasProfMatch = prod.targetProfessions.some(
      (tp) =>
        tp.toLowerCase().includes(prosp.profession.toLowerCase()) ||
        prosp.profession.toLowerCase().includes(tp.toLowerCase())
    );
    if (hasProfMatch) {
      score += 20;
      reasons.push(`Profession Target (+20 pts): Matches ${prosp.profession}`);
    } else {
      score += 5;
    }

    // Persona match
    if (prosp.personaName) {
      score += 15;
      reasons.push(`Persona Alignment (+15 pts): ${prosp.personaName}`);
    }

    // Cap at 98
    const totalScore = Math.min(score, 98);
    return { score: totalScore, reasons };
  };

  const handleCreateProduct = () => {
    if (!newProdName.trim()) return;

    const newProd: ProductRecord = {
      id: `prod_${Date.now()}`,
      name: newProdName,
      tagline: newProdTagline || "Strategic solution designed for high performance.",
      description: newProdDescription || newProdTagline,
      targetAudience: newProdAudience || "High-achieving professionals",
      targetProfessions: newProdProfessions.split(",").map((s) => s.trim()),
      targetPainCategories: newProdPains.split(",").map((s) => s.trim()),
      targetPersonas: ["Burned-Out High Performer", "Busy Professional"],
      keyFeatures: ["Structured Playbook", "Actionable Frameworks", "Direct Implementation Support"],
      price: Number(newProdPrice),
      currency: newProdCurrency,
      deliveryFormat: "Digital Book + Video Masterclass",
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    onAddProduct(newProd);
    setShowAddModal(false);
    setNewProdName("");
    setNewProdTagline("");
    setNewProdDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-slate-800" />
            Product Catalog & Relevance Matching Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure products and analyze how customer problem evidence mathematically translates into relevance scores.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product to Catalog</span>
        </button>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                  {prod.currency} {prod.price}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-700">
                  Active
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{prod.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{prod.tagline}</p>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {prod.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Target Professions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {prod.targetProfessions.slice(0, 3).map((tp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-medium text-slate-700"
                    >
                      {tp}
                    </span>
                  ))}
                  {prod.targetProfessions.length > 3 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{prod.targetProfessions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block">Pains Solved:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {prod.targetPainCategories.slice(0, 2).map((pc, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded text-[11px] font-medium text-amber-800"
                    >
                      {pc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Product Matching Simulator */}
      {selectedProspect && (
        <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Live Matching Simulator
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Transparent Multi-Product Fit Evaluation
              </h3>
              <p className="text-xs text-slate-500">
                See how different products in your catalog score against a specific prospect profile.
              </p>
            </div>

            {/* Prospect selector dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Simulate Prospect:</span>
              <select
                value={selectedProspectId}
                onChange={(e) => setSelectedProspectId(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              >
                {prospects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.profession} • {p.painCategory})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Prospect Summary Strip */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center">
                {selectedProspect.firstName[0]}
                {selectedProspect.lastName[0]}
              </div>
              <div>
                <div className="font-bold text-slate-900">{selectedProspect.fullName}</div>
                <div className="text-slate-500 text-[11px]">
                  {selectedProspect.jobTitle || selectedProspect.profession} at {selectedProspect.organization}
                </div>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px]">Verified Pain Evidence:</span>
              <span className="font-serif italic text-slate-800">"{selectedProspect.painEvidence}"</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px]">Active Pain Category:</span>
              <span className="font-bold text-amber-700">{selectedProspect.painCategory}</span>
            </div>
          </div>

          {/* Comparative Product Fit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => {
              const { score, reasons } = calculateSimulatedFit(prod, selectedProspect);
              const isTopPick = score >= 80;

              return (
                <div
                  key={prod.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isTopPick
                      ? "border-emerald-300 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-400"
                      : "border-slate-200 bg-white"
                  } space-y-3`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{prod.name}</h4>
                      <span className="text-[11px] text-slate-500">{prod.currency} {prod.price}</span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        score >= 80
                          ? "bg-emerald-600 text-white"
                          : score >= 65
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {score}% Fit
                    </span>
                  </div>

                  {/* Reasons log */}
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 block">
                      Score Breakdown:
                    </span>
                    {reasons.map((r, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  {isTopPick && (
                    <div className="pt-2 border-t border-emerald-100 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Recommended Campaign Angle
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-slate-700" />
                Add New Product to Catalog
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g., The Rest You Deserve: Reclaiming Peace in a Hasty World"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g., A spiritual and practical roadmap from chronic exhaustion to sustainable clarity."
                  value={newProdTagline}
                  onChange={(e) => setNewProdTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Currency</label>
                  <select
                    value={newProdCurrency}
                    onChange={(e) => setNewProdCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="NGN">NGN (₦)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Target Professions (comma separated)
                </label>
                <input
                  type="text"
                  value={newProdProfessions}
                  onChange={(e) => setNewProdProfessions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Target Pain Categories (comma separated)
                </label>
                <input
                  type="text"
                  value={newProdPains}
                  onChange={(e) => setNewProdPains(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProduct}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
