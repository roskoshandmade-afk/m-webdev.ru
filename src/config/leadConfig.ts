/**
 * Настройки приёма заявок для статического хостинга (GitHub Pages).
 *
 * 1. Замените 'YOUR_USERNAME' на ваш логин в Telegram без символа @ (например, 'tavrika_web').
 * 2. При желании укажите URL вашего прокси-вебхука (Cloudflare Worker, Make, n8n и т.п.)
 *    в OPTIONAL_WEBHOOK_URL для тихой фоновой доставки заявок.
 *    Если поле пустое, сайт работает полностью автономно без бэкенда.
 */
export const LEAD_CONFIG = {
  TELEGRAM_USERNAME:
    (import.meta.env.VITE_TELEGRAM_USERNAME as string | undefined)?.trim() || 'YOUR_USERNAME',

  OPTIONAL_WEBHOOK_URL:
    (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined)?.trim() || '',
} as const;

export function getSafeWebhookUrl(): string | null {
  const raw = LEAD_CONFIG.OPTIONAL_WEBHOOK_URL;
  if (!raw) {
    return null;
  }
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}
