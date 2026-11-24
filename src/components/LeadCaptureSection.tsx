import {useState, type FormEvent, type RefObject} from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Send,
} from 'lucide-react';
import {getSafeWebhookUrl, LEAD_CONFIG} from '../config/leadConfig';
import {CRIMEA_CITIES} from '../data/studioData';
import {
  buildFormattedBrief,
  buildTelegramDirectHref,
  buildWhatsAppHref,
  calculateEstimate,
  type CalculatorState,
} from '../utils/briefFormatter';

interface LeadCaptureSectionProps {
  calcState: CalculatorState;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

const REPLY_CHANNELS = ['Telegram', 'WhatsApp', 'Звонок', 'Чат Авито'] as const;

type ActionFeedback = {
  type: 'success' | 'info';
  title: string;
  detail: string;
} | null;

export function LeadCaptureSection({calcState, nameInputRef}: LeadCaptureSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState<string>(CRIMEA_CITIES[0]);
  const [channel, setChannel] = useState<string>(REPLY_CHANNELS[0]);
  const [comment, setComment] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ActionFeedback>(null);
  const [copiedMode, setCopiedMode] = useState<'avito' | 'standard' | null>(null);

  const estimate = calculateEstimate(calcState);

  const standardBrief = buildFormattedBrief({
    name,
    contact,
    city,
    channel,
    comment,
    calcState,
    forAvito: false,
  });

  const avitoBrief = buildFormattedBrief({
    name,
    contact,
    city,
    channel,
    comment,
    calcState,
    forAvito: true,
  });

  const telegramDirectHref = buildTelegramDirectHref(
    LEAD_CONFIG.TELEGRAM_USERNAME,
    standardBrief,
  );
  const whatsAppHref = buildWhatsAppHref(standardBrief);

  const sendSilentWebhook = (actionSource: string) => {
    const webhookUrl = getSafeWebhookUrl();
    if (!webhookUrl) {
      return;
    }

    const payload = {
      source: actionSource,
      name: name.trim(),
      contact: contact.trim(),
      city,
      channel,
      projectType: estimate.project.title,
      addons: estimate.addons.map((a) => a.title),
      estimatedCost: estimate.formattedCost,
      turnaround: estimate.turnaround,
      nicheReference: estimate.niche ? estimate.niche.title : '',
      comment: comment.trim(),
      briefText: standardBrief,
      submittedAt: new Date().toISOString(),
    };

    // Silent background delivery for static hosting proxy webhooks (never blocks user flow)
    void fetch(webhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silently ignore network/CORS issues so primary client-side action always succeeds
    });
  };

