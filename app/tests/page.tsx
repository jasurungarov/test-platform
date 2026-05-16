"use client";
import { tests } from "@/data/tests";
import {
  difficultyNames,
  getTestTranslation,
  subjectNames,
} from "@/data/testTranslations";
import { useLang } from "@/i18n/LangContext";
import { Lang } from "@/i18n/translations";
import { getSubjectEmoji, getSubjectGradient } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  RiBookOpenLine,
  RiFilter3Line,
  RiSearchLine,
  RiTimeLine,
} from "react-icons/ri";

export default function TestsPage() {
  const { t, lang } = useLang();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const subjects = useMemo(() => {
    const keys = [...new Set(tests.map((t) => t.subject))];
    return keys;
  }, []);

  const filtered = useMemo(() => {
    return tests.filter((test) => {
      const tr = getTestTranslation(test.id, lang as Lang);
      const title = tr?.title ?? test.id;
      const subjectLabel =
        subjectNames[test.subject]?.[lang as Lang] ?? test.subject;
      const s = search.toLowerCase();
      const matchSearch =
        title.toLowerCase().includes(s) ||
        subjectLabel.toLowerCase().includes(s);
      const matchSubject = subject === "all" || test.subject === subject;
      const matchDiff = difficulty === "all" || test.difficulty === difficulty;
      return matchSearch && matchSubject && matchDiff;
    });
  }, [search, subject, difficulty, lang]);

  return (
    <div className="min-h-screen section">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {t.tests.title}
          </h1>
          <p className="text-secondary">
            {tests.length} {t.tests.subtitle} {subjects.length}{" "}
            {t.tests.subjects}
          </p>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder={t.tests.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input !pl-8"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <RiFilter3Line className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input !pl-8 pr-4 appearance-none cursor-pointer min-w-[160px]">
                <option value="all">{t.tests.allSubjects}</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {subjectNames[s]?.[lang as Lang] ?? s}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="input px-4 appearance-none cursor-pointer min-w-[140px]">
              <option value="all">{t.tests.allLevels}</option>
              <option value="easy">{t.tests.easy}</option>
              <option value="medium">{t.tests.medium}</option>
              <option value="hard">{t.tests.hard}</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="text-secondary text-sm mb-5">
          {t.tests.found}{" "}
          <span className="text-primary font-medium">{filtered.length}</span>{" "}
          {t.tests.testsWord}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="card p-16 text-center text-secondary">
            <RiBookOpenLine className="text-4xl mx-auto mb-3 opacity-30" />
            <p>{t.tests.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((test) => {
              const tr = getTestTranslation(test.id, lang as Lang);
              const title = tr?.title ?? test.id;
              const description = tr?.description ?? "";
              const subjectLabel =
                subjectNames[test.subject]?.[lang as Lang] ?? test.subject;
              const diffLabel =
                difficultyNames[test.difficulty]?.[lang as Lang] ??
                test.difficulty;
              const diffColor =
                test.difficulty === "easy"
                  ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                  : test.difficulty === "hard"
                    ? "text-red-500 bg-red-500/10 border-red-500/20"
                    : "text-amber-500 bg-amber-500/10 border-amber-500/20";

              return (
                <Link
                  key={test.id}
                  href={`/tests/${test.id}`}
                  className="card card-hover p-5 flex flex-col group">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getSubjectGradient(test.subject)} flex items-center justify-center text-sm flex-shrink-0`}>
                      {getSubjectEmoji(test.subject)}
                    </div>
                    <span className="text-xs font-medium text-secondary">
                      {subjectLabel}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2 flex-1">
                    {title}
                  </h3>

                  <p className="text-secondary text-xs leading-relaxed mb-4 line-clamp-2">
                    {description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-secondary mt-auto pt-3 border-t border-border">
                    <span className="flex items-center gap-1">
                      <RiBookOpenLine />
                      {test.questions.length} {t.tests.questions}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiTimeLine />
                      {test.timeLimit} {t.tests.minutes}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md border text-xs font-medium ${diffColor}`}>
                      {diffLabel}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
