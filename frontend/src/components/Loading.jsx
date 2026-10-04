import { motion } from "motion/react";

export default function Loading({
  text = "Thinking...",
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.span className="h-2 w-2 rounded-full bg-white"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
        }}
      />

      <span>{text}</span>
    </div>
  );
}