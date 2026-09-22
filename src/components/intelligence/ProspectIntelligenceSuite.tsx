import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Target,
  Package,
  Send,
  BarChart3,
  Ban,
  Zap,
  Settings,
  Sparkles,
  Download,
  Compass,
} from "lucide-react";
import {
  ProspectRecord,
  DynamicSegment,
  ProductRecord,
  IntelligenceCampaign,
  GlobalSuppressionRecord,
  ComplianceAuditRecord,
  JurisdictionSettings,
} from "../../types/intelligence";
import {
  INITIAL_PROSPECTS,
  INITIAL_PRODUCTS,
  INITIAL_SAVED_SEGMENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_SUPPRESSION_LIST,
  INITIAL_AUDIT_LOGS,
  DEFAULT_JURISDICTION_SETTINGS,
} from "../../data/prospectIntelligenceData";

import { IntelligenceDashboard } from "./IntelligenceDashboard";
import { ProspectsVaultView } from "./ProspectsVaultView";
import { SegmentBuilderView } from "./SegmentBuilderView";
import { ProductMatchingView } from "./ProductMatchingView";
import { CampaignBuilderView } from "./CampaignBuilderView";
import { SuppressionHubView } from "./SuppressionHubView";
import { AiClassificationRunnerView } from "./AiClassificationRunnerView";
import { CampaignAnalyticsView } from "./CampaignAnalyticsView";
import { TaxonomySettingsView } from "./TaxonomySettingsView";
import { ProspectProfileModal } from "./ProspectProfileModal";
import { SocialScoutView } from "./SocialScoutView";

