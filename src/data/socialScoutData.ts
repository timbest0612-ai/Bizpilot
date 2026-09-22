import {
  ScoutSocialChannelConfig,
  DiscoveredNiche,
  DiscoveredPainPoint,
  DiscoveredPersona,
  ProspectRecord,
} from "../types/intelligence";

export const SCOUT_SOCIAL_CHANNELS: ScoutSocialChannelConfig[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Professional",
    description: "C-Level decision makers, job titles, verified company domains, industry executives, and sales professionals.",
    badgeColor: "bg-blue-600 text-white",
    sourceTargetTypes: ["Executive Profiles", "Company Decision Makers", "Sales Navigator Search", "InMail Inboxes"],
    estimatedGlobalActiveUsers: "1.1 Billion+",
  },
  {
    id: "x",
    name: "X (Twitter)",
    category: "Microblogging",
    description: "Tech founders, active thought leaders, public vent threads, customer support complaints, and keyword bios.",
    badgeColor: "bg-slate-900 text-white",
    sourceTargetTypes: ["Bio Search", "Frustration Threads", "Influencer Followers", "Viral Tweet Engagements"],
    estimatedGlobalActiveUsers: "600 Million+",
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "Visual & Lifestyle",
    description: "Brand owners, aesthetic coaches, fitness trainers, digital creators, and business inquiry contact emails.",
    badgeColor: "bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 text-white",
    sourceTargetTypes: ["Bio Linktrees", "Business Email Buttons", "Hashtag Conversations", "Story Engagers"],
    estimatedGlobalActiveUsers: "2.4 Billion+",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Video & Creators",
    description: "Gen-Z & millennial entrepreneurs, emerging e-commerce sellers, UGC creators, and video comments with high intent.",
    badgeColor: "bg-slate-950 text-cyan-300",
    sourceTargetTypes: ["Creator Bios", "Comment Section Questions", "Trend Audio Participants", "Shop Affiliates"],
    estimatedGlobalActiveUsers: "1.8 Billion+",
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Video & Creators",
    description: "Channel creators, educators, review channels with business inquiry emails, and long-form comment discussions.",
    badgeColor: "bg-red-600 text-white",
    sourceTargetTypes: ["'About' Channel Business Emails", "Podcast Hosts", "Tutorial Commenters", "Community Posts"],
    estimatedGlobalActiveUsers: "2.7 Billion+",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    category: "Visual & Lifestyle",
    description: "Etsy shop owners, interior designers, wedding planners, recipe creators, and high-purchasing-intent visual shoppers.",
    badgeColor: "bg-rose-700 text-white",
    sourceTargetTypes: ["Business Board Owners", "Product Pin Link-outs", "Shopify Store Links", "Creator Profiles"],
    estimatedGlobalActiveUsers: "520 Million+",
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "Communities & Forums",
    description: "Niche support groups, local business page admins, marketplace sellers, and industry association groups.",
    badgeColor: "bg-blue-700 text-white",
    sourceTargetTypes: ["Niche Group Members", "Business Page Admins", "Event Attendees", "Local Business Listings"],
    estimatedGlobalActiveUsers: "3.0 Billion+",
  },
  {
    id: "forums",
    name: "Forums & Reddit",
    category: "Communities & Forums",
    description: "Subreddits (r/entrepreneur, r/SaaS, r/fitness), Quora question askers, and specialized discourse bulletin boards.",
    badgeColor: "bg-orange-600 text-white",
    sourceTargetTypes: ["Subreddit Rants", "Troubleshooting Threads", "Quora Verified Answers", "Discourse Forums"],
    estimatedGlobalActiveUsers: "850 Million+",
  },
  {
    id: "blogs",
    name: "Blogs & Substack",
    category: "Microblogging",
    description: "Independent newsletter authors, Medium columnists, niche bloggers, and industry research contributors.",
    badgeColor: "bg-amber-600 text-white",
    sourceTargetTypes: ["Substack Newsletters", "Medium Columnists", "WordPress Author Bylines", "Ghost Blogs"],
    estimatedGlobalActiveUsers: "350 Million+",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    category: "Visual & Lifestyle",
    description: "Spotlight creator accounts, local brick-and-mortar storefronts, and young adult demographic influencers.",
    badgeColor: "bg-yellow-400 text-slate-900",
    sourceTargetTypes: ["Public Creator Stories", "Spotlight Bio Links", "Snap Map Business Tags", "Brand Ambassadors"],
    estimatedGlobalActiveUsers: "800 Million+",
  },
];

