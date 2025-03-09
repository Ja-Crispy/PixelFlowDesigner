import { motion } from "framer-motion";

interface CharacterProps {
  type?: string;
  size?: "normal" | "large";
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
    <!-- Basic pixel art robot -->
    <rect x="20" y="12" width="24" height="24" fill="currentColor"/>
    <rect x="24" y="20" width="4" height="4" fill="#fff"/>
    <rect x="36" y="20" width="4" height="4" fill="#fff"/>
    <rect x="28" y="36" width="8" height="2" fill="#fff"/>
  </svg>`
};

export default function Character({ type = "cat", size = "normal" }: CharacterProps) {
  const svg = CHARACTER_SVGS[type as keyof typeof CHARACTER_SVGS] || CHARACTER_SVGS.cat;

  return (
    <motion.div
      className={`text-primary ${size === "large" ? "scale-150" : ""}`}
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}