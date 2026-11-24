import {ArrowRight, Check, RotateCcw} from 'lucide-react';
import {
  ADDON_OPTIONS,
  PROJECT_TYPES,
  type AddonId,
  type ProjectTypeId,
} from '../data/studioData';
import {
  calculateEstimate,
  formatDaysRange,
  formatRub,
  type CalculatorState,
} from '../utils/briefFormatter';

interface PriceCalculatorProps {
  state: CalculatorState;
  onSelectProjectType: (id: ProjectTypeId) => void;
  onToggleAddon: (id: AddonId) => void;
  onClearNiche: () => void;
  onReset: () => void;
  onProceedToLead: () => void;
}

export function PriceCalculator({
  state,
  onSelectProjectType,
  onToggleAddon,
  onClearNiche,
  onReset,
  onProceedToLead,
}: PriceCalculatorProps) {
  const estimate = calculateEstimate(state);

  return (
    <section id="calculator" className="py-16 sm:py-24 border-b border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-sm font-medium text-[#F59E0B]">01. Онлайн-калькулятор</p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] text-balance">
              Рассчитайте бюджет и срок запуска за 30 секунд
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Выберите тип проекта и нужные опции — итоговая цена и сроки пересчитаются мгновенно и
              сохранятся в вашей заявке.
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 self-start md:self-auto min-h-[40px] px-3 py-2 text-xs sm:text-sm font-medium text-zinc-400 hover:text-[#FAFAFA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Сбросить выбор</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column: Project types + Add-ons */}
          <div className="lg:col-span-8 space-y-10">
            {/* Step 1: Project Type */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#FAFAFA]">
                  1. Выберите тип проекта
                </h3>
                <span className="text-xs text-zinc-500 whitespace-nowrap">6 форматов под ключ</span>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                role="radiogroup"
                aria-label="Тип проекта"
              >
                {PROJECT_TYPES.map((item) => {
                  const isSelected = state.projectTypeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onSelectProjectType(item.id)}
                      className={`text-left p-5 rounded-xl border transition-colors duration-150 cursor-pointer flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#222227] border-[#F59E0B]'
                          : 'bg-[#1D1D21] border-zinc-800 hover:border-zinc-700 hover:bg-[#212126]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-base font-semibold text-[#FAFAFA]">
                            {item.title}
                          </span>
                          <span
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'bg-[#F59E0B] border-[#F59E0B] text-[#18181B]'
                                : 'border-zinc-700 bg-transparent text-transparent'
                            }`}
                            aria-hidden="true"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{item.shortDesc}</p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-xs sm:text-sm">
                        <span className="font-mono tabular-nums font-semibold text-[#FAFAFA]">
                          {formatRub(item.price)}
                        </span>
                        <span className="text-zinc-400 font-mono tabular-nums">
                          {formatDaysRange(item.minDays, item.maxDays)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-ons */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#FAFAFA]">
                  2. Дополнительные опции
                </h3>
                <span className="text-xs text-zinc-500 whitespace-nowrap">Можно выбрать несколько</span>
              </div>

              <div className="space-y-3" role="group" aria-label="Дополнительные опции">
                {ADDON_OPTIONS.map((addon) => {
                  const isActive = state.addonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isActive}
                      onClick={() => onToggleAddon(addon.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-colors duration-150 cursor-pointer flex items-start justify-between gap-4 ${
                        isActive
                          ? 'bg-[#222227] border-[#F59E0B]'
                          : 'bg-[#1D1D21] border-zinc-800 hover:border-zinc-700 hover:bg-[#212126]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isActive
                              ? 'bg-[#F59E0B] border-[#F59E0B] text-[#18181B]'
                              : 'border-zinc-700 bg-transparent text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <div className="space-y-1">
                          <div className="text-sm sm:text-base font-semibold text-[#FAFAFA]">
                            {addon.title}
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {addon.description}
                          </p>
                          <p className="text-xs text-zinc-500">{addon.note}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 space-y-0.5">
                        <div className="font-mono tabular-nums text-sm sm:text-base font-semibold text-[#FAFAFA] whitespace-nowrap">
                          +{formatRub(addon.price)}
                        </div>
                        <div className="font-mono tabular-nums text-xs text-zinc-500 whitespace-nowrap">
                          {addon.extraDays > 0 ? `+${addon.extraDays} день` : 'В день старта'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column: Live Estimate Receipt */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 rounded-xl border border-zinc-800 bg-[#202025] p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-medium text-zinc-400">Предварительная смета</p>
              <h3 className="text-xl font-bold text-[#FAFAFA]">{estimate.project.title}</h3>
              <p className="text-xs text-zinc-400">{estimate.project.bestFor}</p>
            </div>

            {estimate.niche && (
              <div className="flex items-center justify-between gap-3 py-2.5 border-y border-zinc-800 text-xs">
                <span className="text-zinc-400">
                  Ниша: <strong className="text-zinc-200 font-medium">{estimate.niche.title}</strong>
                </span>
                <button
                  type="button"
                  onClick={onClearNiche}
                  className="text-zinc-500 hover:text-[#F59E0B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Убрать
                </button>
              </div>
            )}

            {/* Deliverables included in selected project type */}
            <div className="space-y-2.5">
              <p className="text-xs font-medium text-zinc-400">Что входит в базовый пакет:</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                {estimate.project.deliverables.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itemized Cost Breakdown */}
            <div className="pt-4 border-t border-zinc-800 space-y-2.5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400">{estimate.project.title}</span>
                <span className="font-mono tabular-nums text-zinc-200 whitespace-nowrap">
                  {formatRub(estimate.project.price)}
                </span>
              </div>

              {estimate.addons.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between gap-4">
                  <span className="text-zinc-400">{addon.title}</span>
                  <span className="font-mono tabular-nums text-zinc-200 whitespace-nowrap">
                    +{formatRub(addon.price)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-zinc-400">Ориентир стоимости</span>
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#F59E0B] whitespace-nowrap">
                  {estimate.formattedCost}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-zinc-400">Срок запуска под ключ</span>
                <span className="font-mono tabular-nums text-base font-semibold text-[#FAFAFA] whitespace-nowrap">
                  {estimate.turnaround}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={onProceedToLead}
                className="w-full min-h-[48px] px-5 py-3 text-sm font-bold text-[#18181B] bg-[#F59E0B] hover:bg-[#FBBF24] active:bg-[#D97706] rounded-lg transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Зафиксировать расчёт и получить прототип</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
              <p className="text-xs text-zinc-500 text-center">
                Оплата поэтапно · Прототип первого экрана бесплатно до предоплаты
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
