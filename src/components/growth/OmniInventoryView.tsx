import React, { useState } from "react";
import {
  Boxes,
  RefreshCw,
  ShoppingBag,
  Store,
  AlertTriangle,
  QrCode,
  Printer,
  Plus,
  Search,
  CheckCircle2,
  FileText,
  DollarSign,
  Trash2,
  CreditCard,
  PhoneCall,
  Sliders,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { OmniInventoryItem, PosCartItem, PosReceipt, CurrencyCode } from "../../types";

interface Props {
  activeCurrency: CurrencyCode;
  inventory?: OmniInventoryItem[];
  posReceipts?: PosReceipt[];
  onUpdateInventory?: (items: OmniInventoryItem[]) => void;
}

export const OmniInventoryView: React.FC<Props> = ({
  activeCurrency,
  inventory: initialInventory,
  posReceipts: initialReceipts,
  onUpdateInventory,
}) => {
  const [items, setItems] = useState<OmniInventoryItem[]>(
    initialInventory || [
      {
        id: "omni_1",
        sku: "AF-5500-BLK",
        barcode: "6151092837192",
        name: "Ultra-Quiet Smart Air Fryer & Rotisserie (5.5L)",
        category: "Home & Kitchen",
        costPrice: 32000,
        sellingPrice: 68500,
        totalStock: 45,
        lowStockThreshold: 10,
        imageUrl: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=800&auto=format&fit=crop&q=80",
        supplierName: "CJ Dropshipping Global Hub",
        reorderQuantity: 30,
        autoReorderEnabled: true,
        status: "IN_STOCK",
        channels: [
          { channel: "Online Store", stockCount: 20, syncStatus: "SYNCED", lastSyncTime: "2 mins ago" },
          { channel: "WhatsApp Catalog", stockCount: 15, syncStatus: "SYNCED", lastSyncTime: "2 mins ago" },
          { channel: "Jumia Mall", stockCount: 5, syncStatus: "SYNCED", lastSyncTime: "5 mins ago" },
          { channel: "Physical Store POS", stockCount: 5, syncStatus: "SYNCED", lastSyncTime: "Just now" },
        ],
      },
      {
        id: "omni_2",
        sku: "PB-MAG-10K",
        barcode: "6151092837208",
        name: "Magnetic 10,000mAh MagSafe Power Bank (22.5W Fast Charge)",
        category: "Gadgets & Tech",
        costPrice: 14500,
        sellingPrice: 34000,
        totalStock: 12,
        lowStockThreshold: 15,
        imageUrl: "https://images.unsplash.com/photo-1609592426868-b788c6b6fb52?w=800&auto=format&fit=crop&q=80",
        supplierName: "AliExpress Premium Direct",
        reorderQuantity: 50,
        autoReorderEnabled: true,
        status: "LOW_STOCK",
        channels: [
          { channel: "Online Store", stockCount: 5, syncStatus: "SYNCED", lastSyncTime: "1 min ago" },
          { channel: "WhatsApp Catalog", stockCount: 4, syncStatus: "SYNCED", lastSyncTime: "1 min ago" },
          { channel: "Jumia Mall", stockCount: 2, syncStatus: "SYNCED", lastSyncTime: "3 mins ago" },
          { channel: "Physical Store POS", stockCount: 1, syncStatus: "SYNCED", lastSyncTime: "Just now" },
        ],
      },
      {
        id: "omni_3",
        sku: "SER-VITC-30",
        barcode: "6151092837215",
        name: "Organic 20% Vitamin C + Hyaluronic Acid Brightening Serum (30ml)",
        category: "Beauty & Skincare",
        costPrice: 6200,
        sellingPrice: 18500,
        totalStock: 140,
        lowStockThreshold: 25,
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
        supplierName: "In-House Warehouse Inventory",
        reorderQuantity: 100,
        autoReorderEnabled: false,
        status: "IN_STOCK",
        channels: [
          { channel: "Online Store", stockCount: 60, syncStatus: "SYNCED", lastSyncTime: "10 mins ago" },
          { channel: "WhatsApp Catalog", stockCount: 40, syncStatus: "SYNCED", lastSyncTime: "10 mins ago" },
          { channel: "Konga", stockCount: 20, syncStatus: "SYNCED", lastSyncTime: "10 mins ago" },
          { channel: "Physical Store POS", stockCount: 20, syncStatus: "SYNCED", lastSyncTime: "Just now" },
        ],
      },
    ]
  );

  const [activeTab, setActiveTab] = useState<"sync-matrix" | "pos-terminal" | "purchase-orders" | "barcode-labels">("sync-matrix");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // POS State
  const [posCart, setPosCart] = useState<PosCartItem[]>([]);
  const [posCustomerName, setPosCustomerName] = useState("");
  const [posCustomerPhone, setPosCustomerPhone] = useState("");
  const [posPaymentMethod, setPosPaymentMethod] = useState<"CASH" | "POS_CARD" | "BANK_TRANSFER" | "PAYSTACK_USSD">("POS_CARD");
  const [posDiscount, setPosDiscount] = useState(0);
  const [activeReceipt, setActiveReceipt] = useState<PosReceipt | null>(null);

  // Sync all channels handler
  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setIsSyncingAll(false);
      const updated = items.map((item) => ({
        ...item,
        channels: item.channels.map((ch) => ({
          ...ch,
          syncStatus: "SYNCED" as const,
          lastSyncTime: "Just now",
        })),
      }));
      setItems(updated);
      onUpdateInventory?.(updated);
    }, 900);
  };

  // Add to POS Cart
  const handleAddToCart = (item: OmniInventoryItem) => {
    const existing = posCart.find((c) => c.item.id === item.id);
    if (existing) {
      setPosCart(
        posCart.map((c) => (c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
      );
    } else {
      setPosCart([...posCart, { item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setPosCart(posCart.filter((c) => c.item.id !== itemId));
  };

  const cartSubtotal = posCart.reduce((sum, c) => sum + c.item.sellingPrice * c.quantity, 0);
  const cartTotal = Math.max(0, cartSubtotal - posDiscount);

  // Complete POS Sale
  const handleCompleteSale = () => {
    if (posCart.length === 0) return;
    const newReceipt: PosReceipt = {
      id: "rec_" + Date.now(),
      receiptNumber: `POS-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`,
      cashierName: "Store Manager (Terminal #1)",
      customerName: posCustomerName || "Walk-In Customer",
      customerPhone: posCustomerPhone || undefined,
      items: posCart.map((c) => ({
        name: c.item.name,
        sku: c.item.sku,
        price: c.item.sellingPrice,
        quantity: c.quantity,
      })),
      subtotal: cartSubtotal,
      tax: 0,
      discount: posDiscount,
      total: cartTotal,
      paymentMethod: posPaymentMethod,
      timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Deduct stock
    const updatedInventory = items.map((invItem) => {
      const sold = posCart.find((c) => c.item.id === invItem.id);
      if (sold) {
        const newTotal = Math.max(0, invItem.totalStock - sold.quantity);
        return {
          ...invItem,
          totalStock: newTotal,
          status: newTotal <= invItem.lowStockThreshold ? (newTotal === 0 ? "OUT_OF_STOCK" : "LOW_STOCK") : "IN_STOCK",
        };
      }
      return invItem;
    });

    setItems(updatedInventory as any);
    onUpdateInventory?.(updatedInventory as any);
    setActiveReceipt(newReceipt);
    setPosCart([]);
    setPosCustomerName("");
    setPosCustomerPhone("");
    setPosDiscount(0);
  };

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Omni-Channel Inventory & POS Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                5 Active Channels Synced
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Synchronize stock levels across Website, WhatsApp Catalog, Jumia, Konga & In-Store Cashier POS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? "animate-spin" : ""}`} />
            {isSyncingAll ? "Syncing All Channels..." : "1-Click Sync All Channels"}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: "sync-matrix", label: "Multi-Channel Stock Matrix", icon: Boxes },
          { id: "pos-terminal", label: "Live Cashier POS Terminal", icon: Store },
          { id: "purchase-orders", label: "Supplier Purchase Orders", icon: FileText },
          { id: "barcode-labels", label: "Print Barcode Labels", icon: QrCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MULTI-CHANNEL STOCK MATRIX */}
      {activeTab === "sync-matrix" && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">Total SKUs Active</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{items.length} Products</div>
              <div className="text-[11px] text-emerald-500 mt-0.5">100% Synced across channels</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">Total Units in Stock</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {items.reduce((s, i) => s + i.totalStock, 0)} Units
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Valuation: ₦{items.reduce((s, i) => s + i.totalStock * i.costPrice, 0).toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">Low Stock Alerts</div>
              <div className="text-xl font-bold text-amber-500 mt-1">
                {items.filter((i) => i.status === "LOW_STOCK").length} SKUs
              </div>
              <div className="text-[11px] text-amber-600 mt-0.5">Auto-Reorder trigger pending</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase">Average Gross Margin</div>
              <div className="text-xl font-bold text-emerald-600 mt-1">54.8%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">High profit threshold</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, SKU, or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 text-xs uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Product & SKU</th>
                    <th className="py-3 px-4">Cost / Retail</th>
                    <th className="py-3 px-4">Total Stock</th>
                    <th className="py-3 px-4">Channel Allocation Breakdown</th>
                    <th className="py-3 px-4">Reorder Status</th>
                    <th className="py-3 px-4 text-right">Quick POS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                              <span>SKU: {item.sku}</span>
                              <span>•</span>
                              <span>{item.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-xs">
                          ₦{item.sellingPrice.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Cost: ₦{item.costPrice.toLocaleString()} (
                          {Math.round(((item.sellingPrice - item.costPrice) / item.sellingPrice) * 100)}% margin)
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.totalStock <= item.lowStockThreshold
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          }`}
                        >
                          {item.totalStock} Units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {item.channels.map((ch, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {ch.channel}: <strong>{ch.stockCount}</strong>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {item.autoReorderEnabled ? (
                          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Auto-PO ({item.reorderQuantity} Units)
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Manual Restock</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            handleAddToCart(item);
                            setActiveTab("pos-terminal");
                          }}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold text-xs rounded-lg transition-colors border border-indigo-200 dark:border-indigo-800"
                        >
                          + Sell in POS
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

      {/* TAB 2: LIVE CASHIER POS TERMINAL */}
      {activeTab === "pos-terminal" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Product Catalog Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Select Items for In-Store / Walk-In Order
              </h3>
              <span className="text-xs text-slate-500">Click item to add to active ticket</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddToCart(item)}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                      {item.name}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                      ₦{item.sellingPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                      {item.totalStock} left
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Cashier Cart & Payment Checkout (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Store className="w-5 h-5 text-indigo-500" /> Active Register Ticket
                </h3>
                <span className="text-xs font-mono text-slate-400">#POS-LIVE-01</span>
              </div>

              {/* Customer Inputs */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Customer Name (Optional)"
                  value={posCustomerName}
                  onChange={(e) => setPosCustomerName(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="tel"
                  placeholder="Customer Phone"
                  value={posCustomerPhone}
                  onChange={(e) => setPosCustomerPhone(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Cart items */}
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
                {posCart.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    Register ticket is empty. Tap any product on the left to start checkout.
                  </div>
                ) : (
                  posCart.map((c) => (
                    <div key={c.item.id} className="py-2.5 flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                          {c.item.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {c.quantity}x @ ₦{c.item.sellingPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          ₦{(c.item.sellingPrice * c.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(c.item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Payment Method Switcher */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Payment Channel</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "POS_CARD", label: "POS Terminal Card", icon: CreditCard },
                    { id: "BANK_TRANSFER", label: "Bank Transfer", icon: DollarSign },
                    { id: "PAYSTACK_USSD", label: "USSD (*737#)", icon: PhoneCall },
                    { id: "CASH", label: "Cash Payment", icon: Store },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPosPaymentMethod(m.id as any)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          posPaymentMethod === m.id
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total & Checkout Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subtotal:</span>
                <span>₦{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
                <span>Total Amount Due:</span>
                <span className="text-indigo-600 dark:text-indigo-400">₦{cartTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCompleteSale}
                disabled={posCart.length === 0}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" /> Collect ₦{cartTotal.toLocaleString()} & Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PURCHASE ORDERS */}
      {activeTab === "purchase-orders" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Automated Supplier Restock Purchase Orders (PO)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Automatically generate supplier requisition orders when inventory levels fall below safety buffer.
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Create New Purchase Order
            </button>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200">
              <strong>Low-Stock Alert Triggered:</strong> <code>PB-MAG-10K (Magnetic MagSafe Power Bank)</code> has reached 12 units (threshold: 15). A draft Purchase Order of 50 units (₦725,000) is ready to send to AliExpress Premium Direct.
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">PO Number</th>
                  <th className="p-3">Supplier Name</th>
                  <th className="p-3">Items & Qty</th>
                  <th className="p-3">Total Value</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">PO-2026-0819</td>
                  <td className="p-3">CJ Dropshipping Global Hub</td>
                  <td className="p-3">30x Ultra-Quiet Smart Air Fryer (5.5L)</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">₦960,000</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">DISPATCHED BY SUPPLIER</span></td>
                  <td className="p-3 text-right"><button className="text-indigo-600 hover:underline font-bold">Track Shipment</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PRINT BARCODES */}
      {activeTab === "barcode-labels" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Printable EAN-13 & QR Barcode Label Sheet
              </h3>
              <p className="text-xs text-slate-500">Directly print sticker labels for physical store merchandise and warehouse bins.</p>
            </div>
            <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center gap-2">
              <Printer className="w-3.5 h-3.5" /> Print All 40-Up Sticker Labels
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-2 text-center">
                <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</div>
                <div className="font-mono text-[10px] text-slate-400">SKU: {item.sku}</div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                  {/* Barcode representation */}
                  <div className="flex items-center gap-[2px] h-10">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-full ${i % 3 === 0 ? "w-[3px] bg-slate-900" : i % 2 === 0 ? "w-[1px] bg-slate-900" : "w-[2px] bg-slate-900"}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-slate-900 mt-1 font-bold">
                    {item.barcode}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  ₦{item.sellingPrice.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POS Printable Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl space-y-4 border border-slate-200">
            <div className="text-center space-y-1 border-b border-dashed border-slate-300 pb-4">
              <div className="font-black text-base tracking-tight">BIZPILOT RETAIL TERMINAL</div>
              <div className="text-[11px] text-slate-500">Official Customer Sales Receipt</div>
              <div className="text-[10px] font-mono text-slate-400">{activeReceipt.receiptNumber}</div>
              <div className="text-[10px] text-slate-500">{activeReceipt.timestamp}</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-[11px] text-slate-500 font-medium">
                Customer: <strong>{activeReceipt.customerName}</strong>
              </div>
              <div className="divide-y divide-slate-100">
                {activeReceipt.items.map((item, idx) => (
                  <div key={idx} className="py-1.5 flex justify-between">
                    <div>
                      <div className="font-medium text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.quantity}x @ ₦{item.price.toLocaleString()}</div>
                    </div>
                    <div className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>₦{activeReceipt.subtotal.toLocaleString()}</span>
              </div>
              {activeReceipt.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span>-₦{activeReceipt.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-1 border-t border-slate-200">
                <span>TOTAL PAID:</span>
                <span>₦{activeReceipt.total.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-slate-400 text-center pt-2">
                Paid via {activeReceipt.paymentMethod} • Cashier: {activeReceipt.cashierName}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveReceipt(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setActiveReceipt(null);
                }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
