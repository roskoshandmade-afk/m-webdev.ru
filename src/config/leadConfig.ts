/**
 * Контакты и каналы приёма заявок M_WEB для статического хостинга (GitHub Pages).
 * Все переменные окружения (VITE_*) строго опциональны: при их отсутствии используются
 * встроенные рабочие значения, а вебхук тихо пропускается без блокировки интерфейса.
 */

export const DEFAULT_TELEGRAM_USERNAME = 'M_Web_production';
export const DEFAULT_MAX_PROFILE_URL =
  'https://max.ru/u/f9LHodD0cOI0Lot98NYptOQhSk7YF0raqppODtBQRVk-kXF2B4txMgE0xl0';

function readOptionalEnv(rawValue: unknown): string {
  return typeof rawValue === 'string' ? rawValue.trim() : '';
}

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

const envTelegram = readOptionalEnv(import.meta.env?.VITE_TELEGRAM_USERNAME).replace(/^@+/, '');
export const TELEGRAM_USERNAME = envTelegram || DEFAULT_TELEGRAM_USERNAME;

export const TELEGRAM_PROFILE_URL = `https://t.me/${encodeURIComponent(TELEGRAM_USERNAME)}`;

const envMaxUrl = readOptionalEnv(import.meta.env?.VITE_MAX_PROFILE_URL);
export const MAX_PROFILE_URL = getSafeHttpsUrl(envMaxUrl) ?? DEFAULT_MAX_PROFILE_URL;

export const OPTIONAL_WEBHOOK_URL = readOptionalEnv(import.meta.env?.VITE_LEAD_WEBHOOK_URL);

export const LEAD_CONFIG = {
  TELEGRAM_USERNAME,
  TELEGRAM_PROFILE_URL,
  MAX_PROFILE_URL,
  OPTIONAL_WEBHOOK_URL,
} as const;

export function getSafeWebhookUrl(): string | null {
  if (!OPTIONAL_WEBHOOK_URL) {
    return null;
  }
  return getSafeHttpsUrl(OPTIONAL_WEBHOOK_URL);
}
