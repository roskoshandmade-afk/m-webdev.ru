import {
  ADDON_OPTIONS,
  SERVICE_CATALOG,
  type AddonId,
  type ServiceOption,
} from '../data/studioData';

export const CALCULATOR_STORAGE_KEY = 'm_web_calculator_v1';

export interface CalculatorState {
  primaryServiceId: string;
  addonIds: AddonId[];
}

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  primaryServiceId: 'srv-landing',
  addonIds: ['domain-hosting-rf'],
};

const PRIMARY_SERVICES = SERVICE_CATALOG.filter((item) => item.kind === 'primary');

export function loadCalculatorState(): CalculatorState {
  if (typeof window === 'undefined') {
    return DEFAULT_CALCULATOR_STATE;
  }
  try {
    const raw = window.localStorage.getItem(CALCULATOR_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_CALCULATOR_STATE;
    }
    const parsed = JSON.parse(raw) as Partial<CalculatorState>;
    const validPrimaryIds = new Set(PRIMARY_SERVICES.map((s) => s.id));
    const validAddonIds = new Set(ADDON_OPTIONS.map((a) => a.id));

    const primaryServiceId =
      parsed.primaryServiceId && validPrimaryIds.has(parsed.primaryServiceId)
        ? parsed.primaryServiceId
        : DEFAULT_CALCULATOR_STATE.primaryServiceId;

    const addonIds = Array.isArray(parsed.addonIds)
      ? Array.from(new Set(parsed.addonIds.filter((id): id is AddonId => validAddonIds.has(id))))
      : DEFAULT_CALCULATOR_STATE.addonIds;

    return {primaryServiceId, addonIds};
  } catch {
    return DEFAULT_CALCULATOR_STATE;
  }
}

export function saveCalculatorState(state: CalculatorState): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or private-mode errors
  }
}

export function formatRub(amount: number): string {
  return `${amount.toLocaleString('ru-RU')} ₽`;
}

function pluralizeDays(days: number): string {
  const mod10 = days % 10;
  const mod100 = days % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return 'день';
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return 'дня';
  }
  return 'дней';
}

export function formatDaysRange(minDays: number, maxDays: number): string {
  if (minDays === maxDays) {
    return `${minDays} ${pluralizeDays(minDays)}`;
  }
  return `${minDays}–${maxDays} ${pluralizeDays(maxDays)}`;
}

export function calculateEstimate(state: CalculatorState) {
  const service: ServiceOption =
    PRIMARY_SERVICES.find((item) => item.id === state.primaryServiceId) ??
    PRIMARY_SERVICES[2] ??
    SERVICE_CATALOG[0];

  const addons = ADDON_OPTIONS.filter((item) => state.addonIds.includes(item.id));
  const addonsCost = addons.reduce((sum, item) => sum + item.price, 0);
  const extraDays = addons.reduce((sum, item) => sum + item.extraDays, 0);
  const totalCost = service.price + addonsCost;

  let turnaround: string;
  if (extraDays === 0) {
    turnaround = service.turnaround;
  } else {
    const minDays = service.minDays + 1;
    const maxDays = service.maxDays + extraDays;
    turnaround = formatDaysRange(minDays, maxDays);
  }

  return {
    service,
    addons,
    totalCost,
    formattedCost: formatRub(totalCost),
    turnaround,
  };
}

export interface LeadBriefInput {
  name: string;
  contact: string;
  city: string;
  comment: string;
  calcState: CalculatorState;
}

export function buildFormattedBrief(input: LeadBriefInput): string {
  const estimate = calculateEstimate(input.calcState);
  const addonNames =
    estimate.addons.length > 0
      ? estimate.addons.map((a) => a.title).join(', ')
      : 'Без доп. опций';

  const lines: string[] = [
    'Заявка на бесплатный прототип первого экрана — M_WEB (Крым)',
    '',
    `Услуга: ${estimate.service.title}`,
    `Доп. опции: ${addonNames}`,
    `Ориентир по смете: ${estimate.formattedCost} (срок: ${estimate.turnaround})`,
  ];

  if (input.city.trim()) {
    lines.push(`Город: ${input.city.trim()}`);
  }
  if (input.name.trim()) {
    lines.push(`Имя: ${input.name.trim()}`);
  }
  if (input.contact.trim()) {
    lines.push(`Контакт: ${input.contact.trim()}`);
  }
  if (input.comment.trim()) {
    lines.push(`Задача: ${input.comment.trim()}`);
  }

  return lines.join('\n');
}

export function buildTelegramDirectHref(username: string, briefText?: string): string {
  const cleanHandle = username.replace(/^@/, '').trim() || 'M_Web_production';
  const baseUrl = `https://t.me/${encodeURIComponent(cleanHandle)}`;
  if (!briefText || !briefText.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(briefText)}`;
}
