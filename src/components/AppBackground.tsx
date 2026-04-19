import wallpaper from "@/assets/kilimanjaro-sunrise.jpg";

/**
 * Universal app background — Mount Kilimanjaro sunrise.
 * Fixed, behind all content. Impartial nature imagery (no flags, symbols, or political iconography).
 * Includes a readability overlay so foreground content stays legible in light & dark themes.
 */
export default function AppBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <img
        src={wallpaper}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Readability overlay — softens image so UI stays legible */}
      <div className="absolute inset-0 bg-background/85 dark:bg-background/88" />
      {/* Subtle warm vignette pulling toward the brand palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, transparent 0%, hsl(var(--background) / 0.35) 100%)",
        }}
      />
    </div>
  );
}
