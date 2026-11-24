export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#141417] py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <a href="#top" className="text-base font-extrabold tracking-tight text-[#FAFAFA]">
            Таврика Веб
          </a>
          <p className="text-xs sm:text-sm text-zinc-400">
            Разработка сайтов, квизов и Telegram-ботов под ключ · Саки · Симферополь · Севастополь ·
            Ялта
          </p>
        </div>

        <nav aria-label="Навигация в подвале" className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
          <a href="#calculator" className="hover:text-[#FAFAFA] transition-colors whitespace-nowrap">
            Калькулятор
          </a>
          <a href="#demos" className="hover:text-[#FAFAFA] transition-colors whitespace-nowrap">
            Демо-ниши
          </a>
          <a href="#process" className="hover:text-[#FAFAFA] transition-colors whitespace-nowrap">
            Как работаем
          </a>
          <a href="#lead-form" className="hover:text-[#FAFAFA] transition-colors whitespace-nowrap">
            Заявка
          </a>
        </nav>
      </div>
    </footer>
  );
}
