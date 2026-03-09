"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (clientX - rect.left) / width;
    const mouseY = (clientY - rect.top) / height;
    const dampen = 15;
    const x = (mouseX - 0.5) * dampen;
    const y = (mouseY - 0.5) * dampen;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.025, 1.025, 1.025)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease",
      }}
      className={cn("relative overflow-hidden rounded-2xl", containerClassName)}
    >
      <div
        className={cn("h-full px-4 py-20 sm:px-10", className)}
        style={{
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
      >
        {children}
      </div>
    </motion.section>
  );
};
