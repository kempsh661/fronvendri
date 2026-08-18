import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionSectionProps = {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
};

export function MotionSection({
  children,
  delay = 0,
  style,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div style={style}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay,
        ease: "easeOut",
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
