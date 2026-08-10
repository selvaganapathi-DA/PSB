"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";

export default function HelpCenterPage() {
  const faqs = [
    { q: "How do I raise a material purchase request?", a: "Go to Materials & Assets > Purchase Requests. Click the 'Create Request' button and complete the 3-step wizard." },
    { q: "Where can I view active site issues?", a: "Navigate to Compliance & Docs > Site Issues to review, filter, and track hazardous or structural blocks." },
    { q: "How is daily attendance recorded?", a: "Site supervisors log attendance check-ins directly under Workforce > Attendance. Staff can also check in using the mobile web view." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Help Center & FAQs
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Find user manuals, guides, and contact corporate support.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {faqs.map((faq, idx) => (
            <Card key={idx}>
              <h3 className="font-display text-[14.5px] font-semibold text-concrete-900 dark:text-blueprint-100 mb-2">
                {faq.q}
              </h3>
              <p className="text-[13px] text-concrete-600 dark:text-blueprint-200 leading-relaxed">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>

        <Card className="h-full">
          <CardHeader title="Need Support?" subtitle="Contact construction IT helpline" />
          <div className="space-y-3 text-[13px]">
            <div>
              <p className="text-concrete-350">IT Helpline Email</p>
              <p className="font-semibold text-concrete-900 dark:text-blueprint-100">support@varuvi.in</p>
            </div>
            <div>
              <p className="text-concrete-350">Website</p>
              <p className="font-semibold text-concrete-900 dark:text-blueprint-100">
                <a href="https://varuvi.in" target="_blank" rel="noreferrer" className="hover:underline text-signal-orange">varuvi.in</a>
              </p>
            </div>
            <div>
              <p className="text-concrete-350">Phone Helpline</p>
              <p className="font-semibold text-concrete-900 dark:text-blueprint-100">+91 90929 79396</p>
            </div>
            <div>
              <p className="text-concrete-350">Operational Hours</p>
              <p className="text-concrete-900 dark:text-blueprint-100">Mon - Sat (09:00 AM - 06:00 PM)</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
