import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
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
        // Legacy aliases
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
