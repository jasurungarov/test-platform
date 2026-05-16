"use client";
import Link from "next/link";
import { useLang } from "@/i18n/LangContext";
import { tests, subjects } from "@/data/tests";
import {
  RiParentLine, RiEyeLine, RiTeamLine, RiArrowRightLine,
  RiUserLine, RiBookOpenLine, RiBarChartLine, RiShieldCheckLine,
  RiCheckDoubleLine, RiLightbulbLine, RiGlobalLine, RiCodeLine,
  RiFlashlightLine, RiStarLine, RiHeartLine, RiAwardLine,
  RiTimeLine, RiQuestionLine
} from "react-icons/ri";
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiReact
} from "react-icons/si";

const team = [
  { name: "Алексей Громов", role: "Founder & CEO", avatar: "АГ", color: "#6366f1" },
  { name: "Мария Белова", role: "Head of Content", avatar: "МБ", color: "#8b5cf6" },
  { name: "Дарья Новикова", role: "UI/UX Designer", avatar: "ДН", color: "#06b6d4" },
  { name: "Тимур Рашидов", role: "Lead Developer", avatar: "ТР", color: "#10b981" },
];

const techStack = [
  { icon: SiNextdotjs, name: "Next.js 14", desc: "App Router, SSR" },
  { icon: SiReact, name: "React 18", desc: "UI Components" },
  { icon: SiTypescript, name: "TypeScript", desc: "Type Safety" },
  { icon: SiTailwindcss, name: "Tailwind CSS", desc: "Styling" },
];

export default function AboutPage() {
  const { t } = useLang();

  const platformStats = [
    { icon: RiBookOpenLine, value: `${tests.length}+`, label: t.home.statsTests },
    { icon: RiGlobalLine, value: `${subjects.length}`, label: t.home.statsSubjects },
    { icon: RiTeamLine, value: "5 000+", label: t.home.statsStudents },
    { icon: RiStarLine, value: "98%", label: t.home.statsSatisfied },
    { icon: RiTimeLine, value: "4", label: "Языка" },
    { icon: RiAwardLine, value: "2024", label: "Год основания" },
  ];

  const values = [
    { icon: RiFlashlightLine, title: t.about.v1, desc: t.about.v1d },
    { icon: RiShieldCheckLine, title: t.about.v2, desc: t.about.v2d },
    { icon: RiCheckDoubleLine, title: t.about.v3, desc: t.about.v3d },
  ];

  const howSteps = [
    { n: "01", icon: RiBookOpenLine, title: t.about.s1, desc: t.about.s1d },
    { n: "02", icon: RiUserLine, title: t.about.s2, desc: t.about.s2d },
    { n: "03", icon: RiBarChartLine, title: t.about.s3, desc: t.about.s3d },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="section border-b border-border">
        <div className="container">
          <div className="max-w-2xl">
            <div className="badge mb-5">
              <RiGlobalLine />
              {t.about.badge}
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">{t.about.title}</h1>
            <p className="text-secondary text-lg leading-relaxed">{t.about.subtitle}</p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card p-8">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <RiParentLine className="text-xl" style={{ color: "var(--accent)" }} />
              </div>
              <h2 className="text-xl font-bold mb-3">{t.about.missionTitle}</h2>
              <p className="text-secondary leading-relaxed">{t.about.missionText}</p>
            </div>
            <div className="card p-8">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                <RiEyeLine className="text-xl text-cyan-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">{t.about.visionTitle}</h2>
              <p className="text-secondary leading-relaxed">{t.about.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section border-b border-border">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-10">{t.about.statsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platformStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="card p-6">
                <Icon className="text-xl mb-3" style={{ color: "var(--accent)" }} />
                <div className="text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>{value}</div>
                <div className="text-secondary text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section border-b border-border">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.about.howTitle}</h2>
            <p className="text-secondary">{t.about.howSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howSteps.map(({ n, icon: Icon, title, desc }) => (
              <div key={n} className="card p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-black"
                  style={{ color: "var(--border)" }}>{n}</div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--accent)" }}>
                  <Icon className="text-white text-lg" />
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section border-b border-border">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-10">{t.about.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <Icon className="text-2xl mb-4" style={{ color: "var(--accent)" }} />
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section border-b border-border">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t.about.teamTitle}</h2>
            <p className="text-secondary">{t.about.teamSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map(({ name, role, avatar, color }) => (
              <div key={name} className="card p-6 text-center card-hover">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg"
                  style={{ background: color }}>
                  {avatar}
                </div>
                <div className="font-semibold text-sm mb-0.5">{name}</div>
                <div className="text-secondary text-xs">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="card p-10 md:p-14 max-w-2xl mx-auto text-center"
            style={{ borderColor: "var(--accent)", boxShadow: "0 0 0 1px var(--accent), 0 8px 32px rgba(99,102,241,0.08)" }}>
            <RiHeartLine className="text-4xl mx-auto mb-5" style={{ color: "var(--accent)" }} />
            <h2 className="text-3xl font-bold mb-2">{t.about.ctaTitle}</h2>
            <p className="text-secondary mb-6">{t.about.ctaDesc}</p>
            <Link href="/tests" className="btn-primary text-base px-8 py-3">
              {t.about.ctaBtn} <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
