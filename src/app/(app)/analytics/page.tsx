"use client";

<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
import { Card, CardHeader } from "@/components/ui/Card";
import ProgressChart from "@/components/dashboard/charts/ProgressChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import MaterialStockChart from "@/components/dashboard/charts/MaterialStockChart";
<<<<<<< HEAD
import { Brain, MessageSquare, LineChart, Send, AlertTriangle, Play, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"performance" | "ai" | "predictions">("performance");

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([
    { sender: "ai", text: "Hello! I am Varuvi AI Project Assistant. Ask me anything about project estimations, timelines, or procurement anomalies." }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setUserInput("");

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I've analyzed the query. Currently, the Skyline Project displays a low risk of delay (+6 days variance) with steel prices stable for the next 15 days.";
      if (userMsg.toLowerCase().includes("budget") || userMsg.toLowerCase().includes("cost")) {
        aiText = "Skyline Business Tower cost center reports a ₹6.2L cement overrun. However, the overall project buffer remains positive.";
      } else if (userMsg.toLowerCase().includes("delay") || userMsg.toLowerCase().includes("timeline")) {
        aiText = "Dharmapuri Highway project has a 42% probability of delay due to monsoon drainage issues near Pier 4. Schedule mitigation recommended.";
      } else if (userMsg.toLowerCase().includes("material")) {
        aiText = "Based on consumption forecasts, you will need 450 additional bags of OPC Cement by August 25. Deccan Steel prices are projected to rise 3% next week.";
      }
      setChatMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-2">
            <Brain className="h-6 w-6 text-signal-orange" />
            Analytics & AI Predictions
          </h1>
          <p className="mt-1 text-[13px] text-concrete-300">
            Key performance indicators, AI assistants, and material forecasts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-concrete-100 dark:border-white/5">
        {[
          { id: "performance", label: "Performance Analytics", icon: LineChart },
          { id: "ai", label: "AI Project Assistant", icon: Brain },
          { id: "predictions", label: "Predictive Forecasting", icon: AlertTriangle },
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

      {activeTab === "performance" && (
        <>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ProgressChart />
            <CashFlowChart />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <MaterialStockChart />
            <Card className="lg:col-span-2">
              <CardHeader title="Regional Project Distribution" subtitle="Project density across Tamil Nadu locations" />
              <div className="h-64 flex items-center justify-center border border-dashed border-concrete-100 rounded-xl dark:border-white/5">
                <span className="text-[13px] text-concrete-300 dark:text-blueprint-400">
                  Interactive Regional Map (Chennai, Coimbatore, Salem, Dharmapuri)
                </span>
              </div>
            </Card>
          </div>
        </>
      )}

      {activeTab === "ai" && (
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-3 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-[500px] flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin text-[13px]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-signal-orange text-white rounded-tr-none"
                        : "bg-concrete-50 border border-concrete-100 text-concrete-900 dark:bg-blueprint-900 dark:border-white/5 dark:text-blueprint-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-4 border-t border-concrete-100 dark:border-white/5 mt-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about cost overruns, material forecasts, or project delays..."
                className="flex-1 rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 focus:border-signal-orange outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-xl bg-signal-orange p-2.5 text-white hover:bg-signal-orange/90 shadow-card"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-3">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-1">
              <HelpCircle className="h-4 w-4 text-signal-orange" /> Suggestions
            </h3>
            <div className="space-y-2 text-[12px]">
              {[
                "Show cement budget status",
                "Check project delay forecasts",
                "How much steel do we need next week?",
              ].map((query, idx) => (
                <div
                  key={idx}
                  onClick={() => setUserInput(query)}
                  className="p-2 border border-concrete-100 dark:border-white/5 rounded-xl cursor-pointer hover:bg-concrete-50 dark:hover:bg-blueprint-900"
                >
                  {query}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "predictions" && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              AI Risk & Forecasting Engine
            </h3>

            {[
              { project: "Dharmapuri Highway Overpass", type: "Delay Prediction", status: "High Risk (78% Probability)", detail: "Due to geological excavation challenges at Pier 4. Projected delay: 14 days.", color: "text-red-500 bg-red-50 dark:bg-red-950/20" },
              { project: "Skyline Business Tower", type: "Cost Overrun Prediction", status: "Medium Risk (42% Probability)", detail: "Due to raw cement rate deviations. Projected overrun: 4.8%.", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
              { project: "Riverside Residency Phase 2", type: "Material Requirement Forecast", status: "Resource Alert", detail: "Need 650 bags of sand aggregates in next 7 days for partition casting.", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
            ].map((pred, idx) => (
              <div key={idx} className="p-4 border border-concrete-100 dark:border-white/5 rounded-xl text-[12.5px] space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-concrete-800 dark:text-blueprint-100 block">{pred.project}</span>
                    <span className="text-[10px] text-concrete-350 block mt-0.5">{pred.type}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${pred.color}`}>{pred.status}</span>
                </div>
                <p className="text-[12.5px] text-concrete-300 leading-relaxed border-t border-concrete-50 dark:border-white/5 pt-2">{pred.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-concrete-100 bg-white p-5 shadow-card dark:border-white/5 dark:bg-blueprint-850 h-fit space-y-4">
            <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
              Forecast Metrics
            </h3>
            <p className="text-[12.5px] text-concrete-300">Model accuracy updated daily based on measurement books and site DPR logs.</p>
            <div className="space-y-3 text-[12.5px]">
              <div className="flex justify-between">
                <span>Model Confidence</span>
                <span className="font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Variables Scanned</span>
                <span className="font-bold">142 KPIs</span>
              </div>
              <button
                onClick={() => toast("Running forecast synchronization...")}
                className="w-full rounded-xl bg-blueprint-900 py-2.5 text-[12.5px] font-semibold text-white hover:bg-blueprint-800 transition-all flex justify-center items-center gap-1.5"
              >
                <Play className="h-3.5 w-3.5" />
                Trigger Retraining Run
              </button>
            </div>
          </div>
        </div>
      )}
=======

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Analytics & Performance
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Key performance indicators, project timelines, and stock distributions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProgressChart />
        <CashFlowChart />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <MaterialStockChart />
        <Card className="lg:col-span-2">
          <CardHeader title="Regional Project Distribution" subtitle="Project density across Tamil Nadu locations" />
          <div className="h-64 flex items-center justify-center border border-dashed border-concrete-100 rounded-xl dark:border-white/5">
            <span className="text-[13px] text-concrete-300 dark:text-blueprint-400">
              Interactive Regional Map (Chennai, Coimbatore, Salem, Dharmapuri)
            </span>
          </div>
        </Card>
      </div>
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
    </div>
  );
}
