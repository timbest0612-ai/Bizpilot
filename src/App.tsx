import React, { useState, useEffect } from "react";
import {
  BusinessProfile,
  WebsiteData,
  Lead,
  DailyPriority,
  ChatMessage,
  UserSubscription,
  ActiveTab,
  CurrencyCode,
  LeadStage,
} from "./types";
import {
  INITIAL_PROFILE,
  DEFAULT_WEBSITE_DATA,
  INITIAL_LEADS,
  INITIAL_PRIORITIES,
  INITIAL_CHAT_HISTORY,
  INITIAL_SUBSCRIPTION,
} from "./data/initialData";
import { getStoredState, saveStoredState } from "./services/storage";
import { Header } from "./components/common/Header";
import { Sidebar } from "./components/common/Sidebar";
import { DemoTutorialGuide } from "./components/common/DemoTutorialGuide";
import { LandingPage } from "./components/landing/LandingPage";
import { OnboardingWizard } from "./components/onboarding/OnboardingWizard";
import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { BusinessManagerView } from "./components/business-manager/BusinessManagerView";
import { LaunchWizardView } from "./components/launch-wizard/LaunchWizardView";
import { WebsiteBuilderView } from "./components/website-builder/WebsiteBuilderView";
import { MarketingAndAdsView } from "./components/growth/MarketingAndAdsView";
import { ContentFactoryView } from "./components/growth/ContentFactoryView";
import { SeoStudioView } from "./components/growth/SeoStudioView";
import { LeadGenFunnelsView } from "./components/growth/LeadGenFunnelsView";
import { SalesStudioView } from "./components/growth/SalesStudioView";
import { CrmPipelineView } from "./components/growth/CrmPipelineView";
import { WhatsAppCenterView } from "./components/growth/WhatsAppCenterView";
import { AutomationsView } from "./components/growth/AutomationsView";
import { AnalyticsView } from "./components/growth/AnalyticsView";
import { DailyCoachView } from "./components/growth/DailyCoachView";
import { BrandKitView } from "./components/growth/BrandKitView";
import { BillingAndCreditsView } from "./components/growth/BillingAndCreditsView";
import { IntegrationsView } from "./components/growth/IntegrationsView";
import { AdminDashboardView } from "./components/growth/AdminDashboardView";
import { DomainRegistrarView } from "./components/domains/DomainRegistrarView";
import { CloudHostingView } from "./components/hosting/CloudHostingView";
import { RegistrarComparisonView } from "./components/domains/RegistrarComparisonView";
import { WebmailSuiteView } from "./components/hosting/WebmailSuiteView";
import { SslSecurityView } from "./components/hosting/SslSecurityView";
import { InfraStatusView } from "./components/hosting/InfraStatusView";
import { CacComplianceView } from "./components/growth/CacComplianceView";
import { OmniInventoryView } from "./components/growth/OmniInventoryView";
import { LogisticsDispatchView } from "./components/growth/LogisticsDispatchView";
import { SmartInvoicingView } from "./components/growth/SmartInvoicingView";
import { CompetitorSpyView } from "./components/growth/CompetitorSpyView";
import { EmailBroadcasterView } from "./components/growth/EmailBroadcasterView";

