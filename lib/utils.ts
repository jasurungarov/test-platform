export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function calcPercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function getSubjectEmoji(subject: string): string {
  const map: Record<string, string> = {
    math: "📐", physics: "⚡", chemistry: "🧪", biology: "🧬",
    history: "📜", english: "🇬🇧", cs: "💻", geography: "🌍",
  };
  return map[subject] || "📚";
}

export function getSubjectGradient(subject: string): string {
  const map: Record<string, string> = {
    math: "from-blue-500 to-indigo-500",
    physics: "from-violet-500 to-purple-500",
    chemistry: "from-emerald-500 to-teal-500",
    biology: "from-green-500 to-emerald-600",
    history: "from-amber-500 to-orange-500",
    english: "from-rose-500 to-pink-500",
    cs: "from-cyan-500 to-blue-500",
    geography: "from-sky-500 to-cyan-500",
  };
  return map[subject] || "from-gray-500 to-slate-500";
}
