export type AccessibilityMode = "large-text" | "high-contrast" | "screen-reader";

const KEY = "sema_a11y";
const EVENT = "sema:a11y-change";
const ALL_CLASSES = ["mode-large-text", "mode-high-contrast", "mode-screen-reader"];

export function getAccessibilityModes(): AccessibilityMode[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as AccessibilityMode[]) : [];
  } catch {
    return [];
  }
}

export function applyAccessibilityModes(modes: AccessibilityMode[] = getAccessibilityModes()) {
  const el = document.documentElement;
  ALL_CLASSES.forEach((c) => el.classList.remove(c));
  modes.forEach((m) => el.classList.add(`mode-${m}`));
  el.setAttribute("data-a11y", modes.join(" "));
}

export function setAccessibilityModes(modes: AccessibilityMode[]): AccessibilityMode[] {
  try {
    localStorage.setItem(KEY, JSON.stringify(modes));
  } catch {
    /* storage unavailable — still apply for this session */
  }
  applyAccessibilityModes(modes);
  window.dispatchEvent(new CustomEvent<AccessibilityMode[]>(EVENT, { detail: modes }));
  return modes;
}

export function toggleAccessibilityMode(mode: AccessibilityMode): AccessibilityMode[] {
  const current = getAccessibilityModes();
  const updated = current.includes(mode)
    ? current.filter((m) => m !== mode)
    : [...current, mode];
  return setAccessibilityModes(updated);
}

/** Keep the <html> classes in sync when another tab changes the preference. */
export function initAccessibilitySync() {
  applyAccessibilityModes();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) applyAccessibilityModes();
  });
}

export function subscribeAccessibility(cb: (modes: AccessibilityMode[]) => void) {
  const onLocal = (e: Event) => cb((e as CustomEvent<AccessibilityMode[]>).detail);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb(getAccessibilityModes());
  };
  window.addEventListener(EVENT, onLocal);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onLocal);
    window.removeEventListener("storage", onStorage);
  };
}