export function App() {
  // Main app view mode: landing vs onboarding vs workspace
  const [appMode, setAppMode] = useState<"landing" | "onboarding" | "workspace">("workspace");
  const [initialNichePrompt, setInitialNichePrompt] = useState("");

  // Workspace Navigation & State
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>("NGN");
  const [isDemoTutorialOpen, setIsDemoTutorialOpen] = useState(false);

  // Core Business Data
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    const saved = getStoredState<BusinessProfile>("bizpilot_profile");
    return saved || INITIAL_PROFILE;
  });

  const [website, setWebsite] = useState<WebsiteData>(() => {
    const saved = getStoredState<WebsiteData>("bizpilot_website");
    return saved || DEFAULT_WEBSITE_DATA;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = getStoredState<Lead[]>("bizpilot_leads");
    return saved || INITIAL_LEADS;
  });

  const [priorities, setPriorities] = useState<DailyPriority[]>(() => {
    const saved = getStoredState<DailyPriority[]>("bizpilot_priorities");
    return saved || INITIAL_PRIORITIES;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = getStoredState<ChatMessage[]>("bizpilot_chat");
    return saved || INITIAL_CHAT_HISTORY;
  });

  const [subscription, setSubscription] = useState<UserSubscription>(() => {
    const saved = getStoredState<UserSubscription>("bizpilot_subscription");
    return saved || INITIAL_SUBSCRIPTION;
  });

  // Sync state to local persistence
  useEffect(() => {
    saveStoredState("bizpilot_profile", profile);
  }, [profile]);

  useEffect(() => {
    saveStoredState("bizpilot_website", website);
  }, [website]);

  useEffect(() => {
    saveStoredState("bizpilot_leads", leads);
  }, [leads]);

  useEffect(() => {
    saveStoredState("bizpilot_priorities", priorities);
  }, [priorities]);

  useEffect(() => {
    saveStoredState("bizpilot_chat", chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    saveStoredState("bizpilot_subscription", subscription);
  }, [subscription]);

  // Lead Handlers
  const handleAddLead = (newLeadData: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const newLead: Lead = {
      ...newLeadData,
      id: "lead_" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLeads([newLead, ...leads]);
  };

  const handleUpdateLeadStage = (id: string, stage: LeadStage) => {
    setLeads(
      leads.map((l) => (l.id === id ? { ...l, stage, updatedAt: new Date().toISOString() } : l))
    );
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  // Priority Handlers
  const handleTogglePriority = (id: string) => {
    setPriorities(
      priorities.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const handleAddPriority = (newP: Omit<DailyPriority, "id">) => {
    const prio: DailyPriority = {
      ...newP,
      id: "prio_" + Date.now(),
    };
    setPriorities([prio, ...priorities]);
  };

  // AI Direct Dispatch Trigger
  const handleAskAi = (prompt: string, agentName?: string) => {
    setActiveTab("business-manager");
  };

  // Onboarding Complete Handler
  const handleOnboardingComplete = (newProfile: BusinessProfile, newSite?: WebsiteData) => {
    setProfile(newProfile);
    if (newProfile.currency) setActiveCurrency(newProfile.currency);
    if (newSite) setWebsite(newSite);
    setAppMode("workspace");
    setActiveTab("dashboard");
  };

  // Plan Upgrade
  const handleUpgradePlan = (plan: "STARTER" | "PRO" | "AGENCY") => {
    setSubscription({
      ...subscription,
      plan,
      status: "ACTIVE",
      creditsRemaining: subscription.creditsRemaining + 5000,
    });
  };

  // 1. Render Landing Page
  if (appMode === "landing") {
    return (
      <LandingPage
        onStartFree={() => setAppMode("onboarding")}
        onSelectNicheDemo={(prompt) => {
          setInitialNichePrompt(prompt);
          setAppMode("onboarding");
        }}
        activeCurrency={activeCurrency}
        onCurrencyChange={(c) => setActiveCurrency(c)}
      />
    );
  }

  // 2. Render Onboarding Wizard
  if (appMode === "onboarding") {
    return (
      <OnboardingWizard
        initialPrompt={initialNichePrompt}
        onComplete={handleOnboardingComplete}
        onCancel={() => setAppMode("workspace")}
      />
    );
  }

  // 3. Render Full AI Business OS Workspace
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header
          profile={profile}
          subscription={subscription}
          activeCurrency={activeCurrency}
          onCurrencyChange={(c) => setActiveCurrency(c)}
          onNavigate={(tab) => setActiveTab(tab as ActiveTab)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onViewLanding={() => setAppMode("landing")}
          onStartDemoTutorial={() => setIsDemoTutorialOpen(true)}
        />

        {/* Dynamic OS Module View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardOverview
              profile={profile}
              leads={leads}
              priorities={priorities}
              website={website}
              activeCurrency={activeCurrency}
              onNavigate={(tab) => setActiveTab(tab)}
              onTogglePriority={handleTogglePriority}
              onAskAi={handleAskAi}
              onStartDemoTutorial={() => setIsDemoTutorialOpen(true)}
            />
          )}

          {activeTab === "domains" && (
            <DomainRegistrarView
              profile={profile}
              currency={activeCurrency}
              subscription={subscription}
              onNavigateToHosting={() => setActiveTab("hosting")}
              onNavigateToWebsite={() => setActiveTab("website-builder")}
            />
          )}

          {activeTab === "hosting" && (
            <CloudHostingView
              profile={profile}
              currency={activeCurrency}
              onNavigateToWebsite={() => setActiveTab("website-builder")}
              onNavigateToDomains={() => setActiveTab("domains")}
            />
          )}

          {activeTab === "webmail" && (
            <WebmailSuiteView
              profile={profile}
              currency={activeCurrency}
            />
          )}

          {activeTab === "ssl-security" && (
            <SslSecurityView
              profile={profile}
              currency={activeCurrency}
            />
          )}

          {activeTab === "infra-status" && (
            <InfraStatusView
              profile={profile}
              currency={activeCurrency}
            />
          )}

          {activeTab === "domain-comparison" && (
            <RegistrarComparisonView
              onNavigateToSearch={() => setActiveTab("domains")}
              onNavigateToHosting={() => setActiveTab("hosting")}
            />
          )}

          {activeTab === "business-manager" && (
            <BusinessManagerView
              profile={profile}
              chatHistory={chatHistory}
              onSaveChat={(history) => setChatHistory(history)}
              onNavigateToModule={(mod) => setActiveTab(mod as ActiveTab)}
            />
          )}

          {activeTab === "daily-coach" && (
            <DailyCoachView
              profile={profile}
              priorities={priorities}
              onTogglePriority={handleTogglePriority}
              onAddPriority={handleAddPriority}
              onAskAi={handleAskAi}
            />
          )}

          {activeTab === "launch-wizard" && (
            <LaunchWizardView
              profile={profile}
              website={website}
              onUpdateProfile={(p) => setProfile(p)}
              onUpdateWebsite={(w) => setWebsite(w)}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "cac-compliance" && (
            <CacComplianceView
              profile={profile}
              activeCurrency={activeCurrency}
              onUpdateProfile={(p) => setProfile(p)}
            />
          )}

          {activeTab === "omni-inventory" && (
            <OmniInventoryView
              activeCurrency={activeCurrency}
            />
          )}

          {activeTab === "logistics" && (
            <LogisticsDispatchView
              activeCurrency={activeCurrency}
            />
          )}

          {activeTab === "smart-invoicing" && (
            <SmartInvoicingView
              profile={profile}
              activeCurrency={activeCurrency}
            />
          )}

          {activeTab === "competitor-spy" && (
            <CompetitorSpyView
              profile={profile}
              activeCurrency={activeCurrency}
            />
          )}

          {activeTab === "website-builder" && (
            <WebsiteBuilderView
              profile={profile}
              website={website}
              activeCurrency={activeCurrency}
              onUpdateWebsite={(w) => setWebsite(w)}
              onNavigateToNext={() => setActiveTab("seo")}
              onNavigateToPrev={() => setActiveTab("hosting")}
              onLeadCaptured={(leadData) =>
                handleAddLead({
                  name: leadData.name || "Website Inquirer",
                  email: leadData.email || "inquiry@example.com",
                  phone: leadData.phone || "+2348000000000",
                  dealValue: leadData.dealValue || 150000,
                  currency: activeCurrency,
                  stage: "NEW",
                  source: "Website Lead Form",
                  notes: leadData.notes || "Lead submitted via live website preview.",
                  lastInteraction: "Just now",
                })
              }
            />
          )}

          {activeTab === "branding" && (
            <BrandKitView
              profile={profile}
              onUpdateProfile={(p) => setProfile(p)}
            />
          )}

          {activeTab === "email-broadcaster" && (
            <EmailBroadcasterView
              profile={profile}
              activeCurrency={activeCurrency}
            />
          )}

          {activeTab === "marketing" && (
            <MarketingAndAdsView profile={profile} />
          )}

          {activeTab === "content-factory" && (
            <ContentFactoryView profile={profile} />
          )}

          {activeTab === "seo" && (
            <SeoStudioView profile={profile} website={website} />
          )}

          {activeTab === "leads" && (
            <LeadGenFunnelsView profile={profile} />
          )}

          {activeTab === "sales" && (
            <SalesStudioView profile={profile} activeCurrency={activeCurrency} />
          )}

          {activeTab === "crm" && (
            <CrmPipelineView
              leads={leads}
              profile={profile}
              activeCurrency={activeCurrency}
              onUpdateLeadStage={handleUpdateLeadStage}
              onAddLead={handleAddLead}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === "whatsapp" && (
            <WhatsAppCenterView profile={profile} />
          )}

          {activeTab === "automations" && (
            <AutomationsView profile={profile} />
          )}

          {activeTab === "analytics" && (
            <AnalyticsView
              profile={profile}
              leads={leads}
              activeCurrency={activeCurrency}
            />
          )}

          {activeTab === "billing" && (
            <BillingAndCreditsView
              subscription={subscription}
              activeCurrency={activeCurrency}
              onUpgradePlan={handleUpgradePlan}
            />
          )}

          {activeTab === "integrations" && (
            <IntegrationsView />
          )}

          {activeTab === "admin" && (
            <AdminDashboardView />
          )}
        </main>
      </div>

      {/* Synchronized 8-Step Guided Demo Tutorial Walkthrough */}
      <DemoTutorialGuide
        isOpen={isDemoTutorialOpen}
        onClose={() => setIsDemoTutorialOpen(false)}
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}

export default App;
