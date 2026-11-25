/**
 * Контакты и каналы приёма заявок LI.MUR WEB для статического хостинга (GitHub Pages).
 * Замените значения ниже на ваши реальные ссылки перед публикацией.
 */
export const TELEGRAM_USERNAME =
  (import.meta.env.VITE_TELEGRAM_USERNAME as string | undefined)?.trim() || 'YOUR_TELEGRAM';

export const MAX_PROFILE_URL =
  (import.meta.env.VITE_MAX_PROFILE_URL as string | undefined)?.trim() || 'https://max.ru/';

export const AVITO_PROFILE_URL =
  (import.meta.env.VITE_AVITO_PROFILE_URL as string | undefined)?.trim() ||
  'https://www.avito.ru/brands/YOUR_AVITO_ID';

export const OPTIONAL_WEBHOOK_URL =
  (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined)?.trim() || '';

export const LEAD_CONFIG = {
  TELEGRAM_USERNAME,
  MAX_PROFILE_URL,
  AVITO_PROFILE_URL,
  OPTIONAL_WEBHOOK_URL,
} as const;

export function getSafeHttpsUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export function getSafeWebhookUrl(): string | null {
  return getSafeHttpsUrl(OPTIONAL_WEBHOOK_URL);
}
