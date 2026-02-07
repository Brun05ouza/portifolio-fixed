import { useState } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <div
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layer 1 */}
      <motion.span
        className="absolute top-0 left-0 w-full"
        style={{
          color: 'var(--color-chroma-1)',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        }}
        animate={
          isGlitching
            ? {
                x: [-2, 2, -2, 2, 0],
                opacity: [0, 0.8, 0, 0.8, 0],
              }
            : { x: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {text}
      </motion.span>

      {/* Glitch layer 2 */}
      <motion.span
        className="absolute top-0 left-0 w-full"
        style={{
          color: 'var(--color-chroma-3)',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
        }}
        animate={
          isGlitching
            ? {
                x: [2, -2, 2, -2, 0],
                opacity: [0, 0.8, 0, 0.8, 0],
              }
            : { x: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {text}
      </motion.span>

      {/* Glitch layer 3 - noise */}
      <motion.span
        className="absolute top-0 left-0 w-full mix-blend-screen"
        style={{
          color: 'var(--color-glow)',
        }}
        animate={
          isGlitching
            ? {
                x: [1, -1, 1, -1, 0],
                y: [1, -1, -1, 1, 0],
                opacity: [0, 0.5, 0, 0.5, 0],
              }
            : { x: 0, y: 0, opacity: 0 }
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        {text}
      </motion.span>
    </div>
  );
}
