import React, { useState } from "react";
import {
  Globe,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Edit3,
  Eye,
  Download,
  Share2,
  CheckCircle2,
  Layers,
  Palette,
  ExternalLink,
  MessageSquare,
  CreditCard,
  Plus,
  Trash2,
  Loader2,
  Zap,
  Search,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  RefreshCw,
  Code2,
  FileText,
  TrendingUp,
  Tag,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Calendar,
  User,
  ArrowLeft,
  ShoppingBag,
  ShoppingCart,
  Boxes,
  Truck,
  Percent,
  ThumbsUp,
  Award,
  Sliders,
  Minus,
  X,
  Lock,
} from "lucide-react";
import {
  BusinessProfile,
  WebsiteData,
  CurrencyCode,
  Lead,
  EcommerceProduct,
  AffiliateReviewItem,
  WebsitePlugin,
  WebsiteType,
} from "../../types";
import {
  CURRENCIES,
  DEFAULT_ECOMMERCE_PRODUCTS,
  DEFAULT_AFFILIATE_ITEMS,
  DEFAULT_PLUGINS,
} from "../../data/initialData";
import { generateAiContent } from "../../services/api";
import { DropshipProductImporterModal } from "./DropshipProductImporterModal";
import { PluginMarketplaceModal } from "./PluginMarketplaceModal";

interface Props {
  profile: BusinessProfile;
  website: WebsiteData;
  activeCurrency: CurrencyCode;
  onUpdateWebsite: (site: WebsiteData) => void;
  onLeadCaptured: (lead: Partial<Lead>) => void;
  onNavigateToNext?: () => void;
  onNavigateToPrev?: () => void;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  authorRole: string;
  keywords: string[];
}