export const ProspectIntelligenceSuite: React.FC = () => {
  // Main Tab State
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Core Persistent State
  const [prospects, setProspects] = useState<ProspectRecord[]>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_prospects");
    return saved ? JSON.parse(saved) : INITIAL_PROSPECTS;
  });

  const [segments, setSegments] = useState<DynamicSegment[]>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_segments");
    return saved ? JSON.parse(saved) : INITIAL_SAVED_SEGMENTS;
  });

  const [products, setProducts] = useState<ProductRecord[]>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [campaigns, setCampaigns] = useState<IntelligenceCampaign[]>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_campaigns");
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [suppressionList, setSuppressionList] = useState<GlobalSuppressionRecord[]>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_suppression");
    return saved ? JSON.parse(saved) : INITIAL_SUPPRESSION_LIST;
  });

  const [auditLogs, setAuditLogs] = useState<ComplianceAuditRecord[]>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_audit");
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [jurisdictionSettings, setJurisdictionSettings] = useState<JurisdictionSettings>(() => {
    const saved = localStorage.getItem("bizpilot_intelligence_jurisdiction");
    return saved ? JSON.parse(saved) : DEFAULT_JURISDICTION_SETTINGS;
  });

  // Modal State
  const [selectedProspect, setSelectedProspect] = useState<ProspectRecord | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_prospects", JSON.stringify(prospects));
  }, [prospects]);

  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_segments", JSON.stringify(segments));
  }, [segments]);

  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_suppression", JSON.stringify(suppressionList));
  }, [suppressionList]);

  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_audit", JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem("bizpilot_intelligence_jurisdiction", JSON.stringify(jurisdictionSettings));
  }, [jurisdictionSettings]);

  // Handlers
  const handleUpdateProspect = (updated: ProspectRecord) => {
    setProspects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedProspect(updated);
  };

  const handleToggleSuppression = (prospect: ProspectRecord) => {
    if (prospect.suppressionStatus) {
      // Remove from suppression
      setSuppressionList((prev) => prev.filter((s) => s.email.toLowerCase() !== prospect.email.toLowerCase()));
      const updated: ProspectRecord = {
        ...prospect,
        suppressionStatus: false,
        doNotContact: false,
        marketingEligibility: "Eligible",
        suppressionReason: undefined,
      };
      handleUpdateProspect(updated);

      // Log event
      setAuditLogs((prev) => [
        {
          id: `audit_${Date.now()}`,
          timestamp: new Date().toISOString(),
          eventType: "UNSUBSCRIBE",
          email: prospect.email,
          details: "Removed from suppression list by operator",
        },
        ...prev,
      ]);
    } else {
      // Add to suppression
      const newSupp: GlobalSuppressionRecord = {
        id: `supp_${Date.now()}`,
        email: prospect.email,
        reason: "Manually blocked",
        dateAdded: new Date().toISOString(),
        notes: "Manually suppressed from prospect profile",
        addedBy: "Operator",
      };
      setSuppressionList((prev) => [newSupp, ...prev]);

      const updated: ProspectRecord = {
        ...prospect,
        suppressionStatus: true,
        doNotContact: true,
        marketingEligibility: "Suppressed",
        suppressionReason: "Manually blocked",
      };
      handleUpdateProspect(updated);

      // Log event
      setAuditLogs((prev) => [
        {
          id: `audit_${Date.now()}`,
          timestamp: new Date().toISOString(),
          eventType: "MANUAL_SUPPRESSION",
          email: prospect.email,
          details: "Suppressed by operator in profile view",
        },
        ...prev,
      ]);
    }
  };

  const handleBulkClassify = (ids: string[]) => {
    setActiveTab("ai-classify");
  };

  const handleBulkSuppress = (ids: string[]) => {
    const selectedProspects = prospects.filter((p) => ids.includes(p.id));
    const newSupps: GlobalSuppressionRecord[] = selectedProspects.map((p) => ({
      id: `supp_${Date.now()}_${p.id}`,
      email: p.email,
      reason: "Manually blocked",
      dateAdded: new Date().toISOString(),
      notes: "Bulk suppressed from Prospects Vault",
      addedBy: "Operator",
    }));

    setSuppressionList((prev) => [...newSupps, ...prev]);

    const updated = prospects.map((p) =>
      ids.includes(p.id)
        ? {
            ...p,
            suppressionStatus: true,
            doNotContact: true,
            marketingEligibility: "Suppressed" as const,
            suppressionReason: "Manually blocked",
          }
        : p
    );
    setProspects(updated);
  };

  const handleImportProspects = (newItems: ProspectRecord[]) => {
    setProspects((prev) => [...newItems, ...prev]);
  };

  const handleExportCsv = () => {
    const headers = [
      "Full Name",
      "Email",
      "Profession",
      "Primary Category",
      "Industry",
      "Country",
      "Pain Category",
      "Primary Pain",
      "Fit Score",
      "Eligibility",
    ];

    const rows = prospects.map((p) => [
      `"${p.fullName}"`,
      `"${p.email}"`,
      `"${p.profession}"`,
      `"${p.primaryCategory}"`,
      `"${p.industry}"`,
      `"${p.country}"`,
      `"${p.painCategory}"`,
      `"${p.primaryPain.replace(/"/g, '""')}"`,
      p.productFitScore,
      `"${p.marketingEligibility}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bizpilot_prospect_intelligence_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLaunchCampaignForSegment = (segment: DynamicSegment) => {
    setActiveTab("campaigns");
  };

  const handleIngestScoutedLeads = (newProspects: ProspectRecord[]) => {
    setProspects((prev) => {
      const merged = [...newProspects, ...prev];
      try {
        localStorage.setItem("bizpilot_intelligence_prospects", JSON.stringify(merged));
      } catch (e) {
        console.warn("LocalStorage quota reached, state kept in memory", e);
      }
      return merged;
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "scout", label: "Omni-Channel Social Scout (100k)", icon: Compass },
            { id: "prospects", label: "Prospects Vault", icon: Users },
            { id: "segments", label: "Dynamic Segments", icon: Target },
            { id: "products", label: "Product Catalog", icon: Package },
            { id: "campaigns", label: "Campaigns & Sequences", icon: Send },
            { id: "analytics", label: "Funnel Analytics", icon: BarChart3 },
            { id: "suppression", label: "Suppression Shield", icon: Ban },
            { id: "ai-classify", label: "AI Classifier", icon: Zap },
            { id: "settings", label: "Taxonomy & Weights", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {activeTab === "dashboard" && (
          <IntelligenceDashboard
            prospects={prospects}
            segments={segments}
            products={products}
            campaigns={campaigns}
            suppressionList={suppressionList}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "scout" && (
          <SocialScoutView
            onIngestProspects={handleIngestScoutedLeads}
            onSaveSegment={(newSeg) => setSegments((prev) => [newSeg, ...prev])}
            onNavigateToCampaigns={() => setActiveTab("campaigns")}
            existingProspectCount={prospects.length}
          />
        )}

        {activeTab === "prospects" && (
          <ProspectsVaultView
            prospects={prospects}
            products={products}
            onSelectProspect={(p) => setSelectedProspect(p)}
            onBulkClassify={handleBulkClassify}
            onBulkSuppress={handleBulkSuppress}
            onImportProspects={handleImportProspects}
            onExportCsv={handleExportCsv}
          />
        )}

        {activeTab === "segments" && (
          <SegmentBuilderView
            prospects={prospects}
            segments={segments}
            products={products}
            onSaveSegment={(newSeg) => setSegments((prev) => [newSeg, ...prev])}
            onDeleteSegment={(id) => setSegments((prev) => prev.filter((s) => s.id !== id))}
            onLaunchCampaignForSegment={handleLaunchCampaignForSegment}
          />
        )}

        {activeTab === "products" && (
          <ProductMatchingView
            products={products}
            prospects={prospects}
            onAddProduct={(newProd) => setProducts((prev) => [...prev, newProd])}
            onUpdateProduct={(upProd) =>
              setProducts((prev) => prev.map((p) => (p.id === upProd.id ? upProd : p)))
            }
          />
        )}

        {activeTab === "campaigns" && (
          <CampaignBuilderView
            campaigns={campaigns}
            segments={segments}
            products={products}
            prospects={prospects}
            onCreateCampaign={(newCamp) => setCampaigns((prev) => [newCamp, ...prev])}
            onUpdateCampaign={(upCamp) =>
              setCampaigns((prev) => prev.map((c) => (c.id === upCamp.id ? upCamp : c)))
            }
          />
        )}

        {activeTab === "analytics" && (
          <CampaignAnalyticsView campaigns={campaigns} segments={segments} />
        )}

        {activeTab === "suppression" && (
          <SuppressionHubView
            suppressionList={suppressionList}
            auditLogs={auditLogs}
            jurisdictionSettings={jurisdictionSettings}
            onAddSuppression={(newRecords) => setSuppressionList((prev) => [...newRecords, ...prev])}
            onRemoveSuppression={(id) =>
              setSuppressionList((prev) => prev.filter((item) => item.id !== id))
            }
            onUpdateJurisdiction={(settings) => setJurisdictionSettings(settings)}
          />
        )}

        {activeTab === "ai-classify" && (
          <AiClassificationRunnerView
            prospects={prospects}
            products={products}
            onUpdateProspects={(updated) => setProspects(updated)}
            onOpenProfile={(p) => setSelectedProspect(p)}
          />
        )}

        {activeTab === "settings" && <TaxonomySettingsView />}
      </div>

      {/* Prospect Profile Modal */}
      {selectedProspect && (
        <ProspectProfileModal
          prospect={selectedProspect}
          products={products}
          onClose={() => setSelectedProspect(null)}
          onUpdateProspect={handleUpdateProspect}
          onToggleSuppression={handleToggleSuppression}
        />
      )}
    </div>
  );
};
