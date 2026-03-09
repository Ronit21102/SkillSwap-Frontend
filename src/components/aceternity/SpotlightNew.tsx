"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/cn";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  className?: string;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(142, 72%, 60%, .18) 0, hsla(142, 72%, 40%, .06) 50%, hsla(142, 72%, 30%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(142, 72%, 60%, .12) 0, hsla(142, 72%, 40%, .06) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(280, 72%, 70%, .08) 0, hsla(280, 72%, 50%, .04) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
  className,
}: SpotlightProps) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [0, xOffset, 0],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls, duration, xOffset]);

  return (
    <motion.div
      animate={controls}
      className={cn(
        "pointer-events-none absolute z-0 overflow-hidden",
        className
      )}
      style={{ translateY }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: gradientFirst,
          filter: "blur(2px)",
        }}
        className="absolute top-0 left-0 origin-top-left -rotate-45"
      />
      <div
        style={{
          width: `${smallWidth}px`,
          height: `${height}px`,
          background: gradientSecond,
          filter: "blur(4px)",
        }}
        className="absolute top-0 left-0 origin-top-left -rotate-45"
      />
      <div
        style={{
          width: `${smallWidth}px`,
          height: `${height}px`,
          background: gradientThird,
          filter: "blur(4px)",
        }}
        className="absolute top-0 right-0 origin-top-right rotate-45"
      />
    </motion.div>
  );
};
