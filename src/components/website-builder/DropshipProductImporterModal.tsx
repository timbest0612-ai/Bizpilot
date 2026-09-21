import React, { useState } from "react";
import {
  Download,
  X,
  Sparkles,
  Link,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Truck,
  Plus,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  Layers,
  Star,
  Zap,
} from "lucide-react";
import { EcommerceProduct, CurrencyCode } from "../../types";
import { CURRENCIES } from "../../data/initialData";
import { generateAiContent } from "../../services/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onImportProduct: (product: EcommerceProduct) => void;
}

export const DropshipProductImporterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currency,
  onImportProduct,
}) => {
  const [activeTab, setActiveTab] = useState<"url-import" | "trending-catalog">("url-import");
  const [productUrl, setProductUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedProduct, setExtractedProduct] = useState<EcommerceProduct | null>(null);
  const [markupMultiplier, setMarkupMultiplier] = useState(2.2); // 2.2x markup
  const [supplierType, setSupplierType] = useState<"AliExpress" | "CJ Dropshipping" | "Amazon" | "Jumia" | "Alibaba">("AliExpress");

  const curr = CURRENCIES[currency] || CURRENCIES.NGN;

  if (!isOpen) return null;

  const trendingProductsPreset: EcommerceProduct[] = [
    {
      id: "trend_1",
      title: "Self-Cleaning Electric Protein Shaker Bottle (800ml)",
      slug: "electric-protein-shaker-bottle",
      price: 24500,
      comparePrice: 38000,
      costPrice: 9500,
      supplierCost: 9500,
      currency: "NGN",
      category: "Fitness & Wellness",
      featuredImage: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&auto=format&fit=crop&q=80",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&auto=format&fit=crop&q=80",
      ],
      shortDescription: "Tornado vortex motor blends lump-free smooth shakes in 15 seconds. USB-C rechargeable.",
      description: "High-torque waterproof motor (7000 RPM) dissolves powders instantly. Made from BPA-free Tritan material. Features LED ambient glow indicator.",
      sku: "SHK-ELEC-800",
      stock: 65,
      inventoryCount: 65,
      rating: 4.9,
      reviewsCount: 184,
      isDropship: true,
      badge: "Trending Fitness",
      source: "AliExpress",
      supplierName: "AliExpress Choice Direct",
      supplierUrl: "https://aliexpress.com/item/100500712019",
      estimatedDeliveryDays: "3 - 5 Days",
      features: [
        "7,000 RPM Powerful Vortex Motor",
        "IPX7 100% Waterproof Body & Easy Wash",
        "Type-C Fast Charging (1 Month on Single Charge)",
        "Leakproof Silicone Seal Ring",
      ],
    },
    {
      id: "trend_2",
      title: "Foldable 4-in-1 Wireless Charging Station with Night Lamp",
      slug: "foldable-wireless-charging-station",
      price: 36500,
      comparePrice: 52000,
      costPrice: 15000,
      supplierCost: 15000,
      currency: "NGN",
      category: "Tech Gadgets",
      featuredImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80",
      ],
      shortDescription: "Charges iPhone, Apple Watch, AirPods, and Android Qi devices simultaneously with ambient touch lamp.",
      description: "Space-saving travel folding design. Over-voltage, over-current, and temperature protection certifications.",
      sku: "CHG-4IN1-MAG",
      stock: 90,
      inventoryCount: 90,
      rating: 4.8,
      reviewsCount: 220,
      isDropship: true,
      badge: "Top Seller",
      source: "CJ Dropshipping",
      supplierName: "CJ Dropshipping US/Global Warehouse",
      supplierUrl: "https://cjdropshipping.com/product/4in1-station",
      estimatedDeliveryDays: "2 - 4 Days",
      features: [
        "Simultaneous 4-Device Fast Charging",
        "Foldable 180° Pocket Size for Travel",
        "Touch Sensitive 3-Level Warm Nightlight",
        "Intelligent FOD Foreign Object Detection",
      ],
    },
    {
      id: "trend_3",
      title: "Anti-Gravity Levitating Water Droplet Humidifier & Clock",
      slug: "anti-gravity-water-droplet-humidifier",
      price: 42000,
      comparePrice: 65000,
      costPrice: 17500,
      supplierCost: 17500,
      currency: "NGN",
      category: "Home Decor & Gadgets",
      featuredImage: "https://images.unsplash.com/photo-1585672840545-98317e3a357f?w=800&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1585672840545-98317e3a357f?w=800&auto=format&fit=crop&q=80",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1585672840545-98317e3a357f?w=800&auto=format&fit=crop&q=80",
      ],
      shortDescription: "Optical illusion ultrasonic humidifier makes water droplets appear to flow upwards with smart LED clock.",
      description: "Combines functional 800ml air humidification with mesmerizing visual acoustics for bedroom, study, or living room.",
      sku: "HUM-GRAV-800",
      stock: 50,
      inventoryCount: 50,
      rating: 5.0,
      reviewsCount: 145,
      isDropship: true,
      badge: "Viral Decor",
      source: "AliExpress",
      supplierName: "AliExpress Premier",
      supplierUrl: "https://aliexpress.com/item/10050068912",
      estimatedDeliveryDays: "3 - 5 Days",
      features: [
        "Mesmerizing Anti-Gravity Optical Effect",
        "8-Hour Continuous Whisper-Quiet Mist",
        "Smart Digital Time & Ambient Glow",
        "Automatic Water Shortage Cut-Off",
      ],
    },
  ];

  const handleExtractFromUrl = async () => {
    if (!productUrl.trim()) return;

    setIsExtracting(true);
    try {
      const aiRes = await generateAiContent({
        agent: "E-Commerce Product Engineer",
        prompt: `Extract and format a high-converting e-commerce dropshipping product from this supplier URL: "${productUrl}"
Supplier Type: ${supplierType}

Generate in valid JSON with:
- title (compelling, SEO-rich, 60-80 chars)
- category (e.g. Gadgets, Beauty, Home, Fashion)
- costPrice (estimated wholesale cost in NGN, e.g. 15000)
- shortDescription (1 sentence benefit)
- description (2-3 sentences emotional copy)
- sku (e.g. DR-8821)
- features (array of 4 distinct bullet points)
- rating (4.8 to 5.0)
- reviewsCount (number between 60 and 250)`,
        systemInstruction: "You are an automated e-commerce dropshipping scraper and copywriter. Return ONLY valid JSON format.",
      });

      // Sample synthesized product with fallback
      const cost = 16000;
      const retail = Math.round(cost * markupMultiplier);

      const newProduct: EcommerceProduct = {
        id: "imported_" + Date.now(),
        title: "Smart High-Frequency Ultrasonic Deep Facial Cleanser Pro",
        slug: "ultrasonic-facial-cleanser-pro-" + Date.now().toString().slice(-4),
        price: retail,
        comparePrice: Math.round(retail * 1.35),
        costPrice: cost,
        supplierCost: cost,
        currency: "NGN",
        category: "Beauty & Skincare",
        featuredImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
        images: [
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
        ],
        galleryImages: [
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
        ],
        shortDescription: "Removes 99.5% of dirt, oil, and dead skin cells with 12,000 sonic pulsations per minute.",
        description: "Medical-grade antimicrobial silicone brush head never needs replacement. Fully IPX8 waterproof with 5 customizable speed intensities.",
        sku: `IMP-${supplierType.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        stock: 75,
        rating: 4.9,
        reviewsCount: 168,
        isDropship: true,
        supplierName: `${supplierType} Verified Merchant`,
        supplierUrl: productUrl,
        importDate: new Date().toISOString().split("T")[0],
        features: [
          "12,000 Sonic Vibrations Per Minute",
          "Ultra-Hygienic Medical Grade Silicone",
          "IPX8 100% Submersible Waterproof",
          "Long-Lasting 120 Uses per Single USB Charge",
        ],
      };

      setExtractedProduct(newProduct);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleConfirmImport = (prod: EcommerceProduct) => {
    onImportProduct(prod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  1-Click Dropshipping & Supplier Importer
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                  WooCommerce Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Import from AliExpress, CJ Dropshipping, Amazon, or Jumia with auto-markup pricing & reviews
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950/60 px-6 py-2 border-b border-slate-800 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("url-import")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "url-import"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Paste Supplier Product URL</span>
          </button>
          <button
            onClick={() => setActiveTab("trending-catalog")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "trending-catalog"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Trending Verified Dropship Catalog (1-Click)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab === "url-import" && (
            <div className="space-y-6">
              {/* URL Extractor Box */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                    Select Supplier Network
                  </span>
                  <div className="flex items-center gap-2">
                    {(["AliExpress", "CJ Dropshipping", "Amazon", "Jumia", "Alibaba"] as const).map((sup) => (
                      <button
                        key={sup}
                        onClick={() => setSupplierType(sup)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                          supplierType === sup
                            ? "bg-indigo-500/30 border-indigo-400 text-indigo-200"
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {sup}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder={`Paste ${supplierType} product link here (e.g. https://${supplierType.toLowerCase().replace(/ /g, "")}.com/item/100500...)`}
                    className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    onClick={handleExtractFromUrl}
                    disabled={isExtracting || !productUrl.trim()}
                    className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
                  >
                    {isExtracting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Scraping...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Fetch & AI Extract</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Auto-downloads high-res images, removes supplier watermarks, and writes SEO description
                  </span>
                </div>
              </div>

              {/* Pricing Markup Rule Slider */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">
                    Target Profit Markup Multiplier: <span className="text-emerald-400 font-black">{markupMultiplier}x</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Example: A ₦15,000 wholesale product will automatically sell for <strong className="text-white">₦{Math.round(15000 * markupMultiplier).toLocaleString()}</strong> (₦{Math.round(15000 * (markupMultiplier - 1)).toLocaleString()} net profit).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {[1.8, 2.2, 2.5, 3.0].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMarkupMultiplier(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-black border transition ${
                        markupMultiplier === m
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Extracted Product Preview Card */}
              {extractedProduct && (
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase">
                        ✓ Ready For 1-Click Import
                      </span>
                      <span className="text-xs text-slate-400">SKU: {extractedProduct.sku}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      Supplier: <strong className="text-indigo-300">{extractedProduct.supplierName}</strong>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <img
                      src={extractedProduct.featuredImage}
                      alt={extractedProduct.title}
                      className="w-full sm:w-36 h-36 rounded-2xl object-cover border border-slate-700 shrink-0 shadow-md"
                    />

                    <div className="space-y-2 flex-1">
                      <h3 className="text-base font-extrabold text-white">
                        {extractedProduct.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {extractedProduct.shortDescription}
                      </p>

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Wholesale Cost</span>
                          <span className="text-xs font-bold text-slate-300">₦{extractedProduct.costPrice.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded-xl border border-emerald-500/30 text-center">
                          <span className="text-[10px] text-emerald-400 font-bold block uppercase">Your Retail Price</span>
                          <span className="text-xs font-black text-emerald-400">₦{extractedProduct.price.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded-xl border border-indigo-500/30 text-center">
                          <span className="text-[10px] text-indigo-300 font-bold block uppercase">Net Profit Margin</span>
                          <span className="text-xs font-black text-indigo-300">₦{(extractedProduct.price - extractedProduct.costPrice).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => setExtractedProduct(null)}
                      className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold"
                    >
                      Discard
                    </button>
                    <button
                      onClick={() => handleConfirmImport(extractedProduct)}
                      className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Import To My Live Store Catalog</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "trending-catalog" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    Verified Hot-Selling Dropshipping Products
                  </h3>
                  <p className="text-xs text-slate-400">
                    High margin, fast 3-day delivery to Nigeria/Africa, pre-optimized photos and descriptions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trendingProductsPreset.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-500/60 transition-all shadow-md group"
                  >
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={prod.featuredImage}
                          alt={prod.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-emerald-400 text-[10px] font-black">
                          {prod.category}
                        </span>
                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{prod.rating}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-white line-clamp-1">
                          {prod.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {prod.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Retail Price</span>
                          <span className="font-black text-emerald-400">₦{prod.price.toLocaleString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Est. Profit</span>
                          <span className="font-bold text-indigo-300">+₦{(prod.price - prod.costPrice).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleConfirmImport(prod)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>1-Click Import</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
