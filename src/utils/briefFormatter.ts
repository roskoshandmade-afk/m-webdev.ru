import {
  ADDON_OPTIONS,
  NICHE_DEMOS,
  PROJECT_TYPES,
  type AddonId,
  type NicheDemoId,
  type ProjectTypeId,
} from '../data/studioData';

export const CALCULATOR_STORAGE_KEY = 'tavrika_web_calculator_v1';

export interface CalculatorState {
  projectTypeId: ProjectTypeId;
  addonIds: AddonId[];
  selectedNicheId: NicheDemoId | null;
}

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  projectTypeId: 'landing',
  addonIds: ['domain-hosting-rf'],
  selectedNicheId: null,
};

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
    const validProjectIds = new Set(PROJECT_TYPES.map((p) => p.id));
    const validAddonIds = new Set(ADDON_OPTIONS.map((a) => a.id));
    const validNicheIds = new Set(NICHE_DEMOS.map((n) => n.id));

    const projectTypeId =
      parsed.projectTypeId && validProjectIds.has(parsed.projectTypeId)
        ? parsed.projectTypeId
        : DEFAULT_CALCULATOR_STATE.projectTypeId;

    const addonIds = Array.isArray(parsed.addonIds)
      ? Array.from(new Set(parsed.addonIds.filter((id): id is AddonId => validAddonIds.has(id))))
      : DEFAULT_CALCULATOR_STATE.addonIds;

    const selectedNicheId =
      parsed.selectedNicheId && validNicheIds.has(parsed.selectedNicheId)
        ? parsed.selectedNicheId
        : null;

    return {projectTypeId, addonIds, selectedNicheId};
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

export function formatDaysRange(minDays: number, maxDays: number): string {
  if (minDays === maxDays) {
    return `${minDays} ${pluralizeDays(minDays)}`;
  }
  return `${minDays}–${maxDays} ${pluralizeDays(maxDays)}`;
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

export function calculateEstimate(state: CalculatorState) {
  const project =
    PROJECT_TYPES.find((item) => item.id === state.projectTypeId) ?? PROJECT_TYPES[1];
  const addons = ADDON_OPTIONS.filter((item) => state.addonIds.includes(item.id));
  const niche = state.selectedNicheId
    ? NICHE_DEMOS.find((item) => item.id === state.selectedNicheId) ?? null
    : null;

  const addonsCost = addons.reduce((sum, item) => sum + item.price, 0);
  const extraDays = addons.reduce((sum, item) => sum + item.extraDays, 0);

  const totalCost = project.price + addonsCost;
  const minDays = project.minDays + (extraDays > 0 ? 1 : 0);
  const maxDays = project.maxDays + extraDays;

  return {
    project,
    addons,
    niche,
    totalCost,
    formattedCost: formatRub(totalCost),
    turnaround: formatDaysRange(minDays, maxDays),
  };
}

export interface LeadBriefInput {
  name: string;
  contact: string;
  city: string;
  channel: string;
  comment: string;
  calcState: CalculatorState;
  forAvito?: boolean;
}

export function buildFormattedBrief(input: LeadBriefInput): string {
  const estimate = calculateEstimate(input.calcState);
  const addonNames =
    estimate.addons.length > 0
      ? estimate.addons.map((a) => a.title).join(', ')
      : 'Без дополнительных опций';

  const lines: string[] = [
    input.forAvito
      ? 'Здравствуйте! Интересует разработка под ключ и бесплатный прототип первого экрана.'
      : 'Заявка на бесплатный прототип первого экрана — Таврика Веб (Крым)',
    '',
    `Тип проекта: ${estimate.project.title}`,
    `Доп. опции: ${addonNames}`,
    `Расчёт по калькулятору: ${estimate.formattedCost} (срок ${estimate.turnaround})`,
  ];

  if (estimate.niche) {
    lines.push(`Ориентир по нише: ${estimate.niche.title}`);
  }
  if (input.city.trim()) {
    lines.push(`Город: ${input.city.trim()}`);
  }
  if (input.name.trim()) {
    lines.push(`Имя: ${input.name.trim()}`);
  }
  if (!input.forAvito && input.contact.trim()) {
    lines.push(`Контакт: ${input.contact.trim()} (предпочтительно: ${input.channel})`);
  }
  if (input.comment.trim()) {
    lines.push(`Задача: ${input.comment.trim()}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppHref(briefText: string): string {
  return `https://wa.me/?text=${encodeURIComponent(briefText)}`;
}

export function buildTelegramDirectHref(username: string, briefText: string): string {
  const cleanHandle = username.replace(/^@/, '').trim() || 'YOUR_USERNAME';
  return `https://t.me/${encodeURIComponent(cleanHandle)}?text=${encodeURIComponent(briefText)}`;
}
