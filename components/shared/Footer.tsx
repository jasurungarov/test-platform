import Link from "next/link";
import { RiFlashlightLine, RiGithubLine, RiTwitterLine, RiMailLine } from "react-icons/ri";

const subjects = ["Математика", "Физика", "Химия", "История", "Информатика"];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <RiFlashlightLine className="text-white text-lg" />
              </div>
              <span className="font-bold text-xl text-primary">TestPro</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              Современная платформа онлайн-тестирования для студентов и школьников.
            </p>
            <div className="flex gap-2 mt-4">
              {[RiGithubLine, RiTwitterLine, RiMailLine].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-secondary hover:text-primary hover:border-accent/50 transition-all">
                  <Icon className="text-base" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-primary mb-3">Навигация</h4>
            <div className="flex flex-col gap-2">
              {[["Главная", "/"], ["Тесты", "/tests"], ["О нас", "/about"], ["Контакты", "/contact"]].map(([l, h]) => (
                <Link key={h} href={h} className="text-secondary hover:text-primary text-sm transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-primary mb-3">Предметы</h4>
            <div className="flex flex-col gap-2">
              {subjects.map((s) => (
                <Link key={s} href="/tests" className="text-secondary hover:text-primary text-sm transition-colors">{s}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-secondary text-xs">© 2024 TestPro. Все права защищены.</p>
          <p className="text-secondary text-xs">Разработано с ❤️ для студентов</p>
        </div>
      </div>
    </footer>
  );
}
