"use client";

import React from "react";
import { purchaseOrders } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import StatusChip from "@/components/ui/StatusChip";
import { ArrowLeft, Store, FileText, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function PurchaseOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const po = purchaseOrders.find((p) => p.id === id) || purchaseOrders[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[13px] text-concrete-350 hover:text-concrete-900 dark:hover:text-blueprint-100 transition-all">
        <ArrowLeft className="h-4 w-4" />
        <Link to="/purchase-orders">Back to Purchase Orders</Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11.5px] font-mono font-semibold text-concrete-300 dark:text-blueprint-400">
              {po.poNumber}
            </span>
            <StatusChip label={po.status} />
          </div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Purchase Order to {po.vendor}
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Issued on {po.date} for {po.project}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <CardHeader title="Line Items Ordered" />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-concrete-100 text-concrete-350 dark:border-white/5">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-right">Quantity</th>
                    <th className="pb-2 text-right">Unit Rate (₹)</th>
                    <th className="pb-2 text-right font-semibold">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-concrete-100 dark:divide-white/5">
                  <tr className="text-concrete-900 dark:text-blueprint-100">
                    <td className="py-3 font-medium">OPC 53 Grade Cement</td>
                    <td className="py-3 text-right">800 Bags</td>
                    <td className="py-3 text-right">₹385</td>
                    <td className="py-3 text-right font-semibold">₹3,08,000</td>
                  </tr>
                  <tr className="text-concrete-900 dark:text-blueprint-100">
                    <td className="py-3 font-medium">TMT Steel Rebar 12mm</td>
                    <td className="py-3 text-right">30 Tons</td>
                    <td className="py-3 text-right">₹64,500</td>
                    <td className="py-3 text-right font-semibold">₹19,35,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Order Financials" />
            <div className="space-y-4">
              <div className="flex justify-between text-[13px]">
                <span className="text-concrete-350">Subtotal</span>
                <span className="font-medium text-concrete-900 dark:text-blueprint-100">₹{po.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-concrete-350">GST (18%)</span>
                <span className="font-medium text-concrete-900 dark:text-blueprint-100">Included</span>
              </div>
              <div className="pt-3 border-t border-concrete-100 dark:border-white/5 flex justify-between text-[14.5px] font-bold">
                <span className="text-concrete-900 dark:text-blueprint-100">Total Amount</span>
                <span className="text-signal-orange">₹{po.amount.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
