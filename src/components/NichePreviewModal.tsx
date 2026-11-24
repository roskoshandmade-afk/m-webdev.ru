import {useEffect, useState} from 'react';
import {ArrowRight, Check, Monitor, Phone, Smartphone, X} from 'lucide-react';
import type {NicheDemoCard} from '../data/studioData';
import {ResilientImage} from './ResilientImage';

interface NichePreviewModalProps {
  demo: NicheDemoCard | null;
  onClose: () => void;
  onUseTemplate: (demo: NicheDemoCard) => void;
}

export function NichePreviewModal({demo, onClose, onUseTemplate}: NichePreviewModalProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [mockCtaClicked, setMockCtaClicked] = useState(false);

  useEffect(() => {
    if (!demo) {
      return;
    }
    setViewportMode('desktop');
    setSelectedOptionId(demo.preview.interactiveOptions[0]?.id ?? '');
    setMockCtaClicked(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [demo, onClose]);

  if (!demo) {
    return null;
  }

  const activeOption =
    demo.preview.interactiveOptions.find((opt) => opt.id === selectedOptionId) ??
    demo.preview.interactiveOptions[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="niche-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] rounded-xl border border-zinc-800 bg-[#18181B] flex flex-col overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4 bg-[#202025]">
          <div className="min-w-0">
            <p className="text-xs text-zinc-400">
              <span>Интерактивное превью ниши</span>
              <span aria-hidden="true" className="mx-2 text-zinc-600">
                ·
              </span>
              <span className="font-mono tabular-nums text-zinc-300">
                {demo.launchTime} · {demo.priceHint}
              </span>
            </p>
            <h3 id="niche-modal-title" className="text-base sm:text-lg font-bold text-[#FAFAFA] truncate">
              {demo.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop / Mobile preview switch */}
            <div
              className="hidden sm:flex items-center p-1 rounded-lg bg-[#18181B] border border-zinc-800"
              role="group"
              aria-label="Режим просмотра макета"
            >
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-zinc-800 text-[#FAFAFA]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
                <span>ПК</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-zinc-800 text-[#FAFAFA]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Телефон</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть превью"
              className="w-10 h-10 rounded-lg border border-zinc-800 bg-[#18181B] text-zinc-300 hover:text-white hover:border-zinc-700 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Simulated live miniature site preview */}
          <div className="flex justify-center">
            <div
              className={`w-full rounded-xl border border-zinc-800 bg-[#131316] overflow-hidden transition-all duration-200 ${
                viewportMode === 'mobile' ? 'max-w-[390px]' : 'max-w-full'
              }`}
            >
              {/* Simulated miniature site top bar */}
              <div className="px-4 sm:px-5 py-3 border-b border-zinc-800/90 bg-[#1A1A1F] flex items-center justify-between gap-4 text-xs">
                <span className="font-bold text-[#FAFAFA] truncate">{demo.preview.brandName}</span>
                <span className="inline-flex items-center gap-1.5 font-mono tabular-nums text-zinc-300 whitespace-nowrap shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                  <span>{demo.preview.phoneDisplay}</span>
                </span>
              </div>

              {/* Simulated miniature hero */}
              <div
                className={`grid gap-0 ${
                  viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
                }`}
              >
                <div
                  className={`${
                    viewportMode === 'mobile' ? '' : 'lg:col-span-7'
                  } p-5 sm:p-6 flex flex-col justify-between gap-5`}
                >
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-[#F59E0B]">{demo.preview.cityTag}</p>
                    <h4 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] leading-snug text-balance">
                      {demo.preview.heroTitle}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {demo.preview.heroSubtitle}
                    </p>
                  </div>

                  {/* Interactive widget inside preview */}
                  <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                    <p className="text-xs font-medium text-zinc-400">
                      {demo.preview.interactiveLabel}:
                    </p>
                    <div className="space-y-2">
                      {demo.preview.interactiveOptions.map((option) => {
                        const active = option.id === activeOption?.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              setSelectedOptionId(option.id);
                              setMockCtaClicked(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                              active
                                ? 'bg-[#222227] border-[#F59E0B] text-[#FAFAFA]'
                                : 'bg-[#18181B] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            <span className="font-medium">{option.label}</span>
                            <span className="font-mono tabular-nums font-semibold text-[#F59E0B] whitespace-nowrap shrink-0">
                              {option.estimate}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {activeOption && (
                      <p className="text-xs text-zinc-400">{activeOption.detail}</p>
                    )}

                    <div className="pt-1 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setMockCtaClicked(true)}
                        className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-bold text-[#18181B] bg-[#F59E0B] hover:bg-[#FBBF24] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {demo.preview.primaryCta}
                      </button>
                      {mockCtaClicked && (
                        <span className="text-xs text-zinc-300">
                          В боевом сайте заявка с выбранным вариантом сразу уходит в ваш Telegram.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    viewportMode === 'mobile' ? 'aspect-[4/3]' : 'lg:col-span-5 min-h-[260px]'
                  } relative bg-[#18181B] border-t lg:border-t-0 lg:border-l border-zinc-800`}
                >
                  <ResilientImage
                    src={demo.imageUrl}
                    alt={demo.imageAlt}
                    fallbackTitle={demo.preview.brandName}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#131316]/90 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-4 inset-x-4 grid grid-cols-3 gap-2 pt-3 border-t border-white/15">
                    {demo.preview.highlights.map((item) => (
                      <div key={item.label}>
                        <div className="font-mono tabular-nums text-sm font-bold text-[#FAFAFA]">
                          {item.value}
                        </div>
                        <div className="text-[11px] text-zinc-300 leading-tight mt-0.5">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's included in this niche package */}
          <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#FAFAFA]">
                Что входит в реализацию под вашу компанию:
              </h4>
              <ul className="space-y-2 text-sm text-zinc-300">
                {demo.preview.includedBlocks.map((block) => (
                  <li key={block} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{block}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#202025] p-5 flex flex-col justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs text-zinc-400">Результат по рынку Крыма</p>
                <p className="text-base font-semibold text-[#FAFAFA]">{demo.conversionMetric}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Адаптируем тексты, фотографии, прайс и форму заявок именно под ваш объект или
                  услугу. Прототип первого экрана сделаем бесплатно за 24 часа.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onUseTemplate(demo)}
                className="w-full min-h-[46px] px-4 py-2.5 text-sm font-bold text-[#18181B] bg-[#F59E0B] hover:bg-[#FBBF24] rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Хочу такой же — подставить в калькулятор</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