export const SCOUT_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", region: "North America" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "North America" },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe" },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", region: "Africa" },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia" },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", region: "South America" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", region: "Europe" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", region: "Africa" },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe" },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "North America" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", region: "Europe" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", region: "Europe" },
  { code: "ALL", name: "Worldwide (All Countries)", flag: "🌍", region: "Global" },
];

export const PRESET_DISCOVERED_NICHES: Record<string, {
  niches: DiscoveredNiche[];
  painPoints: DiscoveredPainPoint[];
  personas: DiscoveredPersona[];
}> = {
  "saas-tech": {
    niches: [
      {
        id: "b2b-devtools",
        name: "Developer Tools & API Infrastructure",
        industry: "SaaS & Cloud Software",
        topKeywords: ["api latency", "sdk documentation", "developer churn", "cloud billing spikes"],
        painSummary: "High customer churn during onboarding when API keys take more than 10 minutes to test.",
        subNiches: [
          {
            id: "sub-dev-1",
            name: "Solo Founders Building AI Wrapper Tools",
            parentNiche: "Developer Tools & API Infrastructure",
            audienceSizeEstimate: "240,000+ globally",
            primaryPainPreview: "OpenAI rate-limits and token overhead eating 80% of net gross margin",
            targetProfession: "Bootstrapped Technical Founder",
            monetizationFit: "Very High",
          },
          {
            id: "sub-dev-2",
            name: "Fractional CTOs for Seed-Stage Startups",
            parentNiche: "Developer Tools & API Infrastructure",
            audienceSizeEstimate: "45,000+ globally",
            primaryPainPreview: "Inheriting messy outsourced codebases with zero test coverage",
            targetProfession: "Fractional CTO / Software Architect",
            monetizationFit: "Very High",
          },
          {
            id: "sub-dev-3",
            name: "Cloud Cost Optimization (FinOps) Consultants",
            parentNiche: "Developer Tools & API Infrastructure",
            audienceSizeEstimate: "68,000+ globally",
            primaryPainPreview: "Clients panicking over unexpected $15,000 AWS egress bills",
            targetProfession: "DevOps Engineer / FinOps Lead",
            monetizationFit: "High",
          },
        ],
      },
      {
        id: "vertical-crm",
        name: "Vertical SaaS for Offline Businesses",
        industry: "SaaS & Cloud Software",
        topKeywords: ["hvac dispatch", "dental booking", "contractor invoicing", "whatsapp crm"],
        painSummary: "Traditional business owners refusing to adopt complex desktop software.",
        subNiches: [
          {
            id: "sub-crm-1",
            name: "Roofing & Remodeling Contractors",
            parentNiche: "Vertical SaaS for Offline Businesses",
            audienceSizeEstimate: "410,000+ globally",
            primaryPainPreview: "Losing 35% of homeowner leads because quotes take 3 days to deliver",
            targetProfession: "Contractor Business Owner",
            monetizationFit: "Very High",
          },
          {
            id: "sub-crm-2",
            name: "Boutique Medical & Dental Clinics",
            parentNiche: "Vertical SaaS for Offline Businesses",
            audienceSizeEstimate: "180,000+ globally",
            primaryPainPreview: "High appointment no-show rates costing $4,000 per chair weekly",
            targetProfession: "Clinic Practice Manager",
            monetizationFit: "High",
          },
        ],
      },
    ],
    painPoints: [
      {
        id: "pain-saas-1",
        title: "Cold Outbound Email Land in Spam Filters",
        category: "Client Acquisition & Outbound",
        verbatimQuote: "Sent 5,000 emails this week via standard mailer and open rate dropped to 3%. Deliverability is completely dead.",
        severity: "Critical",
        emotionalTrigger: "Panic over zero demo pipeline and impending runway burn",
        platformsObserved: ["X (Twitter)", "Reddit r/sales", "LinkedIn"],
        frequencyScore: 94,
      },
      {
        id: "pain-saas-2",
        title: "Engineering Fatigue & Technical Debt Accumulation",
        category: "Technical & Operational Debt",
        verbatimQuote: "We spend 70% of every sprint fixing legacy bugs instead of shipping revenue-generating features.",
        severity: "High",
        emotionalTrigger: "Deep frustration and fear of losing market lead to faster competitors",
        platformsObserved: ["Hacker News", "Reddit r/ExperiencedDevs", "X"],
        frequencyScore: 88,
      },
      {
        id: "pain-saas-3",
        title: "High Customer Churn at 30-Day Mark",
        category: "Retention & Product Value",
        verbatimQuote: "Users sign up during free trial, log in twice, and vanish. We cannot figure out where the friction is.",
        severity: "Critical",
        emotionalTrigger: "Disillusionment after pouring months into building the product",
        platformsObserved: ["Indie Hackers", "LinkedIn", "YouTube Podcasts"],
        frequencyScore: 82,
      },
    ],
    personas: [
      {
        id: "persona-saas-founder",
        name: "Bootstrapped SaaS Founder 'Alex'",
        archetype: "Technical Solo Builder",
        profession: "Software Engineer turned Founder",
        industry: "B2B Software",
        coreFrustration: "Great product builder but terrified of sales calls and marketing spend waste",
        dreamOutcome: "$20k MRR with automated customer onboarding and zero manual firefighting",
        purchasingPower: "High",
        bestOutreachHook: "Cut AWS & API inference costs by 45% while automating lead qualification",
        recommendedTone: "Data-driven, respectful of engineering time, zero hype",
      },
      {
        id: "persona-agency-director",
        name: "Growth Agency CEO 'Marcus'",
        archetype: "Scaling Agency Operator",
        profession: "Marketing Agency Owner",
        industry: "Digital Services",
        coreFrustration: "High client churn and constantly having to hire expensive junior media buyers",
        dreamOutcome: "Predictable client retention above 9 months with clear ROI reporting",
        purchasingPower: "Enterprise",
        bestOutreachHook: "White-label client reporting dashboard that proves campaign ROAS automatically",
        recommendedTone: "Direct, ROI-focused, emphasizing margin preservation",
      },
    ],
  },
  "health-wellness": {
    niches: [
      {
        id: "desk-ergonomics",
        name: "Ergonomics, Neck Tension & Posture for Remote Workers",
        industry: "Health & Human Performance",
        topKeywords: ["cervical radiculopathy", "neck stiffness", "standing desk fatigue", "sciatica"],
        painSummary: "Chronic 8-hour sitting causing back spasms and cognitive fatigue by 2 PM.",
        subNiches: [
          {
            id: "sub-erg-1",
            name: "Software Engineers with Cervical Spine Strain",
            parentNiche: "Ergonomics, Neck Tension & Posture",
            audienceSizeEstimate: "850,000+ globally",
            primaryPainPreview: "Sharp upper trap burning sensation radiating down arms during coding marathons",
            targetProfession: "Senior Software Engineer / Architect",
            monetizationFit: "Very High",
          },
          {
            id: "sub-erg-2",
            name: "Finance Analysts Working 80-Hour Desk Weeks",
            parentNiche: "Ergonomics, Neck Tension & Posture",
            audienceSizeEstimate: "320,000+ globally",
            primaryPainPreview: "Severe lower lumbar compression after 14-hour spreadsheet marathons",
            targetProfession: "Investment Banker / Private Equity Associate",
            monetizationFit: "Very High",
          },
        ],
      },
      {
        id: "sleep-recovery",
        name: "Deep REM Recovery & Circadian Realignment",
        industry: "Health & Human Performance",
        topKeywords: ["waking up at 3am", "cortisol spikes", "brain fog", "oura ring sleep score"],
        painSummary: "Falling asleep exhausted but waking up unrefreshed with racing anxious thoughts.",
        subNiches: [
          {
            id: "sub-slp-1",
            name: "High-Stress Startup Executives with Insomnia",
            parentNiche: "Deep REM Recovery & Circadian Realignment",
            audienceSizeEstimate: "540,000+ globally",
            primaryPainPreview: "Cortisol surges waking them up at 3:15 AM every single night",
            targetProfession: "Managing Director / CEO",
            monetizationFit: "Very High",
          },
          {
            id: "sub-slp-2",
            name: "Shift Workers & Night Flight Crew",
            parentNiche: "Deep REM Recovery & Circadian Realignment",
            audienceSizeEstimate: "1,200,000+ globally",
            primaryPainPreview: "Chronic circadian desynchronization leading to metabolic slowdown",
            targetProfession: "Aviation Pilot / Emergency Healthcare Worker",
            monetizationFit: "High",
          },
        ],
      },
    ],
    painPoints: [
      {
        id: "pain-hlth-1",
        title: "2:00 PM Energy Crash & Brain Fog",
        category: "Cognitive Energy & Fatigue",
        verbatimQuote: "After lunch, my brain feels like molasses. I need 3 cups of coffee just to review a document.",
        severity: "High",
        emotionalTrigger: "Guilt about declining productivity and fear of cognitive aging",
        platformsObserved: ["Reddit r/Biohackers", "TikTok Health", "YouTube Comments"],
        frequencyScore: 91,
      },
      {
        id: "pain-hlth-2",
        title: "Sleep Fragmentation & Racing Midnight Thoughts",
        category: "Sleep Architecture",
        verbatimQuote: "I drop into bed dead tired, but my mind spins on tomorrow's meetings until 4 AM. Waking up feels like being run over.",
        severity: "Critical",
        emotionalTrigger: "Despair over persistent exhaustion and physical burnout",
        platformsObserved: ["X (Twitter)", "Instagram Bio Comments", "Forums"],
        frequencyScore: 96,
      },
    ],
    personas: [
      {
        id: "persona-exhausted-exec",
        name: "Burned-Out Tech VP 'Elena'",
        archetype: "Corporate High-Performer",
        profession: "VP of Product / Executive",
        industry: "Enterprise Technology",
        coreFrustration: "High income but zero energy left for family or personal health",
        dreamOutcome: "Waking up at 6:30 AM refreshed with zero caffeine dependency and pain-free joints",
        purchasingPower: "Enterprise",
        bestOutreachHook: "Science-backed 15-minute nervous system reset designed for back-to-back calendar schedules",
        recommendedTone: "Empathetic, scientifically rigorous, time-efficient",
      },
    ],
  },
  "ecommerce-d2c": {
    niches: [
      {
        id: "shopify-margins",
        name: "High-Margin Private Label Brands",
        industry: "E-Commerce & Retail",
        topKeywords: ["meta ad cpm", "tiktok shop roas", "return rate", "inventory financing"],
        painSummary: "Ad acquisition costs skyrocketed 60% year-over-year, wiping out net profit margins.",
        subNiches: [
          {
            id: "sub-ecom-1",
            name: "Apparel & Streetwear Brand Founders",
            parentNiche: "High-Margin Private Label Brands",
            audienceSizeEstimate: "620,000+ globally",
            primaryPainPreview: "Customer return rates reaching 38% due to sizing mismatches",
            targetProfession: "Fashion Brand Founder / Creative Director",
            monetizationFit: "Very High",
          },
          {
            id: "sub-ecom-2",
            name: "Eco-Friendly Home Goods DTC",
            parentNiche: "High-Margin Private Label Brands",
            audienceSizeEstimate: "290,000+ globally",
            primaryPainPreview: "High freight shipping costs and warehouse holding fees",
            targetProfession: "DTC Operations Manager",
            monetizationFit: "High",
          },
        ],
      },
    ],
    painPoints: [
      {
        id: "pain-ecom-1",
        title: "Meta & TikTok Ad ROAS Dropping Below 1.5x",
        category: "Paid Acquisition & Ad Spend",
        verbatimQuote: "What worked last year is bleeding cash. We spent $12,000 on Meta ads last month and barely broke even.",
        severity: "Critical",
        emotionalTrigger: "Fear of bankruptcy and inventory sitting dead in 3PL warehouse",
        platformsObserved: ["TikTok Shop Creators", "Twitter Ecom", "Reddit r/dropship"],
        frequencyScore: 97,
      },
    ],
    personas: [
      {
        id: "persona-ecom-founder",
        name: "DTC Brand Founder 'Dami'",
        archetype: "Fast-Paced Ecom Operator",
        profession: "E-Commerce Brand Owner",
        industry: "Consumer Goods",
        coreFrustration: "Bleeding money on ad experiments while customer lifetime value stays flat",
        dreamOutcome: "Profitable 3.5x blended ROAS with a loyal email list driving 40% of revenue",
        purchasingPower: "High",
        bestOutreachHook: "Turn your post-purchase email sequence into a 32% repeat-order flywheel",
        recommendedTone: "Punchy, actionable, proof-based",
      },
    ],
  },
};

