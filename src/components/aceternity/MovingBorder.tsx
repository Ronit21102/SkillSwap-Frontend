
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) => {
  const pathRef = React.useRef<SVGRectElement | null>(null);
  const progress = React.useRef(0);

  React.useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!pathRef.current) return;
      const elapsed = currentTime - lastTime;
      lastTime = currentTime;
      progress.current = (progress.current + elapsed / duration) % 1;

      const pathLength = pathRef.current.getTotalLength
        ? pathRef.current.getTotalLength()
        : 800;
      const point = pathRef.current.getPointAtLength
        ? pathRef.current.getPointAtLength(progress.current * pathLength)
        : { x: 0, y: 0 };

      const rect = pathRef.current.closest("div")?.getBoundingClientRect();
      if (rect) {
        const svgParent = pathRef.current.closest("svg");
        if (svgParent) {
          const movingDot = svgParent.querySelector(".moving-dot");
          if (movingDot) {
            movingDot.setAttribute(
              "style",
              `transform: translate(${point.x}px, ${point.y}px)`
            );
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [duration]);

  return (
    <Button duration={duration} borderRadius="1.75rem" {...otherProps}>
      {children}
    </Button>
  );
};

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorderSVG duration={duration} rx={borderRadius} ry={borderRadius} />
      </div>
      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

function MovingBorderSVG({
  duration = 2000,
  rx,
  ry,
}: {
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = React.useRef<SVGRectElement>(null);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute h-full w-full"
      width="100%"
      height="100%"
    >
      <rect
        fill="none"
        width="100%"
        height="100%"
        rx={rx}
        ry={ry}
        ref={pathRef}
      />
      <motion.circle
        r="3"
        fill="currentColor"
        className="text-emerald-500"
        style={{
          offsetPath: `rect(0 auto auto 0 round ${rx})`,
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}
