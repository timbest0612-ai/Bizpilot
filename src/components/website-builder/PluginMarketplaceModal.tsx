import React, { useState } from "react";
import {
  Boxes,
  X,
  Search,
  CheckCircle2,
  Settings,
  Download,
  Power,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Truck,
  CreditCard,
  Link2,
  Gauge,
  Layout,
  MessageCircle,
  Star,
  ExternalLink,
  Sliders,
  Check,
} from "lucide-react";
import { WebsitePlugin } from "../../types";
import { DEFAULT_PLUGINS } from "../../data/initialData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plugins: WebsitePlugin[];
  onUpdatePlugins: (plugins: WebsitePlugin[]) => void;
}

export const PluginMarketplaceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  plugins = DEFAULT_PLUGINS,
  onUpdatePlugins,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPluginForConfig, setSelectedPluginForConfig] = useState<WebsitePlugin | null>(null);
  const [configSettings, setConfigSettings] = useState<Record<string, any>>({});

  if (!isOpen) return null;

  const handleToggleActive = (id: string) => {
    const updated = plugins.map((p) => (p.id === id ? { ...p, active: !p.active } : p));
    onUpdatePlugins(updated);
  };

  const handleToggleInstall = (id: string) => {
    const updated = plugins.map((p) => {
      if (p.id === id) {
        const nextInstalled = !p.installed;
        return { ...p, installed: nextInstalled, active: nextInstalled ? true : false };
      }
      return p;
    });
    onUpdatePlugins(updated);
  };

  const handleOpenConfig = (plugin: WebsitePlugin) => {
    setSelectedPluginForConfig(plugin);
    setConfigSettings(plugin.settings || {});
  };

  const handleSaveConfig = () => {
    if (!selectedPluginForConfig) return;
    const updated = plugins.map((p) =>
      p.id === selectedPluginForConfig.id ? { ...p, settings: configSettings } : p
    );
    onUpdatePlugins(updated);
    setSelectedPluginForConfig(null);
  };

  const filteredPlugins = plugins.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "ecommerce":
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case "affiliate":
        return <Link2 className="w-4 h-4 text-amber-400" />;
      case "seo":
      case "marketing":
        return <Zap className="w-4 h-4 text-indigo-400" />;
      case "security":
        return <ShieldCheck className="w-4 h-4 text-rose-400" />;
      case "speed":
        return <Gauge className="w-4 h-4 text-cyan-400" />;
      default:
        return <Boxes className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl h-[90vh] max-h-[820px] shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  WooCommerce & WordPress Plugin Ecosystem
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                  100% Compatible
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Power any website archetype: E-Commerce, AliExpress Dropshipping, Affiliate Marketing, SEO, and Paystack
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

        {/* Search & Category Filter Bar */}
        <div className="bg-slate-950/60 p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: "all", label: "All Plugins" },
              { id: "ecommerce", label: "E-Commerce & Dropship" },
              { id: "affiliate", label: "Affiliate & Monetize" },
              { id: "seo", label: "SEO & Schema" },
              { id: "marketing", label: "Conversion & WhatsApp" },
              { id: "speed", label: "Speed & Edge Cache" },
              { id: "security", label: "Security & Firewall" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plugins & add-ons..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Plugin Grid */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                plugin.active
                  ? "bg-slate-800/90 border-indigo-500/40 shadow-indigo-500/5"
                  : "bg-slate-850/60 border-slate-800 opacity-80"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                      {getCategoryIcon(plugin.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-white">
                          {plugin.name}
                        </h4>
                        {plugin.isPro && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black uppercase">
                            PRO
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        v{plugin.version} by <strong className="text-slate-300">{plugin.author}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleActive(plugin.id)}
                      disabled={!plugin.installed}
                      className={`p-1.5 rounded-lg border transition ${
                        plugin.active
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : "bg-slate-800 border-slate-700 text-slate-500"
                      }`}
                      title={plugin.active ? "Plugin is Active (Click to pause)" : "Plugin is Inactive"}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    {plugin.settings && (
                      <button
                        onClick={() => handleOpenConfig(plugin)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
                        title="Configure Plugin Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {plugin.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <strong className="text-slate-200">{plugin.rating}</strong>
                  </span>
                  <span>{plugin.downloads}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleInstall(plugin.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      plugin.installed
                        ? "bg-slate-800 hover:bg-rose-500/20 border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-300"
                        : "bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white"
                    }`}
                  >
                    {plugin.installed ? (plugin.active ? "Active" : "Installed") : "Install"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Modal Sub-view */}
        {selectedPluginForConfig && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-5 text-slate-100 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-sm font-extrabold text-white">
                    {selectedPluginForConfig.name} Settings
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPluginForConfig(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(configSettings).map(([key, val]) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    {typeof val === "boolean" ? (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setConfigSettings({ ...configSettings, [key]: !val })}
                          className={`w-12 h-6 rounded-full p-1 transition-colors ${
                            val ? "bg-emerald-500" : "bg-slate-700"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              val ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className="text-xs text-slate-400 font-semibold">
                          {val ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          setConfigSettings({ ...configSettings, [key]: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedPluginForConfig(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
