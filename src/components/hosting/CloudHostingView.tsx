import React, { useState, useEffect } from "react";
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  ShieldCheck,
  Zap,
  Mail,
  RefreshCw,
  Lock,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Globe,
  Radio,
  FileCode,
  Download,
  AlertTriangle,
  RotateCcw,
  Database,
  Folder,
  FolderPlus,
  FileText,
  Terminal,
  Play,
  Layers,
  ChevronRight,
  Sparkles,
  Gauge,
  Sliders,
  Check,
  Copy,
} from "lucide-react";
import {
  BusinessProfile,
  CloudHostingServer,
  BusinessEmailAccount,
  CurrencyCode,
  HostingPlan,
  HostingFileItem,
  DatabaseInstance,
  CronJobItem,
  WordPressSiteInstance,
} from "../../types";
import {
  INITIAL_HOSTING_SERVERS,
  INITIAL_BUSINESS_EMAILS,
  HOSTING_PLANS,
} from "../../data/initialData";
import {
  fetchServerTelemetry,
  fetchHostingFiles,
  createHostingDatabase,
  createHostingCronJob,
  installWordPressSite,
} from "../../services/api";

interface Props {
  profile: BusinessProfile;
  currency: CurrencyCode;
  onNavigateToWebsite?: () => void;
  onNavigateToDomains?: () => void;
}

