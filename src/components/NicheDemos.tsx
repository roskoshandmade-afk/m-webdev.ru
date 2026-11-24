import {ArrowUpRight, Eye} from 'lucide-react';
import {NICHE_DEMOS, type NicheDemoCard} from '../data/studioData';
import {ResilientImage} from './ResilientImage';

interface NicheDemosProps {
  selectedNicheId: string | null;
  onOpenPreview: (demo: NicheDemoCard) => void;
  onApplyDemoToCalculator: (demo: NicheDemoCard) => void;
}

export function NicheDemos({
  selectedNicheId,
  onOpenPreview,
  onApplyDemoToCalculator,
}: NicheDemosProps) {
  return (
    <section id="demos" className="py-16 sm:py-24 border-b border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2.5 max-w-2xl mb-10 sm:mb-12">
          <p className="text-sm font-medium text-[#F59E0B]">02. Готовые нишевые демо</p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] text-balance">
            Проверенные структуры под ключевые ниши Крыма
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Откройте превью любой ниши, чтобы посмотреть структуру первого экрана, интерактивный
            расчёт и состав блоков. Любое демо адаптируем под ваш бренд за 1–3 дня.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {NICHE_DEMOS.map((demo) => {
            const isApplied = selectedNicheId === demo.id;
            return (
              <article
                key={demo.id}
                className={`group rounded-xl border overflow-hidden bg-[#202025] flex flex-col justify-between transition-colors duration-150 ${
                  isApplied ? 'border-[#F59E0B]' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  {/* 4:3 visual preview trigger */}
                  <button
                    type="button"
                    onClick={() => onOpenPreview(demo)}
                    className="relative block w-full aspect-[4/3] overflow-hidden bg-[#161619] text-left cursor-pointer"
                    aria-label={`Открыть интерактивное превью: ${demo.title}`}
                  >
                    <ResilientImage
                      src={demo.imageUrl}
                      alt={demo.imageAlt}
                      fallbackTitle={demo.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#18181B]/85 via-[#18181B]/20 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                      <span className="text-xs font-medium text-zinc-200">{demo.cities}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B] bg-[#18181B]/85 border border-zinc-700/80 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
                        <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Открыть превью</span>
                      </span>
                    </div>
                  </button>

                  {/* Card body — zero pill sandwiches, clean unboxed metadata */}
                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono tabular-nums">
                      <span>Запуск: {demo.launchTime}</span>
                      <span aria-hidden="true" className="text-zinc-600">
                        ·
                      </span>
                      <span className="text-zinc-300">{demo.priceHint}</span>
                      {isApplied && (
                        <>
                          <span aria-hidden="true" className="text-zinc-600">
                            ·
                          </span>
                          <span className="text-[#F59E0B] font-sans font-medium">
                            Выбрано в расчёте
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#FAFAFA] tracking-tight">
                      {demo.title}
                    </h3>

                    <p className="text-sm text-zinc-300 leading-relaxed">{demo.summary}</p>

                    <p className="text-xs sm:text-sm text-zinc-400 pt-1">
                      Ориентир по рынку: <span className="text-zinc-200">{demo.conversionMetric}</span>
                    </p>
                  </div>
                </div>

                {/* Card actions */}
                <div className="px-6 pb-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenPreview(demo)}
                    className="min-h-[42px] px-4 py-2 rounded-lg border border-zinc-700 hover:border-[#F59E0B] text-sm font-semibold text-[#FAFAFA] hover:text-[#F59E0B] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Смотреть демо</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onApplyDemoToCalculator(demo)}
                    className="min-h-[42px] px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-[#F59E0B] transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Взять в расчёт</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
