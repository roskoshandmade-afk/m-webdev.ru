import {
  getSafeHttpsUrl,
  MAX_PROFILE_URL,
  TELEGRAM_PROFILE_URL,
} from '../config/leadConfig';
import {trackMaxClick, trackTelegramClick} from '../utils/metrica';
import {MWebLogo} from './MWebLogo';

export function Footer() {
  const safeMaxHref =
    getSafeHttpsUrl(MAX_PROFILE_URL) ??
    'https://max.ru/u/f9LHodD0cOI0Lot98NYptOQhSk7YF0raqppODtBQRVk-kXF2B4txMgE0xl0';

  return (
    <footer className="relative overflow-hidden border-t border-[#E2E8F0] bg-white py-12 sm:py-14">
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
          <a
            href="#top"
            aria-label="M_WEB — на главную"
            className="inline-flex items-center self-start transition-opacity duration-150 hover:opacity-85 shrink-0"
          >
            <MWebLogo />
          </a>

          <div className="space-y-1.5">
            <p className="text-sm font-bold text-[#0F172A] font-heading">
              Веб-дизайн и разработка под ключ в Крыму
            </p>
            <p className="text-xs sm:text-sm text-[#475569] max-w-md leading-relaxed">
              Работаем 100% онлайн по всему Крыму и РФ ·{' '}
              <a
                href={TELEGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackTelegramClick()}
                className="font-medium text-[#0F172A] hover:text-[#2563EB] underline-offset-4 hover:underline transition-colors"
              >
                Telegram
              </a>{' '}
              и{' '}
              <a
                href={safeMaxHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMaxClick()}
                className="font-medium text-[#0F172A] hover:text-[#2563EB] underline-offset-4 hover:underline transition-colors"
              >
                MAX
              </a>
            </p>
          </div>
        </div>

        <nav
          aria-label="Навигация в подвале"
          className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#475569]"
        >
          <a
            href="#services"
            className="hover:text-[#0F172A] underline-offset-4 hover:underline decoration-[#2563EB] decoration-2 transition-colors whitespace-nowrap shrink-0"
          >
            Услуги
          </a>
          <a
            href="#calculator"
            className="hover:text-[#0F172A] underline-offset-4 hover:underline decoration-[#2563EB] decoration-2 transition-colors whitespace-nowrap shrink-0"
          >
            Калькулятор
          </a>
          <a
            href="#process"
            className="hover:text-[#0F172A] underline-offset-4 hover:underline decoration-[#2563EB] decoration-2 transition-colors whitespace-nowrap shrink-0"
          >
            Как работаем
          </a>
        </nav>
      </div>
    </footer>
  );
}
