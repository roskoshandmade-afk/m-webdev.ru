import {PROCESS_STEPS} from '../data/studioData';
import {PalmShadows} from './PalmShadows';

const STEP_META = ['15 минут · без брифов на 5 страниц', '24 часа · 0 ₽ до старта', '1–3 дня · РФ-хостинг и доступы'] as const;

export function ProcessAndProof() {
  return (
    <section
      id="process"
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <PalmShadows variant="process" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-sm font-semibold text-[#2563EB]">02. Как работаем</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[#0F172A] text-balance">
              Три понятных шага от идеи до первых заявок
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] whitespace-nowrap shrink-0">
            На связи в Telegram, MAX и на Авито
          </p>
        </div>

        {/* Unified 3-Column Architectural Process Rail matching Hero Metrics Bar */}
        <div className="floating-card rounded-2xl border border-[#E2E8F0] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="p-7 sm:p-8 flex flex-col justify-between gap-6 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={`font-heading text-3xl sm:text-4xl font-extrabold tabular-nums tracking-[-0.03em] ${
                      index === 1 ? 'text-[#2563EB]' : 'text-[#0F172A]'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="text-xs font-medium text-[#475569] tabular-nums">
                    {STEP_META[index]}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="h-px w-10 bg-[#E2E8F0]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
