/**
 * Privacy-friendly analytics (Plausible).
 * - No cookies, no cross-site tracking, GDPR/PECR/CCPA-ready by design.
 * - Loaded only on the live published domain. Skipped in iframes,
 *   preview hosts, and local dev so the editor preview stays clean.
 */
const LIVE_HOST = "semaapp.lovable.app";

export function loadAnalytics() {
  if (typeof window === "undefined") return;

  const inIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();
  if (inIframe) return;

  const host = window.location.hostname;
  if (host !== LIVE_HOST) return;

  if (document.querySelector('script[data-plausible]')) return;

  const s = document.createElement("script");
  s.defer = true;
  s.dataset.plausible = "true";
  s.dataset.domain = LIVE_HOST;
  s.src = "https://plausible.io/js/script.js";
  document.head.appendChild(s);
}
