import {ArrowRight, Calculator} from 'lucide-react';
import developerCrimeaPhoto from '../assets/images/male_developer_crimea_1795595394890.jpg';
import {PalmShadows} from './PalmShadows';

interface HeroSectionProps {
  onRequestPrototype: () => void;
  onJumpToCalculator: () => void;
}

const HERO_METRICS = [
  {value: '1–3 дня', label: 'Запуск под ключ'},
  {value: '0 ₽', label: 'За первый экран до оплаты'},
  {value: 'Без VPN', label: 'Работа в Крыму на РФ-серверах'},
  {value: '100% онлайн', label: 'Работаем по всему Крыму и РФ'},
];

export function HeroSection({onRequestPrototype, onJumpToCalculator}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-transparent pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#E2E8F0]"
    >
      <PalmShadows variant="hero" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Location Pill, Manrope 800 H1, Business Subheadline, Two Clean Pill CTAs */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-xs sm:text-sm font-medium text-[#0F172A]">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9] opacity-65 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0EA5E9]" />
                </span>
                <span>Работаем онлайн по всему Крыму и РФ</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-[2.75rem] lg:text-[3.15rem] font-extrabold text-[#0F172A] leading-[1.08] tracking-[-0.03em] text-balance">
                Разработка сайтов, веб-приложений, <span className="text-[#2563EB]">Telegram-ботов и SEO</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-xl">
                Профессиональная разработка сайтов, лид-квизов, веб-приложений и интеграция Telegram-ботов для бизнеса в Крыму и по всей России. Быстрый запуск без шаблонных конструкторов и лишних поездок — заявки поступают напрямую в Telegram и мессенджер MAX.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onRequestPrototype}
                className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] rounded-full transition-colors duration-150 whitespace-nowrap cursor-pointer shadow-[0_12px_26px_-10px_rgba(37,99,235,0.45)]"
              >
                <span>Получить прототип за 24 ч</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onJumpToCalculator}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#0F172A] bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calculator className="w-4 h-4 shrink-0 text-[#475569]" aria-hidden="true" />
                <span>Рассчитать стоимость</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Editorial Developer Photo Card (No Portfolio Cards on First Screen) */}
          <div className="lg:col-span-6">
            <figure className="bg-white rounded-2xl p-2 border border-[#E2E8F0] shadow-sm">
              <div className="relative overflow-hidden rounded-xl bg-[#F1F5F9]">
                <img
                  src={developerCrimeaPhoto}
                  alt="Веб-разработчик студии M_WEB за работой у панорамного окна с видом на море и горы Крыма"
                  className="w-full aspect-[4/3] object-cover block"
                />
                <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/88 backdrop-blur-md border border-white/70 text-xs font-semibold text-[#0F172A] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] shrink-0" aria-hidden="true" />
                  <span>M_WEB · Онлайн · Крым и РФ</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        {/* Compact 2x2 Mobile / 4-Column Desktop Metrics Bar at Bottom of Hero */}
        <div className="mt-10 sm:mt-16 bg-[#E2E8F0] border border-[#E2E8F0] rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden shadow-sm">
          {HERO_METRICS.map((metric) => (
            <div
              key={metric.value}
              className="bg-white p-3.5 sm:p-5 flex flex-col justify-between gap-1"
            >
              <div className="font-heading text-base sm:text-xl lg:text-2xl font-extrabold text-[#0F172A] tabular-nums tracking-[-0.02em] leading-tight">
                {metric.value}
              </div>
              <p className="text-xs sm:text-sm font-normal text-[#475569] leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
