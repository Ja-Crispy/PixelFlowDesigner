import { motion } from "framer-motion";

interface CharacterProps {
  type?: string;
  size?: "normal" | "large";
  state?: "idle" | "focused" | "break" | "celebration";
}

const CHARACTER_SVGS = {
  cat: `<svg width="64" height="64" viewBox="0 0 64 64">
    <!-- Basic pixel art cat -->
    <rect x="24" y="16" width="4" height="4" fill="currentColor"/>
    <rect x="36" y="16" width="4" height="4" fill="currentColor"/>
    <rect x="20" y="20" width="24" height="24" fill="currentColor"/>
    <rect x="16" y="28" width="4" height="8" fill="currentColor"/>
    <rect x="44" y="28" width="4" height="8" fill="currentColor"/>
  </svg>`,

  robot: `<svg width="64" height="64" viewBox="0 0 64 64">
    <!-- Pixel art robot -->
    <rect x="20" y="12" width="24" height="24" fill="currentColor"/>
    <rect x="24" y="20" width="4" height="4" fill="#fff"/>
    <rect x="36" y="20" width="4" height="4" fill="#fff"/>
    <rect x="28" y="36" width="8" height="2" fill="#fff"/>
  </svg>`,

  pixel: `<svg width="64" height="64" viewBox="0 0 64 64">
    <!-- Pixel character -->
    <rect x="24" y="16" width="16" height="16" fill="currentColor"/>
    <rect x="28" y="24" width="8" height="8" fill="#fff"/>
  </svg>`,

  ghost: `<svg width="64" height="64" viewBox="0 0 64 64">
    <!-- Ghost character -->
    <path d="M20,20 h24 v24 c0,12 -24,12 -24,0 z" fill="currentColor"/>
    <rect x="28" y="28" width="4" height="4" fill="#fff"/>
    <rect x="36" y="28" width="4" height="4" fill="#fff"/>
  </svg>`,
};

const ANIMATIONS = {
  idle: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
  focused: {
    scale: [1, 1.1, 1],
    transition: { duration: 1, repeat: Infinity }
  },
  break: {
    rotate: [-5, 5, -5],
    transition: { duration: 2, repeat: Infinity }
  },
  celebration: {
    y: [0, -20, 0],
    scale: [1, 1.2, 1],
    transition: { duration: 0.5, repeat: 3 }
  }
};

export default function Character({ type = "cat", size = "normal", state = "idle" }: CharacterProps) {
  const svg = CHARACTER_SVGS[type as keyof typeof CHARACTER_SVGS] || CHARACTER_SVGS.cat;
  const animation = ANIMATIONS[state];

  return (
    <motion.div
      className={`text-primary ${size === "large" ? "scale-150" : ""}`}
      animate={animation}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}