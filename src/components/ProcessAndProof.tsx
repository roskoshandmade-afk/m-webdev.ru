import {CRIMEA_CASES, PROCESS_STEPS} from '../data/studioData';

export function ProcessAndProof() {
  return (
    <section id="process" className="py-16 sm:py-24 border-b border-zinc-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Process steps */}
        <div>
          <div className="space-y-2.5 max-w-2xl mb-10">
            <p className="text-sm font-medium text-[#F59E0B]">03. Как устроен запуск за 1–3 дня</p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] text-balance">
              Прозрачный процесс без недель согласований
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-6 border-t border-zinc-800">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono tabular-nums text-sm font-semibold text-[#F59E0B]">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-[#FAFAFA]">{step.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed pl-9">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Adjacent proof from Crimean businesses */}
        <div className="space-y-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-medium text-zinc-400">Результаты клиентов в Крыму</p>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] tracking-tight">
              Конкретные цифры запусков по Сакам, Севастополю и Симферополю
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CRIMEA_CASES.map((item) => (
              <figure
                key={item.author}
                className="rounded-xl border border-zinc-800 bg-[#202025] p-6 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="font-mono tabular-nums text-lg font-bold text-[#F59E0B]">
                    {item.metric}
                  </div>
                  <p className="text-xs font-medium text-zinc-400">{item.context}</p>
                  <blockquote className="text-sm text-zinc-200 leading-relaxed pt-1">
                    «{item.quote}»
                  </blockquote>
                </div>
                <figcaption className="pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                  {item.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
