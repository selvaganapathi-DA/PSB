"use client";

import React, { useState } from "react";
import { Home, Grid, FileCheck, DollarSign, Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";

type UnitStatus = "Available" | "Hold" | "Booked" | "Sold";

interface PropertyUnit {
  id: string;
  name: string;
  floor: number;
  type: string;
  status: UnitStatus;
  price: number;
}

interface BookingRecord {
  id: string;
  unit: string;
  customer: string;
  date: string;
  token: string;
  snag: string;
  handover: string;
}

export default function RealEstateSalesPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"inventory" | "bookings" | "collections">("inventory");

  // Property Inventory State
  const [units, setUnits] = useState<PropertyUnit[]>([
    { id: "u401", name: "Flat 401 (A-Block)", floor: 4, type: "3 BHK", status: "Sold", price: 8500000 },
    { id: "u402", name: "Flat 402 (A-Block)", floor: 4, type: "2 BHK", status: "Booked", price: 6200000 },
    { id: "u301", name: "Flat 301 (A-Block)", floor: 3, type: "3 BHK", status: "Hold", price: 8400000 },
    { id: "u302", name: "Flat 302 (A-Block)", floor: 3, type: "2 BHK", status: "Available", price: 6150000 },
    { id: "u201", name: "Flat 201 (A-Block)", floor: 2, type: "3 BHK", status: "Available", price: 8300000 },
    { id: "u202", name: "Flat 202 (A-Block)", floor: 2, type: "2 BHK", status: "Available", price: 6100000 },
    { id: "u101", name: "Flat 101 (A-Block)", floor: 1, type: "3 BHK", status: "Booked", price: 8200000 },
    { id: "u102", name: "Flat 102 (A-Block)", floor: 1, type: "2 BHK", status: "Sold", price: 6000000 },
  ]);

  const [unitModalOpen, setUnitModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<PropertyUnit | null>(null);

  // Unit Form Fields
  const [unitId, setUnitId] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitFloor, setUnitFloor] = useState("1");
  const [unitType, setUnitType] = useState("2 BHK");
  const [unitStatus, setUnitStatus] = useState<UnitStatus>("Available");
  const [unitPrice, setUnitPrice] = useState("");

  // Customer Bookings State
  const [bookings, setBookings] = useState<BookingRecord[]>([
    { id: "b1", unit: "Flat 401", customer: "Rajesh Kumar", date: "2026-01-10", token: "500000", snag: "Completed", handover: "Possession Handed Over" },
    { id: "b2", unit: "Flat 102", customer: "Meera Nair", date: "2026-02-14", token: "500000", snag: "Pending QC Inspection", handover: "Under Snag Resolution" },
    { id: "b3", unit: "Flat 402", customer: "Vikas Sethi", date: "2026-05-02", token: "200000", snag: "Not Started", handover: "Scheduled for Nov 2026" },
  ]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Booking Form Fields
  const [bookUnit, setBookUnit] = useState("Flat 302");
  const [bookCustomer, setBookCustomer] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookToken, setBookToken] = useState("");
  const [bookSnag, setBookSnag] = useState("Not Started");
  const [bookHandover, setBookHandover] = useState("Scheduled");

  // Unit Actions
  const handleAddUnitClick = () => {
    setSelectedUnit(null);
    setUnitId("");
    setUnitName("");
    setUnitFloor("1");
    setUnitType("2 BHK");
    setUnitStatus("Available");
    setUnitPrice("");
    setUnitModalOpen(true);
  };

  const handleEditUnitClick = (unit: PropertyUnit) => {
    setSelectedUnit(unit);
    setUnitId(unit.id);
    setUnitName(unit.name);
    setUnitFloor(String(unit.floor));
    setUnitType(unit.type);
    setUnitStatus(unit.status);
    setUnitPrice(String(unit.price));
    setUnitModalOpen(true);
  };

  const handleDeleteUnit = (id: string) => {
    if (confirm("Are you sure you want to delete this property unit?")) {
      setUnits((prev) => prev.filter((u) => u.id !== id));
      toast("Property unit deleted successfully!");
    }
  };

  const handleSaveUnit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedFloor = parseInt(unitFloor, 10) || 1;
    const parsedPrice = parseFloat(unitPrice) || 0;

    const data: PropertyUnit = {
      id: selectedUnit ? selectedUnit.id : unitId.toLowerCase(),
      name: unitName || `Flat ${unitId.toUpperCase()} (A-Block)`,
      floor: parsedFloor,
      type: unitType,
      status: unitStatus,
      price: parsedPrice,
    };

    if (selectedUnit) {
      setUnits((prev) => prev.map((u) => (u.id === selectedUnit.id ? data : u)));
      toast("Property unit updated successfully!");
    } else {
      setUnits((prev) => [...prev, data]);
      toast("Property unit added successfully!");
    }
    setUnitModalOpen(false);
  };

  // Booking Actions
  const handleAddBookingClick = () => {
    setSelectedBooking(null);
    setBookUnit("Flat 302");
    setBookCustomer("");
    setBookDate("");
    setBookToken("");
    setBookSnag("Not Started");
    setBookHandover("Scheduled");
    setBookingModalOpen(true);
  };

  const handleEditBookingClick = (b: BookingRecord) => {
    setSelectedBooking(b);
    setBookUnit(b.unit);
    setBookCustomer(b.customer);
    setBookDate(b.date);
    setBookToken(b.token);
    setBookSnag(b.snag);
    setBookHandover(b.handover);
    setBookingModalOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel and delete this customer booking?")) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast("Customer booking deleted successfully!");
    }
  };

  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const data: BookingRecord = {
      id: selectedBooking ? selectedBooking.id : `b-${Date.now()}`,
      unit: bookUnit,
      customer: bookCustomer,
      date: bookDate,
      token: bookToken,
      snag: bookSnag,
      handover: bookHandover,
    };

    if (selectedBooking) {
      setBookings((prev) => prev.map((b) => (b.id === selectedBooking.id ? data : b)));
      toast("Customer booking updated!");
    } else {
      setBookings((prev) => [...prev, data]);
      toast("New booking recorded successfully!");
      // Automatically toggle status of corresponding unit to 'Booked'
      setUnits((prev) =>
        prev.map((u) => {
          if (u.name.toLowerCase().includes(bookUnit.toLowerCase())) {
            return { ...u, status: "Booked" };
          }
          return u;
        })
      );
    }
    setBookingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-2">
          <Home className="h-6 w-6 text-signal-orange" />
          Real Estate Sales & CRM
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Manage property inventories, unit block availability, client bookings, and Collections tracking.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "inventory", label: "Property Inventory & Grid", icon: Grid },
          { id: "bookings", label: "Bookings & Handover", icon: FileCheck },
          { id: "collections", label: "Collections & Schedule", icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-[13px] font-medium transition-all border-b-2 -mb-[2px] ${
                activeTab === tab.id
                  ? "border-signal-orange text-signal-orange font-semibold"
                  : "border-transparent text-concrete-300 hover:text-concrete-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Property Inventory Grid */}
      {activeTab === "inventory" && (
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-3 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
                  Tower A Unit Map
                </h3>
                <p className="text-[12px] text-concrete-300">Interactive unit visual status board</p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 text-[11px] font-semibold">
                <span className="flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-green-50 border border-green-200" /> Available</span>
                <span className="flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-amber-50 border border-amber-200" /> Hold</span>
                <span className="flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-blue-50 border border-blue-200" /> Booked</span>
                <span className="flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-rose-50 border border-rose-200" /> Sold</span>
              </div>
            </div>

            {/* Tower Layout Grid */}
            <div className="space-y-4">
              {[4, 3, 2, 1].map((floorNum) => (
                <div key={floorNum} className="flex gap-4 items-center">
                  <div className="w-12 text-[12px] font-bold text-concrete-350">FLR {floorNum}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                    {units
                      .filter((u) => u.floor === floorNum)
                      .map((unit) => {
                        const colors =
                          unit.status === "Available"
                            ? "bg-green-50/50 hover:bg-green-100/55 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400"
                            : unit.status === "Hold"
                            ? "bg-amber-50/50 hover:bg-amber-100/55 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400"
                            : unit.status === "Booked"
                            ? "bg-blue-50/50 hover:bg-blue-100/55 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-400"
                            : "bg-rose-50/50 hover:bg-rose-100/55 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-800 dark:text-rose-400";
                        return (
                          <div
                            key={unit.id}
                            className={`p-3 border rounded-xl relative group transition-all ${colors}`}
                          >
                            <span className="block font-bold text-[13px]">{unit.id.toUpperCase()}</span>
                            <span className="text-[10px] opacity-75">{unit.type} - ₹{(unit.price / 100000).toFixed(1)}L</span>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1 bg-white/80 dark:bg-blueprint-900/80 p-0.5 rounded shadow">
                              <button onClick={() => handleEditUnitClick(unit)} className="p-0.5 text-concrete-600 dark:text-white">
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button onClick={() => handleDeleteUnit(unit.id)} className="p-0.5 text-red-500">
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Inventory Stats
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 border border-concrete-100 dark:border-white/5 rounded-xl">
                <span className="text-[11px] text-concrete-350 block">Available</span>
                <span className="text-[18px] font-bold text-green-600">
                  {units.filter((u) => u.status === "Available").length} Units
                </span>
              </div>
              <div className="p-3 border border-concrete-100 dark:border-white/5 rounded-xl">
                <span className="text-[11px] text-concrete-350 block">Sold/Booked</span>
                <span className="text-[18px] font-bold text-rose-600">
                  {units.filter((u) => u.status === "Sold" || u.status === "Booked").length} Units
                </span>
              </div>
            </div>
            <button
              onClick={handleAddUnitClick}
              className="w-full rounded-xl bg-signal-orange py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90 shadow-card"
            >
              Add New Tower Block Unit
            </button>
          </div>
        </div>
      )}

      {/* Bookings & Handover */}
      {activeTab === "bookings" && (
        <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Customer Bookings & Possession Logs
            </h3>
            <button
              onClick={handleAddBookingClick}
              className="flex items-center gap-1.5 rounded-xl bg-signal-orange px-3.5 py-2 text-[12px] font-semibold text-white transition-all hover:bg-signal-orange/90 shadow-card"
            >
              <Plus className="h-3.5 w-3.5" />
              New Booking
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-concrete-100 dark:border-white/5 text-concrete-350 font-semibold">
                  <th className="py-2.5">Unit</th>
                  <th className="py-2.5">Customer Name</th>
                  <th className="py-2.5">Booking Date</th>
                  <th className="py-2.5">Token Amt (₹)</th>
                  <th className="py-2.5">Possession Checklist</th>
                  <th className="py-2.5">Handover Status</th>
                  <th className="py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-concrete-50 dark:divide-white/5 text-concrete-800 dark:text-blueprint-200">
                {bookings.map((item) => (
                  <tr key={item.id} className="hover:bg-concrete-50 dark:hover:bg-blueprint-900/50">
                    <td className="py-3 font-semibold">{item.unit}</td>
                    <td className="py-3">{item.customer}</td>
                    <td className="py-3">{item.date}</td>
                    <td className="py-3">₹{parseFloat(item.token || "0").toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        item.snag === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-950/30" : "bg-amber-100 text-amber-700 dark:bg-amber-950/30"
                      }`}>{item.snag}</span>
                    </td>
                    <td className="py-3">{item.handover}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditBookingClick(item)} className="text-concrete-600 dark:text-blueprint-300 hover:text-signal-orange">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDeleteBooking(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Collections & Schedule */}
      {activeTab === "collections" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-4">
              Construction-Linked Milestone Collections
            </h3>
            <div className="space-y-4">
              {[
                { milestone: "Foundation Slab Completed", pct: "15%", amount: "₹45,50,000", status: "Collected (100%)" },
                { milestone: "First Floor Roof Poured", pct: "10%", amount: "₹30,33,000", status: "Outstanding (15% Overdue)" },
                { milestone: "Brickwork & Plastering Stage", pct: "20%", amount: "₹60,66,000", status: "Upcoming Milestone" },
              ].map((ms, idx) => (
                <div key={idx} className="p-4 border border-concrete-100 dark:border-white/5 rounded-xl flex justify-between items-center text-[12.5px]">
                  <div>
                    <h4 className="font-bold text-concrete-800 dark:text-blueprint-100">{ms.milestone}</h4>
                    <p className="text-[11px] text-concrete-300 mt-0.5">Demanded Area Share: {ms.pct}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-signal-orange block">{ms.amount}</span>
                    <span className="text-[10px] text-concrete-350">{ms.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-3 text-[12.5px]">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Collection Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-concrete-350">Total Bookings Value</span>
                <span className="font-bold">₹2.27 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-concrete-350">Total Collected</span>
                <span className="font-bold text-green-600">₹75.8 Lakh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-concrete-350">Total Outstanding</span>
                <span className="font-bold text-red-500">₹22.4 Lakh</span>
              </div>
              <button
                onClick={() => toast("Sending payment demands to overdue accounts...")}
                className="w-full rounded-xl bg-blueprint-900 py-2.5 text-[12px] font-semibold text-white hover:bg-blueprint-800 transition-all"
              >
                Send Overdue Reminders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Unit Modal */}
      <Modal
        open={unitModalOpen}
        onClose={() => setUnitModalOpen(false)}
        title={selectedUnit ? "Edit Unit Inventory Details" : "Add New Tower Unit"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveUnit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit ID/No *
              </label>
              <input
                type="text"
                required
                disabled={!!selectedUnit}
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                placeholder="e.g. u303"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="e.g. Flat 303 (A-Block)"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Floor *
              </label>
              <input
                type="number"
                required
                value={unitFloor}
                onChange={(e) => setUnitFloor(e.target.value)}
                placeholder="e.g. 3"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Unit Type
              </label>
              <select
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              >
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="e.g. 6150000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
              Unit Availability Status
            </label>
            <select
              value={unitStatus}
              onChange={(e) => setUnitStatus(e.target.value as UnitStatus)}
              className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
            >
              <option value="Available">Available</option>
              <option value="Hold">Hold</option>
              <option value="Booked">Booked</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setUnitModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Save Unit
            </button>
          </div>
        </form>
      </Modal>

      {/* Customer Booking Modal */}
      <Modal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={selectedBooking ? "Edit Customer Booking Details" : "Record New Sale Booking"}
        maxWidth="md"
      >
        <form onSubmit={handleSaveBooking} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Allocate Property Unit
              </label>
              <select
                value={bookUnit}
                onChange={(e) => setBookUnit(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              >
                {units
                  .filter((u) => u.status === "Available" || (selectedBooking && u.name.includes(selectedBooking.unit)))
                  .map((u) => (
                    <option key={u.id} value={u.name.split(" ")[0] + " " + u.name.split(" ")[1]}>
                      {u.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={bookCustomer}
                onChange={(e) => setBookCustomer(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 outline-none focus:border-signal-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Booking Date *
              </label>
              <input
                type="date"
                required
                value={bookDate}
                onChange={(e) => setBookDate(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Token Advance Paid (₹) *
              </label>
              <input
                type="number"
                required
                value={bookToken}
                onChange={(e) => setBookToken(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Possession Snag Checklist Status
              </label>
              <select
                value={bookSnag}
                onChange={(e) => setBookSnag(e.target.value)}
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              >
                <option value="Not Started">Not Started</option>
                <option value="Pending QC Inspection">Pending QC Inspection</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                Handover Timeline
              </label>
              <input
                type="text"
                value={bookHandover}
                onChange={(e) => setBookHandover(e.target.value)}
                placeholder="e.g. Possession Handed Over / Scheduled"
                className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={() => setBookingModalOpen(false)}
              className="rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-concrete-600 hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-850 dark:text-blueprint-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/90"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
