import {useState} from 'react';
import {ArrowRight, Check, Plus, RotateCcw} from 'lucide-react';
import {
  ADDON_OPTIONS,
  SERVICE_CATALOG,
  SERVICE_TABS,
  type AddonId,
  type ServiceCategoryId,
  type ServiceOption,
} from '../data/studioData';
import {calculateEstimate, formatRub, type CalculatorState} from '../utils/briefFormatter';
import {PalmShadows} from './PalmShadows';

interface ServicesAndCalculatorProps {
  calcState: CalculatorState;
  onSelectService: (service: ServiceOption) => void;
  onToggleAddon: (addonId: AddonId) => void;
  onReset: () => void;
  onProceedToLead: () => void;
}

export function ServicesAndCalculator({
  calcState,
  onSelectService,
  onToggleAddon,
  onReset,
  onProceedToLead,
}: ServicesAndCalculatorProps) {
  const [activeTab, setActiveTab] = useState<ServiceCategoryId>('sites');

  const estimate = calculateEstimate(calcState);
  const visibleServices = SERVICE_CATALOG.filter((item) => item.category === activeTab);

  const isServiceSelected = (service: ServiceOption): boolean => {
    if (service.kind === 'primary') {
      return calcState.primaryServiceId === service.id;
    }
    return Boolean(service.addonId && calcState.addonIds.includes(service.addonId));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <PalmShadows variant="services" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9 sm:mb-11">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-sm font-semibold text-[#2563EB]">01. Услуги и расчёт</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[#0F172A] text-balance">
              Выберите задачу — стоимость и срок посчитаются сразу
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Прозрачный прайс без скрытых доплат. Отметьте нужную услугу и дополнительные опции,
              чтобы сразу увидеть ориентировочную смету.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] whitespace-nowrap shrink-0 tabular-nums">
            20 услуг · фиксируем смету до старта
          </p>
        </div>

        {/* 4 Clean Category Tabs in a Unified Architectural Control Rail */}
        <div
          role="tablist"
          aria-label="Категории услуг"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_8px_24px_-16px_rgba(15,23,42,0.08)] mb-8"
        >
          {SERVICE_TABS.map((tab) => {
            const active = activeTab === tab.id;
            const count = SERVICE_CATALOG.filter((item) => item.category === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-2 ${
                  active
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs font-medium tabular-nums ${
                    active ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Layout: Crisp White Service Cards + Elevated Sticky Estimate Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Concise Service Cards + Quick Add-ons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visibleServices.map((service) => {
                const selected = isServiceSelected(service);
                return (
                  <div
                    key={service.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between gap-5 transition-[transform,border-color,box-shadow,background-color] duration-150 ${
                      selected
                        ? 'bg-white border-[#2563EB] ring-1 ring-[#2563EB]/20 shadow-[0_16px_32px_-20px_rgba(37,99,235,0.28)]'
                        : 'floating-card border-[#E2E8F0] hover:border-[#CBD5E1] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="text-xs font-medium text-[#475569] flex items-center gap-1.5 tabular-nums">
                        <span>{service.turnaround}</span>
                        {service.kind === 'addon' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#0EA5E9] font-semibold">Доп. опция</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                        {service.title}
                      </h3>

                      <div className="font-heading text-xl font-extrabold text-[#0F172A] tabular-nums tracking-[-0.02em]">
                        {service.priceLabel}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      aria-pressed={selected}
                      className={`w-full min-h-[42px] px-4 py-2 rounded-full text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        selected
                          ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                          : 'bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:bg-white hover:border-[#2563EB] hover:text-[#2563EB]'
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Выбрано</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Выбрать</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Compact Quick Add-ons Panel */}
            <div className="floating-card rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 space-y-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  Дополнительные опции к проекту
                </h3>
                <span className="text-xs text-[#475569] shrink-0">Подключаются по желанию</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {ADDON_OPTIONS.map((addon) => {
                  const active = calcState.addonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => onToggleAddon(addon.id)}
                      aria-pressed={active}
                      className={`min-h-[40px] px-3.5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] font-semibold'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-white hover:border-[#CBD5E1] hover:text-[#0F172A]'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          active
                            ? 'bg-[#2563EB] text-white'
                            : 'border border-[#CBD5E1] bg-white'
                        }`}
                        aria-hidden="true"
                      >
                        {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>{addon.title}</span>
                      <span className="tabular-nums opacity-80">+{formatRub(addon.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Sticky Architectural Estimate Sheet */}
          <aside
            id="calculator"
            aria-label="Калькулятор стоимости"
            className="lg:col-span-5 lg:sticky lg:top-24 floating-card rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 space-y-6 scroll-mt-24"
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#2563EB]">Предварительная смета</p>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
                  Расчёт вашего проекта
                </h3>
              </div>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0F172A] px-2.5 py-1.5 rounded-full hover:bg-[#F8FAFC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Сбросить</span>
              </button>
            </div>

            {/* Clean Hairline-Separated Breakdown (No Nested Cards-Within-Cards) */}
            <div className="divide-y divide-[#E2E8F0]">
              <div className="pb-4 flex items-baseline justify-between gap-4">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs text-[#475569]">Основная услуга</p>
                  <p className="text-sm sm:text-base font-bold text-[#0F172A] truncate">
                    {estimate.service.title}
                  </p>
                </div>
                <span className="font-heading text-sm sm:text-base font-extrabold text-[#0F172A] tabular-nums shrink-0">
                  {formatRub(estimate.service.price)}
                </span>
              </div>

              {estimate.addons.length > 0 ? (
                <div className="py-4 space-y-2.5">
                  <p className="text-xs text-[#475569]">Дополнительные опции</p>
                  <ul className="space-y-2">
                    {estimate.addons.map((addon) => (
                      <li
                        key={addon.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-[#0F172A] font-medium truncate">{addon.title}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-semibold text-[#0F172A] tabular-nums">
                            +{formatRub(addon.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onToggleAddon(addon.id)}
                            aria-label={`Убрать опцию ${addon.title}`}
                            className="w-6 h-6 inline-flex items-center justify-center rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="py-4">
                  <p className="text-xs text-[#475569]">
                    Дополнительные опции не выбраны — можно добавить слева при необходимости.
                  </p>
                </div>
              )}

              {/* Total Cost & Turnaround */}
              <div className="pt-5 space-y-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#475569]">Итого ориентировочно</p>
                    <div className="font-heading text-3xl sm:text-[2.1rem] font-extrabold text-[#2563EB] tabular-nums leading-tight tracking-[-0.02em]">
                      {estimate.formattedCost}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-[#475569]">Срок запуска</p>
                    <p className="text-sm sm:text-base font-bold text-[#0F172A] tabular-nums">
                      {estimate.turnaround}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onProceedToLead}
                  className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-[0_12px_24px_-8px_rgba(37,99,235,0.45)]"
                >
                  <span>Получить прототип по смете</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <p className="text-xs text-[#475569] text-center leading-relaxed">
                  Первый экран сайта делаем бесплатно за 24 часа — оплата только после согласования.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