export const CloudHostingView: React.FC<Props> = ({
  profile,
  currency,
  onNavigateToWebsite,
  onNavigateToDomains,
}) => {
  const defaultServer: CloudHostingServer = INITIAL_HOSTING_SERVERS[0] || {
    id: "srv_los_01",
    name: "Lagos Enterprise Node (MDXi Datacenter)",
    domain: profile.domain || "naijaflavors.ng",
    status: "ACTIVE",
    ipAddress: "102.134.42.88",
    ipv6Address: "2a01:4f8:c010:d::1",
    location: "Lagos, Nigeria (Rack Centre MDXi)",
    regionCode: "LOS-1",
    memoryUsed: "1.42 GB",
    memoryTotal: "8.00 GB",
    storageUsed: "18.4 GB NVMe",
    storageTotal: "120.0 GB NVMe",
    bandwidthUsed: "84.2 GB",
    bandwidthTotal: "Unlimited (10 Gbps Uplink)",
    uptime: "99.994%",
    sslActive: true,
    http3Enabled: true,
    ddosProtected: true,
    autoBackups: true,
    nodeVersion: "Node.js 22 LTS / Edge Workers",
    phpVersion: "PHP 8.3 (OPcache Enabled)",
    lastBackupTime: "Today at 03:00 AM (Automated Snapshot)",
    specs: {
      cpuUsage: 14,
      ramUsage: 28,
      diskUsage: 15,
      bandwidthUsage: 8,
      ipAddress: "102.134.42.88",
      phpVersion: "PHP 8.3 (OPcache)",
    },
  };

  const [servers, setServers] = useState<CloudHostingServer[]>(
    INITIAL_HOSTING_SERVERS.length > 0 ? INITIAL_HOSTING_SERVERS : [defaultServer]
  );
  const [activeServer, setActiveServer] = useState<CloudHostingServer>(
    INITIAL_HOSTING_SERVERS[0] || defaultServer
  );
  const [emails, setEmails] = useState<BusinessEmailAccount[]>(INITIAL_BUSINESS_EMAILS);

  const currentServer: CloudHostingServer = activeServer || servers[0] || defaultServer;
  const currentSpecs = {
    cpuUsage: currentServer?.specs?.cpuUsage ?? 14,
    ramUsage: currentServer?.specs?.ramUsage ?? 28,
    diskUsage: currentServer?.specs?.diskUsage ?? 15,
    bandwidthUsage: currentServer?.specs?.bandwidthUsage ?? 8,
    ipAddress: currentServer?.specs?.ipAddress || currentServer?.ipAddress || "102.134.42.88",
    phpVersion: currentServer?.specs?.phpVersion || currentServer?.phpVersion || "PHP 8.3",
  };

  // Tab State
  const [activeTab, setActiveTab] = useState<
    "overview" | "plans" | "files" | "databases" | "wordpress" | "cron" | "backups" | "logs"
  >("overview");

  // Telemetry & Operations
  const [isPurgingCache, setIsPurgingCache] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);
  const [isRestoringBackup, setIsRestoringBackup] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  // File Manager State
  const [filesList, setFilesList] = useState<HostingFileItem[]>(currentServer?.files || []);
  const [currentDirectory, setCurrentDirectory] = useState("/public_html");
  const [newFileName, setNewFileName] = useState("");
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  // Database Manager State
  const [databasesList, setDatabasesList] = useState<DatabaseInstance[]>(currentServer?.databases || []);
  const [newDbName, setNewDbName] = useState("");
  const [newDbUser, setNewDbUser] = useState("db_admin");
  const [newDbType, setNewDbType] = useState<"PostgreSQL 16" | "MySQL 8.0">("MySQL 8.0");
  const [isCreatingDb, setIsCreatingDb] = useState(false);

  // WordPress Suite State
  const [wpInstances, setWpInstances] = useState<WordPressSiteInstance[]>(
    currentServer?.wordpressSites || [
      {
        id: "wp_primary",
        domain: currentServer?.domain || "naijaflavors.ng",
        wpVersion: "6.7.2",
        phpVersion: "8.3",
        status: "HEALTHY",
        stagingActive: true,
        pluginsCount: 8,
        speedScore: 99,
        autoUpdate: true,
        adminUrl: `https://${currentServer?.domain || "naijaflavors.ng"}/wp-admin/`,
      },
    ]
  );
  const [isInstallingWp, setIsInstallingWp] = useState(false);
  const [newWpDomain, setNewWpDomain] = useState(currentServer?.domain || "naijaflavors.ng");
  const [newWpTitle, setNewWpTitle] = useState(profile.name || "Naija Flavors");
  const [newWpAdminEmail, setNewWpAdminEmail] = useState(`admin@${currentServer?.domain || "naijaflavors.ng"}`);

  // Cron Manager State
  const [cronJobs, setCronJobs] = useState<CronJobItem[]>(currentServer?.cronJobs || []);
  const [newCronTitle, setNewCronTitle] = useState("");
  const [newCronCmd, setNewCronCmd] = useState("php /public_html/cron.php");
  const [newCronSched, setNewCronSched] = useState("0 * * * *");
  const [newCronReadable, setNewCronReadable] = useState("Every hour on the hour");

  // Copy helper
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePurgeEdgeCache = () => {
    setIsPurgingCache(true);
    setPurgeSuccess(false);
    setTimeout(() => {
      setIsPurgingCache(false);
      setPurgeSuccess(true);
      setTimeout(() => setPurgeSuccess(false), 3000);
    }, 1000);
  };

  const handleRestoreBackup = () => {
    if (!confirm("Are you sure you want to restore the latest snapshot? Your database and static files will be safely rolled back.")) return;
    setIsRestoringBackup(true);
    setRestoreSuccess(false);
    setTimeout(() => {
      setIsRestoringBackup(false);
      setRestoreSuccess(true);
      setTimeout(() => setRestoreSuccess(false), 3000);
    }, 1500);
  };

  const handleCreateDatabase = async () => {
    if (!newDbName.trim()) return;
    setIsCreatingDb(true);
    try {
      const res = await createHostingDatabase({
        dbName: newDbName.trim(),
        dbUser: newDbUser.trim(),
        dbType: newDbType,
      });
      if (res.database) {
        setDatabasesList([...databasesList, res.database]);
        setNewDbName("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingDb(false);
    }
  };

  const handleCreateCron = async () => {
    if (!newCronTitle.trim() || !newCronCmd.trim()) return;
    try {
      const res = await createHostingCronJob({
        title: newCronTitle.trim(),
        command: newCronCmd.trim(),
        schedule: newCronSched.trim(),
        readableSchedule: newCronReadable,
      });
      if (res.cronJob) {
        setCronJobs([...cronJobs, res.cronJob]);
        setNewCronTitle("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleInstallWordPress = async () => {
    setIsInstallingWp(true);
    try {
      const res = await installWordPressSite({
        domain: newWpDomain,
        siteTitle: newWpTitle,
        adminEmail: newWpAdminEmail,
      });
      if (res.instance) {
        setWpInstances([res.instance, ...wpInstances]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInstallingWp(false);
    }
  };

  return (
    <div id="cloud-hosting-container" className="space-y-8 pb-16">
      {/* Top Banner & Control Plane */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold tracking-wide">
              <Server className="w-3.5 h-3.5" />
              HIGH-PERFORMANCE EDGE HOSTING COCKPIT
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-white">
              Cloud Hosting & Infrastructure Control
            </h1>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Powered by LiteSpeed Enterprise, NVMe Gen4 storage, isolated containers, and Anycast Edge routing deployed across African and global internet exchanges.
            </p>
          </div>

          {/* Quick Node Telemetry Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 w-full lg:w-72 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Server Location</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <Radio className="w-3 h-3 animate-ping text-emerald-400" />
                {currentServer.location}
              </span>
            </div>
            <div className="flex justify-between text-xs border-t border-slate-700/60 pt-2 text-slate-300">
              <span>HTTP/3 QUIC:</span>
              <span className="text-emerald-400 font-semibold">Enabled</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>DDoS Scrubbing:</span>
              <span className="text-blue-400 font-semibold">12 Tbps Active</span>
            </div>
          </div>
        </div>

        {/* Hosting Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800 scrollbar-none">
          {[
            { id: "overview", label: "Server Overview", icon: Activity },
            { id: "plans", label: "Hosting Plans", icon: Layers },
            { id: "files", label: "File Manager", icon: Folder },
            { id: "databases", label: "Databases (SQL)", icon: Database },
            { id: "wordpress", label: "Managed WordPress", icon: Sparkles },
            { id: "cron", label: "Cron Jobs", icon: Clock },
            { id: "backups", label: "Snapshots & Backups", icon: RotateCcw },
            { id: "logs", label: "Live Server Logs", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SERVER OVERVIEW & RESOURCE GAUGES */}
      {/* ========================================================================= */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Resource Usage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CPU */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Compute (CPU)
                </span>
                <Cpu className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono">
                  {currentSpecs.cpuUsage}%
                </div>
                <div className="text-xs text-slate-500 mt-1">4 vCPU High-Frequency Cores</div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${currentSpecs.cpuUsage}%` }}
                />
              </div>
            </div>

            {/* RAM */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Memory (RAM)
                </span>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono">
                  {currentSpecs.ramUsage}%
                </div>
                <div className="text-xs text-slate-500 mt-1">1.12 GB of 8.00 GB DDR5</div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${currentSpecs.ramUsage}%` }}
                />
              </div>
            </div>

            {/* NVMe Disk */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  NVMe Storage
                </span>
                <HardDrive className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono">
                  {currentSpecs.diskUsage}%
                </div>
                <div className="text-xs text-slate-500 mt-1">3.4 GB of 50 GB NVMe Gen4</div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${currentSpecs.diskUsage}%` }}
                />
              </div>
            </div>

            {/* Bandwidth */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Edge Bandwidth
                </span>
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 font-mono">
                  {currentSpecs.bandwidthUsage}%
                </div>
                <div className="text-xs text-slate-500 mt-1">128 GB of Unlimited CDN</div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${currentSpecs.bandwidthUsage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Operations & Fast Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Active Virtual Container Details
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 block">Primary Domain</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block truncate">
                    {currentServer.domain}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 block">Dedicated IPv4</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                    {currentSpecs.ipAddress}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 block">PHP Engine</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                    {currentSpecs.phpVersion} (LiteSpeed)
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 block">SSL Certificate</span>
                  <span className="font-bold text-emerald-700 mt-0.5 block">
                    Let's Encrypt (Auto)
                  </span>
                </div>
              </div>

              {/* Edge Purge & Fast Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <button
                  onClick={handlePurgeEdgeCache}
                  disabled={isPurgingCache}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPurgingCache ? "animate-spin" : ""}`} />
                  {isPurgingCache ? "Purging 320+ Edge PoPs..." : "Purge Edge CDN Cache"}
                </button>

                {purgeSuccess && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Cache Purged Globally (0.28s)
                  </span>
                )}
              </div>
            </div>

            {/* Quick Access Cockpit */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  One-Click Cockpit
                </span>
                <h4 className="text-lg font-bold text-white">Direct Management Tools</h4>
                <p className="text-xs text-slate-400">
                  Instant deep links to database consoles, file explorer, and live logs.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("files")}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-amber-400" /> Open Web File Manager
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setActiveTab("databases")}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" /> Open SQL Console
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setActiveTab("wordpress")}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" /> Managed WordPress Suite
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HOSTING PLANS & UPGRADE CATALOG */}
      {/* ========================================================================= */}
      {activeTab === "plans" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                <Layers className="w-3.5 h-3.5" /> ELASTIC CLOUD SCALING
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Cloud Hosting Plans & Specifications
              </h2>
              <p className="text-slate-600 text-sm">
                Scale your storage, compute cores, and concurrent database connections on demand with zero downtime migrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {HOSTING_PLANS.map((plan) => {
                const isCurrent = plan.name === "Business Pro Cloud";
                return (
                  <div
                    key={plan.id}
                    className={`border rounded-3xl p-6 flex flex-col justify-between transition ${
                      isCurrent
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl ring-2 ring-emerald-500"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-900"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          isCurrent ? "text-emerald-400" : "text-blue-600"
                        }`}>
                          {plan.name}
                        </span>
                        {plan.popular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                            CURRENT PLAN
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono">
                          ₦{plan.priceNgn.toLocaleString()}{" "}
                          <span className={`text-xs font-normal ${isCurrent ? "text-slate-400" : "text-slate-500"}`}>
                            /month
                          </span>
                        </div>
                        <div className={`text-xs mt-0.5 ${isCurrent ? "text-slate-400" : "text-slate-500"}`}>
                          Approx. ${plan.priceUsd} USD /mo
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-700/50 text-xs">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{plan.nvmeStorage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{plan.ram} • {plan.vCpu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{plan.domainsAllowed}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{plan.freeEmails} Custom Email Inboxes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{plan.bandwidth}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4">
                      {isCurrent ? (
                        <div className="w-full py-2.5 text-center text-xs font-bold text-emerald-400 bg-slate-800 rounded-xl">
                          Active Subscription
                        </div>
                      ) : (
                        <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition">
                          Switch to {plan.name.split(" ")[0]}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: WEB FILE MANAGER COCKPIT */}
      {/* ========================================================================= */}
      {activeTab === "files" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Web File Explorer ({currentDirectory})
                </h3>
                <p className="text-xs text-slate-500">
                  Browse and edit static files, `.htaccess`, PHP scripts, and media assets.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const fname = prompt("Enter file name (e.g. index.html, robots.txt):");
                    if (fname) {
                      const newFile: HostingFileItem = {
                        id: "f_" + Date.now(),
                        name: fname,
                        path: `${currentDirectory}/${fname}`,
                        size: "1.2 KB",
                        modified: "Just now",
                        permissions: "0644",
                        type: "file",
                      };
                      setFilesList([...filesList, newFile]);
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> New File
                </button>
                <button
                  onClick={() => {
                    const dname = prompt("Enter folder name:");
                    if (dname) {
                      const newDir: HostingFileItem = {
                        id: "d_" + Date.now(),
                        name: dname,
                        path: `${currentDirectory}/${dname}`,
                        size: "4.0 KB",
                        modified: "Just now",
                        permissions: "0755",
                        type: "directory",
                      };
                      setFilesList([newDir, ...filesList]);
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <FolderPlus className="w-3.5 h-3.5" /> New Folder
                </button>
              </div>
            </div>

            {/* Files List Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold font-sans">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Permissions</th>
                    <th className="py-3 px-4">Last Modified</th>
                    <th className="py-3 px-4 text-right font-sans">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filesList.map((file, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 flex items-center gap-2">
                        {file.type === "directory" ? (
                          <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        )}
                        <span className="font-bold text-slate-900">{file.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{file.size}</td>
                      <td className="py-3 px-4 text-slate-500">{file.permissions}</td>
                      <td className="py-3 px-4 text-slate-500">{file.modified}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setFilesList(filesList.filter((_, i) => i !== idx));
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MANAGED DATABASES (POSTGRESQL & MYSQL) */}
      {/* ========================================================================= */}
      {activeTab === "databases" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Managed Relational Databases
                </h3>
                <p className="text-xs text-slate-500">
                  Provision PostgreSQL 16 and MySQL 8.0 instances with automatic backups and connection pooling.
                </p>
              </div>
            </div>

            {/* Create Database Form */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Create New Database Instance
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Database Engine</label>
                  <select
                    value={newDbType}
                    onChange={(e) => setNewDbType(e.target.value as any)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                  >
                    <option value="MySQL 8.0">MySQL 8.0 InnoDB</option>
                    <option value="PostgreSQL 16">PostgreSQL 16</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Database Name</label>
                  <input
                    type="text"
                    value={newDbName}
                    onChange={(e) => setNewDbName(e.target.value)}
                    placeholder="e.g. app_production"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Admin Username</label>
                  <input
                    type="text"
                    value={newDbUser}
                    onChange={(e) => setNewDbUser(e.target.value)}
                    placeholder="db_user"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleCreateDatabase}
                    disabled={isCreatingDb || !newDbName}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" /> Provision Database
                  </button>
                </div>
              </div>
            </div>

            {/* Active Databases List */}
            <div className="space-y-4">
              {databasesList.map((db) => (
                <div
                  key={db.id}
                  className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      <span className="font-mono font-bold text-base text-slate-900">{db.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {db.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      User: <span className="font-mono text-slate-700">{db.user}</span> • Size: {db.size} • Tables: {db.tablesCount}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleCopy(db.connectionUri || `mysql://${db.user}:***@localhost:3306/${db.name}`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Connection URI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MANAGED WORDPRESS SUITE */}
      {/* ========================================================================= */}
      {activeTab === "wordpress" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> 1-CLICK AUTONOMOUS CMS
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Managed WordPress Suite (LiteSpeed LSCache)
                </h3>
                <p className="text-xs text-slate-500">
                  One-click WordPress 6.7 installation, automatic staging environments, and speed optimization.
                </p>
              </div>
            </div>

            {/* WordPress Active Installations */}
            <div className="space-y-4">
              {wpInstances.map((wp) => (
                <div
                  key={wp.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl font-bold text-white">{wp.domain}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                          WP {wp.wpVersion} (PHP {wp.phpVersion})
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        LiteSpeed Cache Engine Active • 0.3s TTFB
                      </p>
                    </div>

                    <a
                      href={wp.adminUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open WP-Admin Cockpit
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/80 p-4 rounded-2xl space-y-1">
                      <span className="text-xs text-slate-400 font-medium">PageSpeed Score</span>
                      <div className="text-2xl font-bold text-emerald-400 font-mono">
                        {wp.speedScore} / 100
                      </div>
                      <div className="text-[11px] text-slate-400">Core Web Vitals Pass</div>
                    </div>
                    <div className="bg-slate-800/80 p-4 rounded-2xl space-y-1">
                      <span className="text-xs text-slate-400 font-medium">Staging Environment</span>
                      <div className="text-2xl font-bold text-blue-400 font-mono">Ready</div>
                      <div className="text-[11px] text-slate-400">staging.{wp.domain} clone</div>
                    </div>
                    <div className="bg-slate-800/80 p-4 rounded-2xl space-y-1">
                      <span className="text-xs text-slate-400 font-medium">Auto-Updates</span>
                      <div className="text-2xl font-bold text-purple-400 font-mono">Enabled</div>
                      <div className="text-[11px] text-slate-400">Core & security patches</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: CRON JOBS & SCHEDULED TASKS */}
      {/* ========================================================================= */}
      {activeTab === "cron" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Scheduled Tasks & Visual Cron Manager
              </h3>
              <p className="text-xs text-slate-500">
                Automate periodic tasks, billing scripts, backups, and API sync routines.
              </p>
            </div>

            {/* Create Cron Form */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Add New Cron Job
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Task Title</label>
                  <input
                    type="text"
                    value={newCronTitle}
                    onChange={(e) => setNewCronTitle(e.target.value)}
                    placeholder="e.g. Sync Invoices"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Command Line</label>
                  <input
                    type="text"
                    value={newCronCmd}
                    onChange={(e) => setNewCronCmd(e.target.value)}
                    placeholder="php /public_html/cron.php"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Schedule (Cron Syntax)</label>
                  <input
                    type="text"
                    value={newCronSched}
                    onChange={(e) => setNewCronSched(e.target.value)}
                    placeholder="0 * * * *"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCreateCron}
                  disabled={!newCronTitle || !newCronCmd}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" /> Save Scheduled Cron
                </button>
              </div>
            </div>

            {/* Cron Jobs List */}
            <div className="space-y-3">
              {cronJobs.map((cron) => (
                <div
                  key={cron.id}
                  className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs"
                >
                  <div>
                    <div className="font-sans font-bold text-slate-900 text-sm">{cron.title}</div>
                    <div className="text-slate-600 mt-0.5">{cron.command}</div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Schedule: {cron.schedule} ({cron.readableSchedule})
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-sans">
                    {cron.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: SNAPSHOTS & DISASTER RECOVERY */}
      {/* ========================================================================= */}
      {activeTab === "backups" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Disaster Recovery & Daily Snapshots
                </h3>
                <p className="text-xs text-slate-500">
                  Automated nightly backups stored across 3 geographically redundant regions.
                </p>
              </div>

              <button
                onClick={handleRestoreBackup}
                disabled={isRestoringBackup}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-2"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isRestoringBackup ? "animate-spin" : ""}`} />
                {isRestoringBackup ? "Restoring Database & Files..." : "Rollback to Today 03:00 AM"}
              </button>
            </div>

            {restoreSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Snapshot restored successfully!
              </div>
            )}

            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 text-xs font-mono">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 font-sans">Daily Snapshot #2026-08-19</div>
                  <div className="text-slate-500 text-[11px]">Full Backup • 3.42 GB • MD5 Verified</div>
                </div>
                <span className="text-emerald-700 font-bold font-sans">AVAILABLE</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 font-sans">Daily Snapshot #2026-08-18</div>
                  <div className="text-slate-500 text-[11px]">Full Backup • 3.39 GB • MD5 Verified</div>
                </div>
                <span className="text-emerald-700 font-bold font-sans">AVAILABLE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: LIVE SERVER LOGS STREAM */}
      {/* ========================================================================= */}
      {activeTab === "logs" && (
        <div className="space-y-8">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Live HTTP & LiteSpeed Access Log Stream</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                STREAMING (200 OK)
              </span>
            </div>

            <div className="space-y-2 text-slate-300 max-h-96 overflow-y-auto">
              <div className="text-slate-400">102.89.41.10 - - [19/Aug/2026:15:32:01 +0100] "GET / HTTP/2.0" 200 4821 "Lagos"</div>
              <div className="text-slate-400">197.210.52.88 - - [19/Aug/2026:15:32:04 +0100] "GET /api/menu HTTP/2.0" 200 1204 "Abuja"</div>
              <div className="text-slate-400">105.112.33.19 - - [19/Aug/2026:15:32:09 +0100] "POST /api/order HTTP/3.0" 201 892 "Port Harcourt"</div>
              <div className="text-slate-400">66.249.66.1 - - [19/Aug/2026:15:32:15 +0100] "GET /robots.txt HTTP/2.0" 200 142 "Googlebot"</div>
              <div className="text-emerald-400">[LSWS] LiteSpeed Web ADC Cache HIT on / (0.012s response)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
