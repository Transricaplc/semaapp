/**
 * Yellow Book hero background — directory texture + Tanzania watermark
 */
export default function KilimanjaroHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Refined horizontal line pattern — real directory aesthetic */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 31px,
            hsl(var(--yb-yellow)) 31px,
            hsl(var(--yb-yellow)) 32px
          )`,
        }}
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(10,12,18,0.5) 100%)",
        }}
      />

      {/* Tanzania outline watermark */}
      <svg
        className="absolute right-[-40px] bottom-[-20px] w-[440px] h-[440px] md:w-[580px] md:h-[580px] opacity-[0.05]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M60 20 L140 20 Q160 40 160 60 L170 80 Q180 100 170 120 L160 140 Q150 160 130 170 L100 180 Q80 175 70 165 L50 140 Q40 120 35 100 L30 80 Q35 50 45 35 Z"
          stroke="hsl(var(--yb-yellow))"
          strokeWidth="1.5"
          fill="hsl(var(--yb-yellow))"
          fillOpacity="0.04"
        />
      </svg>

      {/* Top edge fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-yb-charcoal/30 to-transparent" />

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-yb-charcoal/60 to-transparent" />
    </div>
  );
}