export const WebsiteBuilderView: React.FC<Props> = ({
  profile,
  website,
  activeCurrency,
  onUpdateWebsite,
  onLeadCaptured,
  onNavigateToNext,
  onNavigateToPrev,
}) => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "editor" | "seo" | "code">("preview");
  const [activePage, setActivePage] = useState<
    "home" | "about" | "services" | "shop" | "affiliate" | "blog" | "contact" | "privacy"
  >("home");
  const [activeSection, setActiveSection] = useState<
    "hero" | "services" | "about" | "pricing" | "testimonials" | "faq" | "contact" | "seo"
  >("hero");
  const [googlePreviewDevice, setGooglePreviewDevice] = useState<"desktop" | "mobile">("mobile");
  const [isAiRegenerating, setIsAiRegenerating] = useState(false);
  const [isSuperchargingSeo, setIsSuperchargingSeo] = useState(false);
  const [superchargeSuccess, setSuperchargeSuccess] = useState(false);

  // E-Commerce & Dropship & Plugins Modals & States
  const [isDropshipImporterOpen, setIsDropshipImporterOpen] = useState(false);
  const [isPluginMarketplaceOpen, setIsPluginMarketplaceOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<EcommerceProduct | null>(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<Array<{ product: EcommerceProduct; quantity: number }>>([
    { product: DEFAULT_ECOMMERCE_PRODUCTS[0], quantity: 1 },
  ]);
  const [cartCheckoutSuccess, setCartCheckoutSuccess] = useState(false);
  const [ecommerceCategoryFilter, setEcommerceCategoryFilter] = useState("all");

  // Blog State
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("all");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [copiedCodeType, setCopiedCodeType] = useState<string | null>(null);

  // Lead Form in preview
  const [leadFormName, setLeadFormName] = useState("");
  const [leadFormEmail, setLeadFormEmail] = useState("");
  const [leadFormPhone, setLeadFormPhone] = useState("");
  const [leadFormMsg, setLeadFormMsg] = useState("");
  const [leadFormService, setLeadFormService] = useState(website.services?.items?.[0]?.title || "General Inquiry");
  const [leadSuccess, setLeadSuccess] = useState(false);

  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  // Curated Multi-Article SEO Blog Engine
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "post_1",
      slug: "top-7-catering-secrets-corporate-events",
      title: `Top 7 Catering Secrets for Flawless Corporate Events in ${profile.city}`,
      excerpt: `Discover how leading enterprises in ${profile.city} ensure punctual, gourmet meal delivery that leaves international guests and board members impressed.`,
      content: `Planning a high-stakes corporate conference, executive retreat, or quarterly board meeting in ${profile.city} requires uncompromising attention to detail. Food is often the single most remembered aspect of any corporate gathering.

### 1. Punctuality is Non-Negotiable
In business, time is currency. Ensure your catering partner operates temperature-controlled logistics and guarantees delivery at least 20 minutes prior to scheduled session breaks.

### 2. Tailor Menus for Diverse Dietary Requirements
A modern workforce has diverse dietary preferences. Incorporating pescatarian options, gluten-free choices, and vibrant traditional African dishes ensures every attendee feels valued.

### 3. Transparent Corporate Invoicing
Choose catering partners that provide automated VAT-compliant receipts, Paystack corporate checkout, and direct company bank transfer options.`,
      category: "Corporate Guides",
      readTime: "4 min read",
      publishedDate: "August 18, 2026",
      author: `${profile.name} Culinary Team`,
      authorRole: "Executive Chef & Operations",
      keywords: ["corporate catering", `${profile.city} business lunches`, "executive events", "conference food"],
    },
    {
      id: "post_2",
      slug: "why-jollof-is-the-ultimate-networking-dish",
      title: `Why Afro-Fusion Cuisine is Transforming Business Networking in ${profile.country}`,
      excerpt: "Traditional recipes presented with contemporary fine-dining aesthetics create memorable dining experiences that foster deep business relationships.",
      content: `Food is an emotional bridge. When international investors and corporate executives gather, authentic culinary hospitality sets a warm, collaborative atmosphere.

From slow-smoked firewood Jollof to grilled Asun skewers and seafood paella, modern Afro-fusion cuisine represents the dynamic economic energy of contemporary West Africa.`,
      category: "Culinary Trends",
      readTime: "3 min read",
      publishedDate: "August 15, 2026",
      author: "Amina Adeyemi",
      authorRole: "Head of Culinary Innovation",
      keywords: ["Afro-fusion catering", "African hospitality", "gourmet dining", `${profile.city} events`],
    },
    {
      id: "post_3",
      slug: "complete-guide-to-office-lunch-retainers",
      title: `The Complete Guide to Weekly Office Lunch Retainers for Startups & Tech Teams`,
      excerpt: "How subsidized corporate lunch programs increase team productivity, foster camaraderie, and reduce daily operational friction.",
      content: `Top tech startups and financial institutions in ${profile.city} have discovered that providing delicious, chef-prepared daily meals is one of the highest-ROI employee benefits available.

With rotating weekly menus and seamless WhatsApp coordination, teams stay energized and focused on shipping great work without midday lunch delays.`,
      category: "Workplace Culture",
      readTime: "5 min read",
      publishedDate: "August 10, 2026",
      author: "Tunde Bakare",
      authorRole: "Enterprise Partnerships",
      keywords: ["office lunch subscription", "team meal delivery", "workplace perks", `${profile.city} startups`],
    },
  ]);

  // Handle lead submission from preview
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormName || !leadFormPhone) return;

    onLeadCaptured({
      name: leadFormName,
      email: leadFormEmail || `${leadFormName.toLowerCase().replace(/\s+/g, "")}@example.com`,
      phone: leadFormPhone,
      source: `Website (${activePage.toUpperCase()} Page Form)`,
      notes: `Service Requested: ${leadFormService}. Message: ${leadFormMsg || "Requested quote via live website."}`,
      dealValue: 150000,
      currency: activeCurrency,
      city: profile.city,
    });

    setLeadSuccess(true);
    setTimeout(() => {
      setLeadFormName("");
      setLeadFormEmail("");
      setLeadFormPhone("");
      setLeadFormMsg("");
      setLeadSuccess(false);
    }, 4000);
  };

  // E-Commerce Cart & Dropship Product Helpers
  const handleAddToCart = (product: EcommerceProduct, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartDrawerOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as Array<{ product: EcommerceProduct; quantity: number }>
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleImportProduct = (product: EcommerceProduct) => {
    const existingProducts = website.products || DEFAULT_ECOMMERCE_PRODUCTS;
    const updated = [product, ...existingProducts];
    onUpdateWebsite({
      ...website,
      products: updated,
    });
    // Auto switch to shop page to view the new imported product!
    setActivePage("shop");
  };

  const handleUpdatePlugins = (updatedPlugins: WebsitePlugin[]) => {
    onUpdateWebsite({
      ...website,
      plugins: updatedPlugins,
    });
  };

  const handleSwitchWebsiteType = (type: WebsiteType) => {
    onUpdateWebsite({
      ...website,
      websiteType: type,
    });
    if (type === "ecommerce" || type === "dropshipping") {
      setActivePage("shop");
    } else if (type === "affiliate") {
      setActivePage("affiliate");
    } else {
      setActivePage("home");
    }
  };

  // AI 1-Click Deep SEO & Site Supercharge
  const handleAiSuperchargeAll = async () => {
    setIsSuperchargingSeo(true);
    setSuperchargeSuccess(false);

    try {
      const prompt = `Perform a complete, world-class SEO optimization and multi-page copywriting overhaul for ${profile.name}:
Business Offering: ${profile.offering}
Target Audience: ${profile.targetCustomer}
Location: ${profile.city}, ${profile.country}
Currency: ${activeCurrency}

Requirements:
1. Title Tag: Formatted with high-intent primary transactional keyword + city hook (under 60 chars).
2. Meta Description: Compelling 150-160 char copy with direct Call-To-Action and social proof.
3. Focus & Local LSI Keywords: 8-10 high search volume keywords (mix of transactional, local geo-targeted, and long-tail).
4. Multi-Page Structure: Home, About Us, Services Menu, SEO Blog Articles, Contact Page, and Legal Terms.
5. Schema JSON-LD: Valid Schema.org LocalBusiness, Article & FAQPage structured data.`;

      await generateAiContent({
        agent: "SEO Agent",
        task: "Full Website & Search Engine Supercharge",
        prompt,
        businessProfile: profile,
      });

      const updatedKeywords = [
        `${profile.offering.toLowerCase()} ${profile.city}`,
        `best ${profile.offering.toLowerCase()} in ${profile.country}`,
        `affordable ${profile.offering.toLowerCase()} ${profile.city}`,
        `${profile.name.toLowerCase()} ${profile.city}`,
        `hire ${profile.offering.toLowerCase()} near me`,
        `top rated ${profile.offering.toLowerCase()} ${profile.country}`,
        `order ${profile.offering.toLowerCase()} online`,
        `fast ${profile.offering.toLowerCase()} delivery ${profile.city}`,
      ];

      const optimizedSchema = JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": profile.name,
          "description": website.seo?.metaDescription || profile.offering,
          "url": `https://${website.domain || profile.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".ng"}`,
          "telephone": website.contact?.phone || profile.whatsappNumber,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": website.contact?.address || "Commercial District",
            "addressLocality": profile.city,
            "addressCountry": profile.country,
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 6.5244,
            "longitude": 3.3792,
          },
          "priceRange": activeCurrency === "NGN" ? "₦₦" : "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "250",
          },
        },
        null,
        2
      );

      onUpdateWebsite({
        ...website,
        title: `${profile.name} | #1 ${profile.offering} in ${profile.city}`,
        hero: {
          ...website.hero,
          badge: `🌟 Top Rated ${profile.offering} in ${profile.city}`,
          headline: `Premier ${profile.offering} Engineered For`,
          highlightWord: "Exceptional Results",
          subheadline: `Experience 5-star verified ${profile.offering.toLowerCase()} delivered with speed, uncompromising quality, and instant WhatsApp booking across ${profile.city}.`,
          ctaText: "Order on WhatsApp",
          secondaryCtaText: "Get Free Quote",
        },
        seo: {
          metaTitle: `${profile.name} | Best ${profile.offering} in ${profile.city}, ${profile.country}`,
          metaDescription: `Discover premier ${profile.offering.toLowerCase()} by ${profile.name} in ${profile.city}. Fast turnaround, 4.9★ verified customer reviews, transparent pricing & instant WhatsApp booking.`,
          focusKeywords: updatedKeywords,
          schemaJson: optimizedSchema,
        },
      });

      setSuperchargeSuccess(true);
      setTimeout(() => setSuperchargeSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuperchargingSeo(false);
    }
  };

  // Generate complete production HTML with multi-page router simulation
  const generateProductionHtml = () => {
    const domain = website.domain || `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.ng`;
    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${website.seo?.metaTitle || website.title}</title>
  <meta name="description" content="${website.seo?.metaDescription || website.hero?.subheadline}">
  <meta name="keywords" content="${(website.seo?.focusKeywords || []).join(", ")}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://${domain}">

  <!-- OpenGraph / WhatsApp / Facebook Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://${domain}">
  <meta property="og:title" content="${website.seo?.metaTitle || website.title}">
  <meta property="og:description" content="${website.seo?.metaDescription || website.hero?.subheadline}">
  <meta property="og:site_name" content="${profile.name}">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${website.seo?.metaTitle || website.title}">
  <meta name="twitter:description" content="${website.seo?.metaDescription || website.hero?.subheadline}">

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
${website.seo?.schemaJson || "{}"}
  </script>

  <!-- Google Fonts & Tailwind CSS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <!-- Announcement Header -->
  <div class="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium">
    <span>🚀 Order Online & Enjoy Fast VIP Priority Delivery across ${profile.city}!</span>
  </div>

  <!-- Navigation Bar -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
          ${profile.name.charAt(0)}
        </div>
        <div>
          <span class="font-extrabold text-slate-900 text-lg tracking-tight block">${profile.name}</span>
          <span class="text-[10px] text-slate-500 font-medium block uppercase">${profile.city}, ${profile.country}</span>
        </div>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <a href="#services" class="hover:text-emerald-600">Services</a>
        <a href="#about" class="hover:text-emerald-600">About Us</a>
        <a href="#testimonials" class="hover:text-emerald-600">Reviews</a>
        <a href="#blog" class="hover:text-emerald-600">Blog</a>
        <a href="#faq" class="hover:text-emerald-600">FAQ</a>
        <a href="#contact" class="hover:text-emerald-600">Contact</a>
      </nav>

      <a href="https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(profile.name)},%20I%20want%20to%20place%20an%20order!" target="_blank" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2">
        <span>Order on WhatsApp</span>
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 border-b border-slate-200 text-center">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold">
        <span>${website.hero?.badge || "⭐ Top Rated Service"}</span>
      </div>

      <h1 class="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight">
        ${website.hero?.headline} <span class="text-emerald-600 underline decoration-amber-400 decoration-wavy decoration-2">${website.hero?.highlightWord}</span>
      </h1>

      <p class="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        ${website.hero?.subheadline}
      </p>

      <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
        <a href="https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}" target="_blank" class="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 transition">
          ${website.hero?.ctaText || "Order on WhatsApp"}
        </a>
        <a href="#contact" class="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition">
          ${website.hero?.secondaryCtaText || "Get Free Quote"}
        </a>
      </div>
    </div>
  </section>

  <!-- Services Menu -->
  <section id="services" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="text-xs font-bold text-emerald-600 uppercase tracking-widest block">${website.services?.badge || "SERVICES"}</span>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">${website.services?.title || "Our Packages"}</h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      ${(website.services?.items || [])
        .map(
          (srv) => `
      <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          ${srv.badge ? `<span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase mb-3 inline-block">${srv.badge}</span>` : ""}
          <h3 class="text-lg font-bold text-slate-900">${srv.title}</h3>
          <p class="text-xs text-slate-600 mt-2">${srv.description}</p>
        </div>
        <div class="pt-6 border-t border-slate-100 mt-6">
          <div class="font-mono font-bold text-lg text-emerald-700 mb-3">${srv.price || "Contact for Price"}</div>
          <a href="https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello!%20I%20want%20to%20order%20${encodeURIComponent(srv.title)}" target="_blank" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl text-center block transition">
            Book on WhatsApp
          </a>
        </div>
      </div>`
        )
        .join("")}
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 space-y-3">
      <p class="font-bold text-slate-400">${profile.name} • ${website.contact?.address || profile.city + ", " + profile.country}</p>
      <p>© ${new Date().getFullYear()} ${profile.name}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
  };

  const handleDownloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeType(type);
    setTimeout(() => setCopiedCodeType(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Main Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> MULTI-PAGE AI WEBSITE & BLOG ENGINE
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Domain: {website.domain || `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.ng`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Website Studio & Multi-Page Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Complete website with Home, About Us, Services Catalog, SEO Blog Articles, Contact Pages, and Google Rich Snippet compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsDropshipImporterOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Truck className="w-4 h-4 text-indigo-200" />
              <span>📦 Dropship Importer (AliExpress/CJ)</span>
            </button>

            <button
              onClick={() => setIsPluginMarketplaceOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <Boxes className="w-4 h-4 text-emerald-400" />
              <span>🧩 WooCommerce Plugins ({website.plugins?.filter(p => p.active).length || 6})</span>
            </button>

            <button
              onClick={handleAiSuperchargeAll}
              disabled={isSuperchargingSeo}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              {isSuperchargingSeo ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Supercharging...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>🚀 AI SEO Supercharge</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Website Archetype Switcher */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Website Archetype:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: "ecommerce", label: "🛍️ E-Commerce & Dropship", desc: "Product catalog, Cart, Paystack" },
                { id: "affiliate", label: "⭐ Affiliate & Review Hub", desc: "Comparison tables, cloaked links" },
                { id: "corporate", label: "🏢 Corporate & Agency", desc: "Multi-page B2B services" },
                { id: "booking", label: "📅 Service & Bookings", desc: "Calendar appointment slots" },
              ].map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => handleSwitchWebsiteType(arch.id as WebsiteType)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    (website.websiteType || "ecommerce") === arch.id
                      ? "bg-emerald-500 text-slate-950 shadow-md font-black"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                  title={arch.desc}
                >
                  <span>{arch.label}</span>
                </button>
              ))}
            </div>
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            WooCommerce & AliDropship Active • Fast Checkout Enabled
          </span>
        </div>

        {superchargeSuccess && (
          <div className="mt-4 p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-300 font-semibold animate-in fade-in duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Successfully updated multi-page content with local keywords, blog articles, Schema.org JSON-LD, and high-converting copy!</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800 scrollbar-none">
          {[
            { id: "preview", label: "Live Interactive Website", icon: Eye },
            { id: "editor", label: "Visual Section Editor", icon: Edit3 },
            { id: "seo", label: "SEO & Google Ranking Engine", icon: Search },
            { id: "code", label: "Production HTML & Code Export", icon: Code2 },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white text-slate-900 shadow-md font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LIVE INTERACTIVE MULTI-PAGE PREVIEW */}
      {/* ========================================================================= */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          {/* Top Bar: Multi-Page Navigation Selector + Viewport Switcher */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs">
            {/* Page Router Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Page:</span>
              {[
                { id: "home", label: "Home", icon: Globe },
                { id: "shop", label: "🛍️ Shop & Dropship", icon: ShoppingBag },
                { id: "affiliate", label: "⭐ Affiliate Reviews", icon: Star },
                { id: "services", label: "Services & Catalog", icon: Layers },
                { id: "about", label: "About Us", icon: ShieldCheck },
                { id: "blog", label: "SEO Blog Hub", icon: BookOpen },
                { id: "contact", label: "Contact & Map", icon: Phone },
                { id: "privacy", label: "Privacy & Terms", icon: FileText },
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = activePage === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePage(p.id as any);
                      setSelectedBlogPost(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Viewport Switcher & Code Exporters */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    viewMode === "desktop" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                  title="Desktop (100%)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("tablet")}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    viewMode === "tablet" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    viewMode === "mobile" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                  title="Mobile (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => handleDownloadFile("index.html", generateProductionHtml(), "text/html")}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Code</span>
              </button>
            </div>
          </div>

          {/* Browser Mockup Canvas */}
          <div className="flex justify-center">
            <div
              className={`w-full bg-white border border-slate-300 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
                viewMode === "mobile"
                  ? "max-w-sm"
                  : viewMode === "tablet"
                  ? "max-w-2xl"
                  : "max-w-full"
              }`}
            >
              {/* Browser Address Bar */}
              <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-600 font-mono flex items-center gap-1 truncate max-w-xs">
                  <span className="text-emerald-600 font-bold">https://</span>
                  <span>{website.domain || `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.ng`}</span>
                  <span className="text-slate-400">/{activePage !== "home" ? activePage : ""}</span>
                </div>
                <div className="text-[10px] text-emerald-600 font-mono font-bold">● 100% LIVE</div>
              </div>

              {/* LIVE MULTI-PAGE RENDERER */}
              <div className="h-[800px] overflow-y-auto font-sans bg-slate-50 text-slate-900 relative">
                {/* 1. Universal Announcement Bar */}
                <div className="bg-slate-900 text-white text-[11px] py-2 px-4 text-center font-medium">
                  <span>🚀 Limited Time: Order Online & Receive VIP Priority Handling across {profile.city}!</span>
                </div>

                {/* 2. Universal Navigation Header */}
                <header className="h-16 bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 px-6 flex items-center justify-between">
                  <div
                    onClick={() => {
                      setActivePage("home");
                      setSelectedBlogPost(null);
                    }}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm tracking-tight block">
                        {profile.name}
                      </span>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
                    <button
                      onClick={() => {
                        setActivePage("home");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "home" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("shop");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "shop" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      Store & Dropship
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("affiliate");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "affiliate" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      Deals & Reviews
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("services");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "services" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      Services
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("about");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "about" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("blog");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "blog" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      Blog
                    </button>
                    <button
                      onClick={() => {
                        setActivePage("contact");
                        setSelectedBlogPost(null);
                      }}
                      className={activePage === "contact" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"}
                    >
                      Contact
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Cart Trigger */}
                    <button
                      onClick={() => setIsCartDrawerOpen(true)}
                      className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 text-xs font-bold"
                      title="View Shopping Cart"
                    >
                      <ShoppingCart className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline">Cart</span>
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                        profile.name
                      )},%20I%20want%20to%20place%20an%20order!`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp Buy</span>
                    </a>
                  </div>
                </header>

                {/* ============================================================= */}
                {/* PAGE 1: HOME */}
                {/* ============================================================= */}
                {activePage === "home" && (
                  <div className="space-y-12">
                    {/* Hero Section */}
                    <section className="py-16 px-6 sm:px-12 text-center bg-gradient-to-b from-white via-slate-50 to-emerald-50/20 border-b border-slate-200">
                      <div className="max-w-3xl mx-auto space-y-4">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide">
                          {website.hero?.badge || "⭐ Top Rated Service"}
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                          ${website.hero?.headline}{" "}
                          <span className="text-emerald-600 underline decoration-amber-400 decoration-wavy decoration-2">
                            {website.hero?.highlightWord}
                          </span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                          {website.hero?.subheadline}
                        </p>

                        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                          <a
                            href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>{website.hero?.ctaText || "Order on WhatsApp"}</span>
                          </a>
                          <button
                            onClick={() => setActivePage("contact")}
                            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition"
                          >
                            {website.hero?.secondaryCtaText || "Get Free Quote"}
                          </button>
                        </div>

                        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 font-semibold">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5 from 250+ Clients
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Express Delivery in {profile.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Satisfaction Guarantee
                          </span>
                        </div>
                      </div>
                    </section>

                    {/* Bento Grid */}
                    <section className="px-6 sm:px-12 max-w-4xl mx-auto">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            ⚡
                          </div>
                          <h3 className="font-bold text-sm text-slate-900">Guaranteed Speed</h3>
                          <p className="text-xs text-slate-600">Punctual turnaround tailored for corporate timelines.</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                            🔒
                          </div>
                          <h3 className="font-bold text-sm text-slate-900">Verified Reliability</h3>
                          <p className="text-xs text-slate-600">Standardized procedures, vetted materials, and strict hygiene.</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                            💬
                          </div>
                          <h3 className="font-bold text-sm text-slate-900">WhatsApp Concierge</h3>
                          <p className="text-xs text-slate-600">Direct 1-on-1 human support for effortless order modifications.</p>
                        </div>
                      </div>
                    </section>

                    {/* Featured Packages Preview */}
                    <section className="px-6 sm:px-12 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest font-mono">FEATURED PACKAGES</span>
                          <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Curated Solutions</h2>
                        </div>
                        <button
                          onClick={() => setActivePage("services")}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                        >
                          <span>View Full Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {(website.services?.items || []).slice(0, 2).map((srv) => (
                          <div key={srv.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-base text-slate-900">{srv.title}</h3>
                                {srv.badge && (
                                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                    {srv.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                              <span className="font-mono font-bold text-emerald-700 text-sm">{srv.price}</span>
                              <a
                                href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello!%20I%20want%20to%20order%20${encodeURIComponent(srv.title)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
                              >
                                Order on WhatsApp
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE: E-COMMERCE & DROPSHIPPING STORE */}
                {/* ============================================================= */}
                {activePage === "shop" && (
                  <div className="py-10 px-6 sm:px-12 max-w-5xl mx-auto space-y-8">
                    {/* Header Banner */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            WooCommerce & AliDropship Powered
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {(website.products || DEFAULT_ECOMMERCE_PRODUCTS).length} Products Available
                          </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                          {website.title} Store & Dropship Catalog
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600">
                          Premium imported inventory with nationwide delivery, fast Paystack checkout, and verified supplier guarantees.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsDropshipImporterOpen(true)}
                          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Import Product</span>
                        </button>
                        <button
                          onClick={() => setIsCartDrawerOpen(true)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                        </button>
                      </div>
                    </div>

                    {/* Category Filter Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {["all", "Tech Gadgets", "Beauty & Skincare", "Home Decor", "Dining & Catering"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setEcommerceCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                            ecommerceCategoryFilter === cat
                              ? "bg-slate-900 text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {cat === "all" ? "All Products" : cat}
                        </button>
                      ))}
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(website.products || DEFAULT_ECOMMERCE_PRODUCTS)
                        .filter((p) => ecommerceCategoryFilter === "all" || p.category === ecommerceCategoryFilter)
                        .map((product) => {
                          const profitMargin = product.comparePrice
                            ? Math.round(((product.price - (product.supplierCost || product.price * 0.4)) / product.price) * 100)
                            : 60;
                          return (
                            <div
                              key={product.id}
                              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                            >
                              <div>
                                {/* Product Image Container */}
                                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                                  <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                  {product.badge && (
                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                                      {product.badge}
                                    </span>
                                  )}
                                  {product.source && (
                                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-mono font-bold shadow-xs">
                                      Via {product.source}
                                    </span>
                                  )}
                                  <button
                                    onClick={() => {
                                      setSelectedProductForModal(product);
                                      setSelectedProductQuantity(1);
                                    }}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-800 hover:bg-white flex items-center justify-center shadow-md transition"
                                    title="Quick Preview"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-2.5">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400 font-mono text-[11px]">{product.category}</span>
                                    <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                                      <Star className="w-3 h-3 fill-amber-400" />
                                      <span>{product.rating}</span>
                                      <span className="text-slate-400">({product.reviewsCount})</span>
                                    </div>
                                  </div>

                                  <h3
                                    onClick={() => {
                                      setSelectedProductForModal(product);
                                      setSelectedProductQuantity(1);
                                    }}
                                    className="font-extrabold text-sm text-slate-900 line-clamp-1 hover:text-emerald-600 cursor-pointer transition"
                                  >
                                    {product.title}
                                  </h3>

                                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {product.description}
                                  </p>

                                  {/* Pricing & Profit Tag */}
                                  <div className="pt-2 flex items-center justify-between">
                                    <div className="flex items-baseline gap-2">
                                      <span className="font-mono font-black text-base text-slate-900">
                                        {curr.symbol}{product.price.toLocaleString()}
                                      </span>
                                      {product.comparePrice && (
                                        <span className="font-mono text-xs text-slate-400 line-through">
                                          {curr.symbol}{product.comparePrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>

                                    {product.supplierCost && (
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono">
                                        +{profitMargin}% Margin
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Action Footer */}
                              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => handleAddToCart(product, 1)}
                                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                                >
                                  <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Add to Cart</span>
                                </button>
                                <a
                                  href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello!%20I%20want%20to%20order%20${encodeURIComponent(product.title)}%20(${curr.symbol}${product.price.toLocaleString()})`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>Direct Buy</span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE: AFFILIATE REVIEW & COMPARISON HUB */}
                {/* ============================================================= */}
                {activePage === "affiliate" && (
                  <div className="py-10 px-6 sm:px-12 max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">
                        INDEPENDENT EXPERT REVIEWS & DEALS
                      </span>
                      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                        Top Rated Products & Buying Guides
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We test, review, and compare the best tools, equipment, and gadgets. When you buy through our links, we may earn an affiliate commission at no extra cost to you.
                      </p>
                    </div>

                    {/* Affiliate Comparison Table / Review Cards */}
                    <div className="space-y-6">
                      {(website.affiliateItems || DEFAULT_AFFILIATE_ITEMS).map((item, idx) => (
                        <div
                          key={item.id}
                          className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                            idx === 0
                              ? "border-emerald-400 ring-2 ring-emerald-400/20 shadow-md"
                              : "border-slate-200 shadow-xs"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Image & Award */}
                            <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase">
                                {item.badge}
                              </span>
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center text-amber-500 text-xs font-bold">
                                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                                    <span className="ml-1 text-slate-900">{item.rating} / 5.0</span>
                                  </div>
                                  <span className="text-[11px] text-slate-400">· {item.merchant} Verified</span>
                                </div>
                                <span className="font-mono font-black text-lg text-emerald-700">
                                  {item.price}
                                </span>
                              </div>

                              <h3 className="text-lg font-extrabold text-slate-900">{item.title}</h3>
                              <p className="text-xs text-slate-600 leading-relaxed">{item.verdict}</p>

                              {/* Pros & Cons */}
                              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                                <div className="space-y-1 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                                  <span className="text-[10px] font-bold text-emerald-900 uppercase">Top Pros:</span>
                                  {item.pros.map((p, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-950">
                                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                      <span>{p}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="space-y-1 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                                  <span className="text-[10px] font-bold text-rose-900 uppercase">Cons:</span>
                                  {item.cons.map((c, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs text-rose-950">
                                      <X className="w-3 h-3 text-rose-600 shrink-0" />
                                      <span>{c}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right Action Button */}
                            <div className="w-full md:w-44 flex flex-col items-center justify-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                              <a
                                href={item.affiliateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                              >
                                <span>Check Best Price</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <span className="text-[10px] text-slate-400 text-center font-medium">
                                Direct to {item.merchant}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE 2: ABOUT US */}
                {/* ============================================================= */}
                {activePage === "about" && (
                  <div className="py-12 px-6 sm:px-12 max-w-4xl mx-auto space-y-10">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">OUR STORY & VALUES</span>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{website.about?.title || "Crafting Culinary Joy With Authentic Roots"}</h1>
                      <p className="text-slate-600 text-sm leading-relaxed">{website.about?.description}</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                      <h3 className="text-lg font-bold text-slate-900">The Journey Behind {profile.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{website.about?.story}</p>

                      <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                        {(website.about?.points || []).map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                        <div className="text-2xl font-black text-emerald-700">4.9 / 5.0</div>
                        <p className="text-xs text-emerald-900 font-semibold">250+ Verified Client Reviews</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
                        <div className="text-2xl font-black text-blue-700">100%</div>
                        <p className="text-xs text-blue-900 font-semibold">On-Time Delivery Record</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                        <div className="text-2xl font-black text-amber-700">CAC & ISO</div>
                        <p className="text-xs text-amber-900 font-semibold">Certified Nigerian Business</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE 3: SERVICES & CATALOG */}
                {/* ============================================================= */}
                {activePage === "services" && (
                  <div className="py-12 px-6 sm:px-12 max-w-4xl mx-auto space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">COMPLETE CATALOG</span>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{website.services?.title || "Services & Pricing Menu"}</h1>
                      <p className="text-slate-600 text-sm leading-relaxed">{website.services?.subtitle}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {(website.services?.items || []).map((srv) => (
                        <div key={srv.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-extrabold text-lg text-slate-900">{srv.title}</h3>
                              {srv.badge && (
                                <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                  {srv.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="font-mono font-bold text-emerald-700 text-base">{srv.price}</span>
                            <a
                              href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello!%20I%20want%20to%20order%20the%20${encodeURIComponent(srv.title)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                            >
                              Book on WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE 4: SEO BLOG & KNOWLEDGE HUB */}
                {/* ============================================================= */}
                {activePage === "blog" && (
                  <div className="py-12 px-6 sm:px-12 max-w-4xl mx-auto space-y-8">
                    {selectedBlogPost ? (
                      /* Full Article Reader */
                      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                        <button
                          onClick={() => setSelectedBlogPost(null)}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back to All Articles
                        </button>

                        <div className="space-y-3 pb-6 border-b border-slate-100">
                          <span className="text-xs uppercase font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                            {selectedBlogPost.category}
                          </span>
                          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">{selectedBlogPost.title}</h1>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedBlogPost.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedBlogPost.publishedDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedBlogPost.readTime}</span>
                          </div>
                        </div>

                        <div className="prose prose-sm text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                          {selectedBlogPost.content}
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Share this article:</span>
                          <a
                            href={`https://wa.me/?text=Check%20out%20this%20article:%20${encodeURIComponent(selectedBlogPost.title)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Share on WhatsApp
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* Blog Articles Index */
                      <div className="space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">KNOWLEDGE HUB & SEO BLOG</span>
                          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Articles & Insights</h1>
                          <p className="text-slate-600 text-sm">Expert tips, culinary trends, and corporate dining guides in {profile.city}.</p>
                        </div>

                        <div className="space-y-4">
                          {blogPosts.map((post) => (
                            <div
                              key={post.id}
                              onClick={() => setSelectedBlogPost(post)}
                              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                                  {post.category}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">{post.readTime}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition">{post.title}</h3>
                              <p className="text-xs text-slate-600 leading-relaxed">{post.excerpt}</p>
                              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                                <span>By {post.author}</span>
                                <span className="text-emerald-600 font-bold flex items-center gap-1">Read Article <ArrowRight className="w-3.5 h-3.5" /></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE 5: CONTACT & LOCATION MAP */}
                {/* ============================================================= */}
                {activePage === "contact" && (
                  <div className="py-12 px-6 sm:px-12 max-w-4xl mx-auto space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">GET IN TOUCH</span>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{website.contact?.headline || "Let's Make Your Event Delicious"}</h1>
                      <p className="text-slate-600 text-sm">{website.contact?.subheadline}</p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6">
                      {/* Contact Info Cards */}
                      <div className="md:col-span-5 space-y-4">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <Phone className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">WhatsApp & Phone</span>
                              <span className="text-slate-600 font-mono">{website.contact?.whatsappNumber}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">Corporate Inquiries</span>
                              <span className="text-slate-600">{website.contact?.email}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">Head Kitchen & Hub</span>
                              <span className="text-slate-600">{website.contact?.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold">
                            <Clock className="w-4 h-4" /> Operating Hours
                          </div>
                          <p className="text-slate-300">{website.contact?.workingHours || "Mon - Sat: 7:00 AM - 9:00 PM"}</p>
                        </div>
                      </div>

                      {/* Interactive Inquiry Form */}
                      <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                        {leadSuccess ? (
                          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                            <h3 className="font-bold text-emerald-950 text-base">Inquiry Logged to CRM!</h3>
                            <p className="text-xs text-emerald-800">Our concierge has received your request and will contact you via WhatsApp.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                                <input
                                  type="text"
                                  required
                                  value={leadFormName}
                                  onChange={(e) => setLeadFormName(e.target.value)}
                                  placeholder="e.g. Dr. Chioma Adeyemi"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone</label>
                                <input
                                  type="text"
                                  required
                                  value={leadFormPhone}
                                  onChange={(e) => setLeadFormPhone(e.target.value)}
                                  placeholder="+2348000000000"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Service Required</label>
                              <select
                                value={leadFormService}
                                onChange={(e) => setLeadFormService(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                              >
                                {(website.services?.items || []).map((s) => (
                                  <option key={s.id} value={s.title}>{s.title}</option>
                                ))}
                                <option value="Custom Event Quote">Custom Event Quote</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements</label>
                              <textarea
                                rows={3}
                                value={leadFormMsg}
                                onChange={(e) => setLeadFormMsg(e.target.value)}
                                placeholder="Event date, guest count, location in Lagos/Abuja..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                            >
                              Submit Inquiry
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* PAGE 6: PRIVACY & LEGAL TERMS */}
                {/* ============================================================= */}
                {activePage === "privacy" && (
                  <div className="py-12 px-6 sm:px-12 max-w-3xl mx-auto space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
                      <h1 className="text-xl font-extrabold text-slate-900">Privacy Policy & Service Terms</h1>
                      <p>Last updated: August 2026. Compliant with Nigeria Data Protection Regulation (NDPR) and international privacy frameworks.</p>

                      <h3 className="font-bold text-slate-900 pt-3">1. Information Collection & Usage</h3>
                      <p>We collect contact credentials solely to fulfill food orders, coordinate dispatch logistics, and issue VAT invoices via Paystack.</p>

                      <h3 className="font-bold text-slate-900 pt-3">2. Order Cancellations & Refunds</h3>
                      <p>Orders can be modified up to 24 hours prior to scheduled delivery. Full refunds are processed via original payment methods for cancellations within permitted windows.</p>

                      <h3 className="font-bold text-slate-900 pt-3">3. Food Hygiene & Safety Guarantee</h3>
                      <p>All meals are prepared in certified facilities following HACCP standards and sealed in tamper-proof packaging.</p>
                    </div>
                  </div>
                )}

                {/* Universal Local SEO Footer */}
                <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800 text-xs text-slate-500 space-y-6">
                  <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-left">
                    <div>
                      <h4 className="font-bold text-slate-300 mb-2">{profile.name}</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        {website.contact?.address || `${profile.city}, ${profile.country}`}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-1">Phone: {website.contact?.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-300 mb-2">Quick Navigation</h4>
                      <div className="flex flex-col gap-1 text-[11px]">
                        <button onClick={() => setActivePage("home")} className="text-left text-slate-400 hover:text-white">Home</button>
                        <button onClick={() => setActivePage("services")} className="text-left text-slate-400 hover:text-white">Services Menu</button>
                        <button onClick={() => setActivePage("about")} className="text-left text-slate-400 hover:text-white">About Us</button>
                        <button onClick={() => setActivePage("blog")} className="text-left text-slate-400 hover:text-white">SEO Blog Hub</button>
                        <button onClick={() => setActivePage("privacy")} className="text-left text-slate-400 hover:text-white">Privacy Terms</button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-300 mb-2">Local Search Directory</h4>
                      <div className="flex flex-wrap gap-1">
                        {(website.seo?.focusKeywords || []).slice(0, 4).map((kw, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 rounded text-slate-400">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6 border-t border-slate-900 text-[11px] text-slate-600">
                    <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved. Built on BizPilot AI OS.</p>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: VISUAL SECTION EDITOR */}
      {/* ========================================================================= */}
      {activeTab === "editor" && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Page Sections</span>
              </h3>

              <div className="space-y-1.5">
                {[
                  { id: "hero", label: "Hero & Value Prop" },
                  { id: "services", label: "Services & Catalog" },
                  { id: "about", label: "About Mission & Story" },
                  { id: "pricing", label: "Pricing Packages" },
                  { id: "testimonials", label: "Customer Reviews" },
                  { id: "faq", label: "FAQ Accordion" },
                  { id: "contact", label: "Contact & WhatsApp" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      activeSection === s.id
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{s.label}</span>
                    <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Editing Section: {activeSection.toUpperCase()}
              </h4>
            </div>

            {activeSection === "hero" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={website.hero?.badge || ""}
                    onChange={(e) =>
                      onUpdateWebsite({ ...website, hero: { ...website.hero, badge: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Main Headline (H1)</label>
                  <input
                    type="text"
                    value={website.hero?.headline || ""}
                    onChange={(e) =>
                      onUpdateWebsite({ ...website, hero: { ...website.hero, headline: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Highlight Word (Color Accent)</label>
                  <input
                    type="text"
                    value={website.hero?.highlightWord || ""}
                    onChange={(e) =>
                      onUpdateWebsite({ ...website, hero: { ...website.hero, highlightWord: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subheadline (H2 Keyword Density)</label>
                  <textarea
                    rows={3}
                    value={website.hero?.subheadline || ""}
                    onChange={(e) =>
                      onUpdateWebsite({ ...website, hero: { ...website.hero, subheadline: e.target.value } })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SEO & GOOGLE RANKING ENGINE */}
      {/* ========================================================================= */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>Google Search Result Snippet Preview</span>
                </h3>
                <p className="text-xs text-slate-500">Live preview of how your website appears on Google SERP.</p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setGooglePreviewDevice("mobile")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    googlePreviewDevice === "mobile" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Mobile SERP
                </button>
                <button
                  onClick={() => setGooglePreviewDevice("desktop")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    googlePreviewDevice === "desktop" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Desktop SERP
                </button>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-300 rounded-2xl max-w-2xl font-sans space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white font-black text-[9px] flex items-center justify-center">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1 text-[12px] text-slate-800">
                  <span className="font-semibold">{profile.name}</span>
                  <span className="text-slate-400">https://{website.domain || `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.ng`}</span>
                </div>
              </div>

              <h4 className="text-lg sm:text-xl font-medium text-blue-800 hover:underline cursor-pointer leading-snug">
                {website.seo?.metaTitle || website.title}
              </h4>

              <div className="flex items-center gap-2 text-xs text-slate-600 pt-0.5">
                <div className="flex text-amber-500 text-xs">★★★★★</div>
                <span className="font-bold text-slate-800">Rating: 4.9</span>
                <span>· 250+ reviews</span>
                <span>· {activeCurrency === "NGN" ? "₦₦" : "$$"}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                {website.seo?.metaDescription || website.hero?.subheadline}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PRODUCTION CODE & EXPORT SUITE */}
      {/* ========================================================================= */}
      {activeTab === "code" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Production HTML5 & SEO Assets Exporter</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download standalone HTML, XML Sitemap, and robots.txt ready to host on any server or Cloud Run.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleDownloadFile("index.html", generateProductionHtml(), "text/html")}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> Download index.html
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-xs rounded-2xl overflow-x-auto max-h-[500px] border border-slate-800">
            {generateProductionHtml()}
          </pre>
        </div>
      )}

      {/* Next / Back Bottom Navigation */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <button
          onClick={onNavigateToPrev}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Cloud Hosting</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
          Module 4 of 8 • AI Website & SEO Studio
        </span>

        <button
          onClick={onNavigateToNext}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-xs"
        >
          <span>Next: SEO Agent & Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: PRODUCT DETAIL & QUICK BUY MODAL */}
      {/* ========================================================================= */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                  {selectedProductForModal.badge || "Verified Quality"}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  SKU: {selectedProductForModal.sku}
                </span>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={selectedProductForModal.images[0]}
                    alt={selectedProductForModal.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                      {selectedProductForModal.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-amber-500 text-xs">
                        {"★".repeat(Math.round(selectedProductForModal.rating))}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{selectedProductForModal.rating}</span>
                      <span className="text-xs text-slate-400">({selectedProductForModal.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black font-mono text-slate-900">
                      {curr.symbol}{selectedProductForModal.price.toLocaleString()}
                    </span>
                    {selectedProductForModal.comparePrice && (
                      <span className="text-sm font-mono text-slate-400 line-through">
                        {curr.symbol}{selectedProductForModal.comparePrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProductForModal.description}
                  </p>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-bold text-slate-700">Quantity:</span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => setSelectedProductQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-bold font-mono">
                        {selectedProductQuantity}
                      </span>
                      <button
                        onClick={() => setSelectedProductQuantity((q) => q + 1)}
                        className="w-7 h-7 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs & Supplier Logistics */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Time</span>
                  <span className="font-bold text-slate-800">{selectedProductForModal.estimatedDeliveryDays || "1 - 3 Days"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Inventory Status</span>
                  <span className="font-bold text-emerald-600">In Stock ({selectedProductForModal.inventoryCount || 45} units)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Supplier Platform</span>
                  <span className="font-bold text-indigo-600">{selectedProductForModal.source || "AliDropship Direct"}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  handleAddToCart(selectedProductForModal, selectedProductQuantity);
                  setSelectedProductForModal(null);
                }}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <span>Add ({selectedProductQuantity}) to Cart</span>
              </button>

              <a
                href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello!%20I%20want%20to%20buy%20${selectedProductQuantity}x%20${encodeURIComponent(selectedProductForModal.title)}%20for%20${curr.symbol}${(selectedProductForModal.price * selectedProductQuantity).toLocaleString()}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Direct WhatsApp Buy</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SHOPPING CART & INSTANT PAYSTACK CHECKOUT DRAWER */}
      {/* ========================================================================= */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                <h2 className="font-extrabold text-base text-slate-900">Your Shopping Cart</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-bold font-mono">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCartCheckoutSuccess(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {cartCheckoutSuccess ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-3xl border border-emerald-200 my-auto">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h3 className="text-lg font-black text-emerald-950">Payment & Order Confirmed!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Receipt #BP-{Math.floor(100000 + Math.random() * 900000)} generated. Supplier fulfillment and tracking details have been sent to WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setCartItems([]);
                      setCartCheckoutSuccess(false);
                      setIsCartDrawerOpen(false);
                    }}
                    className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Done & Continue Shopping
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">Your cart is currently empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Browse our dropshipping catalog or service packages to add items.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center gap-3.5 shadow-xs"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {item.product.title}
                      </h4>
                      <div className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
                        {curr.symbol}{(item.product.price * item.quantity).toLocaleString()}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 px-1 py-0.5">
                          <button
                            onClick={() => handleUpdateCartQuantity(item.product.id, -1)}
                            className="p-0.5 text-slate-600 hover:text-slate-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateCartQuantity(item.product.id, 1)}
                            className="p-0.5 text-slate-600 hover:text-slate-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="text-[11px] text-rose-500 hover:text-rose-700 font-bold ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && !cartCheckoutSuccess && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-slate-900">
                      {curr.symbol}
                      {cartItems
                        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping ({profile.city})</span>
                    <span className="font-mono text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-black text-sm text-slate-900">
                    <span>Total Amount</span>
                    <span className="font-mono text-base text-emerald-700">
                      {curr.symbol}
                      {cartItems
                        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setCartCheckoutSuccess(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay with Paystack Card / Bank</span>
                  </button>

                  <a
                    href={`https://wa.me/${website.contact?.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello!%20I%20want%20to%20checkout%20my%20order%20of%20${cartItems.map(i => `${i.quantity}x%20${encodeURIComponent(i.product.title)}`).join(',%20')}%20Total:%20${curr.symbol}${cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toLocaleString()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Checkout via WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: 1-CLICK DROPSHIP PRODUCT IMPORTER (ALIEXPRESS / CJ) */}
      {/* ========================================================================= */}
      {isDropshipImporterOpen && (
        <DropshipProductImporterModal
          isOpen={isDropshipImporterOpen}
          onClose={() => setIsDropshipImporterOpen(false)}
          activeCurrency={activeCurrency}
          onImportProduct={handleImportProduct}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: WOOCOMMERCE & DROPSHIPPING PLUGIN MARKETPLACE */}
      {/* ========================================================================= */}
      {isPluginMarketplaceOpen && (
        <PluginMarketplaceModal
          isOpen={isPluginMarketplaceOpen}
          onClose={() => setIsPluginMarketplaceOpen(false)}
          plugins={website.plugins || DEFAULT_PLUGINS}
          onUpdatePlugins={handleUpdatePlugins}
        />
      )}
    </div>
  );
};
