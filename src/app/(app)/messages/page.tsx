"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { Send } from "lucide-react";

export default function MessagesPage() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");

  const chats = [
    { id: "1", name: "Ravi Shankar", role: "Site Supervisor", lastMsg: "Concrete slab pour ready", time: "10:30 AM", active: true },
    { id: "2", name: "Kavitha Iyer", role: "Safety Officer", lastMsg: "Safety signs verified at Salem", time: "Yesterday", active: false },
    { id: "3", name: "Deepa Suresh", role: "Quantity Surveyor", lastMsg: "BOQ spreadsheet updated", time: "2 days ago", active: false },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setInputText("");
    toast("Message sent successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Messages & Collaboration
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Instant messaging channels and direct chats across site teams.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 h-[500px]">
        {/* Chat List */}
        <Card className="h-full flex flex-col p-4">
          <CardHeader title="Site Contacts" />
          <div className="overflow-y-auto flex-1 divide-y divide-concrete-100 dark:divide-white/5">
            {chats.map((c) => (
              <div
                key={c.id}
                className={`flex gap-3 p-3 items-start cursor-pointer hover:bg-concrete-50/50 dark:hover:bg-blueprint-900/50 rounded-xl transition-all ${
                  c.active ? "bg-signal-orange/10 border-l-4 border-signal-orange" : ""
                }`}
              >
                <Avatar name={c.name} />
                <div className="flex-1 text-[12.5px]">
                  <div className="flex justify-between font-semibold text-concrete-900 dark:text-blueprint-100">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-concrete-300 font-normal">{c.time}</span>
                  </div>
                  <p className="text-[10px] text-concrete-350">{c.role}</p>
                  <p className="text-[11.5px] text-concrete-600 dark:text-blueprint-200 mt-1 truncate">
                    {c.lastMsg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Message Window */}
        <Card className="lg:col-span-2 h-full flex flex-col p-4 justify-between">
          <div className="border-b border-concrete-100 pb-3 mb-3 dark:border-white/5 flex gap-3 items-center">
            <Avatar name="Ravi Shankar" />
            <div>
              <p className="text-[13.5px] font-semibold text-concrete-900 dark:text-blueprint-100">Ravi Shankar</p>
              <p className="text-[10px] text-concrete-300">Site Supervisor | Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-[13px]">
            <div className="flex gap-2 max-w-md items-start">
              <Avatar name="Ravi Shankar" />
              <div className="bg-concrete-50 p-3 rounded-2xl dark:bg-blueprint-900/30">
                Hi PSB, concrete pouring sequence for Block C has started.
              </div>
            </div>
            <div className="flex gap-2 max-w-md items-start ml-auto flex-row-reverse">
              <Avatar name="PSB" />
              <div className="bg-signal-orange text-white p-3 rounded-2xl">
                Great! Make sure quality inspectors review the spacing pre-pour.
              </div>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 border-t border-concrete-100 pt-3 dark:border-white/5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-concrete-100 bg-white px-4 py-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
            />
            <button
              type="submit"
              className="rounded-xl bg-signal-orange p-2.5 text-white hover:bg-signal-orange/95"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
