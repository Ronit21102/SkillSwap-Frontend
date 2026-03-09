"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type Sparkle = {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
};

const generateSparkle = (color: string): Sparkle => ({
  id: String(Math.random()),
  createdAt: Date.now(),
  color,
  size: Math.floor(Math.random() * 20) + 10,
  style: {
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    zIndex: 2,
  },
});

const SparkleInstance = ({ sparkle }: { sparkle: Sparkle }) => {
  return (
    <motion.span
      style={{
        position: "absolute",
        top: sparkle.style.top,
        left: sparkle.style.left,
        zIndex: sparkle.style.zIndex,
        pointerEvents: "none",
      }}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ scale: 1, rotate: 180, opacity: 1 }}
      exit={{ scale: 0, rotate: 360, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg
        width={sparkle.size}
        height={sparkle.size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={sparkle.color}
        />
      </svg>
    </motion.span>
  );
};

export const SparklesText = ({
  children,
  colors = { first: "#22c55e", second: "#a855f7" },
  className,
}: {
  children: React.ReactNode;
  colors?: { first: string; second: string };
  className?: string;
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const sparkle = generateSparkle(color);
      setSparkles((prev) => [...prev.slice(-4), sparkle]);
    }, 400);
    return () => clearInterval(interval);
  }, [colors]);

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleInstance key={sparkle.id} sparkle={sparkle} />
        ))}
      </AnimatePresence>
      <strong className="relative z-10">{children}</strong>
    </span>
  );
};
