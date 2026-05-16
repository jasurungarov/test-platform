// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { useLang } from "@/i18n/LangContext";
// import { getTestById } from "@/data/tests";
// import { getTestTranslation, subjectNames, difficultyNames } from "@/data/testTranslations";
// import { formatTime, calcPercentage } from "@/lib/utils";
// import { toast } from "sonner";
// import { Lang } from "@/i18n/translations";
// import {
//   RiTimeLine, RiArrowLeftLine, RiArrowRightLine,
//   RiSendPlaneLine, RiRefreshLine, RiCheckLine, RiCloseLine,
//   RiTrophyLine, RiUserLine, RiBookOpenLine,
// } from "react-icons/ri";

// type Phase = "enter-name" | "taking" | "result";

// export default function TestPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const { t, lang } = useLang();
//   const test = getTestById(params.id);
//   const tr = test ? getTestTranslation(test.id, lang as Lang) : null;

//   const [phase, setPhase] = useState<Phase>("enter-name");
//   const [name, setName] = useState("");
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<(number | null)[]>([]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeSpent, setTimeSpent] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [finalAnswers, setFinalAnswers] = useState<(number | null)[]>([]);

//   const doSubmit = useCallback(
//     async (ans: (number | null)[], elapsed?: number) => {
//       if (!test || submitted) return;
//       setSubmitted(true);
//       setFinalAnswers(ans);

//       const score = ans.reduce<number>(
//         (acc, a, i) => acc + (a === test.questions[i].correctAnswer ? 1 : 0),
//         0
//       );
//       const total = test.questions.length;
//       const pct = calcPercentage(score, total);
//       const secs =
//         elapsed ??
//         (startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0);
//       const spent = formatTime(secs);
//       setTimeSpent(spent);
//       setPhase("result");

//       if (pct >= 80) {
//         try {
//           const { default: confetti } = await import("canvas-confetti");
//           setTimeout(
//             () =>
//               confetti({
//                 particleCount: 100,
//                 spread: 70,
//                 origin: { y: 0.6 },
//                 colors: ["#6366f1", "#8b5cf6", "#06b6d4"],
//               }),
//             300
//           );
//         } catch {}
//       }

//       try {
//         await fetch("/api/telegram", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             studentName: name,
//             testTitle: tr?.title ?? test.id,
//             subject: subjectNames[test.subject]?.[lang as Lang] ?? test.subject,
//             score,
//             totalPoints: total,
//             percentage: pct,
//             timeSpent: spent,
//           }),
//         });
//       } catch {}
//     },
//     [test, submitted, startTime, name, tr, lang]
//   );

//   useEffect(() => {
//     if (phase !== "taking") return;
//     const id = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(id);
//           doSubmit(answers, test ? test.timeLimit * 60 : 0);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(id);
//   }, [phase, answers, doSubmit, test]);

//   if (!test || !tr) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="card p-10 text-center max-w-sm mx-4">
//           <h2 className="font-bold text-xl mb-4">{t.test.notFound}</h2>
//           <button onClick={() => router.push("/tests")} className="btn-primary">
//             {t.test.back}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const subjectLabel = subjectNames[test.subject]?.[lang as Lang] ?? test.subject;
//   const diffLabel = difficultyNames[test.difficulty]?.[lang as Lang] ?? test.difficulty;
//   const diffColor =
//     test.difficulty === "easy"
//       ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
//       : test.difficulty === "hard"
//       ? "text-red-500 bg-red-500/10 border-red-500/20"
//       : "text-amber-500 bg-amber-500/10 border-amber-500/20";

