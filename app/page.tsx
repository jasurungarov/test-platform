"use client";
import Link from "next/link";
import { useLang } from "@/i18n/LangContext";
import { tests, subjects } from "@/data/tests";
import {
  RiArrowRightLine, RiFlashlightLine, RiTimeLine,
  RiUserLine, RiBarChartLine, RiCheckLine, RiStarFill,
  RiShieldCheckLine, RiGlobalLine, RiBookOpenLine
} from "react-icons/ri";

export default function HomePage() {
  const { t } = useLang();

  const stats = [
    { value: `${tests.length}+`, label: t.home.statsTests },
    { value: `${subjects.length}`, label: t.home.statsSubjects },
    { value: "5 000+", label: t.home.statsStudents },
    { value: "98%", label: t.home.statsSatisfied },
  ];

  const features = [
    { icon: RiFlashlightLine, title: t.home.f1title, desc: t.home.f1desc },
    { icon: RiTimeLine, title: t.home.f2title, desc: t.home.f2desc },
    { icon: RiUserLine, title: t.home.f3title, desc: t.home.f3desc },
    { icon: RiBarChartLine, title: t.home.f4title, desc: t.home.f4desc },
  ];

  const steps = [
    { n: "01", title: t.home.s1title, desc: t.home.s1desc },
    { n: "02", title: t.home.s2title, desc: t.home.s2desc },
    { n: "03", title: t.home.s3title, desc: t.home.s3desc },
  ];

  const testimonials = [
    { name: t.home.t1name, role: t.home.t1role, text: t.home.t1text },
    { name: t.home.t2name, role: t.home.t2role, text: t.home.t2text },
    { name: t.home.t3name, role: t.home.t3role, text: t.home.t3text },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge mb-6">
              <RiGlobalLine />
              <span>{t.home.badge}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-5">
              {t.home.title1}{" "}
              <span style={{ color: "var(--accent)" }}>{t.home.title2}</span>
            </h1>

            <p className="text-secondary text-lg leading-relaxed max-w-xl mx-auto mb-8">
              {t.home.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/tests" className="btn-primary text-base px-6 py-3">
                {t.home.cta}
                <RiArrowRightLine />
              </Link>
              <Link href="/about" className="btn-secondary text-base px-6 py-3">
                {t.home.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-border" />

      {/* STATS */}
      <section className="py-14">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-bg py-10 text-center">
                <div className="text-4xl font-bold tracking-tight mb-1" style={{ color: "var(--accent)" }}>{value}</div>
                <div className="text-secondary text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.home.whyTitle}</h2>
            <p className="text-secondary">{t.home.whySubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--accent)", opacity: 1 }}>
                  <Icon className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-base mb-1.5">{title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.home.howTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="card p-6">
                <div className="text-5xl font-bold mb-4" style={{ color: "var(--accent)", opacity: 0.2 }}>{n}</div>
                <h3 className="font-semibold text-base mb-1.5">{title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.home.reviewTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map(({ name, role, text }) => (
              <div key={name} className="card p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-4">"{text}"</p>
                <div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-secondary text-xs">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* CTA BANNER */}
      <section className="section">
        <div className="container">
          <div className="card p-10 md:p-14 text-center max-w-2xl mx-auto"
            style={{ borderColor: "var(--accent)", boxShadow: "0 0 0 1px var(--accent), 0 8px 32px rgba(99,102,241,0.1)" }}>
            <RiShieldCheckLine className="text-4xl mx-auto mb-5" style={{ color: "var(--accent)" }} />
            <h2 className="text-3xl font-bold mb-2">{t.home.ctaTitle}</h2>
            <p className="text-secondary mb-6">{t.home.ctaDesc}</p>
            <Link href="/tests" className="btn-primary text-base px-8 py-3">
              {t.home.ctaBtn} <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
