/**
 * Yandex.Metrika goal tracking helper for M_WEB (counter ID: 114694435)
 */
export function trackTelegramClick(): void {
  if (typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
    try {
      (window as any).ym(114694435, 'reachGoal', 'tg_click');
    } catch {
      // Ignore tracking errors
    }
  }
}

export function trackMaxClick(): void {
  if (typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
    try {
      (window as any).ym(114694435, 'reachGoal', 'max_click');
    } catch {
      // Ignore tracking errors
    }
  }
}