//   /* ═══════════════════════════════
//      PHASE: ENTER NAME
//   ═══════════════════════════════ */
//   if (phase === "enter-name") {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-md">
//           <div className="card p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
//                 <RiUserLine className="text-white text-lg" />
//               </div>
//               <div>
//                 <h1 className="font-bold text-lg leading-tight">{tr.title}</h1>
//                 <p className="text-secondary text-sm">{subjectLabel}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 text-sm text-secondary mb-6 pb-6 border-b border-border">
//               <span className="flex items-center gap-1.5">
//                 <RiBookOpenLine />
//                 {test.questions.length} {t.tests.questions}
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <RiTimeLine />
//                 {test.timeLimit} {t.tests.minutes}
//               </span>
//               <span className={`px-2 py-0.5 rounded border text-xs font-medium ${diffColor}`}>
//                 {diffLabel}
//               </span>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">{t.test.enterName}</label>
//               <input
//                 type="text"
//                 className="input"
//                 placeholder={t.test.namePlaceholder}
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && name.trim().length >= 2) {
//                     setAnswers(new Array(test.questions.length).fill(null));
//                     setTimeLeft(test.timeLimit * 60);
//                     setStartTime(new Date());
//                     setPhase("taking");
//                   }
//                 }}
//                 autoFocus
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <button
//                 disabled={name.trim().length < 2}
//                 onClick={() => {
//                   setAnswers(new Array(test.questions.length).fill(null));
//                   setTimeLeft(test.timeLimit * 60);
//                   setStartTime(new Date());
//                   setPhase("taking");
//                 }}
//                 className="btn-primary justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 {t.test.start}
//               </button>
//               <button
//                 onClick={() => router.push("/tests")}
//                 className="btn-secondary justify-center py-3"
//               >
//                 {t.test.back}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ═══════════════════════════════
//      PHASE: TAKING
//   ═══════════════════════════════ */
//   if (phase === "taking") {
//     const q = test.questions[current];
//     const qTr = tr.questions[current];
//     const progress = ((current + 1) / test.questions.length) * 100;
//     const timerPct = (timeLeft / (test.timeLimit * 60)) * 100;
//     const isLow = timeLeft < 60;
//     const answeredCount = answers.filter((a) => a !== null).length;

//     return (
//       <div className="min-h-screen py-8 px-4">
//         <div className="max-w-2xl mx-auto">
//           {/* Top bar */}
//           <div className="card p-4 mb-5 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => router.push("/tests")}
//                 className="text-secondary hover:text-primary transition-colors"
//               >
//                 <RiArrowLeftLine className="text-lg" />
//               </button>
//               <div>
//                 <div className="font-semibold text-sm line-clamp-1">{tr.title}</div>
//                 <div className="text-secondary text-xs">{subjectLabel}</div>
//               </div>
//             </div>
//             <div
//               className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
//                 isLow ? "border-red-500/30 bg-red-500/10" : "border-border"
//               }`}
//               style={{ background: isLow ? undefined : "var(--bg-surface)" }}
//             >
//               <RiTimeLine className={`text-sm ${isLow ? "text-red-500" : "text-secondary"}`} />
//               <span className={`font-bold tabular-nums ${isLow ? "text-red-500" : "text-primary"}`}>
//                 {formatTime(timeLeft)}
//               </span>
//             </div>
//           </div>

//           {/* Progress bars */}
//           <div className="mb-5">
//             <div className="flex justify-between text-xs text-secondary mb-2">
//               <span>
//                 {t.test.question} {current + 1} {t.test.of} {test.questions.length}
//               </span>
//               <span>
//                 {answeredCount} {t.test.answered}
//               </span>
//             </div>
//             <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
//               <div
//                 className="h-full rounded-full transition-all duration-500"
//                 style={{ width: `${progress}%`, background: "var(--accent)" }}
//               />
//             </div>
//             <div className="h-0.5 mt-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
//               <div
//                 className={`h-full rounded-full transition-all duration-1000 ${
//                   isLow ? "bg-red-500" : "bg-emerald-500"
//                 }`}
//                 style={{ width: `${timerPct}%` }}
//               />
//             </div>
//           </div>

//           {/* Question card */}
//           <div className="card p-6 mb-5">
//             <p className="text-xs text-secondary mb-3">
//               {t.test.question} {current + 1}
//             </p>
//             <h2 className="font-semibold text-lg leading-relaxed mb-6">{qTr.question}</h2>
//             <div className="space-y-2.5">
//               {qTr.options.map((opt, i) => {
//                 const selected = answers[current] === i;
//                 return (
//                   <button
//                     key={i}
//                     onClick={() => {
//                       const next = [...answers];
//                       next[current] = i;
//                       setAnswers(next);
//                     }}
//                     className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm transition-all duration-150"
//                     style={{
//                       borderColor: selected ? "var(--accent)" : "var(--border)",
//                       background: selected ? "rgba(99,102,241,0.08)" : "var(--bg-surface)",
//                       color: selected ? "var(--accent)" : "var(--primary)",
//                     }}
//                   >
//                     <span
//                       className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
//                       style={{
//                         background: selected ? "var(--accent)" : "var(--border)",
//                         color: selected ? "white" : "var(--secondary)",
//                       }}
//                     >
//                       {String.fromCharCode(65 + i)}
//                     </span>
//                     {opt}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setCurrent((p) => Math.max(0, p - 1))}
//               disabled={current === 0}
//               className="btn-secondary px-4 py-2.5 disabled:opacity-30"
//             >
//               <RiArrowLeftLine /> {t.test.prev}
//             </button>

//             {/* Question dots */}
//             <div className="flex-1 flex gap-1 flex-wrap justify-center">
//               {test.questions.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrent(i)}
//                   className="w-6 h-6 rounded-full text-xs font-medium transition-all"
//                   style={{
//                     background:
//                       i === current
//                         ? "var(--accent)"
//                         : answers[i] !== null
//                         ? "rgba(99,102,241,0.2)"
//                         : "var(--border)",
//                     color:
//                       i === current
//                         ? "white"
//                         : answers[i] !== null
//                         ? "var(--accent)"
//                         : "var(--secondary)",
//                   }}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>

//             {current < test.questions.length - 1 ? (
//               <button
//                 onClick={() => setCurrent((p) => p + 1)}
//                 className="btn-primary px-4 py-2.5"
//               >
//                 {t.test.next} <RiArrowRightLine />
//               </button>
//             ) : (
//               <button
//                 onClick={() => {
//                   const unanswered = answers.filter((a) => a === null).length;
//                   if (unanswered > 0) {
//                     toast.warning(t.test.unanswered(unanswered), {
//                       action: {
//                         label: t.test.finish,
//                         onClick: () => doSubmit(answers),
//                       },
//                     });
//                   } else {
//                     doSubmit(answers);
//                   }
//                 }}
//                 className="btn-primary px-4 py-2.5"
//                 style={{ background: "#10b981" }}
//               >
//                 <RiSendPlaneLine /> {t.test.submit}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ═══════════════════════════════
//      PHASE: RESULT
//   ═══════════════════════════════ */
//   const score = finalAnswers.reduce<number>(
//     (acc, a, i) => acc + (a === test.questions[i].correctAnswer ? 1 : 0),
//     0
//   );
//   const total = test.questions.length;
//   const pct = calcPercentage(score, total);
//   const scoreColor = pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444";

//   return (
//     <div className="min-h-screen py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Summary card */}
//         <div className="card p-8 mb-5 text-center">
//           <RiTrophyLine className="text-4xl mx-auto mb-3" style={{ color: scoreColor }} />
//           <h2 className="text-2xl font-bold mb-1">
//             {pct >= 80 ? t.test.excellent : pct >= 60 ? t.test.good : t.test.retry}
//           </h2>
//           <p className="text-secondary text-sm mb-6">
//             {name} · {tr.title}
//           </p>

//           {/* Score circle */}
//           <div className="relative w-28 h-28 mx-auto mb-6">
//             <svg viewBox="0 0 120 120" className="w-28 h-28 -rotate-90">
//               <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10" />
//               <circle
//                 cx="60" cy="60" r="50" fill="none"
//                 stroke={scoreColor} strokeWidth="10"
//                 strokeLinecap="round"
//                 strokeDasharray={`${2 * Math.PI * 50}`}
//                 strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
//                 style={{ transition: "stroke-dashoffset 1s ease" }}
//               />
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="text-2xl font-bold" style={{ color: scoreColor }}>{pct}%</span>
//               <span className="text-secondary text-xs">{score}/{total}</span>
//             </div>
//           </div>

//           <div className="flex justify-center gap-6 text-sm text-secondary">
//             <span className="flex items-center gap-1.5">
//               <RiCheckLine className="text-emerald-500" />
//               <span className="text-primary font-medium">{score}</span>
//             </span>
//             <span className="flex items-center gap-1.5">
//               <RiCloseLine className="text-red-500" />
//               <span className="text-primary font-medium">{total - score}</span>
//             </span>
//             <span className="flex items-center gap-1.5">
//               <RiTimeLine className="text-secondary" />
//               <span className="text-primary font-medium">{timeSpent}</span>
//             </span>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-3 mb-8">
//           <button
//             onClick={() => {
//               setPhase("enter-name");
//               setCurrent(0);
//               setAnswers([]);
//               setSubmitted(false);
//               setFinalAnswers([]);
//             }}
//             className="btn-secondary flex-1 justify-center py-3"
//           >
//             <RiRefreshLine /> {t.test.tryAgain}
//           </button>
//           <button
//             onClick={() => router.push("/tests")}
//             className="btn-primary flex-1 justify-center py-3"
//           >
//             {t.test.anotherTest}
//           </button>
//         </div>

//         {/* Answer review */}
//         <h3 className="font-bold text-lg mb-4">{t.test.review}</h3>
//         <div className="space-y-3">
//           {test.questions.map((q, i) => {
//             const qTr = tr.questions[i];
//             const isCorrect = finalAnswers[i] === q.correctAnswer;
//             return (
//               <div
//                 key={q.id}
//                 className="card p-5"
//                 style={{
//                   borderColor: isCorrect
//                     ? "rgba(16,185,129,0.3)"
//                     : "rgba(239,68,68,0.3)",
//                 }}
//               >
//                 <div className="flex items-start gap-3 mb-3">
//                   {isCorrect ? (
//                     <RiCheckLine className="text-emerald-500 flex-shrink-0 mt-0.5" />
//                   ) : (
//                     <RiCloseLine className="text-red-500 flex-shrink-0 mt-0.5" />
//                   )}
//                   <p className="text-sm font-medium leading-relaxed">{qTr.question}</p>
//                 </div>
//                 <div className="space-y-1.5 ml-6">
//                   {qTr.options.map((opt, j) => {
//                     const isRight = j === q.correctAnswer;
//                     const isUserWrong = j === finalAnswers[i] && !isCorrect;
//                     return (
//                       <div
//                         key={j}
//                         className="px-3 py-2 rounded-lg text-xs"
//                         style={{
//                           background: isRight
//                             ? "rgba(16,185,129,0.08)"
//                             : isUserWrong
//                             ? "rgba(239,68,68,0.08)"
//                             : "transparent",
//                           color: isRight
//                             ? "#10b981"
//                             : isUserWrong
//                             ? "#ef4444"
//                             : "var(--secondary)",
//                           border: isRight
//                             ? "1px solid rgba(16,185,129,0.2)"
//                             : isUserWrong
//                             ? "1px solid rgba(239,68,68,0.2)"
//                             : "1px solid transparent",
//                         }}
//                       >
//                         {String.fromCharCode(65 + j)}. {opt}
//                         {isRight && <span className="ml-2 font-medium">✓</span>}
//                         {isUserWrong && (
//                           <span className="ml-2 font-medium">
//                             ✗ {t.test.yourAnswer}
//                           </span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { getTestById } from "@/data/tests";
import {
  difficultyNames,
  getTestTranslation,
  subjectNames,
} from "@/data/testTranslations";
import { useLang } from "@/i18n/LangContext";
import { Lang } from "@/i18n/translations";
import { calcPercentage, formatTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBookOpenLine,
  RiCheckLine,
  RiCloseLine,
  RiRefreshLine,
  RiSendPlaneLine,
  RiTimeLine,
  RiTrophyLine,
  RiUserLine,
} from "react-icons/ri";
import { toast } from "sonner";

type Phase = "enter-name" | "taking" | "result";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TestPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  const { t, lang } = useLang();
  const test = getTestById(id);

  const [tr, setTr] = useState(
    test ? getTestTranslation(test.id, lang as Lang) : null,
  );
  const [phase, setPhase] = useState<Phase>("enter-name");
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState<(number | null)[]>([]);

  useEffect(() => {
    if (test) setTr(getTestTranslation(test.id, lang as Lang));
  }, [lang, test]);

  const doSubmit = useCallback(
    async (ans: (number | null)[], elapsed?: number) => {
      if (!test || submitted) return;
      setSubmitted(true);
      setFinalAnswers(ans);

      const score = ans.reduce<number>(
        (acc: number, a: number | null, i: number) =>
          acc + (a === test.questions[i].correctAnswer ? 1 : 0),
        0,
      );
      const total = test.questions.length;
      const pct = calcPercentage(score, total);
      const secs =
        elapsed ??
        (startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0);
      const spent = formatTime(secs);
      setTimeSpent(spent);
      setPhase("result");

      if (pct >= 80) {
        try {
          const { default: confetti } = await import("canvas-confetti");
          setTimeout(
            () =>
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#6366f1", "#8b5cf6", "#06b6d4"],
              }),
            300,
          );
        } catch {}
      }

      try {
        const currentTr = getTestTranslation(test.id, lang as Lang);
        await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentName: name,
            testTitle: currentTr?.title ?? test.id,
            subject: subjectNames[test.subject]?.[lang as Lang] ?? test.subject,
            score,
            totalPoints: total,
            percentage: pct,
            timeSpent: spent,
          }),
        });
      } catch {}
    },
    [test, submitted, startTime, name, lang],
  );

  useEffect(() => {
    if (phase !== "taking") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          doSubmit(answers, test ? test.timeLimit * 60 : 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, answers, doSubmit, test]);

  if (!test || !tr) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-10 text-center max-w-sm mx-4">
          <h2 className="font-bold text-xl mb-4">{t.test.notFound}</h2>
          <button onClick={() => router.push("/tests")} className="btn-primary">
            {t.test.back}
          </button>
        </div>
      </div>
    );
  }

  const subjectLabel =
    subjectNames[test.subject]?.[lang as Lang] ?? test.subject;
  const diffLabel =
    difficultyNames[test.difficulty]?.[lang as Lang] ?? test.difficulty;
  const diffColor =
    test.difficulty === "easy"
      ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
      : test.difficulty === "hard"
        ? "text-red-500 bg-red-500/10 border-red-500/20"
        : "text-amber-500 bg-amber-500/10 border-amber-500/20";

  /* ═══ ENTER NAME ═══ */
  if (phase === "enter-name") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <RiUserLine className="text-white text-lg" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">{tr.title}</h1>
                <p className="text-secondary text-sm">{subjectLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-secondary mb-6 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5">
                <RiBookOpenLine />
                {test.questions.length} {t.tests.questions}
              </span>
              <span className="flex items-center gap-1.5">
                <RiTimeLine />
                {test.timeLimit} {t.tests.minutes}
              </span>
              <span
                className={`px-2 py-0.5 rounded border text-xs font-medium ${diffColor}`}>
                {diffLabel}
              </span>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {t.test.enterName}
              </label>
              <input
                type="text"
                className="input"
                placeholder={t.test.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim().length >= 2) {
                    setAnswers(new Array(test.questions.length).fill(null));
                    setTimeLeft(test.timeLimit * 60);
                    setStartTime(new Date());
                    setPhase("taking");
                  }
                }}
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                disabled={name.trim().length < 2}
                onClick={() => {
                  setAnswers(new Array(test.questions.length).fill(null));
                  setTimeLeft(test.timeLimit * 60);
                  setStartTime(new Date());
                  setPhase("taking");
                }}
                className="btn-primary justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed">
                {t.test.start}
              </button>
              <button
                onClick={() => router.push("/tests")}
                className="btn-secondary justify-center py-3">
                {t.test.back}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══ TAKING ═══ */
  if (phase === "taking") {
    const qTr = tr.questions[current];
    const progress = ((current + 1) / test.questions.length) * 100;
    const timerPct = (timeLeft / (test.timeLimit * 60)) * 100;
    const isLow = timeLeft < 60;

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card p-4 mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/tests")}
                className="text-secondary hover:text-primary transition-colors">
                <RiArrowLeftLine className="text-lg" />
              </button>
              <div>
                <div className="font-semibold text-sm line-clamp-1">
                  {tr.title}
                </div>
                <div className="text-secondary text-xs">{subjectLabel}</div>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                isLow ? "border-red-500/30 bg-red-500/10" : "border-border"
              }`}
              style={{ background: isLow ? undefined : "var(--bg-surface)" }}>
              <RiTimeLine
                className={`text-sm ${isLow ? "text-red-500" : "text-secondary"}`}
              />
              <span
                className={`font-bold tabular-nums ${isLow ? "text-red-500" : "text-primary"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs text-secondary mb-2">
              <span>
                {t.test.question} {current + 1} {t.test.of}{" "}
                {test.questions.length}
              </span>
              <span>
                {answers.filter((a) => a !== null).length} {t.test.answered}
              </span>
            </div>
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "var(--accent)" }}
              />
            </div>
            <div
              className="h-0.5 mt-1 rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}>
              <div
                className={`h-full rounded-full transition-all duration-1000 ${isLow ? "bg-red-500" : "bg-emerald-500"}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>

          <div className="card p-6 mb-5">
            <p className="text-xs text-secondary mb-3">
              {t.test.question} {current + 1}
            </p>
            <h2 className="font-semibold text-lg leading-relaxed mb-6">
              {qTr.question}
            </h2>
            <div className="space-y-2.5">
              {qTr.options.map((opt, i) => {
                const selected = answers[current] === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      const next = [...answers];
                      next[current] = i;
                      setAnswers(next);
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm transition-all duration-150"
                    style={{
                      borderColor: selected ? "var(--accent)" : "var(--border)",
                      background: selected
                        ? "rgba(99,102,241,0.08)"
                        : "var(--bg-surface)",
                      color: selected ? "var(--accent)" : "var(--primary)",
                    }}>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: selected
                          ? "var(--accent)"
                          : "var(--border)",
                        color: selected ? "white" : "var(--secondary)",
                      }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="btn-secondary px-4 py-2.5 disabled:opacity-30">
              <RiArrowLeftLine /> {t.test.prev}
            </button>

            <div className="flex-1 flex gap-1 flex-wrap justify-center">
              {test.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-6 h-6 rounded-full text-xs font-medium transition-all"
                  style={{
                    background:
                      i === current
                        ? "var(--accent)"
                        : answers[i] !== null
                          ? "rgba(99,102,241,0.2)"
                          : "var(--border)",
                    color:
                      i === current
                        ? "white"
                        : answers[i] !== null
                          ? "var(--accent)"
                          : "var(--secondary)",
                  }}>
                  {i + 1}
                </button>
              ))}
            </div>

            {current < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrent((p) => p + 1)}
                className="btn-primary px-4 py-2.5">
                {t.test.next} <RiArrowRightLine />
              </button>
            ) : (
              <button
                onClick={() => {
                  const unanswered = answers.filter((a) => a === null).length;
                  if (unanswered > 0) {
                    toast.warning(t.test.unanswered(unanswered), {
                      action: {
                        label: t.test.finish,
                        onClick: () => doSubmit(answers),
                      },
                    });
                  } else {
                    doSubmit(answers);
                  }
                }}
                className="btn-primary px-4 py-2.5"
                style={{ background: "#10b981" }}>
                <RiSendPlaneLine /> {t.test.submit}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══ RESULT ═══ */
  const score = finalAnswers.reduce<number>(
    (acc: number, a: number | null, i: number) =>
      acc + (a === test.questions[i].correctAnswer ? 1 : 0),
    0,
  );
  const total = test.questions.length;
  const pct = calcPercentage(score, total);
  const scoreColor = pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 mb-5 text-center">
          <RiTrophyLine
            className="text-4xl mx-auto mb-3"
            style={{ color: scoreColor }}
          />
          <h2 className="text-2xl font-bold mb-1">
            {pct >= 80
              ? t.test.excellent
              : pct >= 60
                ? t.test.good
                : t.test.retry}
          </h2>
          <p className="text-secondary text-sm mb-6">
            {name} · {tr.title}
          </p>

          <div className="relative w-28 h-28 mx-auto mb-6">
            <svg viewBox="0 0 120 120" className="w-28 h-28 -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="var(--border)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={scoreColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-bold"
                style={{ color: scoreColor }}>
                {pct}%
              </span>
              <span className="text-secondary text-xs">
                {score}/{total}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-6 text-sm">
            <span className="flex items-center gap-1.5">
              <RiCheckLine className="text-emerald-500" />
              <span className="text-primary font-medium">{score}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <RiCloseLine className="text-red-500" />
              <span className="text-primary font-medium">{total - score}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <RiTimeLine className="text-secondary" />
              <span className="text-primary font-medium">{timeSpent}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setPhase("enter-name");
              setCurrent(0);
              setAnswers([]);
              setSubmitted(false);
              setFinalAnswers([]);
            }}
            className="btn-secondary flex-1 justify-center py-3">
            <RiRefreshLine /> {t.test.tryAgain}
          </button>
          <button
            onClick={() => router.push("/tests")}
            className="btn-primary flex-1 justify-center py-3">
            {t.test.anotherTest}
          </button>
        </div>

        <h3 className="font-bold text-lg mb-4">{t.test.review}</h3>
        <div className="space-y-3">
          {test.questions.map((q, i) => {
            const qTr = tr.questions[i];
            const isCorrect = finalAnswers[i] === q.correctAnswer;
            return (
              <div
                key={q.id}
                className="card p-5"
                style={{
                  borderColor: isCorrect
                    ? "rgba(16,185,129,0.3)"
                    : "rgba(239,68,68,0.3)",
                }}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <RiCheckLine className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <RiCloseLine className="text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm font-medium leading-relaxed">
                    {qTr.question}
                  </p>
                </div>
                <div className="space-y-1.5 ml-6">
                  {qTr.options.map((opt, j) => {
                    const isRight = j === q.correctAnswer;
                    const isUserWrong = j === finalAnswers[i] && !isCorrect;
                    return (
                      <div
                        key={j}
                        className="px-3 py-2 rounded-lg text-xs"
                        style={{
                          background: isRight
                            ? "rgba(16,185,129,0.08)"
                            : isUserWrong
                              ? "rgba(239,68,68,0.08)"
                              : "transparent",
                          color: isRight
                            ? "#10b981"
                            : isUserWrong
                              ? "#ef4444"
                              : "var(--secondary)",
                          border: isRight
                            ? "1px solid rgba(16,185,129,0.2)"
                            : isUserWrong
                              ? "1px solid rgba(239,68,68,0.2)"
                              : "1px solid transparent",
                        }}>
                        {String.fromCharCode(65 + j)}. {opt}
                        {isRight && <span className="ml-2 font-medium">✓</span>}
                        {isUserWrong && (
                          <span className="ml-2 font-medium">
                            ✗ {t.test.yourAnswer}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
