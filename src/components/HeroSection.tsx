import {ArrowRight, Calculator} from 'lucide-react';
import {HERO_IMAGE_URL} from '../data/studioData';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  onRequestPrototype: () => void;
  onJumpToCalculator: () => void;
}

const STUDIO_FACTS = [
  {value: '1–3 дня', label: 'Запуск лендинга, квиза или Telegram-бота'},
  {value: '0 ₽', label: 'За прототип первого экрана до старта'},
  {value: 'РФ-сервера', label: 'Стабильная работа в Крыму без VPN'},
  {value: '4 города', label: 'Личные встречи или созвон: Саки, Симферополь, Севастополь, Ялта'},
];

export function HeroSection({onRequestPrototype, onJumpToCalculator}: HeroSectionProps) {
  return (
    <section id="top" className="pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left column: Value proposition & single dominant CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <p className="text-sm font-medium text-zinc-400">
                <span>Веб-разработка в Крыму</span>
                <span aria-hidden="true" className="mx-2 text-zinc-600">
                  ·
                </span>
                <span className="text-zinc-300">Саки · Симферополь · Севастополь · Ялта</span>
              </p>

              <h1 className="text-[clamp(2.15rem,4vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-[#FAFAFA] text-balance">
                Сайты, квизы и Telegram-боты под ключ в Крыму за{' '}
                <span className="text-[#F59E0B] whitespace-nowrap">1–3 дня</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-zinc-300 max-w-xl">
                Делаем быстрые сайты с высокой конверсией для отелей, стройки, автосервисов и
                локального бизнеса. Без шаблонных конструкторов с зарубежными сбоями — заявки
                улетают сразу в ваш Telegram или WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onRequestPrototype}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 text-sm sm:text-base font-bold text-[#18181B] bg-[#F59E0B] hover:bg-[#FBBF24] active:bg-[#D97706] rounded-lg transition-colors duration-150 cursor-pointer"
              >
                <span>Получить бесплатный прототип первого экрана</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onJumpToCalculator}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 text-sm font-semibold text-zinc-200 hover:text-[#F59E0B] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calculator className="w-4 h-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <span>Рассчитать стоимость</span>
              </button>
            </div>
          </div>

          {/* Right column: High-contrast 16:9 Crimean studio visual */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] rounded-xl overflow-hidden border border-zinc-800 bg-[#202025]">
              <ResilientImage
                src={HERO_IMAGE_URL}
                alt="Рабочее пространство веб-разработчика в Крыму с видом на вечернее Чёрное море"
                fallbackTitle="Таврика Веб — Разработка сайтов и Telegram-ботов в Крыму"
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#18181B]/90 via-[#18181B]/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#FAFAFA]">
                    Прототип первого экрана за 24 часа
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                    Сначала видите структуру и оффер под вашу нишу — потом принимаете решение о запуске
                  </p>
                </div>
                <span className="font-mono tabular-nums text-xs font-medium text-[#F59E0B] whitespace-nowrap shrink-0">
                  от 6 000 ₽
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column studio proof strip below hero split */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STUDIO_FACTS.map((fact) => (
            <div key={fact.value} className="space-y-1.5">
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#FAFAFA]">
                {fact.value}
              </div>
              <p className="text-sm text-zinc-400 leading-snug">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
