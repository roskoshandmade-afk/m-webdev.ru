import {useState} from 'react';
import {Menu, X} from 'lucide-react';

interface HeaderProps {
  onRequestPrototype: () => void;
}

const NAV_LINKS = [
  {href: '#calculator', label: 'Калькулятор'},
  {href: '#demos', label: 'Демо-ниши'},
  {href: '#process', label: 'Как работаем'},
  {href: '#lead-form', label: 'Заявка'},
];

export function Header({onRequestPrototype}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileAction = () => {
    setMobileMenuOpen(false);
    onRequestPrototype();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#18181B]/92 backdrop-blur-md border-b border-zinc-800/90">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-base sm:text-lg font-extrabold tracking-tight text-[#FAFAFA] whitespace-nowrap shrink-0 hover:text-[#F59E0B] transition-colors duration-150"
        >
          Таврика Веб
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#FAFAFA] underline-offset-4 hover:underline decoration-[#F59E0B] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestPrototype}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-sm font-semibold text-[#18181B] bg-[#F59E0B] hover:bg-[#FBBF24] active:bg-[#D97706] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Бесплатный прототип
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#18181B] px-4 py-4">
          <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleMobileAction}
              className="mt-2 min-h-[44px] w-full px-4 py-2.5 text-sm font-semibold text-[#18181B] bg-[#F59E0B] hover:bg-[#FBBF24] rounded-lg transition-colors cursor-pointer"
            >
              Бесплатный прототип
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