// Generates synthetic high-fidelity scouted leads based on channels, countries, niche, volume
export function generateScoutedLeads(
  channels: string[],
  countries: string[],
  niche: string,
  subNiche: string,
  volumeCount: number
): ProspectRecord[] {
  const firstNames = [
    "David", "Sarah", "Michael", "Amara", "Carlos", "Priya", "Liam", "Chen",
    "Fatima", "James", "Elena", "Tariq", "Chloe", "Kwame", "Aiko", "Lucas",
    "Zoe", "Dmitri", "Nia", "Mateo", "Emma", "Hassan", "Sophie", "Kofi",
  ];

  const lastNames = [
    "Vance", "Okonkwo", "Chen", "Sterling", "Kowalski", "Patel", "Adeyemi",
    "Dubois", "Al-Mansoor", "Silva", "Mendoza", "Johansson", "Nakamura",
    "O'Connor", "Bekele", "Sinclair", "Zhang", "Navarro", "Taylor", "Diallo",
  ];

  const domainSuffixes = ["tech", "io", "co", "agency", "media", "health", "group", "ventures"];

  const results: ProspectRecord[] = [];
  const sampleTarget = Math.min(volumeCount, 30); // sample representation in UI grid

  const effectiveChannels = channels.length > 0 ? channels : ["LinkedIn", "Twitter/X", "Instagram"];
  const effectiveCountries = countries.includes("ALL") || countries.length === 0
    ? ["United States", "United Kingdom", "Canada", "Australia", "Nigeria", "Germany"]
    : countries;

  const painQuotes = [
    "Our team spends 15+ hours weekly doing manual data re-entry between tools.",
    "Waking up with stiff cervical joints every morning after desk marathons.",
    "Customer acquisition cost is up 45% this quarter and outbound leads are drying up.",
    "Burnout is starting to affect our core engineering delivery deadlines.",
    "We lost three enterprise deals this month because onboarding was too slow.",
    "Meta CPMs are eating our margins alive and we don't have an organic audience.",
    "Client retention dropped below 70% because we lack proactive progress reports.",
  ];

  for (let i = 0; i < sampleTarget; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i + 3) % lastNames.length];
    const channelRaw = effectiveChannels[i % effectiveChannels.length];
    const country = effectiveCountries[i % effectiveCountries.length];
    const domain = `${fn.toLowerCase()}${domainSuffixes[i % domainSuffixes.length]}.com`;

    let platformFormatted = "LinkedIn";
    if (channelRaw.toLowerCase().includes("x") || channelRaw.toLowerCase().includes("twitter")) platformFormatted = "Twitter/X";
    else if (channelRaw.toLowerCase().includes("insta")) platformFormatted = "Instagram";
    else if (channelRaw.toLowerCase().includes("tik")) platformFormatted = "TikTok";
    else if (channelRaw.toLowerCase().includes("tube")) platformFormatted = "YouTube";
    else if (channelRaw.toLowerCase().includes("pin")) platformFormatted = "Pinterest";
    else if (channelRaw.toLowerCase().includes("face")) platformFormatted = "Facebook";
    else if (channelRaw.toLowerCase().includes("forum") || channelRaw.toLowerCase().includes("reddit")) platformFormatted = "Forums/Reddit";
    else if (channelRaw.toLowerCase().includes("blog") || channelRaw.toLowerCase().includes("sub")) platformFormatted = "Blogs";
    else if (channelRaw.toLowerCase().includes("snap")) platformFormatted = "Snapchat";

    const prospect: ProspectRecord = {
      id: `scout_${Date.now()}_${i + 1}`,
      firstName: fn,
      lastName: ln,
      fullName: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${domain}`,
      phone: `+${Math.floor(Math.random() * 80 + 20)} ${Math.floor(Math.random() * 800 + 100)} ${Math.floor(Math.random() * 8000 + 1000)}`,
      country: country,
      city: country === "United States" ? "Austin, TX" : country === "United Kingdom" ? "London" : country === "Nigeria" ? "Lagos" : "Berlin",
      timezone: "UTC" + (i % 5 > 2 ? "+1" : "-5"),
      socialPlatform: platformFormatted as any,
      profileUrl: `https://${platformFormatted.toLowerCase().replace(/[^a-z]/g, "")}.com/${fn.toLowerCase()}_${ln.toLowerCase()}`,
      sourceUrl: `https://bizpilot.harvest/${platformFormatted.toLowerCase()}/scout?q=${encodeURIComponent(niche)}`,
      sourceType: "Social Scout Harvester",
      collectionDate: new Date().toISOString(),
      niche: niche || "High-Growth Digital Operations",
      subNiche: subNiche || "Bootstrapped Founders",

      primaryCategory: "Technology & Software Development",
      industry: "B2B Technology & Digital Services",
      profession: i % 2 === 0 ? "Founder & CEO" : "Director of Growth",
      jobTitle: i % 2 === 0 ? "Founder & CEO" : "Head of Operations",
      seniority: "Founder / C-Level",
      organization: `${ln} & Partners Global`,
      organizationSize: "11-50",
      employmentType: "Self-Employed",

      painCategory: "Client Acquisition & Outbound",
      primaryPain: painQuotes[i % painQuotes.length],
      secondaryPains: ["Rising customer acquisition costs", "Operational bandwidth limits"],
      painDescription: `Observed expressing acute frustration regarding: "${painQuotes[i % painQuotes.length]}" on ${platformFormatted}.`,
      painEvidence: painQuotes[i % painQuotes.length],
      painSeverity: i % 3 === 0 ? "Critical" : "High",
      painConfidence: 0.88 + (i % 10) * 0.01,

      personaName: `High-Pace Operator '${fn}'`,
      personaDescription: "Ambitious business builder navigating bottleneck capacity and seeking automated growth leverage.",
      goals: ["Double annual revenue", "Automate manual lead outreach", "Protect personal health and sleep"],
      challenges: ["Rising platform ad costs", "Lack of qualified sales pipeline", "Time poverty"],
      interests: ["AI Automation", "High-Performance Systems", "Direct Response"],
      likelyNeeds: ["Done-with-you outbound pipeline", "Deliverability audit", "Autonomous lead generation"],

      productFitScore: Math.floor(78 + (i * 7) % 22),
      buyingIntent: (i % 2 === 0 ? "High" : "Medium") as any,
      purchaseReadiness: "Problem Aware",
      relevanceReason: `High topical match between ${niche} pain signals and automated intelligence outreach.`,
      scoreBreakdown: {
        painMatch: 28,
        personaMatch: 19,
        professionMatch: 14,
        industryMatch: 10,
        intentSignals: 9,
        interestMatch: 5,
        geographicMatch: 5,
        engagementHistory: 3,
        total: Math.floor(78 + (i * 7) % 22),
        reasons: [
          `Active public frustration recorded on ${platformFormatted}`,
          `Strong persona match in ${country}`,
          "Direct match for high-ticket business solutions",
        ],
      },
      matchedProducts: [],
      recommendedOffer: "BizPilot OS Growth & Outbound Blueprint",

      campaignStatus: "Not Contacted",
      contactStatus: "Eligible",
      emailsSent: 0,
      emailsDelivered: 0,
      opens: 0,
      clicks: 0,
      replies: 0,
      positiveReplies: 0,
      unsubscribed: false,
      bounced: false,
      complained: false,
      converted: false,
      consentStatus: "Public Professional Profile (Legitimate Interest)",
      marketingEligibility: "Eligible",
      unsubscribeStatus: false,
      suppressionStatus: false,
      doNotContact: false,
      confidenceScore: 0.91,
      classificationConfidence: "High",
      classificationDate: new Date().toISOString(),
      classificationModel: "gemini-3.8-flash",
      humanOverride: false,
      lastAiUpdate: new Date().toISOString(),
    };

    results.push(prospect);
  }

  return results;
}
