import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  Send,
  QrCode,
  DollarSign,
  Bike,
  Plane,
  Package,
  Sparkles,
  Share2,
} from "lucide-react";
import { LogisticsCarrierQuote, ShipmentDispatch, CurrencyCode } from "../../types";

interface Props {
  activeCurrency: CurrencyCode;
  carriers?: LogisticsCarrierQuote[];
  shipments?: ShipmentDispatch[];
  onAddShipment?: (shipment: ShipmentDispatch) => void;
}

export const LogisticsDispatchView: React.FC<Props> = ({
  activeCurrency,
  carriers: initialCarriers,
  shipments: initialShipments,
  onAddShipment,
}) => {
  const [carriers] = useState<LogisticsCarrierQuote[]>(
    initialCarriers || [
      {
        carrierId: "gigl",
        carrierName: "GIG Logistics (GIGL)",
        carrierLogo: "🚚",
        serviceType: "SAME_DAY_BIKE",
        estimatedHours: "2 - 4 Hours",
        cost: 2500,
        rating: 4.9,
        insuranceCovered: true,
        trackingReliability: "99.4% GPS Accuracy",
      },
      {
        carrierId: "topship",
        carrierName: "Topship Global & Interstate",
        carrierLogo: "✈️",
        serviceType: "EXPRESS_INTERSTATE",
        estimatedHours: "24 - 48 Hours",
        cost: 4800,
        rating: 4.85,
        insuranceCovered: true,
        trackingReliability: "Real-time Flight & Hub Scan",
      },
      {
        carrierId: "kwik",
        carrierName: "Kwik Delivery Express",
        carrierLogo: "⚡",
        serviceType: "SAME_DAY_BIKE",
        estimatedHours: "45 - 90 Minutes",
        cost: 2200,
        rating: 4.8,
        insuranceCovered: false,
        trackingReliability: "Live Rider Map Stream",
      },
      {
        carrierId: "dhl",
        carrierName: "DHL Express Global",
        carrierLogo: "📦",
        serviceType: "INTERNATIONAL_AIR",
        estimatedHours: "3 - 5 Days Worldwide",
        cost: 28500,
        rating: 4.95,
        insuranceCovered: true,
        trackingReliability: "Global Customs Cleared",
      },
      {
        carrierId: "fez",
        carrierName: "Fez Delivery Last-Mile",
        carrierLogo: "🛵",
        serviceType: "STANDARD_ROAD",
        estimatedHours: "Same Day (Lagos/Abuja)",
        cost: 1950,
        rating: 4.7,
        insuranceCovered: true,
        trackingReliability: "SMS & WhatsApp Automated Ping",
      },
    ]
  );

  const [shipments, setShipments] = useState<ShipmentDispatch[]>(
    initialShipments || [
      {
        id: "shp_1082",
        trackingNumber: "BP-GIG-891024",
        carrier: "GIG Logistics",
        customerName: "Dr. Kemi Balogun",
        customerPhone: "+234 813 400 9182",
        destinationAddress: "No. 7 Banana Island Road, Ikoyi, Lagos",
        destinationCity: "Lagos",
        itemDescription: "1x Ultra-Quiet Smart Air Fryer (5.5L)",
        packageWeightKg: 4.2,
        shippingFee: 3200,
        codAmount: 0,
        isCod: false,
        status: "OUT_FOR_DELIVERY",
        riderName: "Sunday Okon",
        riderPhone: "+234 805 771 9021",
        pickupTime: "2026-08-20 09:30 AM",
        estimatedDeliveryTime: "2026-08-20 02:00 PM",
        trackingEvents: [
          { time: "09:30 AM", location: "BizPilot Fulfillment Hub, Lekki", event: "Package Picked Up & Scanned by Rider" },
          { time: "11:15 AM", location: "Lekki-Ikoyi Toll Transit Hub", event: "In Transit via Dispatch Bike #LND-410" },
          { time: "01:05 PM", location: "Ikoyi Dispatch Node", event: "Out for Final Delivery - Rider Approaching Destination" },
        ],
      },
      {
        id: "shp_1083",
        trackingNumber: "BP-TOP-491028",
        carrier: "Topship Express",
        customerName: "Alhaji Bello Mohammed",
        customerPhone: "+234 809 334 5511",
        destinationAddress: "Plot 88 Gana Street, Maitama, Abuja FCT",
        destinationCity: "Abuja",
        itemDescription: "2x Executive Jollof & Smoked Asun Boxes",
        packageWeightKg: 6.0,
        shippingFee: 5500,
        codAmount: 65000,
        isCod: true,
        status: "IN_TRANSIT",
        pickupTime: "2026-08-19 04:00 PM",
        estimatedDeliveryTime: "2026-08-20 04:30 PM",
        trackingEvents: [
          { time: "04:00 PM (Yesterday)", location: "Lagos Main Freight Terminal", event: "Package Dispatched via Express Air Cargo" },
          { time: "08:15 AM (Today)", location: "Nnamdi Azikiwe Airport Hub, Abuja", event: "Arrived Abuja Sorting Center" },
          { time: "11:30 AM (Today)", location: "Maitama Delivery Depot", event: "Sorting complete, queued for COD Courier Dispatch" },
        ],
      },
    ]
  );

  const [activeTab, setActiveTab] = useState<"active-shipments" | "quote-calculator" | "cod-vault">("active-shipments");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentDispatch | null>(shipments[0] || null);
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  // New Shipment Form State
  const [newCustName, setNewCustName] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("Lagos");
  const [newItemDesc, setNewItemDesc] = useState("E-Commerce Order Parcel");
  const [newWeight, setNewWeight] = useState(2.0);
  const [selectedCarrierId, setSelectedCarrierId] = useState("gigl");
  const [isCod, setIsCod] = useState(false);
  const [codAmount, setCodAmount] = useState(0);

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const carrier = carriers.find((c) => c.carrierId === selectedCarrierId) || carriers[0];
    const newShp: ShipmentDispatch = {
      id: "shp_" + Date.now(),
      trackingNumber: `BP-${carrier.carrierId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: carrier.carrierName,
      customerName: newCustName.trim() || "Customer",
      customerPhone: newCustPhone.trim() || "+234 800 000 0000",
      destinationAddress: newAddress.trim() || "Delivery Address",
      destinationCity: newCity,
      itemDescription: newItemDesc,
      packageWeightKg: Number(newWeight),
      shippingFee: carrier.cost,
      codAmount: isCod ? Number(codAmount) : 0,
      isCod: isCod,
      status: "RIDER_ASSIGNED",
      riderName: "Mustapha Garba",
      riderPhone: "+234 802 991 4422",
      pickupTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      estimatedDeliveryTime: "Within " + carrier.estimatedHours,
      trackingEvents: [
        { time: "Just now", location: "BizPilot Store Origin Node", event: "Rider Dispatched to Merchant Pickup Location" },
      ],
    };

    const updated = [newShp, ...shipments];
    setShipments(updated);
    setSelectedShipment(newShp);
    onAddShipment?.(newShp);
    setShowDispatchModal(false);
  };

  const activeDeliveriesCount = shipments.filter((s) => s.status !== "DELIVERED" && s.status !== "CANCELLED").length;
  const pendingCodTotal = shipments.filter((s) => s.isCod && s.status !== "DELIVERED").reduce((sum, s) => sum + s.codAmount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Multi-Carrier Logistics & Dispatch Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                GIGL • Topship • Kwik • DHL • Fez
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Compare live courier rates, 1-click dispatch riders, and stream GPS tracking links via WhatsApp & SMS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDispatchModal(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-600/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> 1-Click Dispatch Rider
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Active Dispatches in Transit</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{activeDeliveriesCount} Parcels</div>
          <div className="text-[11px] text-emerald-500 mt-0.5">Average delivery time: 1.8 hrs</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Pending Cash on Delivery (COD)</div>
          <div className="text-2xl font-bold text-amber-500 mt-1">₦{pendingCodTotal.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Auto-settles to merchant bank account on delivery</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">Integrated Carrier Network</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">5 Carriers</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Intra-city bike, interstate flight & global air</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: "active-shipments", label: "Live Active Shipments & GPS Tracking", icon: Truck },
          { id: "quote-calculator", label: "Multi-Carrier Rate Comparison Matrix", icon: Sparkles },
          { id: "cod-vault", label: "Cash-on-Delivery (COD) Remittance Vault", icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACTIVE SHIPMENTS & TRACKING */}
      {activeTab === "active-shipments" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Shipment List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Dispatches</h3>
            {shipments.map((shp) => (
              <div
                key={shp.id}
                onClick={() => setSelectedShipment(shp)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedShipment?.id === shp.id
                    ? "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                    {shp.trackingNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      shp.status === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : shp.status === "OUT_FOR_DELIVERY"
                        ? "bg-blue-100 text-blue-800 animate-pulse"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {shp.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  {shp.customerName}
                </div>
                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  📍 {shp.destinationAddress}, {shp.destinationCity}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Carrier: <strong>{shp.carrier}</strong></span>
                  {shp.isCod && <span className="text-amber-600 font-bold">COD: ₦{shp.codAmount.toLocaleString()}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Detailed Live GPS & Tracking Timeline (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            {selectedShipment ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
                      {selectedShipment.trackingNumber}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedShipment.itemDescription}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const text = `Hello ${selectedShipment.customerName}! Your parcel (${selectedShipment.itemDescription}) is dispatched via ${selectedShipment.carrier}. Track live here: https://track.bizpilot.io/${selectedShipment.trackingNumber}`;
                        window.open(`https://wa.me/${selectedShipment.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" /> WhatsApp Tracking Link
                    </button>
                  </div>
                </div>

                {/* Rider Info Card */}
                {selectedShipment.riderName && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                        <Bike className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Assigned Dispatch Rider</div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {selectedShipment.riderName}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">{selectedShipment.riderPhone}</div>
                      </div>
                    </div>
                    <a
                      href={`tel:${selectedShipment.riderPhone}`}
                      className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Live Milestone Timeline */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Live GPS Scan Milestones
                  </h4>
                  <div className="relative border-l-2 border-amber-500 ml-4 space-y-4">
                    {selectedShipment.trackingEvents.map((ev, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900" />
                        <div>
                          <div className="text-xs font-mono text-slate-400">{ev.time} • {ev.location}</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{ev.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a shipment on the left to view real-time tracking details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RATE COMPARISON MATRIX */}
      {activeTab === "quote-calculator" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Instant Courier Price & Speed Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live API rates calculated for standard 2.0kg parcel from Lekki Hub to customer destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carriers.map((c) => (
              <div
                key={c.carrierId}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 hover:border-amber-500 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.carrierLogo}</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                    ⭐ {c.rating} / 5.0
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{c.carrierName}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">Speed: <strong>{c.estimatedHours}</strong></div>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  ₦{c.cost.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">
                  {c.trackingReliability} • {c.insuranceCovered ? "✓ Goods In Transit Insured" : "Basic Liability"}
                </div>
                <button
                  onClick={() => {
                    setSelectedCarrierId(c.carrierId);
                    setShowDispatchModal(true);
                  }}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Book with {c.carrierName.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COD VAULT */}
      {activeTab === "cod-vault" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Cash-on-Delivery (COD) Reconciliation Vault
            </h3>
            <p className="text-xs text-slate-500">
              Track customer cash collections handled by riders with automatic 24-hour bank remittance guarantee.
            </p>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Waybill Tracking</th>
                  <th className="p-3">Customer & Phone</th>
                  <th className="p-3">Carrier / Rider</th>
                  <th className="p-3">COD Amount</th>
                  <th className="p-3">Remittance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {shipments.filter((s) => s.isCod).map((s) => (
                  <tr key={s.id}>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">{s.trackingNumber}</td>
                    <td className="p-3">{s.customerName} ({s.customerPhone})</td>
                    <td className="p-3">{s.carrier} ({s.riderName || "Pending Assign"})</td>
                    <td className="p-3 font-bold text-emerald-600">₦{s.codAmount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        COLLECTING AT DOORSTEP
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 1-Click Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant 1-Click Courier Dispatch
            </h3>
            <form onSubmit={handleCreateShipment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Chief Femi Adeyemi"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Customer Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Destination City</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option>Lagos</option>
                    <option>Abuja FCT</option>
                    <option>Port Harcourt</option>
                    <option>Ibadan</option>
                    <option>Kano</option>
                    <option>Enugu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Delivery Street Address</label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Delivery Partner</label>
                <select
                  value={selectedCarrierId}
                  onChange={(e) => setSelectedCarrierId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {carriers.map((c) => (
                    <option key={c.carrierId} value={c.carrierId}>
                      {c.carrierName} — ₦{c.cost.toLocaleString()} ({c.estimatedHours})
                    </option>
                  ))}
                </select>
              </div>

              {/* COD Toggle */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCod}
                    onChange={(e) => setIsCod(e.target.checked)}
                    className="rounded-sm text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-bold text-slate-800 dark:text-slate-200">Collect Cash On Delivery (COD)</span>
                </label>
                {isCod && (
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">COD Amount to Collect (₦)</label>
                    <input
                      type="number"
                      value={codAmount}
                      onChange={(e) => setCodAmount(Number(e.target.value))}
                      placeholder="e.g. 65000"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm & Dispatch Rider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
