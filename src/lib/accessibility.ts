export type AccessibilityMode = "large-text" | "high-contrast" | "screen-reader";

const KEY = "sema_a11y";

export function getAccessibilityModes(): AccessibilityMode[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as AccessibilityMode[]) : [];
  } catch {
    return [];
  }
}

export function applyAccessibilityModes() {
  const modes = getAccessibilityModes();
  const el = document.documentElement;
  ["mode-large-text", "mode-high-contrast", "mode-screen-reader"].forEach((c) =>
    el.classList.remove(c)
  );
  modes.forEach((m) => el.classList.add(`mode-${m}`));
}

export function toggleAccessibilityMode(mode: AccessibilityMode): AccessibilityMode[] {
  const current = getAccessibilityModes();
  const updated = current.includes(mode)
    ? current.filter((m) => m !== mode)
    : [...current, mode];
  localStorage.setItem(KEY, JSON.stringify(updated));
  applyAccessibilityModes();
  return updated;
}
