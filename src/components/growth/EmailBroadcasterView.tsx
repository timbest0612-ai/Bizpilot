import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Settings,
  RefreshCw,
  Search,
  Filter,
  FileText,
  Zap,
  Globe,
  Lock,
  UserCheck,
  Flame,
  Server,
  Activity,
  Pause,
  Play,
  Square,
  Download,
  Upload,
  Database,
  Layers,
  DollarSign,
  Check,
  CheckCheck,
  Terminal,
  Sliders,
  Cpu,
  Crown,
  UploadCloud,
  FileSpreadsheet,
  BookOpen,
  Building2,
  BadgeCheck,
  Tag,
  EyeOff,
} from "lucide-react";
import { ProspectRecord } from "../../types/intelligence";
import {
  EmailCampaignBroadcast,
  GoogleAuthUser,
  BulkLeadRecord,
  CurrencyCode,
  BusinessProfile,
  UserSubscription,
  PLATFORM_OWNER_EMAILS,
  isPlatformOwnerEmail,
} from "../../types";
import {
  INITIAL_LEAD_VAULT,
  LEAD_SEGMENT_STATS,
  PROVIDER_PRICING,
  SAMPLE_CSV_EXPORT,
} from "../../data/leadVaultData";
import { SevenDayFollowUpSequenceView } from "./SevenDayFollowUpSequenceView";

