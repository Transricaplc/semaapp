import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        heading: ["'Cormorant Garamond'", "Georgia", "serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        ui: ["'DM Sans'", "system-ui", "sans-serif"],
        code: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        // Display — hero only
        display: ["36px", { lineHeight: "1.1", letterSpacing: "-0.5px", fontWeight: "800" }],
        "display-lg": ["52px", { lineHeight: "1.1", letterSpacing: "-0.5px", fontWeight: "800" }],
        // H1 — page titles
        "h1": ["26px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        // H2 — section headers
        "h2": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
        "h2-lg": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        // H3 — card titles
        "h3": ["16px", { lineHeight: "1.4", fontWeight: "700" }],
        "h3-lg": ["18px", { lineHeight: "1.4", fontWeight: "700" }],
        // Body
        "body": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        // Small/meta
        "meta": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        "meta-lg": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        // Badge/label
        "badge": ["10px", { lineHeight: "1", fontWeight: "700", letterSpacing: "0.6px" }],
        "badge-lg": ["11px", { lineHeight: "1", fontWeight: "700", letterSpacing: "0.6px" }],
        // Nav
        "nav": ["11px", { lineHeight: "1", fontWeight: "500" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        yb: {
          yellow: "hsl(var(--yb-yellow))",
          "yellow-deep": "hsl(var(--yb-yellow-deep))",
          "yellow-soft": "hsl(var(--yb-yellow-soft))",
          charcoal: "hsl(var(--yb-charcoal))",
          "charcoal-dark": "hsl(var(--yb-charcoal-dark))",
          "charcoal-mid": "hsl(var(--yb-charcoal-mid))",
          "charcoal-soft": "hsl(var(--yb-charcoal-soft))",
          "charcoal-muted": "hsl(var(--yb-charcoal-muted))",
          offwhite: "hsl(var(--yb-offwhite))",
          white: "hsl(var(--yb-white))",
          gray: "hsl(var(--yb-gray))",
          verified: "hsl(var(--yb-verified))",
          pending: "hsl(var(--yb-pending))",
          outdated: "hsl(var(--yb-outdated))",
          info: "hsl(var(--yb-info))",
        },
        gold: "hsl(var(--gold))",
        warning: "hsl(var(--warning))",
        navy: {
          DEFAULT: "hsl(var(--yb-charcoal))",
          light: "hsl(var(--yb-charcoal-mid))",
        },
        green: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(var(--accent))",
          dark: "hsl(var(--accent))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "warm-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px hsla(47, 100%, 48%, 0.2)" },
          "50%": { boxShadow: "0 0 25px hsla(47, 100%, 48%, 0.4), 0 0 50px hsla(47, 100%, 48%, 0.15)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in-right 0.3s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "warm-pulse": "warm-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;