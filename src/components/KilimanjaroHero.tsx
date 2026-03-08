/**
 * Kilimanjaro silhouette SVG component for the hero background.
 * Renders a subtle mountain range at sunrise with warm gradient sky.
 */
export default function KilimanjaroHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sunrise glow circles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sema-yellow/10 blur-[100px]" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-sema-sunrise/8 blur-[80px]" />

      {/* Sun disc */}
      <div className="absolute bottom-[38%] left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-sema-yellow/40 to-sema-sunrise/20 blur-sm" />

      {/* Mountain silhouette SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[45%] md:h-[55%]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Far mountains - lighter */}
        <path
          d="M0 400 L0 280 Q120 200 240 260 Q360 180 480 220 Q540 140 620 100 Q680 60 720 80 Q760 60 800 100 Q880 140 960 220 Q1080 180 1200 260 Q1320 200 1440 280 L1440 400Z"
          fill="hsl(25 65% 31% / 0.25)"
        />
        {/* Kilimanjaro - main peak */}
        <path
          d="M0 400 L0 320 Q180 280 360 300 Q480 250 560 180 Q620 120 680 90 Q720 70 740 75 Q760 70 780 90 Q840 120 900 180 Q980 250 1080 300 Q1260 280 1440 320 L1440 400Z"
          fill="hsl(25 65% 31% / 0.4)"
        />
        {/* Snow cap hint */}
        <path
          d="M640 140 Q680 100 720 82 Q740 74 760 82 Q800 100 820 140 Q780 120 740 112 Q700 120 640 140Z"
          fill="hsl(0 0% 100% / 0.12)"
        />
        {/* Foreground hills */}
        <path
          d="M0 400 L0 350 Q200 320 400 340 Q600 310 800 340 Q1000 320 1200 340 Q1400 320 1440 350 L1440 400Z"
          fill="hsl(25 65% 31% / 0.55)"
        />
        {/* Ground */}
        <path
          d="M0 400 L0 370 Q360 355 720 365 Q1080 355 1440 370 L1440 400Z"
          fill="hsl(30 30% 22% / 0.7)"
        />
      </svg>

      {/* Savanna grass hints at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-sema-earth/40 to-transparent" />
    </div>
  );
}
