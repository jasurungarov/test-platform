"use client";
import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { toast } from "sonner";
import {
  RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine,
  RiSendPlaneLine, RiCheckLine, RiQuestionLine, RiGlobalLine
} from "react-icons/ri";

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); 

  const contactInfo = [
    { icon: RiMailLine, label: t.contact.emailLabel, value: "support@testpro.ru" },
    { icon: RiPhoneLine, label: t.contact.phoneLabel, value: "+996 505 524 086" },
    { icon: RiMapPinLine, label: t.contact.addressLabel, value: "Бишкек, ул. Асаналиева 12" },
    { icon: RiTimeLine, label: t.contact.hoursLabel, value: "Пн–Пт: 9:00 – 18:00" },
  ];

  const faqs = [
    { q: t.contact.q1, a: t.contact.a1 },
    { q: t.contact.q2, a: t.contact.a2 },
    { q: t.contact.q3, a: t.contact.a3 },
    { q: t.contact.q4, a: t.contact.a4 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.contact.fillAll);
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSent(true);
      toast.success(t.contact.sentTitle);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <section className="section border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="badge mb-5"><RiGlobalLine />{t.contact.badge}</div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">{t.contact.title}</h1>
            <p className="text-secondary text-lg leading-relaxed">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="section border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="card p-8">
              <h2 className="font-bold text-xl mb-6">{t.contact.formTitle}</h2>
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <RiCheckLine className="text-2xl text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t.contact.sentTitle}</h3>
                  <p className="text-secondary text-sm mb-6">{t.contact.sentDesc}</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="btn-secondary"
                  >
                    {t.contact.sendMore}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.name}</label>
                    <input type="text" className="input" placeholder={t.contact.namePh}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={loading} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.email}</label>
                    <input type="email" className="input" placeholder={t.contact.emailPh}
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={loading} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.message}</label>
                    <textarea rows={5} className="input resize-none" placeholder={t.contact.messagePh}
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={loading} />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3" disabled={loading}>
                    <RiSendPlaneLine className={loading ? "animate-spin" : ""} /> 
                    {loading ? "Sending..." : t.contact.send}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <Icon className="text-lg" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-secondary text-xs mb-0.5">{label}</div>
                    <div className="font-medium text-sm">{value}</div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="card flex-1 min-h-[160px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg,var(--border),var(--border) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,var(--border),var(--border) 1px,transparent 1px,transparent 32px)" }} />
                <div className="text-center relative z-10">
                  <RiMapPinLine className="text-3xl mx-auto mb-2" style={{ color: "var(--accent)" }} />
                  <p className="text-secondary text-sm">Бишкек, ул. Асаналиева 12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.contact.faqTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full">
            {faqs.map(({ q, a }) => (
              <div key={q} className="card p-6">
                <div className="flex items-start gap-3">
                  <RiQuestionLine className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">{q}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}