  const copyToClipboard = async (text: string, mode: 'avito' | 'standard') => {
    setFieldError(null);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedMode(mode);
      sendSilentWebhook(mode === 'avito' ? 'copy_avito' : 'copy_standard');
      setFeedback({
        type: 'success',
        title: mode === 'avito' ? 'Бриф скопирован для Авито' : 'Бриф скопирован в буфер обмена',
        detail:
          mode === 'avito'
            ? 'Вставьте текст в чат Авито — он уже очищен от ссылок и номеров, чтобы пройти модерацию.'
            : 'Теперь вставьте готовый бриф в Telegram или WhatsApp и отправьте нам.',
      });
      window.setTimeout(() => {
        setCopiedMode((current) => (current === mode ? null : current));
      }, 2800);
    } catch {
      setFieldError('Не удалось автоматически скопировать — выделите текст брифа справа вручную.');
    }
  };

  const handleTelegramClick = () => {
    setFieldError(null);
    sendSilentWebhook('telegram_direct');
    setFeedback({
      type: 'success',
      title: 'Открываем диалог в Telegram',
      detail:
        'Текст заявки с расчётом уже подставлен в поле сообщения — осталось нажать «Отправить» в Telegram.',
    });
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
      const isTelegramHandle = /^@?[a-zA-Z0-9_]{4,32}$/.test(trimmedContact);
      if (digitsOnly.length < 10 && !isTelegramHandle) {
        setFieldError('Укажите корректный номер телефона (+7 978 ...) или ник в Telegram (@username).');
        return;
      }
    }

    void copyToClipboard(channel === 'Чат Авито' ? avitoBrief : standardBrief, channel === 'Чат Авито' ? 'avito' : 'standard');
  };

  return (
    <section id="lead-form" className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2.5 max-w-2xl mb-10 sm:mb-12">
          <p className="text-sm font-medium text-[#F59E0B]">04. Заявка на прототип</p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] text-balance">
            Получите бесплатный прототип первого экрана за 24 часа
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Все выбранные параметры из калькулятора уже подставлены в бриф. Отправьте заявку в один
            клик в Telegram или скопируйте готовый текст для чата Авито.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Client-Side Lead Form */}
          <form
            onSubmit={handleFormSubmit}
            noValidate
            className="lg:col-span-7 rounded-xl border border-zinc-800 bg-[#202025] p-6 sm:p-8 space-y-6"
          >
            {/* Attached calculation summary strip */}
            <div className="pb-5 border-b border-zinc-800 flex flex-wrap items-baseline justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs text-zinc-400">Прикреплённый расчёт</p>
                <p className="text-sm sm:text-base font-semibold text-[#FAFAFA]">
                  {estimate.project.title}
                  {estimate.addons.length > 0 && (
                    <span className="text-zinc-400 font-normal">
                      {' '}
                      + {estimate.addons.map((a) => a.title).join(', ')}
                    </span>
                  )}
                </p>
                {estimate.niche && (
                  <p className="text-xs text-[#F59E0B]">Ориентир по нише: {estimate.niche.title}</p>
                )}
              </div>
              <div className="font-mono tabular-nums text-right shrink-0">
                <div className="text-lg font-bold text-[#F59E0B]">{estimate.formattedCost}</div>
                <div className="text-xs text-zinc-400">{estimate.turnaround}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="lead-name" className="block text-sm font-medium text-zinc-200">
                  Ваше имя
                </label>
                <input
                  ref={nameInputRef}
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldError) setFieldError(null);
                  }}
                  placeholder="Например, Алексей"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#18181B] border border-zinc-700 text-sm text-[#FAFAFA] placeholder:text-zinc-500 focus:border-[#F59E0B] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lead-contact" className="block text-sm font-medium text-zinc-200">
                  Телефон или Telegram
                </label>
                <input
                  id="lead-contact"
                  type="text"
                  autoComplete="tel"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (fieldError) setFieldError(null);
                  }}
                  placeholder="+7 (978) 000-00-00 или @nik"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#18181B] border border-zinc-700 text-sm text-[#FAFAFA] placeholder:text-zinc-500 focus:border-[#F59E0B] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="lead-city" className="block text-sm font-medium text-zinc-200">
                  Город в Крыму
                </label>
                <select
                  id="lead-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#18181B] border border-zinc-700 text-sm text-[#FAFAFA] focus:border-[#F59E0B] transition-colors"
                >
                  {CRIMEA_CITIES.map((cityOption) => (
                    <option key={cityOption} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-medium text-zinc-200">Куда прислать прототип</span>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Канал связи">
                  {REPLY_CHANNELS.map((item) => {
                    const active = channel === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setChannel(item)}
                        className={`min-h-[44px] px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-[#2A261A] border-[#F59E0B] text-[#FAFAFA]'
                            : 'bg-[#18181B] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="lead-comment" className="block text-sm font-medium text-zinc-200">
                Коротко о задаче <span className="text-zinc-500 font-normal">(необязательно)</span>
              </label>
              <textarea
                id="lead-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Расскажите о вашей нише, нужен ли приём оплат, есть ли текущий сайт или объявление на Авито..."
                className="w-full px-4 py-3 rounded-lg bg-[#18181B] border border-zinc-700 text-sm text-[#FAFAFA] placeholder:text-zinc-500 focus:border-[#F59E0B] transition-colors resize-y"
              />
            </div>

            {/* Validation or confirmation messages (icon + text, never color alone) */}
            {fieldError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3.5 rounded-lg border border-red-500/40 bg-red-500/10 text-sm text-red-200"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{fieldError}</span>
              </div>
            )}

            {feedback && (
              <div
                role="status"
                className="flex items-start gap-2.5 p-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-sm text-emerald-100"
              >
                <CheckCircle2
                  className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-semibold text-emerald-200">{feedback.title}</p>
                  <p className="text-emerald-100/90 leading-relaxed">{feedback.detail}</p>
                </div>
              </div>
            )}

            {/* Primary Client-Side Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={telegramDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramClick}
                className="w-full min-h-[50px] px-5 py-3.5 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] active:bg-[#D97706] text-[#18181B] font-bold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Отправить в Telegram</span>
              </a>

              <button
                type="button"
                onClick={() => void copyToClipboard(avitoBrief, 'avito')}
                className="w-full min-h-[50px] px-5 py-3.5 rounded-lg border border-zinc-700 hover:border-[#F59E0B] bg-[#18181B] text-[#FAFAFA] hover:text-[#F59E0B] font-semibold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                {copiedMode === 'avito' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span className="text-emerald-300">Скопировано для Авито</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Скопировать для Авито</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right: Live Formatted Brief + Additional Copy / WhatsApp Link */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-[#202025] p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#FAFAFA]">
                Предпросмотр готового брифа
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Сообщение обновляется автоматически при изменении полей формы и калькулятора.
              </p>
            </div>

            <pre className="p-4 rounded-lg bg-[#141417] border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap break-words max-h-[260px] overflow-y-auto">
              {standardBrief}
            </pre>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => void copyToClipboard(standardBrief, 'standard')}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-[#F59E0B] bg-[#18181B] text-sm font-semibold text-[#FAFAFA] hover:text-[#F59E0B] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedMode === 'standard' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span className="text-emerald-300">Полный бриф скопирован</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Скопировать полный бриф</span>
                  </>
                )}
              </button>

              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendSilentWebhook('whatsapp_direct')}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-zinc-800 hover:border-[#F59E0B] bg-[#18181B] text-sm font-medium text-zinc-200 hover:text-[#F59E0B] transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Отправить в WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed pt-2 border-t border-zinc-800">
              Кнопка «Скопировать для Авито» автоматически убирает внешние ссылки и контакты, чтобы
              сообщение прошло модерацию чата Авито.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
