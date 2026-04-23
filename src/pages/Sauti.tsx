import { useState, useEffect, useRef } from "react";
import { Mic, Clock, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceInput } from "@/hooks/useVoiceInput";

export default function Sauti() {
  const { lang } = useLanguage();
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("sema_voice_recent") || "[]");
    } catch { return []; }
  });
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState<"idle" | "listening" | "processing">("idle");
  const stopTimer = useRef<number | null>(null);

  const voice = useVoiceInput({
    lang: lang === "sw" ? "sw-TZ" : "en-US",
    onResult: (text) => {
      setTranscript(text);
      setStatus("processing");
      const next = [text, ...recent.filter((r) => r !== text)].slice(0, 3);
      setRecent(next);
      localStorage.setItem("sema_voice_recent", JSON.stringify(next));
      window.setTimeout(() => setStatus("idle"), 800);
    },
  });

  // Sync status with voice.isListening
  useEffect(() => {
    if (voice.isListening) setStatus("listening");
    else if (status === "listening") setStatus("idle");
    return () => { if (stopTimer.current) window.clearTimeout(stopTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice.isListening]);

  const statusText =
    status === "listening" ? "Inasikiliza..." :
    status === "processing" ? "Inachakata..." :
    "Gusa kuanza kuzungumza";

  const handleReplay = (q: string) => setTranscript(q);

  return (
    <div className="font-ui animate-fade-in flex flex-col" style={{ minHeight: "calc(100dvh - 80px)" }}>
      {/* HEADER */}
      <header className="px-4 pt-6 pb-3 text-center" style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}>
        <h1 className="font-serif-display text-[24px] text-ink">Sauti ya Raia</h1>
        <p className="text-[12px] text-text-secondary mt-1">Uliza kwa Kiswahili au Kiingereza</p>
      </header>

      {/* CENTER — mic + waveform */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
        <div className="relative flex items-center justify-center">
          {status === "listening" && (
            <>
              <span className="absolute inset-0 rounded-full ring-2 ring-accent animate-ping" />
              <span className="absolute -inset-3 rounded-full ring-2 ring-accent/60 animate-ping" style={{ animationDelay: "150ms" }} />
            </>
          )}
          <button
            type="button"
            onClick={() => {
              if (!voice.isSupported) return;
              voice.toggleListening();
            }}
            disabled={!voice.isSupported}
            aria-label="Mic"
            className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
          >
            <Mic className="w-9 h-9 text-primary-foreground" strokeWidth={1.75} />
          </button>
        </div>

        <p className="text-[13px] text-text-secondary text-center min-h-[20px]">{statusText}</p>

        {/* Waveform */}
        <div className="flex items-end justify-center gap-1.5 h-10 w-full max-w-[220px]">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full transition-colors ${
                status === "listening" ? "bg-accent animate-wave" : "bg-primary/40"
              }`}
              style={{
                height: status === "listening" ? `${20 + ((i * 11) % 30)}px` : "12px",
                animationDelay: `${i * 90}ms`,
              }}
            />
          ))}
        </div>

        {/* Live transcript */}
        {transcript && (
          <div className="w-full gazette-card px-4 py-3 text-left">
            <p className="label-eyebrow mb-1">Umesema</p>
            <p className="text-[14px] text-ink leading-relaxed">{transcript}</p>
          </div>
        )}

        {!voice.isSupported && (
          <p className="text-[12px] text-text-secondary text-center max-w-[260px]">
            Kifaa hiki hakisaidii utambuzi wa sauti. Jaribu Chrome kwenye Android.
          </p>
        )}
      </section>

      {/* RECENT QUERIES */}
      <section className="px-4 pb-6">
        <p className="label-eyebrow mb-2">Maswali ya hivi karibuni</p>
        {recent.length === 0 ? (
          <p className="text-[13px] text-text-secondary">Hakuna maswali bado.</p>
        ) : (
          <div className="space-y-2">
            {recent.map((q, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-secondary text-primary rounded-xl px-4 py-2 min-h-[44px]"
              >
                <Clock className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span className="flex-1 text-[13px] truncate">{q}</span>
                <button
                  onClick={() => handleReplay(q)}
                  aria-label="Rudia"
                  className="w-7 h-7 -mr-1 flex items-center justify-center active:opacity-65"
                >
                  <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .animate-wave { animation: wave 0.9s ease-in-out infinite; transform-origin: bottom; }
      `}</style>
    </div>
  );
}
