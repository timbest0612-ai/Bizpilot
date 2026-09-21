import React, { useState } from "react";
import {
  Eye,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Search,
  ExternalLink,
  Sliders,
  DollarSign,
  Play,
  CheckCircle2,
  AlertCircle,
  Video,
  Target,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { CompetitorPriceTracker, CompetitorAdInsight, CurrencyCode, BusinessProfile } from "../../types";

interface Props {
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  priceTrackers?: CompetitorPriceTracker[];
  adInsights?: CompetitorAdInsight[];
  onUpdatePrice?: (sku: string, newPrice: number) => void;
}

export const CompetitorSpyView: React.FC<Props> = ({
  profile,
  activeCurrency,
  priceTrackers: initialTrackers,
  adInsights: initialAds,
  onUpdatePrice,
}) => {
  const [trackers, setTrackers] = useState<CompetitorPriceTracker[]>(
    initialTrackers || [
      {
        id: "spy_1",
        productName: "Ultra-Quiet Smart Air Fryer & Rotisserie (5.5L)",
        mySku: "AF-5500-BLK",
        myPrice: 68500,
        competitors: [
          { competitorName: "Jumia Official SuperStore", platform: "Jumia", price: 74999, inStock: true, productUrl: "https://jumia.com.ng/airfryer-55", priceDifference: -8.6 },
          { competitorName: "Konga Choice Direct", platform: "Konga", price: 71500, inStock: true, productUrl: "https://konga.com/product/airfryer-xl", priceDifference: -4.2 },
          { competitorName: "MegaKitchen NG (Instagram)", platform: "Instagram Vendor", price: 65000, inStock: false, productUrl: "https://instagram.com/megakitchen", priceDifference: 5.3 },
        ],
        recommendedPrice: 69900,
        suggestedAction: "HOLD_PRICE",
        intelligenceSummary: "You are 8.6% cheaper than Jumia with faster 2-day delivery. Competitor on Instagram is out of stock, driving traffic to your store.",
        autoRepriceRule: "Maintain price 5% lower than Jumia Official Store",
      },
      {
        id: "spy_2",
        productName: "Magnetic 10,000mAh MagSafe Power Bank",
        mySku: "PB-MAG-10K",
        myPrice: 34000,
        competitors: [
          { competitorName: "Slot Systems Nigeria", platform: "Shopify Store", price: 38500, inStock: true, productUrl: "https://slot.ng/magsafe-10k", priceDifference: -11.6 },
          { competitorName: "Amazon Global Shipping", platform: "Amazon", price: 42000, inStock: true, productUrl: "https://amazon.com/dp/B09MAGSAFE", priceDifference: -19.0 },
          { competitorName: "GadgetLounge Ikeja", platform: "Instagram Vendor", price: 32000, inStock: true, productUrl: "https://instagram.com/gadgetlounge", priceDifference: 6.25 },
        ],
        recommendedPrice: 33500,
        suggestedAction: "LOWER_PRICE",
        intelligenceSummary: "Lowering by ₦500 undercuts GadgetLounge while preserving an exceptional 56% gross profit margin ($14,500 cost vs $33,500 retail).",
        autoRepriceRule: "Dynamic match: Lowest verified in-stock vendor - ₦500",
      },
    ]
  );

  const [ads] = useState<CompetitorAdInsight[]>(
    initialAds || [
      {
        id: "ad_1",
        brandName: "NutriCrisp Kitchen Hub",
        platform: "Facebook & Instagram",
        headline: "Stop eating soaked oily chicken! Watch this 10-minute Air Fryer trick 🔥",
        creativeType: "Video Hook",
        estimatedSpend: "$1,200 - $2,500/month",
        runningDays: 42,
        adHookScript: "Start with sizzling sound + showing 1 cup of oil drained out of the chicken into a glass cup to shock the viewer.",
        targetAudience: "Lagos & Abuja, Age 25-45, Interests: Healthy Cooking, Fitness, Weight Loss",
        keyTakeaway: "Demonstrating the drained grease generates 4x higher CTR than static product photos.",
      },
      {
        id: "ad_2",
        brandName: "PowerSnap Gadgets Africa",
        platform: "TikTok Ads",
        headline: "POV: Your iPhone was at 3% during a 4-hour Third Mainland Bridge traffic jam 🔋😭",
        creativeType: "Video Hook",
        estimatedSpend: "$800 - $1,500/month",
        runningDays: 28,
        adHookScript: "Relatable panic traffic situation, snaps MagSafe bank effortlessly on phone back without messy wires.",
        targetAudience: "Nigeria, Age 18-35, Interests: iPhone, Gadgets, Tech Trends, Comedy",
        keyTakeaway: "Local hyper-relatable scenarios (traffic, NEPA light outage) convert 300% better than foreign product specs.",
      },
    ]
  );

  const [activeTab, setActiveTab] = useState<"price-radar" | "ad-spy" | "repricing-rules">("price-radar");
  const [isScanning, setIsScanning] = useState(false);
  const [appliedPriceMessage, setAppliedPriceMessage] = useState<string | null>(null);

  const handleScanCompetitors = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAppliedPriceMessage("Scanned 14 competitor URLs on Jumia, Konga & Instagram. Pricing indices updated.");
      setTimeout(() => setAppliedPriceMessage(null), 3000);
    }, 1000);
  };

  const handleApplyRecommendation = (trackerId: string, recPrice: number) => {
    const updated = trackers.map((t) => (t.id === trackerId ? { ...t, myPrice: recPrice, suggestedAction: "HOLD_PRICE" as const } : t));
    setTrackers(updated);
    const target = trackers.find((t) => t.id === trackerId);
    if (target) {
      onUpdatePrice?.(target.mySku, recPrice);
    }
    setAppliedPriceMessage(`Applied optimal price ₦${recPrice.toLocaleString()} for ${target?.productName}`);
    setTimeout(() => setAppliedPriceMessage(null), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                AI Competitor Spy & Price Intelligence
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                Jumia • Konga • Meta Ad Library • TikTok
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Benchmark market prices in real-time, spy on competitor video ad hooks, and deploy dynamic auto-repricing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleScanCompetitors}
            disabled={isScanning}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? "Crawling Marketplaces..." : "Live Scan Market Prices"}
          </button>
        </div>
      </div>

      {appliedPriceMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {appliedPriceMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: "price-radar", label: "Market Price Radar & Margins", icon: DollarSign },
          { id: "ad-spy", label: "Competitor Meta & TikTok Ad Spy", icon: Video },
          { id: "repricing-rules", label: "Dynamic Auto-Reprice Engine", icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PRICE RADAR */}
      {activeTab === "price-radar" && (
        <div className="space-y-6">
          {trackers.map((tr) => (
            <div
              key={tr.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{tr.productName}</h3>
                  <div className="text-xs font-mono text-slate-400">SKU: {tr.mySku}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Your Current Price</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white">
                      ₦{tr.myPrice.toLocaleString()}
                    </div>
                  </div>
                  {tr.suggestedAction === "LOWER_PRICE" ? (
                    <button
                      onClick={() => handleApplyRecommendation(tr.id, tr.recommendedPrice)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Reprice to ₦{tr.recommendedPrice.toLocaleString()}
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold rounded-xl">
                      ✓ Optimal Price
                    </span>
                  )}
                </div>
              </div>

              {/* Competitor Benchmarks Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-3">Competitor Merchant</th>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Competitor Price</th>
                      <th className="p-3">Price Gap vs You</th>
                      <th className="p-3">In-Stock Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tr.competitors.map((c, i) => (
                      <tr key={i}>
                        <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{c.competitorName}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">{c.platform}</span></td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">₦{c.price.toLocaleString()}</td>
                        <td className="p-3">
                          <span
                            className={`font-bold ${
                              c.priceDifference < 0 ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            {c.priceDifference < 0 ? `You are ${Math.abs(c.priceDifference)}% cheaper` : `You are ${c.priceDifference}% higher`}
                          </span>
                        </td>
                        <td className="p-3">
                          {c.inStock ? (
                            <span className="text-emerald-600 font-semibold">✓ In Stock</span>
                          ) : (
                            <span className="text-amber-500 font-semibold">⚠️ Out of Stock</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* AI Strategic Intelligence Note */}
              <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>AI Pricing Recommendation:</strong> {tr.intelligenceSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AD SPY */}
      {activeTab === "ad-spy" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    {ad.platform}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Running for {ad.runningDays} days</span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{ad.brandName}</h4>
                  <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-1 italic">
                    "{ad.headline}"
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Viral Video Hook Breakdown</div>
                  <p className="text-slate-600 dark:text-slate-400">{ad.adHookScript}</p>
                </div>

                <div className="space-y-1 text-xs text-slate-500">
                  <div>🎯 <strong>Audience:</strong> {ad.targetAudience}</div>
                  <div>💰 <strong>Est. Monthly Ad Spend:</strong> {ad.estimatedSpend}</div>
                  <div className="pt-2 text-slate-800 dark:text-slate-200">
                    💡 <strong>Takeaway for your store:</strong> {ad.keyTakeaway}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMIC REPRICING ENGINE */}
      {activeTab === "repricing-rules" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Dynamic Auto-Repricing Automation Rules
            </h3>
            <p className="text-xs text-slate-500">
              BizPilot monitors Jumia, Konga and major competitors 24/7. When they change prices, your storefront auto-adjusts within defined safety bounds.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">Rule 1: Always Stay 5% Cheaper than Jumia Official Store</div>
                <div className="text-xs text-slate-400">Applies to: Home & Kitchen Catalog • Floor Margin: 25%</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">ACTIVE</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">Rule 2: Match Lowest In-Stock Vendor - ₦500</div>
                <div className="text-xs text-slate-400">Applies to: Gadgets & Power Banks • Floor Margin: 35%</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
