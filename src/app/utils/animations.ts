export const animations = {
  fadeIn: "animate-[fadeIn_0.3s_ease-in-out]",
  slideUp: "animate-[slideUp_0.3s_ease-out]",
  scaleIn: "animate-[scaleIn_0.2s_ease-out]",
  popIn: "animate-[popIn_0.2s_cubic-bezier(0.68,-0.55,0.265,1.55)]",
} as const;

// Add these to your tailwind.config.js keyframes
export const keyframes = {
  fadeIn: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  slideUp: {
    "0%": { transform: "translateY(10px)", opacity: "0" },
    "100%": { transform: "translateY(0)", opacity: "1" },
  },
  scaleIn: {
    "0%": { transform: "scale(0.95)", opacity: "0" },
    "100%": { transform: "scale(1)", opacity: "1" },
  },
  popIn: {
    "0%": { transform: "scale(0.95)", opacity: "0" },
    "70%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)", opacity: "1" },
  },
};
