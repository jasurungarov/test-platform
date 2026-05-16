"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine, RiGlobalLine, RiFlashlightLine } from "react-icons/ri";
import { useLang } from "@/i18n/LangContext";
import { useTheme } from "@/lib/ThemeContext";
import { Lang } from "@/i18n/translations";
import Image from 'next/image'

const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "uz", label: "UZ" },
  { code: "kg", label: "KG" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/tests", label: t.nav.tests },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Image src="/logo1.png" alt="Logo" width={26} height={26}/>
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">TestPro</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === l.href ? "bg-accent/10 text-accent" : "text-secondary hover:text-primary hover:bg-surface"
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Lang switcher */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-surface transition-all">
              <RiGlobalLine className="text-base" />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-bg border border-border rounded-xl shadow-xl overflow-hidden min-w-[80px]">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                      lang === l.code ? "text-accent bg-accent/10" : "text-secondary hover:text-primary hover:bg-surface"
                    }`}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button onClick={toggle}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface transition-all">
            {theme === "dark" ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
          </button>

          {/* CTA */}
          <Link href="/tests"
            className="hidden md:flex items-center px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
            {t.nav.start}
          </Link>

          {/* Mobile menu */}
          <button className="md:hidden w-9 h-9 flex items-center justify-center text-secondary" onClick={() => setOpen(!open)}>
            {open ? <RiCloseLine className="text-xl" /> : <RiMenuLine className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg px-4 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href ? "bg-accent/10 text-accent" : "text-secondary hover:text-primary"
              }`}>
              {l.label}
            </Link>
          ))}
          <Link href="/tests" onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg bg-accent text-white text-sm font-medium text-center">
            {t.nav.start}
          </Link>
        </div>
      )}
    </nav>
  );
}
