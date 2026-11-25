import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {LimurLogo} from './LimurLogo';

interface HeaderProps {
  onRequestPrototype: () => void;
}

const NAV_LINKS = [
  {href: '#services', label: 'Услуги'},
  {href: '#calculator', label: 'Калькулятор'},
  {href: '#process', label: 'Как работаем'},
];

export function Header({onRequestPrototype}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileAction = () => {
    setMobileMenuOpen(false);
    onRequestPrototype();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-8">
        {/* Zone 1: True-to-brand native HTML/CSS LI.MUR WEB logo */}
        <a
          href="#top"
          aria-label="LI.MUR WEB — веб-дизайн и разработка"
          className="inline-flex items-center shrink-0 py-0.5 transition-opacity duration-150 hover:opacity-85"
        >
          <LimurLogo surfaceClass="bg-[#F8FAFC]" />
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#0F172A] underline-offset-4 hover:underline decoration-[#2563EB] decoration-2 transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cobalt blue pill CTA + mobile hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestPrototype}
            className="hidden sm:inline-flex items-center justify-center min-h-[42px] px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_8px_20px_-8px_rgba(37,99,235,0.45)]"
          >
            Бесплатный прототип
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#2563EB] transition-colors duration-150 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4">
          <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-xl text-base font-medium text-[#0F172A] hover:bg-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleMobileAction}
              className="mt-2 min-h-[44px] w-full px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full transition-colors cursor-pointer"
            >
              Бесплатный прототип
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
