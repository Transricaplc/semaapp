/**
 * Yellow Book hero background — subtle book/directory texture
 * with faint Tanzania outline watermark
 */
export default function KilimanjaroHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Faint horizontal line pattern — like a real directory/book */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            hsl(var(--yb-yellow)) 39px,
            hsl(var(--yb-yellow)) 40px
          )`,
        }}
      />

      {/* Faint Tanzania outline watermark */}
      <svg
        className="absolute right-0 bottom-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.03]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M60 20 L140 20 Q160 40 160 60 L170 80 Q180 100 170 120 L160 140 Q150 160 130 170 L100 180 Q80 175 70 165 L50 140 Q40 120 35 100 L30 80 Q35 50 45 35 Z"
          stroke="hsl(var(--yb-yellow))"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-yb-charcoal/50 to-transparent" />
    </div>
  );
}
