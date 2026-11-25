import {useEffect, useRef, useState, type FormEvent, type RefObject} from 'react';
import {AlertCircle, Check, CheckCircle2, Copy, ExternalLink, Send} from 'lucide-react';
import {
  getSafeHttpsUrl,
  getSafeWebhookUrl,
  MAX_PROFILE_URL,
  TELEGRAM_USERNAME,
} from '../config/leadConfig';
import {CRIMEA_CITIES} from '../data/studioData';
import {
  buildFormattedBrief,
  buildTelegramDirectHref,
  calculateEstimate,
  type CalculatorState,
} from '../utils/briefFormatter';
import {PalmShadows} from './PalmShadows';

interface LeadCaptureSectionProps {
  calcState: CalculatorState;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

type ActionFeedback = {
  title: string;
  detail: string;
} | null;

export function LeadCaptureSection({calcState, nameInputRef}: LeadCaptureSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState<string>(CRIMEA_CITIES[0]);
  const [comment, setComment] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ActionFeedback>(null);
  const [copiedChannel, setCopiedChannel] = useState<'max' | 'brief' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  const estimate = calculateEstimate(calcState);

  const standardBrief = buildFormattedBrief({
    name,
    contact,
    city,
    comment,
    calcState,
  });

  const telegramDirectHref = buildTelegramDirectHref(TELEGRAM_USERNAME, standardBrief);
  const safeMaxHref =
    getSafeHttpsUrl(MAX_PROFILE_URL) ??
    'https://max.ru/u/f9LHodD0cOI0Lot98NYptOQhSk7YF0raqppODtBQRVk-kXF2B4txMgE0xl0';

  const sendSilentWebhook = (actionSource: string) => {
    const webhookUrl = getSafeWebhookUrl();
    if (!webhookUrl) {
      return;
    }

    try {
      const payload = {
        source: actionSource,
        name: name.trim(),
        contact: contact.trim(),
        city,
        serviceTitle: estimate.service.title,
        addons: estimate.addons.map((a) => a.title),
        estimatedCost: estimate.formattedCost,
        turnaround: estimate.turnaround,
        comment: comment.trim(),
        briefText: standardBrief,
        submittedAt: new Date().toISOString(),
      };

      void fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silently ignore network/CORS issues so client-side action always succeeds
      });
    } catch {
      // Never block client-side Telegram/MAX navigation if webhook dispatch fails
    }
  };

  const copyTextRaw = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.className = 'fixed opacity-0 pointer-events-none';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleTelegramClick = () => {
    setFieldError(null);
    sendSilentWebhook('telegram_direct');
    setFeedback({
      title: 'Открываем диалог в Telegram',
      detail:
        'Готовый бриф с выбранными услугами и суммой уже подставлен — нажмите «Отправить» в Telegram.',
    });
  };

  const handleMaxClick = () => {
    setFieldError(null);
    void copyTextRaw(standardBrief).then((copied) => {
      if (copied) {
        setCopiedChannel('max');
        showToast('Бриф скопирован — вставьте его в чат MAX');
        setFeedback({
          title: 'Бриф скопирован — вставьте его в чат MAX',
          detail:
            'Чат в мессенджере MAX открылся в новой вкладке. Нажмите «Вставить» и отправьте сообщение.',
        });
        window.setTimeout(() => {
          setCopiedChannel((curr) => (curr === 'max' ? null : curr));
        }, 3000);
      } else {
        setFieldError('Не удалось автоматически скопировать — скопируйте текст брифа справа.');
      }
    });
    sendSilentWebhook('max_messenger');
  };

  const handleCopyStandardBrief = async () => {
    setFieldError(null);
    const copied = await copyTextRaw(standardBrief);
    if (copied) {
      setCopiedChannel('brief');
      showToast('Полный бриф скопирован в буфер обмена');
      window.setTimeout(() => {
        setCopiedChannel((curr) => (curr === 'brief' ? null : curr));
      }, 2800);
    } else {
      setFieldError('Не удалось автоматически скопировать — выделите текст брифа вручную.');
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldError(null);

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    if (trimmedName.length > 0 && trimmedName.length < 2) {
      setFieldError('Имя должно содержать минимум 2 символа.');
      return;
    }

    if (trimmedContact.length > 0) {
      const digitsOnly = trimmedContact.replace(/\D/g, '');
      const isHandle = /^@?[a-zA-Z0-9_]{4,32}$/.test(trimmedContact);
      if (digitsOnly.length < 10 && !isHandle) {
        setFieldError(
          'Укажите корректный номер телефона (+7 978 ...) или ник в Telegram / MAX (@username).',
        );
        return;
      }
    }

    void handleCopyStandardBrief();
  };

  return (
    <section id="lead-form" className="relative overflow-hidden py-16 sm:py-24 bg-[#F8FAFC]">
      <PalmShadows variant="contact" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2.5 max-w-2xl mb-10 sm:mb-12">
          <p className="text-sm font-semibold text-[#2563EB]">03. Связь и бесплатный прототип</p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[#0F172A] text-balance">
            Обсудить проект и получить прототип за 24 ч
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Выбранные услуги и смета уже подставлены в бриф. Отправьте заявку напрямую в Telegram
            или мессенджер MAX.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Clean Direct Contact & Brief Form */}
          <form
            onSubmit={handleFormSubmit}
            noValidate
            className="lg:col-span-7 floating-card rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6"
          >
            {/* Attached calculation summary strip */}
            <div className="pb-5 border-b border-[#E2E8F0] flex flex-wrap items-baseline justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#475569]">Выбранный расчёт</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F172A]">
                  {estimate.service.title}
                  {estimate.addons.length > 0 && (
                    <span className="text-[#475569] font-normal">
                      {' '}
                      + {estimate.addons.map((a) => a.title).join(', ')}
                    </span>
                  )}
                </p>
              </div>
              <div className="tabular-nums text-right shrink-0">
                <div className="font-heading text-lg font-extrabold text-[#2563EB]">
                  {estimate.formattedCost}
                </div>
                <div className="text-xs text-[#475569]">{estimate.turnaround}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="lead-city" className="block text-sm font-semibold text-[#0F172A]">
                  Город в Крыму
                </label>
                <select
                  id="lead-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:border-[#2563EB] transition-colors"
                >
                  {CRIMEA_CITIES.map((cityOption) => (
                    <option key={cityOption} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="lead-contact" className="block text-sm font-semibold text-[#0F172A]">
                  Телефон или ник в Telegram / MAX
                </label>
                <input
                  ref={nameInputRef}
                  id="lead-contact"
                  type="text"
                  autoComplete="tel"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (fieldError) setFieldError(null);
                  }}
                  placeholder="+7 (978) 000-00-00 или @nik"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="lead-name" className="block text-sm font-semibold text-[#0F172A]">
                  Ваше имя <span className="text-slate-400 font-normal">(необязательно)</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldError) setFieldError(null);
                  }}
                  placeholder="Например, Алексей"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lead-comment" className="block text-sm font-semibold text-[#0F172A]">
                  Коротко о бизнесе <span className="text-slate-400 font-normal">(необязательно)</span>
                </label>
                <input
                  id="lead-comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например, гостевой дом или автосервис"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>
            </div>

            {fieldError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-200 bg-red-50 text-sm text-red-800"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{fieldError}</span>
              </div>
            )}

            {feedback && (
              <div
                role="status"
                className="flex items-start gap-2.5 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-sm text-emerald-900"
              >
                <CheckCircle2
                  className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-950">{feedback.title}</p>
                  <p className="text-emerald-800 leading-relaxed">{feedback.detail}</p>
                </div>
              </div>
            )}

            {/* Strictly 2 Channels: Telegram and MAX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={telegramDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramClick}
                className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap shadow-[0_12px_24px_-8px_rgba(37,99,235,0.45)]"
              >
                <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Отправить в Telegram</span>
              </a>

              <a
                href={safeMaxHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMaxClick}
                className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <span
                  className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-[#0EA5E9]/20 border border-[#0EA5E9]/40 text-[10px] font-bold tracking-wider text-[#38BDF8] leading-none shrink-0"
                  aria-hidden="true"
                >
                  MAX
                </span>
                <span>
                  {copiedChannel === 'max' ? 'Скопировано для MAX' : 'Написать в MAX'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </form>

          {/* Right: Live Brief Preview */}
          <div className="lg:col-span-5 floating-card rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 space-y-5">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Предпросмотр брифа
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Сообщение обновляется автоматически при выборе услуг и заполнении полей.
              </p>
            </div>

            <pre className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] leading-relaxed whitespace-pre-wrap break-words max-h-[240px] overflow-y-auto font-sans">
              {standardBrief}
            </pre>

            <button
              type="button"
              onClick={() => void handleCopyStandardBrief()}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-full border border-[#E2E8F0] hover:border-[#2563EB] bg-white text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedChannel === 'brief' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700">Бриф скопирован</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Скопировать текст брифа</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Green floating toast notification for clipboard copy */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-5 sm:right-5 z-50 sm:max-w-sm rounded-2xl border border-emerald-600/30 bg-emerald-600 text-white px-4 py-3.5 shadow-[0_20px_40px_-12px_rgba(5,150,105,0.45)] flex items-center gap-3 text-sm font-semibold"
        >
          <span
            className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