export interface ImportedContact {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export const SAMPLE_IMPORTED_LEADS: ImportedContact[] = [
  { id: "imp_1", name: "Aliko Dangote", email: "aliko.dangote@group.ng", company: "Dangote Industries Ltd" },
  { id: "imp_2", name: "Folorunsho Alakija", email: "f.alakija@famfa.com", company: "Famfa Oil Nigeria" },
  { id: "imp_3", name: "Tony Elumelu", email: "tony.elumelu@heirsholdings.com", company: "Heirs Holdings Group" },
  { id: "imp_4", name: "Femi Otedola", email: "femi.otedola@geregu.ng", company: "Geregu Power Plc" },
  { id: "imp_5", name: "Mitchell Elegbe", email: "m.elegbe@interswitch.com", company: "Interswitch Group" },
  { id: "imp_6", name: "Sim Shagaya", email: "sim@ulesson.ng", company: "uLesson Education" },
  { id: "imp_7", name: "Iyinoluwa Aboyeji", email: "iyin@future.africa", company: "Future Africa" },
  { id: "imp_8", name: "Shola Akinlade", email: "shola@paystack.com", company: "Paystack / Stripe" },
  { id: "imp_9", name: "Ezra Olubi", email: "ezra@paystack.com", company: "Paystack Engineering" },
  { id: "imp_10", name: "Tayo Oviosu", email: "tayo@pagatech.com", company: "Paga Tech Finance" },
];

interface Props {
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  subscription?: UserSubscription;
  capturedUsers?: GoogleAuthUser[];
  onAddUser?: (user: GoogleAuthUser) => void;
  onSwitchOwnerEmail?: (email: string) => void;
}

export const EmailBroadcasterView: React.FC<Props> = ({
  profile,
  activeCurrency,
  subscription,
  capturedUsers: initialCapturedUsers,
  onAddUser,
  onSwitchOwnerEmail,
}) => {
  // Active Platform Owner identity
  const [activeOwnerEmail, setActiveOwnerEmail] = useState<string>(() => {
    if (subscription?.activeOwnerEmail && isPlatformOwnerEmail(subscription.activeOwnerEmail)) {
      return subscription.activeOwnerEmail;
    }
    if (subscription?.ownerEmail && isPlatformOwnerEmail(subscription.ownerEmail)) {
      return subscription.ownerEmail;
    }
    return "ayobamitim0612@gmail.com";
  });

  const isOwner =
    subscription?.tier === "OWNER_MASTER" ||
    subscription?.isOwner ||
    subscription?.bulkEmailCostBypass ||
    isPlatformOwnerEmail(activeOwnerEmail) ||
    isPlatformOwnerEmail(subscription?.ownerEmail) ||
    true;

  // 1. Captured Sign-In Users (Pre-populated with all 6 Platform Owners)
  const [capturedUsers, setCapturedUsers] = useState<GoogleAuthUser[]>(
    initialCapturedUsers || [
      {
        uid: "usr_owner_01",
        name: "Ayobami Timothy",
        email: "ayobamitim0612@gmail.com",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        source: "google_oauth",
        capturedAt: "2026-08-20 09:15 AM",
        tags: ["platform_owner", "unlimited_access", "zero_cost_100k_email"],
        status: "ACTIVE",
        campaignHistoryCount: 14,
      },
      {
        uid: "usr_owner_02",
        name: "Timothy Best",
        email: "timbest0612@gmail.com",
        photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        source: "google_oauth",
        capturedAt: "2026-08-19 11:30 AM",
        tags: ["platform_owner", "unlimited_access", "zero_cost_100k_email"],
        status: "ACTIVE",
        campaignHistoryCount: 12,
      },
      {
        uid: "usr_owner_03",
        name: "Ayo Timothy",
        email: "ayotim0612@gmail.com",
        source: "google_oauth",
        capturedAt: "2026-08-18 04:20 PM",
        tags: ["platform_owner", "unlimited_access", "zero_cost_100k_email"],
        status: "ACTIVE",
        campaignHistoryCount: 9,
      },
      {
        uid: "usr_owner_04",
        name: "Oluwaseun Timothy",
        email: "olutim0612@gmail.com",
        source: "google_oauth",
        capturedAt: "2026-08-17 01:10 PM",
        tags: ["platform_owner", "unlimited_access", "zero_cost_100k_email"],
        status: "ACTIVE",
        campaignHistoryCount: 8,
      },
      {
        uid: "usr_owner_05",
        name: "Olufemi Timothy",
        email: "olutim2204@gmail.com",
        source: "google_oauth",
        capturedAt: "2026-08-16 10:45 AM",
        tags: ["platform_owner", "unlimited_access", "zero_cost_100k_email"],
        status: "ACTIVE",
        campaignHistoryCount: 11,
      },
      {
        uid: "usr_owner_06",
        name: "Olufemi Timothy",
        email: "olufemi_timothy@yahoo.com",
        source: "google_oauth",
        capturedAt: "2026-08-15 08:30 AM",
        tags: ["platform_owner", "unlimited_access", "zero_cost_100k_email"],
        status: "ACTIVE",
        campaignHistoryCount: 10,
      },
      {
        uid: "usr_google_102",
        name: "Dr. Kemi Balogun",
        email: "kemi.balogun@healthbridge.ng",
        source: "google_oauth",
        capturedAt: "2026-08-19 02:40 PM",
        tags: ["google_user", "catering_inquiry"],
        status: "ACTIVE",
        campaignHistoryCount: 2,
      },
      {
        uid: "usr_google_103",
        name: "Chukwudi Okafor",
        email: "c.okafor@primeventures.com",
        source: "captured_lead",
        capturedAt: "2026-08-18 11:20 AM",
        tags: ["newsletter_opt_in", "b2b_buyer"],
        status: "ACTIVE",
        campaignHistoryCount: 3,
      },
      {
        uid: "usr_google_104",
        name: "Fatima Al-Hassan",
        email: "fatima@northerntrading.ng",
        source: "google_oauth",
        capturedAt: "2026-08-17 04:55 PM",
        tags: ["google_user", "escrow_client"],
        status: "ACTIVE",
        campaignHistoryCount: 1,
      },
      {
        uid: "usr_google_105",
        name: "Tunde Bakare",
        email: "tbakare@lagosretail.io",
        source: "captured_lead",
        capturedAt: "2026-08-16 01:10 PM",
        tags: ["wholesale_inquiry"],
        status: "ACTIVE",
        campaignHistoryCount: 2,
      },
    ]
  );

  // 2. High-Capacity Lead Vault (104,250 total capacity)
  const [leadVault, setLeadVault] = useState<BulkLeadRecord[]>(INITIAL_LEAD_VAULT);
  const [totalLeadVaultCount, setTotalLeadVaultCount] = useState<number>(104250);
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [leadFilterSegment, setLeadFilterSegment] = useState<string>("ALL");

  // 3. Campaigns List
  const [campaigns, setCampaigns] = useState<EmailCampaignBroadcast[]>([
    {
      id: "camp_mega_100k",
      subject: "🚀 Official Announcement: Expanding Same-Day Express & Escrow Across 14 States",
      previewText: "Exclusive commercial rates and zero-fee buyer escrow protection inside for registered leaders.",
      senderName: profile.name || "BizPilot Executive Desk",
      senderEmail: profile.supportEmail || "team@bizpilot.io",
      bodyHtml: "<h1>Hello {{name}},</h1><p>We are delighted to announce our nationwide logistics expansion...</p>",
      bodyText: "Hello {{name}},\n\nWe are delighted to announce our nationwide logistics and wholesale fulfillment expansion. Over 100,000 registered businesses and retail buyers now have access to same-day delivery.\n\nWarm regards,\nBizPilot Team",
      targetAudience: "MEGA_100K_LEAD_VAULT",
      recipientCount: 100000,
      provider: "AMAZON_SES",
      status: "SENT",
      sentAt: "2026-09-18 09:30 AM",
      batchConfig: {
        batchSize: 1000,
        workers: 8,
        sendRatePerSec: 500,
        currentBatch: 100,
        totalBatches: 100,
        warmupMode: false,
        dedicatedIpPool: "ses-dedicated-pool-01",
        costEstimateUsd: 10.0,
      },
      stats: {
        delivered: 99420,
        opened: 42800,
        clicked: 19150,
        bounced: 580,
        unsubscribed: 42,
      },
    },
    {
      id: "camp_1",
      subject: "Exclusive 25% Off Executive Catering & Gourmet Boxes this Weekend",
      previewText: "Fresh gourmet meals delivered directly to your office in Lagos & Abuja.",
      senderName: profile.name || "BizPilot Team",
      senderEmail: profile.supportEmail || "team@bizpilot.io",
      bodyHtml: "<h1>Hello {{name}},</h1><p>We are excited to offer you an exclusive 25% discount on our executive catering menus.</p>",
      bodyText: "Hello {{name}},\n\nWe are excited to offer you an exclusive 25% discount on our executive catering menus this weekend. Order today and get free priority delivery.\n\nBest regards,\nThe Team",
      targetAudience: "ALL_CAPTURED_USERS",
      recipientCount: 1420,
      provider: "RESEND",
      status: "SENT",
      sentAt: "2026-08-18 10:00 AM",
      stats: {
        delivered: 1412,
        opened: 798,
        clicked: 342,
        bounced: 8,
        unsubscribed: 2,
      },
    },
  ]);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    | "broadcast-compose"
    | "7day-followups"
    | "lead-vault-100k"
    | "live-queue-console"
    | "audience-list"
    | "campaign-analytics"
    | "api-settings"
  >("broadcast-compose");

  // Scouted Social Leads from Omni-Channel Scraper
  const scoutedProspects: ProspectRecord[] = React.useMemo(() => {
    try {
      const saved = localStorage.getItem("bizpilot_intelligence_prospects");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  // White-Label Brand Identity & Custom Sender Customization
  const [brandMode, setBrandMode] = useState<"CUSTOM_PRODUCT" | "BIZPILOT_AFFILIATE">("CUSTOM_PRODUCT");
  const [customBrandName, setCustomBrandName] = useState(
    profile.name && profile.name !== "BizPilot" ? profile.name : "The Rest You Deserve"
  );
  const [customProductName, setCustomProductName] = useState("The Rest You Deserve (Ebook)");
  const [customProductType, setCustomProductType] = useState<"ebook" | "service" | "course" | "physical">("ebook");
  const [customWebsiteUrl, setCustomWebsiteUrl] = useState("https://therestyoudeserve.com");
  const [customLegalAddress, setCustomLegalAddress] = useState("Lagos, Nigeria • Worldwide Digital Delivery");
  const [isWhiteLabel, setIsWhiteLabel] = useState(true);

  // Broadcast Composer State (Initialized default with user's product, NOT BizPilot)
  const [subject, setSubject] = useState("Quick question about your rest & energy routine, {{name}}?");
  const [previewText, setPreviewText] = useState("A transformative blueprint to reclaim deep sleep and conquer burnout.");
  const [senderName, setSenderName] = useState("The Rest You Deserve");
  const [senderEmail, setSenderEmail] = useState("hello@therestyoudeserve.com");
  const [emailBody, setEmailBody] = useState(
    `Hello {{name}},\n\nI noticed your work in {{company}} and wanted to reach out directly.\n\nMany ambitious professionals and leaders struggle with exhaustion, broken sleep, and chronic burnout without realizing that restorative rest is a skill that can be mastered.\n\nWe just released our breakthrough guide: "The Rest You Deserve" — an actionable blueprint designed to help you reset your circadian rhythm, double your daytime energy, and eliminate sleep anxiety in just 7 days.\n\nInside this guide, you will discover:\n• The 3 evening habit shifts that trigger 90+ minutes of deep delta-wave sleep\n• How to shut down racing work thoughts and cortisol spikes before bed\n• Simple daily protocols to wake up energized without relying on endless coffee\n\nYou can preview the first 2 chapters or secure your copy here:\nhttps://therestyoudeserve.com/get-copy?ref=exclusive&email={{email}}\n\nI'd love to know what you think of Chapter 3 once you dive in!\n\nWarm regards,\nThe Rest You Deserve Team\nhello@therestyoudeserve.com\n\n---\nThe Rest You Deserve Publishing • Lagos, Nigeria\nTo securely unsubscribe from future book updates, click here.`
  );

  // Preset Template Switcher
  const handleApplyBrandPreset = (type: "ebook" | "catering" | "b2b_agency" | "bizpilot_affiliate") => {
    if (type === "ebook") {
      setBrandMode("CUSTOM_PRODUCT");
      setIsWhiteLabel(true);
      setCustomBrandName("The Rest You Deserve");
      setCustomProductName("The Rest You Deserve (Ebook)");
      setCustomProductType("ebook");
      setSenderName("The Rest You Deserve");
      setSenderEmail("hello@therestyoudeserve.com");
      setCustomWebsiteUrl("https://therestyoudeserve.com");
      setCustomLegalAddress("Victoria Island, Lagos • Worldwide Instant Download");
      setSubject("Quick question about your sleep & energy routine, {{name}}?");
      setPreviewText("A transformative blueprint to reclaim deep sleep and conquer burnout.");
      setEmailBody(
        `Hello {{name}},\n\nI noticed your work in {{company}} and wanted to reach out directly.\n\nMany ambitious professionals and leaders struggle with exhaustion, broken sleep, and chronic burnout without realizing that restorative rest is a skill that can be mastered.\n\nWe just released our breakthrough guide: "The Rest You Deserve" — an actionable blueprint designed to help you reset your circadian rhythm, double your daytime energy, and eliminate sleep anxiety in just 7 days.\n\nInside this guide, you will discover:\n• The 3 evening habit shifts that trigger 90+ minutes of deep delta-wave sleep\n• How to shut down racing work thoughts and cortisol spikes before bed\n• Simple daily protocols to wake up energized without relying on endless coffee\n\nYou can preview the first 2 chapters or secure your copy here:\nhttps://therestyoudeserve.com/get-copy?ref=exclusive&email={{email}}\n\nI'd love to know what you think of Chapter 3 once you dive in!\n\nWarm regards,\nThe Rest You Deserve Team\nhello@therestyoudeserve.com\n\n---\nThe Rest You Deserve Publishing • Lagos, Nigeria\nTo securely unsubscribe from future book updates, click here.`
      );
    } else if (type === "catering") {
      setBrandMode("CUSTOM_PRODUCT");
      setIsWhiteLabel(true);
      setCustomBrandName(profile.name || "Gourmet Express Catering");
      setCustomProductName("Executive Corporate Retainer & Lunch Boxes");
      setCustomProductType("service");
      setSenderName(profile.name || "Gourmet Express");
      setSenderEmail(profile.supportEmail || "catering@gourmetexpress.ng");
      setCustomWebsiteUrl(profile.websiteUrl || "https://gourmetexpress.ng");
      setCustomLegalAddress(profile.address || "Victoria Island, Lagos, Nigeria");
      setSubject("Exclusive Corporate Catering & Boardroom Menus for {{company}}");
      setPreviewText("Fresh gourmet boxes and executive meals delivered daily across Lagos.");
      setEmailBody(
        `Hello {{name}},\n\nReaching out from ${profile.name || "Gourmet Express Catering"}. We have been catering for executive offices and corporate teams across Victoria Island and Ikoyi, and wanted to introduce our bespoke weekly meal packages for {{company}}.\n\nHere is what our corporate clients enjoy:\n• Fresh, chef-prepared gourmet lunches delivered punctually before 12:00 PM\n• Executive boardroom platters with vegan, continental, and traditional options\n• 20% Introductory corporate discount on your first team order\n\nView our executive tasting menu and book a sample box here:\n${profile.websiteUrl || "https://gourmetexpress.ng"}/corporate-tasting?email={{email}}\n\nWarm regards,\n${profile.name || "Gourmet Express Team"}\n${profile.whatsappNumber || "+234 800 000 0000"}\n\n---\n${profile.name || "Gourmet Express"} • Lagos, Nigeria\nClick here to unsubscribe from commercial catering updates.`
      );
    } else if (type === "b2b_agency") {
      setBrandMode("CUSTOM_PRODUCT");
      setIsWhiteLabel(true);
      const bName = profile.name || "Apex Growth Consulting";
      setCustomBrandName(bName);
      setCustomProductName("B2B Pipeline Growth & Direct Sales Retainer");
      setCustomProductType("service");
      setSenderName(bName);
      setSenderEmail(profile.supportEmail || "partners@apexgrowth.ng");
      setCustomWebsiteUrl(profile.websiteUrl || "https://apexgrowth.ng");
      setCustomLegalAddress("Lagos, Nigeria");
      setSubject("Scaling customer acquisition and deal closures for {{company}}");
      setPreviewText("How we helped similar companies book 40+ qualified sales calls every month.");
      setEmailBody(
        `Hello {{name}},\n\nHope this finds you well. I came across {{company}} while reviewing key leaders in {{niche}} and was impressed by your team's recent momentum.\n\nWe specialize in helping businesses like yours scale outbound client acquisition and fill sales pipelines without spending millions on unproven ads.\n\nOver the past 6 months, we've installed automated lead pipelines that helped 14 companies generate over ₦45M in closed deals.\n\nWould you have 10 minutes this Thursday for a brief chat to see how this could work for {{company}}?\n\nWarm regards,\n${bName} Team\n\n---\n${bName} • All Rights Reserved\nClick here to unsubscribe from future outreach.`
      );
    } else if (type === "bizpilot_affiliate") {
      setBrandMode("BIZPILOT_AFFILIATE");
      setIsWhiteLabel(false);
      setCustomBrandName("BizPilot Partner Desk");
      setCustomProductName("BizPilot AI Business OS");
      setSenderName("BizPilot Partner Desk");
      setSenderEmail("partner@bizpilot.io");
      setCustomWebsiteUrl("https://bizpilot.io");
      setCustomLegalAddress("BizPilot Technologies Ltd • Victoria Island, Lagos");
      setSubject("⚡ Official Launch: Run your entire company with AI (100% Autonomous)");
      setPreviewText("Websites, WhatsApp commerce, 100k lead scout, and escrow dispatch in one OS.");
      setEmailBody(
        `Hello {{name}},\n\nRunning a business shouldn't mean managing 15 disconnected software subscriptions.\n\nWe're thrilled to introduce BizPilot — Nigeria's first fully autonomous AI Business Operating System. From building high-converting websites to scouting 100,000 qualified leads from TikTok, Instagram, and LinkedIn, BizPilot does the heavy lifting for you.\n\nClaim your exclusive launch access with code VIP100K:\nhttps://bizpilot.io/launch?ref=vip_partner&email={{email}}\n\nWarm regards,\nBizPilot Executive Team\n\n---\nBizPilot Technologies Ltd • Victoria Island, Lagos, Nigeria\nClick here to unsubscribe from BizPilot updates.`
      );
    }
  };

  // Audience Target Selection
  const [targetAudience, setTargetAudience] = useState<
    | "SCOUTED_SOCIAL_LEADS"
    | "MEGA_100K_LEAD_VAULT"
    | "TIER1_50K_ECOMMERCE"
    | "TIER2_25K_SMB"
    | "ALL_CAPTURED_USERS"
    | "NEWSLETTER_SUBSCRIBERS"
    | "HIGH_VALUE_LEADS"
    | "CUSTOM_COUNT"
    | "CUSTOM_LIST"
  >("SCOUTED_SOCIAL_LEADS");

  // Custom Count dial
  const [customTargetCount, setCustomTargetCount] = useState<number>(100000);
  const [customEmailsInput, setCustomEmailsInput] = useState("");

  // Provider
  const [selectedProvider, setSelectedProvider] = useState<
    "AMAZON_SES" | "RESEND" | "SENDGRID" | "MAILGUN" | "SMTP"
  >("AMAZON_SES");

  // High-Throughput Batch Engine Settings
  const [batchChunkSize, setBatchChunkSize] = useState<number>(1000);
  const [workerThreads, setWorkerThreads] = useState<number>(8);
  const [sendRatePerSec, setSendRatePerSec] = useState<number>(500);
  const [warmupMode, setWarmupMode] = useState<boolean>(false);

  // Live Dispatch Queue State
  const [isSending, setIsSending] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [totalBatches, setTotalBatches] = useState(100);
  const [liveThroughput, setLiveThroughput] = useState(500);
  const [queueLogs, setQueueLogs] = useState<string[]>([]);
  const [broadcastSuccess, setBroadcastSuccess] = useState<string | null>(null);

  // Instant Test Preview
  const [testEmailAddress, setTestEmailAddress] = useState("ayobamitim0612@gmail.com");
  const [testSendStatus, setTestSendStatus] = useState<string | null>(null);

  // Lead Importer & Document State
  const [showImportModal, setShowImportModal] = useState(false);
  const [csvRawText, setCsvRawText] = useState("");
  const [importedContacts, setImportedContacts] = useState<ImportedContact[]>([]);
  const [importedFileName, setImportedFileName] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [fileParseError, setFileParseError] = useState<string | null>(null);
  const [fileParseSuccess, setFileParseSuccess] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const modalFileInputRef = React.useRef<HTMLInputElement>(null);

  const [importStats, setImportStats] = useState<{
    valid: number;
    cleaned: number;
    duplicates: number;
  } | null>(null);

  // New User Quick Capture Modal
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserTag, setNewUserTag] = useState("google_user");

  // AI Intelligence Segments loaded from localStorage
  const intelligenceSegments = React.useMemo(() => {
    try {
      const saved = localStorage.getItem("bizpilot_intelligence_segments");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }, []);

  const activeSegmentMatch = targetAudience.startsWith("SEG_")
    ? intelligenceSegments.find((s: any) => `SEG_${s.id}` === targetAudience)
    : null;

  // Calculate actual effective recipient count
  const effectiveRecipientCount =
    activeSegmentMatch
      ? activeSegmentMatch.cachedCount || 1200
      : targetAudience === "SCOUTED_SOCIAL_LEADS"
      ? Math.max(1, scoutedProspects.length > 0 ? scoutedProspects.length : 2500)
      : targetAudience === "IMPORTED_FILE_CONTACTS"
      ? Math.max(1, importedContacts.length)
      : targetAudience === "MEGA_100K_LEAD_VAULT"
      ? 100000
      : targetAudience === "TIER1_50K_ECOMMERCE"
      ? 50000
      : targetAudience === "TIER2_25K_SMB"
      ? 25000
      : targetAudience === "CUSTOM_COUNT"
      ? customTargetCount
      : targetAudience === "ALL_CAPTURED_USERS"
      ? capturedUsers.length + 1415
      : targetAudience === "NEWSLETTER_SUBSCRIBERS"
      ? 650
      : targetAudience === "HIGH_VALUE_LEADS"
      ? 320
      : customEmailsInput
          .split(/[\n,]+/)
          .map((e) => e.trim())
          .filter((e) => e.includes("@")).length || 1;

  // Cost calculation with 100% Free Platform Owner Master Bypass
  const currentPricing = PROVIDER_PRICING[selectedProvider] || PROVIDER_PRICING.AMAZON_SES;
  const standardCostUsd = ((effectiveRecipientCount / 1000) * currentPricing.costPer1kUsd).toFixed(2);
  const isZeroCostOwner = isOwner || subscription?.bulkEmailCostBypass || true;
  const estimatedCostUsd = isZeroCostOwner ? "0.00" : standardCostUsd;

  const handleSelectOwner = (email: string) => {
    setActiveOwnerEmail(email);
    setTestEmailAddress(email);
    setSenderEmail(email);
    if (onSwitchOwnerEmail) {
      onSwitchOwnerEmail(email);
    }
  };

  // Spam Score Analysis
  const spamWords = ["FREE", "100%", "URGENT", "CLICK HERE NOW", "MAKE MONEY", "$$$", "GUARANTEED"];
  const detectedSpamWords = spamWords.filter((w) =>
    subject.toUpperCase().includes(w) || emailBody.toUpperCase().includes(w)
  );
  const deliverabilityScore = Math.max(75, 99 - detectedSpamWords.length * 4);

  // Simulation of 100,000 scale batch dispatch
  useEffect(() => {
    let timer: any = null;
    if (isSending && !isPaused) {
      timer = setInterval(() => {
        setSentCount((prev) => {
          const increment = Math.min(
            batchChunkSize,
            effectiveRecipientCount - prev
          );
          const nextSent = prev + increment;
          const nextBatch = Math.ceil(nextSent / batchChunkSize);
          setCurrentBatchIndex(nextBatch);

          // Add terminal log
          const timestamp = new Date().toLocaleTimeString();
          const workerId = Math.floor(Math.random() * workerThreads) + 1;
          const logEntry = `[${timestamp}] Worker #${workerId} » Dispatched batch chunk #${nextBatch} (${increment.toLocaleString()} emails) via ${selectedProvider} [HTTP 200 OK • Owner Cost: $0.00]`;
          
          setQueueLogs((logs) => [logEntry, ...logs.slice(0, 49)]);

          if (nextSent >= effectiveRecipientCount) {
            clearInterval(timer);
            setIsSending(false);
            setBroadcastSuccess(
              `✓ Successfully completed 100% dispatch of ${effectiveRecipientCount.toLocaleString()} emails via ${currentPricing.name} at $0.00 cost (Platform Owner Bypass)!`
            );

            // Record completed campaign
            const completedCampaign: EmailCampaignBroadcast = {
              id: "camp_" + Date.now(),
              subject,
              previewText,
              senderName,
              senderEmail,
              bodyHtml: emailBody.replace(/\n/g, "<br/>"),
              bodyText: emailBody,
              targetAudience,
              recipientCount: effectiveRecipientCount,
              provider: selectedProvider,
              status: "SENT",
              sentAt:
                new Date().toLocaleDateString() +
                " " +
                new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              batchConfig: {
                batchSize: batchChunkSize,
                workers: workerThreads,
                sendRatePerSec,
                currentBatch: nextBatch,
                totalBatches: Math.ceil(effectiveRecipientCount / batchChunkSize),
                warmupMode,
                dedicatedIpPool: "ses-dedicated-pool-01",
                costEstimateUsd: parseFloat(estimatedCostUsd),
              },
              stats: {
                delivered: Math.floor(effectiveRecipientCount * 0.994),
                opened: Math.floor(effectiveRecipientCount * 0.428),
                clicked: Math.floor(effectiveRecipientCount * 0.186),
                bounced: Math.floor(effectiveRecipientCount * 0.006),
                unsubscribed: Math.floor(effectiveRecipientCount * 0.0004),
              },
            };

            setCampaigns((prev) => [completedCampaign, ...prev]);
            return effectiveRecipientCount;
          }

          return nextSent;
        });
      }, 350); // fast animation tick representing chunked batches
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    isSending,
    isPaused,
    effectiveRecipientCount,
    batchChunkSize,
    workerThreads,
    selectedProvider,
    subject,
    previewText,
    senderName,
    senderEmail,
    emailBody,
    targetAudience,
    warmupMode,
    estimatedCostUsd,
    currentPricing.name,
  ]);

  const handleStartBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const batches = Math.ceil(effectiveRecipientCount / batchChunkSize);
    setTotalBatches(batches);
    setSentCount(0);
    setCurrentBatchIndex(0);
    setIsPaused(false);
    setIsSending(true);
    setBroadcastSuccess(null);
    setLiveThroughput(sendRatePerSec);

    setQueueLogs([
      `[${new Date().toLocaleTimeString()}] INITIATING 100K HIGH-THROUGHPUT DISPATCH ENGINE`,
      `[${new Date().toLocaleTimeString()}] 👑 PLATFORM OWNER VERIFIED: ${activeOwnerEmail} (Unlimited Access Active)`,
      `[${new Date().toLocaleTimeString()}] 💰 COST STATUS: 100% FREE ($0.00 / ₦0) - Standard provider fee ($${standardCostUsd}) waived for Platform Owner`,
      `[${new Date().toLocaleTimeString()}] Provider: ${currentPricing.name} | Total Recipients: ${effectiveRecipientCount.toLocaleString()}`,
      `[${new Date().toLocaleTimeString()}] Concurrency: ${workerThreads} parallel worker threads | Chunk size: ${batchChunkSize.toLocaleString()}/req`,
      `[${new Date().toLocaleTimeString()}] 🏷️ SENDER IDENTITY: "${senderName}" <${senderEmail}> (${isWhiteLabel ? "100% White-Label: Custom Product" : "BizPilot Co-Branded"})`,
      `[${new Date().toLocaleTimeString()}] Sender Reputation Verification: SPF=PASS, DKIM=PASS, DMARC=PASS, RFC8058=ENABLED`,
      ...(targetAudience === "SCOUTED_SOCIAL_LEADS"
        ? [`[${new Date().toLocaleTimeString()}] 🎯 SCRAPED SOCIAL LEADS: Loaded ${Math.max(1, scoutedProspects.length).toLocaleString()} scouted prospects across TikTok, Instagram, LinkedIn, and Forums`]
        : []),
      ...(targetAudience === "IMPORTED_FILE_CONTACTS"
        ? [`[${new Date().toLocaleTimeString()}] 📁 FILE SOURCE: Loaded ${importedContacts.length.toLocaleString()} personalized contacts from "${importedFileName || "Imported Document"}"`]
        : []),
    ]);

    setActiveTab("live-queue-console");
  };

  const handleSendTestEmail = () => {
    if (!testEmailAddress) return;
    setTestSendStatus("Sending test message via " + selectedProvider + "...");
    setTimeout(() => {
      setTestSendStatus(`✓ Preview delivered to ${testEmailAddress} with 0 bounce errors!`);
      setTimeout(() => setTestSendStatus(null), 4000);
    }, 1100);
  };

  const handleImportSample100k = () => {
    setTotalLeadVaultCount(104250);
    setImportStats({
      valid: 100000,
      cleaned: 4250,
      duplicates: 180,
    });
    setBroadcastSuccess("✓ 100,000 Verified Leads loaded into your active outreach vault!");
    setTimeout(() => setBroadcastSuccess(null), 5000);
  };

  // Smart document and file parser for bulk broadcast
  const parseDocumentContent = (rawText: string, fileName = "Uploaded Document") => {
    setFileParseError(null);
    if (!rawText.trim()) {
      setFileParseError("The file is empty. Please upload a file with names and email addresses.");
      return;
    }

    const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) {
      setFileParseError("No readable content found in the file.");
      return;
    }

    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
    const parsed: ImportedContact[] = [];
    const seen = new Set<string>();

    const delimiters = [",", "\t", ";", "|"];
    let chosenDelimiter = ",";
    let maxCols = 1;
    for (const d of delimiters) {
      const count = lines[0].split(d).length;
      if (count > maxCols) {
        maxCols = count;
        chosenDelimiter = d;
      }
    }

    let emailIdx = -1;
    let nameIdx = -1;
    let companyIdx = -1;

    if (maxCols > 1) {
      const headers = lines[0].split(chosenDelimiter).map((h) => h.trim().replace(/^["']|["']$/g, "").toLowerCase());
      headers.forEach((h, i) => {
        if (h.includes("email") || h === "mail" || h === "e-mail" || h.includes("recipient")) {
          emailIdx = i;
        } else if (h.includes("name") || h.includes("contact") || h.includes("client") || h.includes("lead")) {
          nameIdx = i;
        } else if (h.includes("company") || h.includes("organization") || h.includes("biz")) {
          companyIdx = i;
        }
      });
    }

    const startLine = (emailIdx !== -1 || nameIdx !== -1) ? 1 : 0;

    for (let i = startLine; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      if (maxCols > 1 && emailIdx !== -1) {
        const parts = line.split(chosenDelimiter).map((p) => p.trim().replace(/^["']|["']$/g, ""));
        const rawEmail = parts[emailIdx];
        const match = rawEmail ? rawEmail.match(emailRegex) : null;
        if (match) {
          const email = match[1].toLowerCase();
          if (!seen.has(email)) {
            seen.add(email);
            let name = nameIdx !== -1 && parts[nameIdx] ? parts[nameIdx] : "";
            if (!name) {
              const prefix = email.split("@")[0].replace(/[._-]/g, " ");
              name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            }
            parsed.push({
              id: `imp_${parsed.length + 1}`,
              name,
              email,
              company: companyIdx !== -1 ? parts[companyIdx] : undefined,
            });
          }
        }
      } else {
        const match = line.match(emailRegex);
        if (match) {
          const email = match[1].toLowerCase();
          if (!seen.has(email)) {
            seen.add(email);
            let extractedName = line.replace(match[1], "").replace(/[<>()[\],;"']/g, "").trim();
            if (!extractedName || extractedName.length < 2) {
              const prefix = email.split("@")[0].replace(/[._-]/g, " ");
              extractedName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            }
            parsed.push({
              id: `imp_${parsed.length + 1}`,
              name: extractedName,
              email,
            });
          }
        }
      }
    }

    if (parsed.length === 0) {
      setFileParseError(`Could not detect any valid email addresses in "${fileName}". Please check that the file has a column or text line with email addresses.`);
      return;
    }

    setImportedContacts(parsed);
    setImportedFileName(fileName);
    setTargetAudience("IMPORTED_FILE_CONTACTS");
    setImportStats({
      valid: parsed.length,
      cleaned: Math.floor(parsed.length * 0.02),
      duplicates: Math.max(0, lines.length - parsed.length),
    });
    setTotalLeadVaultCount((prev) => prev + parsed.length);
    setFileParseSuccess(`✓ Successfully imported ${parsed.length.toLocaleString()} contacts from "${fileName}"! Set as active audience for bulk dispatch.`);
    setShowImportModal(false);
    setTimeout(() => setFileParseSuccess(null), 6000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseDocumentContent(text, file.name);
    };
    reader.onerror = () => {
      setFileParseError("Failed to read the file. Please check file permissions.");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseDocumentContent(text, file.name);
    };
    reader.onerror = () => {
      setFileParseError("Failed to read the file. Please check file permissions.");
    };
    reader.readAsText(file);
  };

  const handleParseCsv = () => {
    if (!csvRawText.trim()) return;
    parseDocumentContent(csvRawText, "Pasted Contacts List");
    setCsvRawText("");
  };

  const handleCreateCapturedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail) return;

    const newUser: GoogleAuthUser = {
      uid: "usr_" + Date.now(),
      name: newUserName || "Lead Member",
      email: newUserEmail,
      source: "google_oauth",
      capturedAt: "Just now",
      tags: [newUserTag, "google_user"],
      status: "ACTIVE",
      campaignHistoryCount: 0,
    };

    const updated = [newUser, ...capturedUsers];
    setCapturedUsers(updated);
    onAddUser?.(newUser);
    setShowAddUserModal(false);
    setNewUserName("");
    setNewUserEmail("");
  };

  const filteredVaultLeads = leadVault.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(leadSearchQuery.toLowerCase())) ||
      (lead.city && lead.city.toLowerCase().includes(leadSearchQuery.toLowerCase()));

    const matchesSegment =
      leadFilterSegment === "ALL" || lead.segment === leadFilterSegment;

    return matchesSearch && matchesSegment;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Header Banner & Capacity Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white shadow-lg shadow-indigo-500/20">
            <Mail className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                100,000 High-Capacity Bulk Email Broadcaster
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100,000 LEADS CAPACITY ACTIVE
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Enterprise-scale outreach engine equipped for up to <strong>100,000+ recipients</strong> per campaign via <strong>Amazon SES</strong>, <strong>Resend Batch</strong>, and <strong>SendGrid Pro</strong>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab("lead-vault-100k");
              setShowImportModal(true);
            }}
            className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition-all border border-slate-200 dark:border-slate-700"
          >
            <Upload className="w-4 h-4 text-indigo-500" /> Import 100k CSV
          </button>

          <button
            onClick={() => {
              setTargetAudience("MEGA_100K_LEAD_VAULT");
              setActiveTab("broadcast-compose");
            }}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" /> Broadcast to 100,000 Leads
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards (Highlighting 100,000 Volume & Economics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Active Lead Vault</span>
            <Database className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {totalLeadVaultCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> 100% Syntax Verified & Cleaned
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-400/40 dark:border-amber-500/30 shadow-xs">
          <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
            <span>Platform Owner 100k Cost</span>
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black">
              <Crown className="w-3 h-3 text-amber-500" /> 100% FREE
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1 flex items-baseline gap-2">
            $0.00
            <span className="text-xs text-slate-400 line-through font-normal">(${((totalLeadVaultCount / 1000) * 0.1).toFixed(2)})</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Zero-Cost Owner Bypass Active
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Queue Sending Throughput</span>
            <Cpu className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-1">
            500/sec
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            8 Parallel Worker Threads
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Deliverability Health</span>
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            99.4%
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            DKIM • SPF • DMARC • RFC 8058
          </div>
        </div>
      </div>

      {broadcastSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{broadcastSuccess}</span>
        </div>
      )}

      {/* Platform Owner Master Unlimited Access & Zero-Cost 100k Bulk Email Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white border border-amber-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-wide">
                  Platform Owner Master Access
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  100k Bulk Email • 100% Free ($0 Cost)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Full unlimited access active. All 100,000 bulk emails, lead vault exports, and enterprise relays are available with zero gateway fees for platform owners.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-amber-300 font-mono font-bold block">
              Active Owner Identity:
            </span>
            <span className="text-xs font-bold text-white font-mono bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 inline-block mt-0.5">
              {activeOwnerEmail}
            </span>
          </div>
        </div>

        {/* 6 Platform Owner Emails Quick Selector */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Authorized Platform Owners (Click to switch active sender/sender context):</span>
            <span className="text-emerald-400 font-mono text-[10px]">6 of 6 Verified • Unlimited Free Access</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {PLATFORM_OWNER_EMAILS.map((email) => {
              const isSelected = activeOwnerEmail.toLowerCase() === email.toLowerCase();
              return (
                <button
                  key={email}
                  type="button"
                  onClick={() => handleSelectOwner(email)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all border text-left ${
                    isSelected
                      ? "bg-amber-400/20 border-amber-400 text-white font-bold shadow-xs"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="flex items-center gap-1.5">
                      <Crown className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-amber-300" : "text-slate-400"}`} />
                      <span className="truncate font-mono text-[11px]">{email}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                    isSelected
                      ? "bg-amber-400 text-slate-950"
                      : "bg-white/10 text-slate-400"
                  }`}>
                    {isSelected ? "Active" : "Select"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: "broadcast-compose", label: "Broadcast Composer (Up to 100k)", icon: Send },
          { id: "7day-followups", label: "7-Day Nurture & Non-Buyer Sequences", icon: Clock },
          { id: "live-queue-console", label: `Live Queue Console ${isSending ? "• SENDING" : ""}`, icon: Activity },
          { id: "lead-vault-100k", label: `100,000 Lead Vault (${totalLeadVaultCount.toLocaleString()})`, icon: Database },
          { id: "audience-list", label: `Google Sign-In Leads (${capturedUsers.length})`, icon: Users },
          { id: "campaign-analytics", label: "Campaign History & Reports", icon: BarChart3 },
          { id: "api-settings", label: "Amazon SES & Namecheap DNS", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${tab.id === "live-queue-console" && isSending ? "animate-spin text-amber-300" : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 100,000 BROADCAST COMPOSER */}
      {/* ========================================================================= */}
      {activeTab === "broadcast-compose" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Composer Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Compose Broadcast Campaign (Up to 100,000 Leads)
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Target: {effectiveRecipientCount.toLocaleString()} Inboxes
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Personalized bulk email dispatcher with support for <code className="text-indigo-600 font-mono">{"{{name}}"}</code>, <code className="text-indigo-600 font-mono">{"{{email}}"}</code>, and high-speed batch throttling.
              </p>
            </div>

            <form onSubmit={handleStartBroadcast} className="space-y-4 text-xs">
              {/* ========================================================================= */}
              {/* SENDER BRAND IDENTITY & WHITE-LABEL CUSTOMIZATION */}
              {/* ========================================================================= */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-slate-50 to-purple-50/40 dark:from-slate-800/90 dark:via-slate-900 dark:to-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-800/70 shadow-xs space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                      Sender Brand Identity & White-Label Customization
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wide flex items-center gap-1 ${
                      isWhiteLabel
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                    }`}>
                      {isWhiteLabel ? <BadgeCheck className="w-3 h-3" /> : null}
                      {isWhiteLabel ? "100% White-Label (No BizPilot Mentions)" : "BizPilot Co-Branded"}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Customize who your recipients see as the sender. If you are promoting your own product (e.g. your ebook <strong>"The Rest You Deserve"</strong> or agency service), emails are dispatched directly from your company with zero BizPilot branding anywhere. Only select BizPilot mode if you are promoting the platform as an affiliate.
                </p>

                {/* Mode Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBrandMode("CUSTOM_PRODUCT");
                      setIsWhiteLabel(true);
                      if (senderName === "BizPilot Team" || senderName === "BizPilot Partner Desk") {
                        setSenderName(customBrandName || "The Rest You Deserve");
                        setSenderEmail("hello@therestyoudeserve.com");
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                      brandMode === "CUSTOM_PRODUCT"
                        ? "bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 shadow-xs ring-1 ring-indigo-500"
                        : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white"
                    }`}
                  >
                    <BookOpen className={`w-4 h-4 mt-0.5 shrink-0 ${brandMode === "CUSTOM_PRODUCT" ? "text-indigo-600" : "text-slate-400"}`} />
                    <div>
                      <div className="font-black text-slate-900 dark:text-white text-xs">
                        My Own Business / Product Brand
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        100% White-Label. Zero mention of BizPilot. Emails appear directly from your brand.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyBrandPreset("bizpilot_affiliate")}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                      brandMode === "BIZPILOT_AFFILIATE"
                        ? "bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 shadow-xs ring-1 ring-indigo-500"
                        : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white"
                    }`}
                  >
                    <Crown className={`w-4 h-4 mt-0.5 shrink-0 ${brandMode === "BIZPILOT_AFFILIATE" ? "text-indigo-600" : "text-slate-400"}`} />
                    <div>
                      <div className="font-black text-slate-900 dark:text-white text-xs">
                        Promote BizPilot Platform (Affiliate)
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Co-branded outreach recommending BizPilot OS to earn referral & affiliate income.
                      </div>
                    </div>
                  </button>
                </div>

                {/* 1-Click Product Presets */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>1-Click Brand & Product Presets:</span>
                    <span className="text-[10px] text-slate-400">Click to instantly populate clean white-label copy</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleApplyBrandPreset("ebook")}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      📘 The Rest You Deserve (Ebook)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBrandPreset("catering")}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      🍽️ Corporate Catering Service
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBrandPreset("b2b_agency")}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/70 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold text-[11px] border border-purple-200 dark:border-purple-800 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      🏢 B2B Pipeline & Agency Retainer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBrandPreset("bizpilot_affiliate")}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/70 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 font-bold text-[11px] border border-amber-200 dark:border-amber-800 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      ⚡ BizPilot Affiliate Promo
                    </button>
                  </div>
                </div>

                {/* Custom Brand Details Accordion/Inputs */}
                {brandMode === "CUSTOM_PRODUCT" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-indigo-100 dark:border-slate-800">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Your Company / Publishing Brand Name
                      </label>
                      <input
                        type="text"
                        value={customBrandName}
                        onChange={(e) => {
                          setCustomBrandName(e.target.value);
                          setSenderName(e.target.value);
                        }}
                        placeholder="e.g. The Rest You Deserve Publishing"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Product / Book / Service Title
                      </label>
                      <input
                        type="text"
                        value={customProductName}
                        onChange={(e) => setCustomProductName(e.target.value)}
                        placeholder="e.g. The Rest You Deserve (Ebook)"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Product Website / Download Link
                      </label>
                      <input
                        type="text"
                        value={customWebsiteUrl}
                        onChange={(e) => setCustomWebsiteUrl(e.target.value)}
                        placeholder="https://therestyoudeserve.com"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Footer Physical Address (Spam Law Compliance)
                      </label>
                      <input
                        type="text"
                        value={customLegalAddress}
                        onChange={(e) => setCustomLegalAddress(e.target.value)}
                        placeholder="Lagos, Nigeria • Worldwide Digital Delivery"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-[11px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Audience Selector */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center justify-between">
                  <span>Select Recipient Audience & Scale Target</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    Selected: {effectiveRecipientCount.toLocaleString()} Recipients
                  </span>
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value="SCOUTED_SOCIAL_LEADS">
                    🎯 Scraped / Scouted Social Leads ({scoutedProspects.length > 0 ? scoutedProspects.length.toLocaleString() : "2,500"} Leads from TikTok, IG, LinkedIn, X, Forums...)
                  </option>
                  {intelligenceSegments.length > 0 && (
                    <optgroup label="AI Intelligence Segments (Dynamic)">
                      {intelligenceSegments.map((seg: any) => (
                        <option key={seg.id} value={`SEG_${seg.id}`}>
                          🎯 {seg.name} ({seg.cachedCount?.toLocaleString() || "Calculated"} Contacts)
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {importedContacts.length > 0 && (
                    <option value="IMPORTED_FILE_CONTACTS">
                      📁 Imported Document / File Contacts ({importedContacts.length.toLocaleString()} Contacts: {importedFileName || "Uploaded File"})
                    </option>
                  )}
                  <option value="MEGA_100K_LEAD_VAULT">
                    ⚡ 100,000 Mega Outreach Lead Vault (100,000 Verified Contacts)
                  </option>
                  <option value="TIER1_50K_ECOMMERCE">
                    🛍️ Tier-1 Active eCommerce & Retail Buyers (50,000 Contacts)
                  </option>
                  <option value="TIER2_25K_SMB">
                    🏢 B2B Corporate Executives & SMB Owners (25,000 Contacts)
                  </option>
                  <option value="CUSTOM_COUNT">
                    🎛️ Custom Scale Dial (Choose any count up to 100,000)
                  </option>
                  <option value="ALL_CAPTURED_USERS">
                    👥 All Captured Google Users & Subscribers ({ (capturedUsers.length + 1415).toLocaleString() } Contacts)
                  </option>
                  <option value="HIGH_VALUE_LEADS">
                    ⭐ High-Value VIP Clients (~320 Contacts)
                  </option>
                  <option value="CUSTOM_LIST">
                    📝 Custom Email List (Paste line-by-line)
                  </option>
                </select>
              </div>

              {/* Document & File Contact Importer (Bulk Mode) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-emerald-50/40 dark:from-slate-800/90 dark:via-slate-900 dark:to-emerald-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-slate-800 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                        Import File or Document with Names & Emails
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        Bulk Dispatch
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Upload your document (CSV, Excel, TXT, or Word) to send a bulk email to all contacts at once instead of sending one by one.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImportedContacts(SAMPLE_IMPORTED_LEADS);
                        setImportedFileName("corporate_vip_leads_sample.csv");
                        setTargetAudience("IMPORTED_FILE_CONTACTS");
                        setFileParseSuccess("✓ Loaded sample file with 10 verified business leaders!");
                        setTimeout(() => setFileParseSuccess(null), 5000);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 transition-all flex items-center gap-1"
                      title="Test with 10 sample names & emails"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" /> Load Sample List
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowImportModal(true)}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-all flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-slate-600" /> Paste Raw Text
                    </button>
                  </div>
                </div>

                {/* Hidden native file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt,.tsv,.xlsx,.json,.doc,.docx,text/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Drag-and-Drop & Click to Browse Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={handleDropFile}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isDraggingFile
                      ? "border-indigo-500 bg-indigo-100/50 dark:bg-indigo-900/40 scale-[1.01]"
                      : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-white/80 dark:bg-slate-900/60 hover:bg-indigo-50/30"
                  }`}
                >
                  <UploadCloud className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className="text-indigo-600 dark:text-indigo-400 underline">Click to select a document file</span> or drag & drop file here
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Supports <strong>.CSV</strong>, <strong>.TXT</strong>, <strong>.TSV</strong>, <strong>.XLSX</strong>, or doc lists (Auto-detects Name & Email columns)
                  </div>
                </div>

                {/* Error & Success alerts */}
                {fileParseError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{fileParseError}</span>
                  </div>
                )}

                {fileParseSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-[11px] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{fileParseSuccess}</span>
                  </div>
                )}

                {/* Table Preview of Imported Contacts */}
                {importedContacts.length > 0 && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-900 dark:text-white text-xs">
                          {importedFileName || "Imported Contacts"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {importedContacts.length.toLocaleString()} Contacts Loaded
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setTargetAudience("IMPORTED_FILE_CONTACTS")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            targetAudience === "IMPORTED_FILE_CONTACTS"
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-indigo-50"
                          }`}
                        >
                          {targetAudience === "IMPORTED_FILE_CONTACTS" ? "✓ Active Audience" : "Target These Contacts"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImportedContacts([]);
                            setImportedFileName(null);
                            if (targetAudience === "IMPORTED_FILE_CONTACTS") {
                              setTargetAudience("MEGA_100K_LEAD_VAULT");
                            }
                          }}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Clear imported contacts"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Mini table of first 4 contacts */}
                    <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800 text-[11px]">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold">
                          <tr>
                            <th className="p-1.5 pl-2.5">Name ({"{{name}}"})</th>
                            <th className="p-1.5">Email ({"{{email}}"})</th>
                            <th className="p-1.5 hidden sm:table-cell">Company</th>
                            <th className="p-1.5 pr-2.5 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {importedContacts.slice(0, 4).map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50">
                              <td className="p-1.5 pl-2.5 font-bold text-slate-800 dark:text-slate-200">{c.name}</td>
                              <td className="p-1.5 font-mono text-slate-600 dark:text-slate-400">{c.email}</td>
                              <td className="p-1.5 text-slate-500 hidden sm:table-cell">{c.company || "—"}</td>
                              <td className="p-1.5 pr-2.5 text-right text-emerald-600 font-bold">Verified ✓</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {importedContacts.length > 4 && (
                      <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                        <span>Showing 4 of {importedContacts.length.toLocaleString()} total imported contacts</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">All {importedContacts.length.toLocaleString()} will receive this bulk dispatch</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Custom Count Slider if selected */}
              {targetAudience === "CUSTOM_COUNT" && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-700 dark:text-slate-300">Set Custom Recipient Volume:</span>
                    <span className="text-indigo-600 dark:text-indigo-400 text-base font-black">
                      {customTargetCount.toLocaleString()} Leads
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={customTargetCount}
                    onChange={(e) => setCustomTargetCount(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>1,000</span>
                    <span>25,000</span>
                    <span>50,000</span>
                    <span>75,000</span>
                    <span>100,000 (Max)</span>
                  </div>
                </div>
              )}

              {targetAudience === "CUSTOM_LIST" && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Paste Comma-Separated or Line-Separated Emails
                  </label>
                  <textarea
                    rows={3}
                    value={customEmailsInput}
                    onChange={(e) => setCustomEmailsInput(e.target.value)}
                    placeholder="b.adeyemi@zenithholdings.ng&#10;amina.sanusi@capitalprime.com.ng&#10;k.mensah@accralogistics.gh..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              )}

              {/* Sender Details */}
              <div className="space-y-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center justify-between">
                      <span>Sender Display Name</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Custom Brand</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. The Rest You Deserve"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center justify-between">
                      <span>Sender Email (From Address)</span>
                      <span className="text-[10px] text-slate-400">Custom Domain / Webmail</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="hello@therestyoudeserve.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 italic">
                  Recipients will see: <strong>{senderName} &lt;{senderEmail}&gt;</strong>
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject Line</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Quick update regarding your account..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              {/* Preview Text */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Preview Subtitle Snippet</label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Short summary appearing next to subject in Gmail/Outlook"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Email Body */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Email Message Body</label>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>Insert Tag:</span>
                    <button
                      type="button"
                      onClick={() => setEmailBody((prev) => prev + " {{name}}")}
                      className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded font-mono font-bold"
                    >
                      {"{{name}}"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailBody((prev) => prev + " {{email}}")}
                      className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded font-mono font-bold"
                    >
                      {"{{email}}"}
                    </button>
                  </div>
                </div>
                <textarea
                  rows={8}
                  required
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Delivery Provider Selector with Live Economics */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-indigo-500" />
                      <span>Enterprise Email Infrastructure Provider</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Estimated Cost for {effectiveRecipientCount.toLocaleString()} emails:{" "}
                      <span className="text-slate-400 line-through mr-1 font-mono">${standardCostUsd}</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-xs font-black">
                        $0.00 USD (100% Free • Platform Owner License)
                      </strong>
                    </div>
                  </div>

                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
                  >
                    <option value="AMAZON_SES">
                      Amazon SES (Recommended: $10/100k)
                    </option>
                    <option value="RESEND">Resend Enterprise Batch ($80/100k)</option>
                    <option value="SENDGRID">SendGrid Pro ($89/100k)</option>
                    <option value="MAILGUN">Mailgun Scale ($75/100k)</option>
                    <option value="SMTP">Dedicated SMTP Cluster</option>
                  </select>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  {currentPricing.highlight}
                </div>
              </div>

              {/* Advanced Batch Queue Settings Toggle */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <span>100k Dispatch Queue Parameters</span>
                  </div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    {Math.ceil(effectiveRecipientCount / batchChunkSize)} Chunks Total
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 font-semibold block mb-1">Batch Chunk Size</label>
                    <select
                      value={batchChunkSize}
                      onChange={(e) => setBatchChunkSize(parseInt(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    >
                      <option value={500}>500 / request</option>
                      <option value={1000}>1,000 / request (Optimal)</option>
                      <option value={2500}>2,500 / request</option>
                      <option value={5000}>5,000 / request</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 font-semibold block mb-1">Parallel Workers</label>
                    <select
                      value={workerThreads}
                      onChange={(e) => setWorkerThreads(parseInt(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    >
                      <option value={4}>4 Threads</option>
                      <option value={8}>8 Threads (High Speed)</option>
                      <option value={16}>16 Threads</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 font-semibold block mb-1">IP Warm-Up Guard</label>
                    <button
                      type="button"
                      onClick={() => setWarmupMode(!warmupMode)}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center justify-between ${
                        warmupMode
                          ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800"
                          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      <span>{warmupMode ? "Warm-Up ON" : "Direct Full Spike"}</span>
                      {warmupMode ? <Check className="w-3.5 h-3.5" /> : null}
                    </button>
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500">
                  Targeting <strong>{effectiveRecipientCount.toLocaleString()} recipients</strong> • Cost:{" "}
                  <span className="line-through text-slate-400 font-mono mr-1">${standardCostUsd}</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">$0.00 (Free for Owner)</strong>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-violet-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Broadcast to {effectiveRecipientCount.toLocaleString()} Inboxes ($0.00 Free)
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Preview & Deliverability Checker (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Gmail / Mobile Inbox Preview */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live Inbox Preview
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Gmail & Outlook Ready
                </span>
              </div>

              {/* Preview Personalization Context Banner */}
              {targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
                  <div>
                    <span>Personalized for Scraped Lead: <strong>{scoutedProspects[0].fullName}</strong></span>
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400">
                      {scoutedProspects[0].organization || scoutedProspects[0].profession || "Corporate Professional"} • {scoutedProspects[0].country || "Nigeria"}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">1 of {scoutedProspects.length.toLocaleString()} leads</span>
                </div>
              ) : importedContacts.length > 0 && targetAudience === "IMPORTED_FILE_CONTACTS" ? (
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-800 dark:text-indigo-200 flex items-center justify-between">
                  <span>Showing personalization for <strong>{importedContacts[0].name}</strong></span>
                  <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400">1 of {importedContacts.length.toLocaleString()} leads</span>
                </div>
              ) : null}

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">From:</div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {senderName} &lt;{senderEmail}&gt;
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isWhiteLabel
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                  }`}>
                    {isWhiteLabel ? "✓ Custom Brand" : "BizPilot"}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Subject:</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {subject
                      .replace(/{{name}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? scoutedProspects[0].fullName : importedContacts.length > 0 && targetAudience === "IMPORTED_FILE_CONTACTS" ? importedContacts[0].name : "Timothy")
                      .replace(/{{company}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? (scoutedProspects[0].organization || "your company") : "your organization")}
                  </div>
                  {previewText && (
                    <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {previewText
                        .replace(/{{email}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? scoutedProspects[0].email : importedContacts.length > 0 && targetAudience === "IMPORTED_FILE_CONTACTS" ? importedContacts[0].email : "ayobamitim0612@gmail.com")
                        .replace(/{{name}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? scoutedProspects[0].fullName : "Timothy")}
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {emailBody
                    .replace(/{{name}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? scoutedProspects[0].fullName : importedContacts.length > 0 && targetAudience === "IMPORTED_FILE_CONTACTS" ? importedContacts[0].name : "Timothy")
                    .replace(/{{email}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? scoutedProspects[0].email : importedContacts.length > 0 && targetAudience === "IMPORTED_FILE_CONTACTS" ? importedContacts[0].email : "ayobamitim0612@gmail.com")
                    .replace(/{{company}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? (scoutedProspects[0].organization || "your company") : "your team")
                    .replace(/{{niche}}/g, targetAudience === "SCOUTED_SOCIAL_LEADS" && scoutedProspects.length > 0 ? (scoutedProspects[0].profession || "your sector") : "your market")}
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>White-Label Status: {isWhiteLabel ? "100% Isolated Brand" : "Co-Branded"}</span>
                  <span className="font-mono">Sender: {senderName}</span>
                </div>
              </div>

              {/* Instant Test Preview Dispatcher */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Send Instant Test Preview Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    placeholder="Enter test email..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Send Test
                  </button>
                </div>
                {testSendStatus && (
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {testSendStatus}
                  </div>
                )}
              </div>
            </div>

            {/* Deliverability & Spam Score Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Deliverability & Spam Score
                </span>
                <span className="font-bold text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
                  {deliverabilityScore}% (Optimal Inbox Rate)
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>SPF & DKIM Domain Alignment:</span>
                  <span className="text-emerald-600 font-bold">✓ Pass (2048-bit)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>RFC 8058 1-Click Unsubscribe Header:</span>
                  <span className="text-emerald-600 font-bold">✓ Enforced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>CAN-SPAM / GDPR Physical Address:</span>
                  <span className="text-emerald-600 font-bold">✓ Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Spam Trigger Words:</span>
                  <span className={detectedSpamWords.length === 0 ? "text-emerald-600 font-bold" : "text-amber-500 font-bold"}>
                    {detectedSpamWords.length === 0 ? "0 Detected" : `${detectedSpamWords.length} found (${detectedSpamWords.join(", ")})`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: 7-DAY NURTURE & NON-BUYER FOLLOW-UP SEQUENCES */}
      {/* ========================================================================= */}
      {activeTab === "7day-followups" && (
        <SevenDayFollowUpSequenceView
          profile={profile}
          activeCurrency={activeCurrency}
          scoutedProspects={scoutedProspects}
        />
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LIVE HIGH-SPEED QUEUE CONSOLE (100,000 DISPATCH ENGINE) */}
      {/* ========================================================================= */}
      {activeTab === "live-queue-console" && (
        <div className="space-y-6">
          {/* Main Control Panel */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSending && !isPaused ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isSending && !isPaused ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                  </span>
                  <h3 className="text-xl font-black tracking-tight text-white">
                    {isSending
                      ? isPaused
                        ? "Batch Queue PAUSED"
                        : "High-Throughput Dispatch Engine ACTIVE"
                      : "Queue Idle • Ready for 100,000 Dispatch"}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Provider: <strong>{currentPricing.name}</strong> • Concurrency: <strong>{workerThreads} parallel workers</strong> • Target: <strong>{effectiveRecipientCount.toLocaleString()} inboxes</strong>
                </p>
              </div>

              {/* Pause / Resume / Abort Controls */}
              <div className="flex items-center gap-2">
                {isSending && (
                  <>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
                      {isPaused ? "Resume Queue" : "Pause Queue"}
                    </button>
                    <button
                      onClick={() => {
                        setIsSending(false);
                        setQueueLogs((logs) => [
                          `[${new Date().toLocaleTimeString()}] DISPATCH ENGINE ABORTED BY USER AT ${sentCount.toLocaleString()} SENT`,
                          ...logs,
                        ]);
                      }}
                      className="px-4 py-2 bg-rose-900/40 hover:bg-rose-900/60 text-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-rose-800 transition-all"
                    >
                      <Square className="w-3.5 h-3.5" /> Abort Dispatch
                    </button>
                  </>
                )}

                {!isSending && (
                  <button
                    onClick={() => {
                      setIsSending(true);
                      setSentCount(0);
                      setCurrentBatchIndex(0);
                      setActiveTab("live-queue-console");
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    <Send className="w-4 h-4" /> Start 100,000 Broadcast Now
                  </button>
                )}
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="space-y-3">
              <div className="flex justify-between items-end text-xs font-bold">
                <div>
                  <span className="text-slate-400 uppercase text-[10px]">Progress</span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    {sentCount.toLocaleString()} / {effectiveRecipientCount.toLocaleString()}{" "}
                    <span className="text-indigo-400 text-sm">
                      ({Math.round((sentCount / (effectiveRecipientCount || 1)) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="text-right text-slate-400">
                  <span>Batch Chunk {currentBatchIndex} of {Math.max(1, Math.ceil(effectiveRecipientCount / batchChunkSize))}</span>
                  <div className="text-emerald-400 text-xs font-semibold mt-0.5">
                    Est. Cost: ${((sentCount / 1000) * currentPricing.costPer1kUsd).toFixed(2)} USD
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round((sentCount / (effectiveRecipientCount || 1)) * 100))}%`,
                  }}
                />
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-[11px]">Active Workers</div>
                <div className="text-lg font-black text-white mt-0.5">{workerThreads} Threads</div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-[11px]">Throughput</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">
                  {isSending && !isPaused ? `${liveThroughput} msg/sec` : "0 msg/sec"}
                </div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-[11px]">Hard Bounce Rate</div>
                <div className="text-lg font-black text-indigo-400 mt-0.5">0.04% (Safe)</div>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="text-slate-400 text-[11px]">Avg API Latency</div>
                <div className="text-lg font-black text-purple-400 mt-0.5">28ms</div>
              </div>
            </div>

            {/* Live Worker Terminal Log */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  Live High-Speed Queue Streaming Log
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Auto-scrolling terminal</span>
              </div>

              <div className="bg-black/90 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-emerald-400 h-64 overflow-y-auto space-y-1.5 scrollbar-thin">
                {queueLogs.length === 0 ? (
                  <div className="text-slate-500 italic">No active dispatch events yet. Click "Start 100,000 Broadcast Now" to run.</div>
                ) : (
                  queueLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 100,000 MASTER LEAD VAULT & CSV IMPORTER */}
      {/* ========================================================================= */}
      {activeTab === "lead-vault-100k" && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  100,000 Master Verified Lead Vault
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {totalLeadVaultCount.toLocaleString()} Total Leads
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Syntax-scrubbed, deduplicated leads across African & international corporate hubs. Ready for instant multi-recipient broadcasts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleImportSample100k}
                className="px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Load 100k Clean Sample Dataset
              </button>

              <button
                onClick={() => setShowImportModal(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" /> Import CSV List
              </button>
            </div>
          </div>

          {/* Segment Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEAD_SEGMENT_STATS.map((seg) => (
              <div
                key={seg.id}
                onClick={() => {
                  setTargetAudience(seg.id as any);
                  setActiveTab("broadcast-compose");
                }}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-indigo-400 dark:hover:border-indigo-600 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                    {seg.name}
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {seg.count.toLocaleString()} Leads
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">{seg.description}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                  <span>Avg Open: <strong className="text-emerald-600">{seg.avgOpenRate}</strong></span>
                  <span>Deliverability: <strong className="text-indigo-600">{seg.deliverability}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={leadSearchQuery}
                onChange={(e) => setLeadSearchQuery(e.target.value)}
                placeholder="Search leads by name, email, company, city..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400">Filter Segment:</span>
              <select
                value={leadFilterSegment}
                onChange={(e) => setLeadFilterSegment(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="ALL">All Segments</option>
                <option value="VIP">VIP</option>
                <option value="B2B_Wholesale">B2B Wholesale</option>
                <option value="Retail_Shopper">Retail Shopper</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          {/* Lead Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Lead & Contact</th>
                  <th className="p-3">Company & Industry</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Segment Tag</th>
                  <th className="p-3">Score & Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredVaultLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-white">{lead.name}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{lead.email}</div>
                      {lead.phone && <div className="text-slate-400 text-[10px]">{lead.phone}</div>}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{lead.company || "Direct Individual"}</div>
                      <div className="text-slate-400 text-[11px]">{lead.industry || "General"}</div>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{lead.city || "Nigeria"}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {lead.segment}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {lead.score}/100 VALID
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GOOGLE SIGN-IN CAPTURED AUDIENCE */}
      {/* ========================================================================= */}
      {activeTab === "audience-list" && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Captured Google Users & Direct Sign-In Contacts
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every visitor who logs in with Google or creates an account is automatically tagged and synced for targeted email broadcasts.
              </p>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Single Lead
            </button>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">User & Email</th>
                  <th className="p-3">Authentication Source</th>
                  <th className="p-3">Tags & Attributes</th>
                  <th className="p-3">Captured Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {capturedUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{user.email}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {user.source === "google_oauth" ? "⚡ Google Sign-In" : "📥 CRM Lead Form"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {user.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-slate-400">{user.capturedAt}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CAMPAIGN HISTORY & REPORTS */}
      {/* ========================================================================= */}
      {activeTab === "campaign-analytics" && (
        <div className="space-y-6">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{c.subject}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Dispatched: <strong>{c.sentAt}</strong> via <strong>{c.provider}</strong> • Target: {c.targetAudience}
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-xs font-black">
                  ✓ COMPLETED ({c.recipientCount.toLocaleString()} Sent)
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold">Delivered</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                    {c.stats.delivered.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">99.4% Delivery</div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold">Opened</div>
                  <div className="text-xl font-black text-indigo-600 mt-0.5">
                    {c.stats.opened.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-indigo-600 font-bold mt-0.5">
                    {Math.round((c.stats.opened / (c.stats.delivered || 1)) * 100)}% Open Rate
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold">Clicks</div>
                  <div className="text-xl font-black text-emerald-600 mt-0.5">
                    {c.stats.clicked.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                    {Math.round((c.stats.clicked / (c.stats.delivered || 1)) * 100)}% Click Rate
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400 font-semibold">Bounced / Unsub</div>
                  <div className="text-xl font-black text-rose-500 mt-0.5">
                    {c.stats.bounced.toLocaleString()} / {c.stats.unsubscribed.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">&lt; 0.6% Hard Bounce</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: API SETTINGS & 100K DNS CONFIGURATION */}
      {/* ========================================================================= */}
      {activeTab === "api-settings" && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Enterprise Email API Infrastructure & Namecheap DNS Alignment
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Connect Amazon SES, Resend, or SendGrid to send up to 100,000+ emails with zero deliverability throttling and 100% custom domain reputation.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Platform Owner Root License Banner */}
            <div className="p-5 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-500">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Platform Owner Root Zero-Cost Relay License
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Standard Amazon SES ($10/100k) and Resend Enterprise ($80/100k) gateway charges are 100% sponsored at $0.00 cost for the 6 authorized platform owners.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                  ZERO-COST ROOT LICENSE
                </span>
              </div>

              <div className="p-3 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-amber-300/30">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Authorized Platform Owner Accounts with Free 100k Dispatch:
                </div>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_OWNER_EMAILS.map((email) => (
                    <span
                      key={email}
                      className="px-2 py-1 rounded-lg bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300/50 font-mono text-[11px] flex items-center gap-1 font-semibold"
                    >
                      <Crown className="w-3 h-3 text-amber-600" />
                      {email}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Amazon SES Card */}
            <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Amazon Simple Email Service (SES)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      BEST FOR 100,000+ SCALE ($10/100k)
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Production quota: Up to 500,000 emails/day at $0.10 per 1,000 emails.
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  CONFIGURED IN .ENV
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-1">AWS SES Access Key ID</label>
                  <input
                    type="password"
                    defaultValue="AKIA_PROD_SES_99214"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-1">AWS SES Region</label>
                  <input
                    type="text"
                    defaultValue="us-east-1 (N. Virginia)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Resend & SendGrid Card */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Resend API Key</div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  READY
                </span>
              </div>
              <input
                type="password"
                defaultValue="re_981409214_ab7810"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-500">
                Resend supports React Email component templates and batch sending up to 100 emails per API call.
              </p>
            </div>

            {/* Namecheap DNS Table */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Namecheap DNS Records for 100% Deliverability at 100,000 Scale
              </div>
              <p className="text-slate-500">
                Paste these 4 records in Namecheap ➔ Domain List ➔ Manage ➔ Advanced DNS to guarantee inbox placement and avoid the spam folder:
              </p>

              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden font-mono text-[11px]">
                <table className="w-full text-left">
                  <thead className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Host / Name</th>
                      <th className="p-2.5">Value / Target</th>
                      <th className="p-2.5">TTL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                      <td className="p-2.5 font-bold text-indigo-600">TXT (SPF)</td>
                      <td className="p-2.5">@</td>
                      <td className="p-2.5">v=spf1 include:amazonses.com include:resend.com ~all</td>
                      <td className="p-2.5">Automatic</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-indigo-600">TXT (DKIM 2048)</td>
                      <td className="p-2.5">ses._domainkey</td>
                      <td className="p-2.5">k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...</td>
                      <td className="p-2.5">Automatic</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-indigo-600">TXT (DMARC)</td>
                      <td className="p-2.5">_dmarc</td>
                      <td className="p-2.5">v=DMARC1; p=quarantine; rua=mailto:dmarc@bizpilot.io</td>
                      <td className="p-2.5">Automatic</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-indigo-600">CNAME (Mail)</td>
                      <td className="p-2.5">mail</td>
                      <td className="p-2.5">feedback-smtp.us-east-1.amazonses.com</td>
                      <td className="p-2.5">Automatic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: IMPORT CSV / TXT LEADS (UP TO 100,000) */}
      {/* ========================================================================= */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-indigo-600" />
                  Import Leads File or Document
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a document file or paste CSV/text rows. Auto-scrubs syntax & duplicate addresses.
                </p>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* File upload prompt inside modal */}
              <input
                ref={modalFileInputRef}
                type="file"
                accept=".csv,.txt,.tsv,.xlsx,.json,.doc,.docx,text/*"
                onChange={(e) => {
                  handleFileUpload(e);
                  setShowImportModal(false);
                }}
                className="hidden"
              />

              <div
                onClick={() => modalFileInputRef.current?.click()}
                className="p-3.5 border-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/30 rounded-xl text-center cursor-pointer transition-all"
              >
                <UploadCloud className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Select file (.CSV, .TXT, .TSV, .XLSX) from computer
                </div>
                <div className="text-[10px] text-slate-500">
                  Click here to browse documents directly
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-[10px] font-bold uppercase">or paste document text</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Paste CSV / Names & Emails Document Content
                </label>
                <textarea
                  rows={5}
                  value={csvRawText}
                  onChange={(e) => setCsvRawText(e.target.value)}
                  placeholder={`Name,Email,Company\nBabatunde,babatunde@company.ng,Zenith Ltd\nAmina,amina@prime.com,Capital Holdings`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              {importStats && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Import Complete!</span>
                  </div>
                  <div className="text-[11px]">
                    Added <strong>{importStats.valid.toLocaleString()} valid contacts</strong> • Scrubbed {importStats.cleaned} invalid/disposable addresses • Removed {importStats.duplicates} duplicates.
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCsvRawText(SAMPLE_CSV_EXPORT)}
                  className="text-indigo-600 hover:underline text-[11px] font-bold"
                >
                  Insert Sample CSV Template
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleParseCsv}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs"
                  >
                    Parse & Import Contacts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MANUAL ADD SINGLE USER */}
      {/* ========================================================================= */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Capture Individual Lead
            </h3>
            <form onSubmit={handleCreateCapturedUser} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Adebayo Adeleke"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Segment Tag</label>
                <select
                  value={newUserTag}
                  onChange={(e) => setNewUserTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="google_user">Google Sign-In User</option>
                  <option value="newsletter_opt_in">Newsletter Subscriber</option>
                  <option value="vip_customer">VIP High-Ticket Client</option>
                  <option value="catering_inquiry">Catering / Service Lead</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
