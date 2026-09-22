import React, { useState } from "react";
import {
  Settings,
  Sliders,
  Users,
  AlertTriangle,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  History,
  Award,
} from "lucide-react";
import {
  DEFAULT_PROFESSION_CATEGORIES,
  DEFAULT_PAIN_CATEGORIES,
} from "../../data/prospectIntelligenceData";

interface Props {
  onSaveTaxonomy?: () => void;
}

export const TaxonomySettingsView: React.FC<Props> = ({ onSaveTaxonomy }) => {
  const [professionCategories, setProfessionCategories] = useState(DEFAULT_PROFESSION_CATEGORIES);
  const [painCategories, setPainCategories] = useState(DEFAULT_PAIN_CATEGORIES);

  // Scoring Weights state
  const [painWeight, setPainWeight] = useState(30);
  const [personaWeight, setPersonaWeight] = useState(20);
  const [professionWeight, setProfessionWeight] = useState(15);
  const [industryWeight, setIndustryWeight] = useState(10);
  const [intentWeight, setIntentWeight] = useState(10);
  const [interestWeight, setInterestWeight] = useState(5);
  const [geoWeight, setGeoWeight] = useState(5);
  const [historyWeight, setHistoryWeight] = useState(5);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalWeight =
    painWeight +
    personaWeight +
    professionWeight +
    industryWeight +
    intentWeight +
    interestWeight +
    geoWeight +
    historyWeight;

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSaveTaxonomy) onSaveTaxonomy();
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-800" />
            Controlled Taxonomies & Relevance Scoring Weights
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain strict standard categories to prevent chaotic unnormalized data and calibrate evaluation scoring.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Taxonomy Configuration</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Taxonomy rules and scoring weights saved successfully!
        </div>
      )}

      {/* SECTION 1: SCORING WEIGHTS */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Relevance Algorithm Weight Matrix (0 - 100 Points)
            </h3>
            <p className="text-xs text-slate-500">
              Total Points: <strong className={totalWeight === 100 ? "text-emerald-600" : "text-amber-600"}>{totalWeight} / 100</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Pain Point Direct Match:</span>
              <span className="font-bold text-slate-900">{painWeight} pts</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={painWeight}
              onChange={(e) => setPainWeight(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Persona Match:</span>
              <span className="font-bold text-slate-900">{personaWeight} pts</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={personaWeight}
              onChange={(e) => setPersonaWeight(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Profession Match:</span>
              <span className="font-bold text-slate-900">{professionWeight} pts</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={professionWeight}
              onChange={(e) => setProfessionWeight(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Industry Match:</span>
              <span className="font-bold text-slate-900">{industryWeight} pts</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={industryWeight}
              onChange={(e) => setIndustryWeight(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Intent & Readiness Signals:</span>
              <span className="font-bold text-slate-900">{intentWeight} pts</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={intentWeight}
              onChange={(e) => setIntentWeight(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-700">Interests & Needs Alignment:</span>
              <span className="font-bold text-slate-900">{interestWeight} pts</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={interestWeight}
              onChange={(e) => setInterestWeight(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: PROFESSION CATEGORIES */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          Standard Profession Categories ({professionCategories.length})
        </h3>

        <div className="space-y-2">
          {professionCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">{cat.category}</span>
                <p className="text-slate-500 text-[11px] line-clamp-1">{cat.examples.join(", ")}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-200 text-slate-700 whitespace-nowrap self-start sm:self-center">
                {cat.examples.length} sub-roles
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: PAIN CATEGORIES */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Standard Pain-Point Categories ({painCategories.length})
        </h3>

        <div className="space-y-2">
          {painCategories.map((pain, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">{pain.category}</span>
                <p className="text-slate-500 text-[11px] line-clamp-1">{pain.examples.join(", ")}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 whitespace-nowrap self-start sm:self-center">
                {pain.examples.length} verified symptoms
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
